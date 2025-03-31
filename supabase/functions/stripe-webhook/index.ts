
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
    console.log('Stripe webhook received');
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      console.error('No Stripe signature found');
      throw new Error('No signature found');
    }

    const body = await req.text();
    let event;

    try {
      // Verify webhook signature
      const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';
      console.log(`Verifying webhook signature with secret: ${webhookSecret.substring(0, 3)}...`);
      
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
      console.log(`Webhook verified: ${event.type}`);
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
    console.log(`Processing event type: ${event.type}`);
    
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        const customerId = subscription.customer;
        
        console.log(`Processing subscription for customer: ${customerId}`);
        
        // Get customer details to find user email
        const customer = await stripe.customers.retrieve(customerId as string);
        if (!customer || customer.deleted) {
          throw new Error('Customer not found or deleted');
        }
        
        // Get products and prices for subscription items
        const subscriptionItems = subscription.items.data;
        const priceId = subscriptionItems[0].price.id;
        const productId = subscriptionItems[0].price.product;
        
        console.log(`Subscription price ID: ${priceId}, product ID: ${productId}`);
        
        const product = await stripe.products.retrieve(productId as string);
        
        // Find user by email or metadata
        const email = customer.email;
        let userId = null;
        
        if (subscription.metadata?.user_id) {
          userId = subscription.metadata.user_id;
          console.log(`Found user ID in metadata: ${userId}`);
        } else if (email) {
          // Try to find user by email
          console.log(`Looking up user by email: ${email}`);
          const { data: userData, error: userError } = await supabaseClient
            .from('profiles')
            .select('id')
            .eq('email', email)
            .maybeSingle();
            
          if (userError) {
            console.error('Error finding user:', userError);
          } else if (userData) {
            userId = userData.id;
            console.log(`Found user by email: ${userId}`);
          } else {
            console.log('No user found with email:', email);
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
          
          console.log(`Updating subscription data for user ${userId}:`, subscriptionData);
          
          const { error: updateError } = await supabaseClient
            .from('profiles')
            .update({
              subscription_data: subscriptionData
            })
            .eq('id', userId);
            
          if (updateError) {
            console.error('Error updating user subscription data:', updateError);
          } else {
            console.log('Successfully updated subscription data');
            
            // Send welcome email after successful subscription
            try {
              // Send confirmation email via Edge function
              await sendWelcomeEmail(supabaseClient, email, product.name);
            } catch (emailError) {
              console.error('Error sending welcome email:', emailError);
            }
          }
        } else {
          console.error('Could not find a user to associate with this subscription');
        }
        break;
        
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        const deletedCustomerId = deletedSubscription.customer;
        
        console.log(`Processing deleted subscription for customer: ${deletedCustomerId}`);
        
        // Get customer details
        const deletedCustomer = await stripe.customers.retrieve(deletedCustomerId as string);
        if (!deletedCustomer || deletedCustomer.deleted) {
          throw new Error('Customer not found or deleted');
        }
        
        // Find user by customer ID
        console.log(`Looking for user with customer ID: ${deletedCustomerId}`);
        const { data: usersByCustomerId, error: usersError } = await supabaseClient
          .from('profiles')
          .select('id, subscription_data')
          .filter('subscription_data->stripe_customer_id', 'eq', deletedCustomerId)
          .maybeSingle();
          
        if (usersError) {
          console.error('Error finding user:', usersError);
        } else if (usersByCustomerId) {
          console.log(`Found user: ${usersByCustomerId.id}`);
          // Update user's subscription data
          const updatedSubscriptionData = {
            ...(usersByCustomerId.subscription_data || {}),
            status: 'canceled',
            stripe_subscription_id: deletedSubscription.id
          };
          
          console.log(`Marking subscription as canceled for user ${usersByCustomerId.id}`);
          
          const { error: updateError } = await supabaseClient
            .from('profiles')
            .update({
              subscription_data: updatedSubscriptionData
            })
            .eq('id', usersByCustomerId.id);
            
          if (updateError) {
            console.error('Error updating user subscription data:', updateError);
          } else {
            console.log('Successfully marked subscription as canceled');
          }
        } else {
          console.log('No user found with customer ID:', deletedCustomerId);
        }
        break;
        
      case 'invoice.created':
      case 'invoice.paid':
      case 'invoice.payment_failed':
        console.log(`Received invoice event: ${event.type}`);
        
        // For invoice.paid event, send confirmation email
        if (event.type === 'invoice.paid') {
          const invoice = event.data.object;
          const customerInfo = await stripe.customers.retrieve(invoice.customer as string);
          
          if (customerInfo && !customerInfo.deleted && customerInfo.email) {
            try {
              // Send payment confirmation email
              await sendPaymentConfirmationEmail(
                supabaseClient,
                customerInfo.email as string,
                invoice.total / 100,
                new Date(invoice.created * 1000).toLocaleDateString()
              );
            } catch (emailError) {
              console.error('Error sending payment confirmation email:', emailError);
            }
          }
        }
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
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

// Helper function to send welcome email
async function sendWelcomeEmail(supabaseClient, email, planName) {
  try {
    // In production, you would use a dedicated email service
    // For now, we'll just log it
    console.log(`Sending welcome email to ${email} for plan ${planName}`);
    
    // This is where you would call your email service
    // Ideally through another edge function dedicated to sending emails
    
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

// Helper function to send payment confirmation email
async function sendPaymentConfirmationEmail(supabaseClient, email, amount, date) {
  try {
    console.log(`Sending payment confirmation email to ${email} for $${amount} on ${date}`);
    
    // This is where you would call your email service
    // Ideally through another edge function dedicated to sending emails
    
    return true;
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    throw error;
  }
}
