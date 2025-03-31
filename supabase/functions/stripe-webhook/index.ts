
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      throw new Error('No signature found');
    }

    const body = await req.text();
    let event;

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(
        JSON.stringify({ error: `Webhook signature verification failed` }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        const customerId = subscription.customer;
        
        // Get customer details to find user email
        const customer = await stripe.customers.retrieve(customerId as string);
        if (!customer || customer.deleted) {
          throw new Error('Customer not found or deleted');
        }
        
        // Get products and prices for subscription items
        const subscriptionItems = subscription.items.data;
        const priceId = subscriptionItems[0].price.id;
        const productId = subscriptionItems[0].price.product;
        
        const product = await stripe.products.retrieve(productId as string);
        
        // Find user by email or metadata
        const email = customer.email;
        let userId = null;
        
        if (subscription.metadata?.user_id) {
          userId = subscription.metadata.user_id;
        } else {
          // Try to find user by email
          const { data: userData, error: userError } = await supabaseClient
            .from('profiles')
            .select('id')
            .eq('email', email)
            .single();
            
          if (userError || !userData) {
            console.error('User not found with email:', email);
          } else {
            userId = userData.id;
          }
        }
        
        if (userId) {
          // Update user's subscription data in Supabase
          const subscriptionData = {
            plan: product.name,
            price: `$${(subscription.items.data[0].price.unit_amount || 0) / 100}/${subscription.items.data[0].price.recurring?.interval}`,
            renewal_date: new Date(subscription.current_period_end * 1000).toDateString(),
            status: subscription.status,
            payment_method: null, // Will be updated separately
            stripe_subscription_id: subscription.id,
            stripe_customer_id: customerId,
            stripe_price_id: priceId,
          };
          
          const { error: updateError } = await supabaseClient
            .from('profiles')
            .update({
              subscription_data: subscriptionData
            })
            .eq('id', userId);
            
          if (updateError) {
            console.error('Error updating user subscription data:', updateError);
          }
        }
        break;
        
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        const deletedCustomerId = deletedSubscription.customer;
        
        // Get customer details
        const deletedCustomer = await stripe.customers.retrieve(deletedCustomerId as string);
        if (!deletedCustomer || deletedCustomer.deleted) {
          throw new Error('Customer not found or deleted');
        }
        
        // Find user by customer ID
        const { data: users, error: usersError } = await supabaseClient
          .from('profiles')
          .select('id')
          .eq('subscription_data->stripe_customer_id', deletedCustomerId)
          .single();
          
        if (usersError || !users) {
          console.error('User not found with customer ID:', deletedCustomerId);
        } else {
          // Update user's subscription data
          const { error: updateError } = await supabaseClient
            .from('profiles')
            .update({
              subscription_data: {
                status: 'canceled',
                stripe_subscription_id: deletedSubscription.id
              }
            })
            .eq('id', users.id);
            
          if (updateError) {
            console.error('Error updating user subscription data:', updateError);
          }
        }
        break;
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
