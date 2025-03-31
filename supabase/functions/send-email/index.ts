
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    const { type, email, data } = await req.json();
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { auth: { persistSession: false } }
    );
    
    let emailContent = {};
    let subject = '';
    
    // Generate email content based on type
    switch (type) {
      case 'welcome':
        subject = 'Welcome to BrandWise!';
        emailContent = generateWelcomeEmail(data.name, data.plan);
        break;
        
      case 'payment_confirmation':
        subject = 'Payment Confirmation';
        emailContent = generatePaymentConfirmationEmail(data.name, data.amount, data.date);
        break;
        
      default:
        throw new Error(`Unsupported email type: ${type}`);
    }
    
    // In a production environment, you would connect this to a real email service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend
    // For now, we'll just log the email details
    
    console.log('Would send email with the following details:');
    console.log('To:', email);
    console.log('Subject:', subject);
    console.log('Content:', emailContent);
    
    return new Response(
      JSON.stringify({ success: true, message: 'Email would be sent in production' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
    
  } catch (error) {
    console.error('Error in send-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});

function generateWelcomeEmail(name, plan) {
  return {
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Welcome to BrandWise, ${name}!</h1>
        <p>Thank you for subscribing to the ${plan} plan. We're excited to have you on board!</p>
        <p>Here's what you can do now:</p>
        <ul>
          <li>Complete your profile</li>
          <li>Connect your social media accounts</li>
          <li>Begin creating content</li>
        </ul>
        <p>If you have any questions, simply reply to this email. We're here to help!</p>
        <p>Best regards,<br>The BrandWise Team</p>
      </div>
    `,
    text: `Welcome to BrandWise, ${name}! Thank you for subscribing to the ${plan} plan. We're excited to have you on board!`
  };
}

function generatePaymentConfirmationEmail(name, amount, date) {
  return {
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Payment Confirmation</h1>
        <p>Dear ${name},</p>
        <p>We've received your payment of $${amount} on ${date}. Thank you!</p>
        <p>Your subscription is now active, and you have full access to all the features of your plan.</p>
        <p>If you have any questions about your payment or subscription, please contact our support team.</p>
        <p>Best regards,<br>The BrandWise Team</p>
      </div>
    `,
    text: `Payment Confirmation. Dear ${name}, We've received your payment of $${amount} on ${date}. Thank you! Your subscription is now active.`
  };
}
