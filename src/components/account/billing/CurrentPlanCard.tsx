
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Subscription {
  plan: string;
  price: string;
  renewal_date: string;
  status: "active" | "canceled" | "past_due";
  payment_method: {
    type: "card";
    last4: string;
    expiry: string;
  } | null;
}

interface CurrentPlanCardProps {
  subscription: Subscription;
  isLoading: boolean;
}

const CurrentPlanCard = ({ subscription, isLoading }: CurrentPlanCardProps) => {
  const { toast } = useToast();
  
  const handleChangePlan = () => {
    toast({
      title: "Plan change requested",
      description: "You will be redirected to the plan selection page.",
    });
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Subscription cancellation",
      description: "Please contact support to cancel your subscription.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className={`p-4 border rounded-lg ${
        subscription.status === "active" 
          ? "bg-green-50/50 border-green-100" 
          : "bg-red-50/50 border-red-100"
      }`}>
        <div className="flex items-center gap-2">
          {subscription.status === "active" ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          <h3 className="font-semibold">{subscription.plan} - {subscription.price}</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Your subscription renews on {subscription.renewal_date}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <p className="font-medium">10,000</p>
          <p className="text-sm text-muted-foreground">Monthly Word Count</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="font-medium">20</p>
          <p className="text-sm text-muted-foreground">Content Optimizations</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="font-medium">3</p>
          <p className="text-sm text-muted-foreground">Team Members</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <Button 
          onClick={handleChangePlan} 
          variant="outline" 
          disabled={isLoading}
        >
          Change Plan
        </Button>
        <Button 
          variant="destructive" 
          onClick={handleCancelSubscription}
          disabled={isLoading}
        >
          Cancel Subscription
        </Button>
      </div>
    </div>
  );
};

export default CurrentPlanCard;
