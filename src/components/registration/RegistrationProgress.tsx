
import React from "react";

interface RegistrationProgressProps {
  currentStep: number;
}

const RegistrationProgress: React.FC<RegistrationProgressProps> = ({ currentStep }) => {
  return (
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
  );
};

export default RegistrationProgress;
