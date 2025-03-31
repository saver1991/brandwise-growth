
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import RegistrationStepPersonal from "@/components/registration/RegistrationStepPersonal";
import RegistrationStepPlan from "@/components/registration/RegistrationStepPlan";
import RegistrationStepBilling from "@/components/registration/RegistrationStepBilling";
import RegistrationStepConfirmation from "@/components/registration/RegistrationStepConfirmation";
import { RegistrationFormData } from "@/types/registration";

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

  const handleSubmit = () => {
    // This would normally connect to an API
    console.log("Registration submitted:", formData);
    
    toast({
      title: "Registration successful!",
      description: "Thank you for registering with BrandWise.",
    });
    
    // Navigate to home after successful registration
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RegistrationStepPersonal
            data={formData.personal}
            updateData={(data) => updateFormData("personal", data)}
            onNext={handleNextStep}
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
