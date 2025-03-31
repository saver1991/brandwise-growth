
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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
    const { email, templateName, templateData } = await req.json();
    
    if (!email) {
      throw new Error('Email is required');
    }
    
    if (!templateName) {
      throw new Error('Template name is required');
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );
    
    console.log(`Preparing to send ${templateName} email to ${email}`);
    
    let emailSubject = '';
    let emailContent = '';
    
    // Configure email templates
    switch (templateName) {
      case 'welcome':
        emailSubject = 'Welcome to BrandWise!';
        emailContent = `
          <h1>Welcome to BrandWise!</h1>
          <p>Thank you for signing up for the ${templateData.planName} plan.</p>
          <p>To get started, please visit our onboarding page:</p>
          <p><a href="${templateData.onboardingUrl}">Set up your account</a></p>
        `;
        break;
        
      case 'payment_confirmation':
        emailSubject = 'Payment Confirmation';
        emailContent = `
          <h1>Payment Confirmation</h1>
          <p>We've received your payment of $${templateData.amount} on ${templateData.date}.</p>
          <p>Thank you for your business!</p>
        `;
        break;
        
      default:
        throw new Error(`Unknown email template: ${templateName}`);
    }
    
    console.log(`Email ready to send. Subject: ${emailSubject}`);
    
    // In production, connect to a real email sending service here
    // For now, we'll just log the email details for demonstration
    
    console.log({
      to: email,
      subject: emailSubject,
      html: emailContent,
    });
    
    // Return success response
    return new Response(
      JSON.stringify({ success: true, message: `Email to ${email} processed successfully` }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
