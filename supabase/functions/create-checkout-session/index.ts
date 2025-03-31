
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
    console.log("Starting checkout session creation");
    
    // Get request body
    const { priceId, successUrl, cancelUrl } = await req.json();
    
    if (!priceId) {
      throw new Error('Price ID is required');
    }

    console.log("Price ID:", priceId);
    
    // Get authorization header
    const authHeader = req.headers.get('Authorization')!
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })
    
    let userId = null;
    let email = null;

    // If there's an auth header, get the user from it
    if (authHeader) {
      // Initialize Supabase client
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      )

      // Get user from token
      const token = authHeader.replace('Bearer ', '')
      const { data: userData, error: userError } = await supabaseClient.auth.getUser(token)
      
      if (userError) {
        console.error("Error getting user:", userError);
      } else {
        userId = userData.user?.id;
        email = userData.user?.email;
        console.log("User email from auth:", email);
      }
    }
    
    // Get customer email from request body if not from auth
    if (!email && req.body) {
      try {
        const body = await req.json();
        email = body.email;
        console.log("User email from request body:", email);
      } catch (e) {
        // No email in body, continue without it
      }
    }
    
    // Check if customer already exists if we have an email
    let customerId = undefined;
    
    if (email) {
      const customers = await stripe.customers.list({
        email: email,
        limit: 1
      });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        console.log('Found existing customer:', customerId);
      }
    }
    
    // Get the origin or use the provided URLs
    const origin = req.headers.get('origin') || 'https://brandwise.app';
    const finalSuccessUrl = successUrl || `${origin}/onboarding`;
    const finalCancelUrl = cancelUrl || `${origin}/register`;
    
    console.log("Success URL:", finalSuccessUrl);
    console.log("Cancel URL:", finalCancelUrl);

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
        user_id: userId || 'anonymous',
      },
      allow_promotion_codes: true,
    });

    console.log('Checkout session created:', session.id);
    console.log('Checkout session URL:', session.url);
    
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
