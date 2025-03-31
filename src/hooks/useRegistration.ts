
import { useState } from "react";
import { RegistrationFormData } from "@/types/registration";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { checkEmailExists, saveUserProfile, createStripeCheckout } from "@/services/registrationService";

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
      // Validate email one more time before submission
      const isEmailUnique = !(await checkEmailExists(formData.personal.email));
      if (!isEmailUnique) {
        setEmailError("This email is already registered. Please login instead.");
        setIsSubmitting(false);
        return null;
      }
      
      // Sign up the user
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
        await saveUserProfile(data.user.id, formData);
        
        toast({
          title: "Account created successfully!",
          description: "Redirecting to payment...",
        });
        
        // Proceed to Stripe checkout
        await createStripeCheckout(data.user.id, formData.plan.selectedPlan, formData.plan.billingCycle);
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
