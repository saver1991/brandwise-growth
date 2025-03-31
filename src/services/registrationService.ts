
import { RegistrationFormData } from "@/types/registration";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { STRIPE_PLANS } from "@/components/account/billing/PlanConfiguration";

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    console.log("Checking if email exists:", email);
    
    // First try to get user by email to check if it exists
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      }
    });
    
    console.log("Check email response:", { data, error });
    
    // If there's an error with message containing "User not found", 
    // then the email doesn't exist in the system
    if (error && error.message.includes("User not found")) {
      return false; // Email doesn't exist, good for registration
    }
    
    // If we don't get a "User not found" error, 
    // then the email already exists in the system
    return true; // Email exists, can't use for registration
  } catch (err) {
    console.error("Error checking email:", err);
    // On error, assume email doesn't exist to not block registration flow
    return false;
  }
};

export const saveUserProfile = async (userId: string, formData: RegistrationFormData) => {
  try {
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
    
    return { success: true };
  } catch (err) {
    console.error("Error saving profile data:", err);
    throw err;
  }
};

export const createStripeCheckout = async (userId: string, selectedPlan: string, billingCycle: string) => {
  try {
    // Determine which price ID to use based on plan and billing cycle
    const planKey = selectedPlan;
    
    // Get the price ID from our configuration
    const priceId = STRIPE_PLANS[planKey];
    
    if (!priceId) {
      throw new Error(`No price ID found for plan: ${planKey}`);
    }
    
    // Call our Supabase Edge Function to create a checkout session
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { 
        priceId,
        successUrl: `${window.location.origin}/onboarding` // Direct to onboarding after successful payment
      }
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    if (!data?.url) {
      throw new Error('No checkout URL returned');
    }
    
    // Redirect the user to the Stripe Checkout page
    window.location.href = data.url;
    
    return data;
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
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
