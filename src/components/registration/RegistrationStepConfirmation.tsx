
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RegistrationFormData } from "@/types/registration";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { STRIPE_PLANS } from "@/components/account/billing/PlanConfiguration";

interface RegistrationStepConfirmationProps {
  formData: RegistrationFormData;
  onBack: () => void;
  onSubmit: () => Promise<string | null>;
  isSubmitting: boolean;
}

const RegistrationStepConfirmation: React.FC<RegistrationStepConfirmationProps> = ({
  formData,
  onBack,
  onSubmit,
  isSubmitting
}) => {
  const renderSection = (title: string, items: { label: string; value: string }[]) => (
    <div className="mb-6">
      <h3 className="font-medium text-sm text-muted-foreground mb-2">{title}</h3>
      <Card>
        <CardContent className="p-4">
          <dl className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-2">
                <dt className="text-sm font-medium text-muted-foreground">{item.label}</dt>
                <dd className="text-sm">{item.value || "—"}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );

  // Get plan name based on selection
  const getPlanName = () => {
    const planType = formData.plan.selectedPlan;
    const billingCycle = formData.plan.billingCycle;
    return `${planType.charAt(0).toUpperCase() + planType.slice(1)} (${billingCycle})`;
  };

  const handleSubmit = async () => {
    // This now returns the user ID if registration is successful
    const userId = await onSubmit();
    if (userId) {
      // Now we can proceed with payment setup
      console.log("Registration successful, proceeding to payment");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Review Your Information</h2>
      
      {renderSection("Personal Information", [
        { label: "Full Name", value: formData.personal.fullName },
        { label: "Email", value: formData.personal.email },
        { label: "Username", value: formData.personal.username },
        { label: "Company", value: formData.personal.companyName || "Not provided" },
        { label: "Company Size", value: formData.personal.companySize || "Not provided" },
      ])}
      
      {renderSection("Selected Plan", [
        { label: "Plan", value: getPlanName() },
      ])}
      
      {renderSection("Billing Information", [
        { label: "Payment Method", value: formData.billing.paymentMethod === "creditCard" 
          ? "Credit Card" 
          : formData.billing.paymentMethod === "paypal" 
            ? "PayPal" 
            : formData.billing.paymentMethod },
        { label: "Country", value: formData.billing.country },
        { label: "Address", value: formData.billing.address },
        { label: "City", value: formData.billing.city },
        { label: "State/Province", value: formData.billing.state },
        { label: "ZIP/Postal Code", value: formData.billing.zipCode },
      ])}
      
      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Complete Registration
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default RegistrationStepConfirmation;
