
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import RegistrationStepPersonal from "@/components/registration/RegistrationStepPersonal";
import RegistrationStepPlan from "@/components/registration/RegistrationStepPlan";
import RegistrationStepBilling from "@/components/registration/RegistrationStepBilling";
import RegistrationStepConfirmation from "@/components/registration/RegistrationStepConfirmation";
import { RegistrationFormData } from "@/types/registration";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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

  // Check if email is already registered
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        }
      });
      
      // If there's no error or error code is not 'user_not_found', 
      // the email exists in the system
      if (!error || (error && error.message !== "User not found")) {
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error checking email:", err);
      return false;
    }
  };

  const handleEmailCheck = async (email: string): Promise<boolean> => {
    setEmailError("");
    const exists = await checkEmailExists(email);
    if (exists) {
      setEmailError("This email is already registered. Please login instead.");
      return false;
    }
    return true;
  };

  const saveUserProfile = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.personal.fullName,
          username: formData.personal.username,
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // First check if email exists
      const emailIsUnique = await handleEmailCheck(formData.personal.email);
      if (!emailIsUnique) {
        setIsSubmitting(false);
        return;
      }
      
      // Register the user with Supabase
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
        return;
      }
      
      // Save additional user data to profiles table
      if (data?.user) {
        await saveUserProfile(data.user.id);
      }
      
      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      });
      
      // Navigate to login after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error?.message || "An unexpected error occurred",
        variant: "destructive",
      });
      setIsSubmitting(false);
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
            onEmailChange={(email) => {
              if (email !== formData.personal.email) {
                setEmailError("");
              }
            }}
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
