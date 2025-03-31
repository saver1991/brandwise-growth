
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
    console.log('Invoice history request received');
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Get the user from the request
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    
    console.log('Authenticating user with token');
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      console.error('Authentication error:', userError);
      throw new Error('Unauthorized');
    }
    
    const userId = userData.user.id;
    console.log(`User authenticated: ${userId}`);

    // Get user's subscription data from Supabase
    console.log('Fetching profile data');
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('subscription_data, email')
      .eq('id', userId)
      .single();
      
    if (profileError) {
      console.error('Error fetching profile:', profileError);
      throw new Error('Failed to fetch subscription data');
    }
    
    // If there's no subscription data or customer ID, return empty invoices
    if (!profile?.subscription_data?.stripe_customer_id) {
      console.log('No subscription data found, returning empty invoices');
      return new Response(
        JSON.stringify({ 
          invoices: []
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }
    
    const customerId = profile.subscription_data.stripe_customer_id;
    console.log(`Found Stripe customer ID: ${customerId}`);
    
    // Initialize Stripe to fetch invoice history
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });
    
    // Get invoices for the customer
    console.log('Fetching invoices from Stripe');
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 10, // Limit to the 10 most recent invoices
    });
    
    console.log(`Found ${invoices.data.length} invoices`);
    
    // Transform invoice data for the frontend
    const invoiceData = invoices.data.map(invoice => ({
      id: invoice.id,
      date: invoice.created, // Unix timestamp
      amount: `$${(invoice.total / 100).toFixed(2)}`,
      status: invoice.status,
      pdf: invoice.invoice_pdf,
    }));
    
    return new Response(
      JSON.stringify({ 
        invoices: invoiceData
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching invoice history:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
