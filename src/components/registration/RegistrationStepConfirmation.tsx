
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationFormData } from "@/types/registration";
import { CheckCircle2, ArrowLeft } from "lucide-react";

interface RegistrationStepConfirmationProps {
  formData: RegistrationFormData;
  onBack: () => void;
  onSubmit: () => void;
}

const RegistrationStepConfirmation: React.FC<RegistrationStepConfirmationProps> = ({
  formData,
  onBack,
  onSubmit,
}) => {
  const getPlanPrice = (plan: string, cycle: string) => {
    const prices = {
      starter: { monthly: "$9.99", yearly: "$7.99" },
      professional: { monthly: "$19.99", yearly: "$16.99" },
      enterprise: { monthly: "$29.99", yearly: "$24.99" },
    };
    return prices[plan as keyof typeof prices][cycle as keyof typeof prices["starter"]];
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Review Your Information</h2>
        <p className="text-muted-foreground">Please review your information before completing registration</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="size-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </span>
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Full Name</dt>
                <dd>{formData.personal.fullName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd>{formData.personal.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Username</dt>
                <dd>{formData.personal.username}</dd>
              </div>
              {formData.personal.companyName && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Company</dt>
                  <dd>{formData.personal.companyName}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="size-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </span>
              Plan Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Selected Plan</dt>
                <dd className="capitalize">{formData.plan.selectedPlan}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Billing Cycle</dt>
                <dd className="capitalize">{formData.plan.billingCycle}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Price</dt>
                <dd>
                  {getPlanPrice(formData.plan.selectedPlan, formData.plan.billingCycle)}
                  <span className="text-sm text-muted-foreground">
                    {formData.plan.billingCycle === "monthly" ? "/month" : "/month, billed yearly"}
                  </span>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="size-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </span>
              Billing Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Payment Method</dt>
                <dd>{capitalize(formData.billing.paymentMethod.replace(/([A-Z])/g, ' $1').trim())}</dd>
              </div>
              
              {formData.billing.paymentMethod === "creditCard" && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Card Number</dt>
                  <dd>
                    •••• •••• •••• 
                    {formData.billing.cardNumber.slice(-4)}
                  </dd>
                </div>
              )}
              
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-muted-foreground">Billing Address</dt>
                <dd>
                  {formData.billing.address}, {formData.billing.city}, {formData.billing.state} {formData.billing.zipCode}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground mb-6">
          By clicking "Complete Registration", you agree to our Terms of Service and Privacy Policy. This is a demo application, so no actual charges will be made.
        </p>
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button 
            type="button" 
            onClick={onSubmit}
            // Disabled because this is a dummy registration
            disabled
          >
            Complete Registration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationStepConfirmation;
