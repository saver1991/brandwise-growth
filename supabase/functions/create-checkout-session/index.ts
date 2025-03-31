
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get request body
    const { priceId, successUrl, cancelUrl } = await req.json();
    
    if (!priceId) {
      throw new Error('Price ID is required');
    }

    // Get authorization header
    const authHeader = req.headers.get('Authorization')!
    
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get user from token
    const token = authHeader.replace('Bearer ', '')
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token)
    
    if (userError) {
      throw new Error(`Error getting user: ${userError.message}`);
    }
    
    const user = userData.user
    const email = user?.email

    if (!email) {
      throw new Error('No email found');
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Check if customer already exists
    const customers = await stripe.customers.list({
      email: email,
      limit: 1
    })

    let customerId = undefined;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      
      // Check if already subscribed
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
        price: priceId,
        limit: 1
      });

      if (subscriptions.data.length > 0) {
        throw new Error("Customer already has an active subscription for this plan");
      }
    }

    console.log('Creating checkout session with price ID:', priceId);
    
    // Get the origin or use the provided URLs
    const origin = req.headers.get('origin') || 'https://brandwise.app';
    const finalSuccessUrl = successUrl || `${origin}/onboarding`;
    const finalCancelUrl = cancelUrl || `${origin}/register`;

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      metadata: {
        user_id: user.id, // Store user ID in metadata for webhook handler
      },
    });

    console.log('Checkout session created:', session.id);
    
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
        status: 500,
      }
    );
  }
});
