
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
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Get the user from the request
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error('Unauthorized');
    }
    
    const userId = userData.user.id;

    // Get user's subscription data from Supabase
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('subscription_data')
      .eq('id', userId)
      .single();
      
    if (profileError) {
      throw new Error('Failed to fetch subscription data');
    }
    
    // If there's no subscription data, return a default response
    if (!profile.subscription_data || !profile.subscription_data.stripe_subscription_id) {
      return new Response(
        JSON.stringify({ 
          hasActiveSubscription: false,
          subscriptionData: null
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }
    
    // Initialize Stripe to verify the subscription status
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });
    
    // Get the subscription from Stripe to verify it's actually active
    const subscription = await stripe.subscriptions.retrieve(
      profile.subscription_data.stripe_subscription_id
    );
    
    // Return subscription status
    const hasActiveSubscription = subscription.status === 'active';
    
    return new Response(
      JSON.stringify({ 
        hasActiveSubscription,
        subscriptionData: profile.subscription_data
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
