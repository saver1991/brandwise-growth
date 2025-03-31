
import { useState } from "react";
import { RegistrationFormData } from "@/types/registration";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { checkEmailExists, saveUserProfile, createStripeCheckout, sendWelcomeEmail } from "@/services/registrationService";
import { toast } from "sonner";

const initialFormData: RegistrationFormData = {
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
};

export const useRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const { toast: hookToast } = useToast();
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

  const validateEmail = async (email: string): Promise<boolean> => {
    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setEmailError("This email is already registered. Please login instead.");
        return false;
      }
      setEmailError("");
      return true;
    } catch (err) {
      console.error("Error validating email:", err);
      setEmailError("Failed to validate email. Please try again.");
      return false;
    }
  };

  const handleEmailChange = (email: string): void => {
    // Clear error when email changes
    if (email !== formData.personal.email) {
      setEmailError("");
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      console.log("Starting registration process");
      
      // Validate email one more time before submission
      const isEmailUnique = await validateEmail(formData.personal.email);
      if (!isEmailUnique) {
        setIsSubmitting(false);
        return null;
      }
      
      console.log("Email validation passed, creating user account");
      
      // Sign up the user
      const { data, error } = await signUp(
        formData.personal.email, 
        formData.personal.password,
        { 
          full_name: formData.personal.fullName 
        }
      );
      
      if (error) {
        console.error("Registration error:", error);
        toast.error("Registration failed: " + (error.message || "Something went wrong"));
        setIsSubmitting(false);
        return null;
      }
      
      if (!data?.user) {
        console.error("Registration error: No user data returned");
        toast.error("Registration failed: Unable to create account");
        setIsSubmitting(false);
        return null;
      }
      
      console.log("User created successfully, saving profile data", data.user);
      
      // Save additional user profile information
      try {
        await saveUserProfile(data.user.id, formData);
        console.log("Profile data saved successfully");
      } catch (profileError) {
        console.error("Error saving profile:", profileError);
        toast.error("Warning: Some profile data couldn't be saved");
        // Continue to payment even if profile save fails
      }
      
      // Send welcome email (don't await this, let it happen in the background)
      sendWelcomeEmail(formData.personal.email, formData.plan.selectedPlan)
        .then(() => console.log("Welcome email sent"))
        .catch(err => console.error("Error sending welcome email:", err));
      
      console.log("Proceeding to Stripe checkout");
      
      // Proceed to Stripe checkout
      try {
        await createStripeCheckout(
          data.user.id, 
          formData.plan.selectedPlan, 
          formData.plan.billingCycle
        );
        // No need to handle the redirect here as it's done in createStripeCheckout
      } catch (stripeError) {
        console.error("Error creating Stripe checkout:", stripeError);
        toast.error("Payment setup failed. Please try again or contact support.");
        // Still return the user ID, as account was created
      }
      
      return data.user.id;
    } catch (error: any) {
      console.error("Registration process error:", error);
      toast.error(error?.message || "An unexpected error occurred");
      setIsSubmitting(false);
      return null;
    }
  };

  return {
    currentStep,
    formData,
    isSubmitting,
    emailError,
    updateFormData,
    handleNextStep,
    handlePrevStep,
    handleEmailChange,
    validateEmail,
    handleSubmit,
  };
};
