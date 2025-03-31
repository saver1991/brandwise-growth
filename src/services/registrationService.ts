import { RegistrationFormData } from "@/types/registration";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { STRIPE_PLANS } from "@/components/account/billing/PlanConfiguration";

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    console.log("Checking if email exists:", email);
    
    // Use signUp with a dummy password to check if the email exists
    // If it returns an error about the email already being in use, the email exists
    const { error } = await supabase.auth.signUp({
      email,
      password: `${crypto.randomUUID()}Aa1!`, // Random secure password that won't be used
      options: {
        emailRedirectTo: window.location.origin
      }
    });
    
    // If the error message indicates the account already exists, return true
    if (error && error.message.toLowerCase().includes('already')) {
      console.log("Email exists:", email);
      return true;
    }
    
    // If there's no error about existing account, the email doesn't exist
    console.log("Email doesn't exist:", email);
    return false;
  } catch (err) {
    console.error("Error checking email:", err);
    // On error, assume email doesn't exist to not block registration flow
    // But we'll show a warning to the user
    toast.warning("Could not verify email uniqueness. If you already have an account, try logging in instead.");
    return false;
  }
};

export const saveUserProfile = async (userId: string, formData: RegistrationFormData) => {
  try {
    console.log("Saving user profile for ID:", userId);
    
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.personal.fullName,
        username: formData.personal.username,
        company_name: formData.personal.companyName,
        company_size: formData.personal.companySize,
        billing_address: {
          country: formData.billing.country,
          address: formData.billing.address,
          city: formData.billing.city,
          state: formData.billing.state,
          zip_code: formData.billing.zipCode
        },
        updated_at: new Date().toISOString()
      })
      .eq("id", userId);
    
    if (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
    
    console.log("User profile saved successfully");
    return { success: true };
  } catch (err) {
    console.error("Error saving profile data:", err);
    throw err;
  }
};

export const createStripeCheckout = async (userId: string, selectedPlan: string, billingCycle: string) => {
  try {
    console.log("Creating Stripe checkout session for plan:", selectedPlan, billingCycle);
    
    // Get the price ID based on selected plan
    let planKey = selectedPlan;
    if (!planKey || !STRIPE_PLANS[planKey]) {
      throw new Error(`Invalid plan selected: ${planKey}`);
    }
    
    const priceId = STRIPE_PLANS[planKey];
    console.log("Using Stripe price ID:", priceId);
    
    // Call our Supabase Edge Function to create a checkout session
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { 
        priceId,
        email: null, // Will be obtained from auth token
        successUrl: `${window.location.origin}/onboarding`, // Direct to onboarding after successful payment
        cancelUrl: `${window.location.origin}/register` // Back to registration if canceled
      }
    });
    
    if (error) {
      console.error("Error invoking create-checkout-session:", error);
      throw new Error(`Failed to create checkout: ${error.message || 'Unknown error'}`);
    }
    
    if (!data?.url) {
      console.error("No checkout URL returned");
      throw new Error('No checkout URL returned from Stripe');
    }
    
    console.log("Redirecting to Stripe checkout:", data.url);
    
    // Redirect the user to the Stripe Checkout page
    window.location.href = data.url;
    
    return data;
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    toast.error("Payment setup failed: " + (error.message || "Please try again"));
    throw error;
  }
};

export const sendWelcomeEmail = async (email: string, planName: string) => {
  try {
    const onboardingUrl = `${window.location.origin}/onboarding`;
    
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: { 
        email,
        templateName: 'welcome',
        templateData: {
          planName,
          onboardingUrl
        }
      }
    });
    
    if (error) {
      console.error("Error sending welcome email:", error);
    }
    
    return { success: !error, data };
  } catch (err) {
    console.error("Error sending welcome email:", err);
    return { success: false, error: err };
  }
};
