
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { RegistrationFormData } from "@/types/registration";
import ProfileFormActions from "@/components/ProfileFormActions";

interface RegistrationStepConfirmationProps {
  formData: RegistrationFormData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const RegistrationStepConfirmation: React.FC<RegistrationStepConfirmationProps> = ({ 
  formData, 
  onBack, 
  onSubmit,
  isSubmitting = false
}) => {
  const { personal, plan, billing } = formData;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Review Your Information</h2>
        <p className="text-sm text-muted-foreground">
          Please review your information before completing your registration
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Personal Information</h3>
              </div>
              <Button variant="ghost" size="sm" type="button" onClick={onBack}>
                Edit
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Full Name</div>
                <div>{personal.fullName}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Email</div>
                <div>{personal.email}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Username</div>
                <div>{personal.username}</div>
              </div>
              {personal.companyName && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Company</div>
                  <div>{personal.companyName}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Plan Selection</h3>
              </div>
              <Button variant="ghost" size="sm" type="button" onClick={onBack}>
                Edit
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-md bg-muted/50">
              <div className="space-y-1">
                <div className="font-medium capitalize">{plan.selectedPlan} Plan</div>
                <div className="text-sm text-muted-foreground capitalize">
                  Billed {plan.billingCycle}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {plan.billingCycle === "monthly" ? "$29" : "$290"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {plan.billingCycle === "monthly" ? "per month" : "per year"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Payment Method</h3>
              </div>
              <Button variant="ghost" size="sm" type="button" onClick={onBack}>
                Edit
              </Button>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gray-100 p-1 rounded">
                {billing.paymentMethod === "creditCard" ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                    <path d="M7 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M15 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 14V6C19 4.89543 18.1046 4 17 4H7C5.89543 4 5 4.89543 5 6V14" stroke="currentColor" strokeWidth="2" />
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                    <rect x="3" y="10" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                    <circle cx="7.5" cy="14.5" r="1.5" fill="currentColor" />
                    <circle cx="16.5" cy="14.5" r="1.5" fill="currentColor" />
                  </svg>
                )}
              </div>
              <div>
                {billing.paymentMethod === "creditCard" ? (
                  <div className="flex flex-col">
                    <span className="font-medium">Credit Card</span>
                    <span className="text-sm text-muted-foreground">
                      **** {billing.cardNumber.slice(-4)}
                    </span>
                  </div>
                ) : (
                  <span className="font-medium">PayPal</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-md p-4 bg-green-50 dark:bg-green-950/20 flex items-start gap-3">
        <div className="mt-0.5">
          <div className="bg-green-100 dark:bg-green-900/50 p-1 rounded-full">
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="text-sm">
          <p className="font-medium text-green-800 dark:text-green-400">
            Ready to complete registration
          </p>
          <p className="text-green-700 dark:text-green-500 opacity-90 mt-1">
            By clicking "Complete Registration", you agree to our{" "}
            <a href="/terms" className="underline hover:text-green-800">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="underline hover:text-green-800">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      <ProfileFormActions
        onBack={onBack}
        isLastStep={true}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default RegistrationStepConfirmation;
