
import React from "react";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import RegistrationStepPersonal from "@/components/registration/RegistrationStepPersonal";
import RegistrationStepPlan from "@/components/registration/RegistrationStepPlan";
import RegistrationStepBilling from "@/components/registration/RegistrationStepBilling";
import RegistrationStepConfirmation from "@/components/registration/RegistrationStepConfirmation";
import { useRegistration } from "@/hooks/useRegistration";
import RegistrationProgress from "@/components/registration/RegistrationProgress";

const Register = () => {
  const {
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
  } = useRegistration();

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
            checkEmailExists={validateEmail}
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
              
              <RegistrationProgress currentStep={currentStep} />
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
