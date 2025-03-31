
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";
import RegistrationStepPersonal from "@/components/registration/RegistrationStepPersonal";
import RegistrationStepPlan from "@/components/registration/RegistrationStepPlan";
import RegistrationStepBilling from "@/components/registration/RegistrationStepBilling";
import RegistrationStepConfirmation from "@/components/registration/RegistrationStepConfirmation";
import { RegistrationFormData } from "@/types/registration";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { STRIPE_PLANS } from "@/components/account/billing/PlanConfiguration";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>({
    personal: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      companyName: "",
      companySize: "",
    },
    plan: {
      selectedPlan: "professional",
      billingCycle: "monthly",
    },
    billing: {
      paymentMethod: "creditCard",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      country: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const updateFormData = (
    section: keyof RegistrationFormData,
    data: Partial<RegistrationFormData[keyof RegistrationFormData]>
  ) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        ...data,
      },
    });
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      console.log("Checking if email exists:", email);
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        }
      });
      
      console.log("Check email response:", { data, error });
      
      // If there's no error or the error is not "User not found",
      // then the email already exists
      if (!error || (error && error.message !== "User not found")) {
        console.log("Email exists, showing error");
        setEmailError("This email is already registered. Please login instead.");
        return true;
      }
      
      // Clear any existing email error
      setEmailError("");
      return false;
    } catch (err) {
      console.error("Error checking email:", err);
      return false;
    }
  };

  const handleEmailChange = (email: string): void => {
    // Clear error when email changes
    if (email !== formData.personal.email) {
      setEmailError("");
    }
  };

  const saveUserProfile = async (userId: string) => {
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
      }
    } catch (err) {
      console.error("Error saving profile data:", err);
    }
  };

  // Create a checkout session with Stripe
  const createStripeCheckout = async (userId: string) => {
    try {
      // Determine which price ID to use based on plan and billing cycle
      const planKey = formData.plan.selectedPlan;
      
      // Get the price ID from our configuration
      const priceId = STRIPE_PLANS[planKey];
      
      if (!priceId) {
        throw new Error(`No price ID found for plan: ${planKey}`);
      }
      
      // Call our Supabase Edge Function to create a checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { priceId }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data?.url) {
        throw new Error('No checkout URL returned');
      }
      
      // Redirect the user to the Stripe Checkout page
      window.location.href = data.url;
      
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Payment setup failed",
        description: error.message || "Could not set up payment. Please try again later.",
        variant: "destructive",
      });
      
      // Navigate to dashboard anyway so they're not stuck
      navigate("/dashboard");
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const emailIsUnique = await checkEmailExists(formData.personal.email);
      if (emailIsUnique) {
        setIsSubmitting(false);
        return;
      }
      
      const { data, error } = await signUp(
        formData.personal.email, 
        formData.personal.password,
        { 
          full_name: formData.personal.fullName 
        }
      );
      
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message || "Something went wrong during registration",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return null;
      }
      
      if (data?.user) {
        await saveUserProfile(data.user.id);
        
        toast({
          title: "Account created successfully!",
          description: "Redirecting to payment...",
        });
        
        // Proceed to Stripe checkout
        await createStripeCheckout(data.user.id);
        return data.user.id;
      }
      
      return null;
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error?.message || "An unexpected error occurred",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return null;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RegistrationStepPersonal
            data={formData.personal}
            updateData={(data) => updateFormData("personal", data)}
            onNext={handleNextStep}
            emailError={emailError}
            onEmailChange={handleEmailChange}
            checkEmailExists={checkEmailExists}
          />
        );
      case 2:
        return (
          <RegistrationStepPlan
            data={formData.plan}
            updateData={(data) => updateFormData("plan", data)}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 3:
        return (
          <RegistrationStepBilling
            data={formData.billing}
            updateData={(data) => updateFormData("billing", data)}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 4:
        return (
          <RegistrationStepConfirmation
            formData={formData}
            onBack={handlePrevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />

      <div className="flex-1 flex justify-center items-center p-4 bg-muted/30">
        <div className="w-full max-w-3xl">
          <div className="bg-background rounded-lg shadow-md p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">Create Your BrandWise Account</h1>
              <p className="text-muted-foreground text-center mb-6">Join thousands of professionals growing their online presence</p>
              
              <div className="flex justify-between items-center max-w-md mx-auto mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          currentStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step}
                      </div>
                      <span className="text-xs mt-1 hidden sm:block">
                        {step === 1 && "Personal"}
                        {step === 2 && "Plan"}
                        {step === 3 && "Billing"}
                        {step === 4 && "Review"}
                      </span>
                    </div>
                    {step < 4 && (
                      <div 
                        className={`w-full h-1 max-w-[50px] ${
                          currentStep > step ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            {renderStep()}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
