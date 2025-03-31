
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
    console.log('Check subscription request received');
    
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
    
    const userId = userData.user.id;
    console.log(`User authenticated: ${userId}`);

    // First, try to get subscription data from the profile
    console.log('Fetching profile data');
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('subscription_data, email')
      .eq('id', userId)
      .single();
      
    if (profileError) {
      console.error('Error fetching profile:', profileError);
      throw new Error('Failed to fetch profile data');
    }
    
    // Check if there's existing subscription data in the profile
    const subscriptionData = profile?.subscription_data;
    console.log('Subscription data from profile:', subscriptionData);
    
    let hasActiveSubscription = false;
    
    if (subscriptionData?.stripe_subscription_id && subscriptionData?.stripe_customer_id) {
      // If we have Stripe IDs, verify subscription status with Stripe
      console.log('Verifying subscription status with Stripe');
      const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
        apiVersion: '2023-10-16',
      });
      
      try {
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionData.stripe_subscription_id
        );
        
        console.log(`Subscription status from Stripe: ${subscription.status}`);
        
        // If the subscription status from Stripe differs from our stored status, update it
        if (subscription.status !== subscriptionData.status) {
          console.log(`Updating subscription status from ${subscriptionData.status} to ${subscription.status}`);
          
          const updatedSubscriptionData = {
            ...subscriptionData,
            status: subscription.status,
          };
          
          await supabaseClient
            .from('profiles')
            .update({ subscription_data: updatedSubscriptionData })
            .eq('id', userId);
            
          // Use the updated status
          hasActiveSubscription = subscription.status === 'active';
        } else {
          // Use the stored status
          hasActiveSubscription = subscriptionData.status === 'active';
        }
      } catch (stripeError) {
        console.error('Error verifying subscription with Stripe:', stripeError);
        // Fall back to stored status if Stripe check fails
        hasActiveSubscription = subscriptionData.status === 'active';
      }
    } else {
      // No Stripe IDs, check if we have active status in profile
      hasActiveSubscription = subscriptionData?.status === 'active';
    }
    
    return new Response(
      JSON.stringify({
        hasActiveSubscription,
        subscriptionData: profile?.subscription_data || null,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error checking subscription:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
