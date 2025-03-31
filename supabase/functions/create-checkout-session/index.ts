
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
    console.log('Create checkout session request received');
    
    // Get request body
    const { priceId } = await req.json();
    
    if (!priceId) {
      throw new Error('Price ID is required');
    }

    console.log(`Creating checkout session for price ID: ${priceId}`);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Get the user from the request
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    
    console.log('Authenticating user');
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      console.error('Authentication error:', userError);
      throw new Error('Unauthorized');
    }
    
    const user = userData.user;
    
    // Get user email from Supabase profile
    console.log(`Looking up profile data for user: ${user.id}`);
    const { data: profileData, error: profileError } = await supabaseClient
      .from('profiles')
      .select('email')
      .eq('id', user.id)
      .single();
      
    let email = user.email;
    
    // Use profile email if available, otherwise use auth email
    if (!profileError && profileData?.email) {
      email = profileData.email;
    }

    if (!email) {
      console.error('No email found for user');
      throw new Error('User email is required');
    }

    console.log(`Using email for checkout: ${email}`);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Check if the customer already exists
    console.log(`Checking if customer exists with email: ${email}`);
    const customers = await stripe.customers.list({
      email,
      limit: 1
    });

    let customer_id;
    if (customers.data.length > 0) {
      customer_id = customers.data[0].id;
      console.log(`Found existing customer: ${customer_id}`);
      
      // Check if customer is already subscribed to this price
      console.log('Checking for active subscriptions');
      const subscriptions = await stripe.subscriptions.list({
        customer: customer_id,
        status: 'active',
        price: priceId,
        limit: 1
      });

      if (subscriptions.data.length > 0) {
        console.log('Customer already has an active subscription for this price');
        throw new Error('You already have an active subscription for this plan');
      }
    } else {
      console.log('No existing customer found, will create new one during checkout');
    }

    // Create Stripe checkout session
    console.log('Creating checkout session');
    const session = await stripe.checkout.sessions.create({
      customer: customer_id,
      customer_email: customer_id ? undefined : email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/account/billing?success=true`,
      cancel_url: `${req.headers.get('origin')}/account/billing?canceled=true`,
      metadata: {
        user_id: user.id,
      },
    });

    console.log(`Checkout session created: ${session.id}`);
    
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
