
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useSubscription, SubscriptionData } from "@/hooks/useSubscription";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { STRIPE_PLANS, PLAN_FEATURES } from "./PlanConfiguration";

interface CurrentPlanCardProps {
  subscription: SubscriptionData | null;
  isLoading: boolean;
}

const CurrentPlanCard = ({ subscription, isLoading }: CurrentPlanCardProps) => {
  const { createCheckoutSession } = useSubscription();
  
  const handleChangePlan = () => {
    toast.info("Select a new plan to upgrade or downgrade");
  };

  const handleSubscribe = (priceId: string) => {
    createCheckoutSession(priceId);
  };

  const getStatusColor = (status: string | null) => {
    switch(status) {
      case "active":
        return "bg-green-50/50 border-green-100";
      case "past_due":
        return "bg-amber-50/50 border-amber-100";
      case "canceled":
        return "bg-red-50/50 border-red-100";
      default:
        return "bg-gray-50/50 border-gray-100";
    }
  };
  
  // Helper function to render a plan card
  const renderPlanCard = (planKey: keyof typeof STRIPE_PLANS) => {
    const plan = PLAN_FEATURES[planKey];
    const isProfessional = planKey === 'professional';
    
    return (
      <Card className={`p-4 ${isProfessional ? 'border-2 border-primary' : 'border'} hover:${isProfessional ? 'shadow-md' : 'border-primary hover:shadow-sm'} cursor-pointer`}>
        <h3 className="font-bold">{plan.name}</h3>
        <p className="font-semibold text-xl my-2">{plan.price}</p>
        <ul className="text-sm space-y-1 mb-4">
          {plan.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
        <Button 
          onClick={() => handleSubscribe(STRIPE_PLANS[planKey])}
          size="sm"
          className="w-full"
        >
          Select {plan.name}
        </Button>
      </Card>
    );
  };
  
  return (
    <div className="space-y-4">
      {subscription ? (
        <>
          <div className={`p-4 border rounded-lg ${getStatusColor(subscription.status)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {subscription.status === "active" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : subscription.status === "past_due" ? (
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <h3 className="font-semibold">{subscription.plan} - {subscription.price}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {subscription.status === "active" ? (
                      <>Your subscription renews on {subscription.renewal_date}</>
                    ) : subscription.status === "canceled" ? (
                      <>Your subscription has been canceled</>
                    ) : (
                      <>There's an issue with your subscription</>
                    )}
                  </p>
                </div>
              </div>
              
              <Badge variant={subscription.status === "active" ? "default" : "destructive"}>
                {subscription.status}
              </Badge>
            </div>
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
        </>
      ) : (
        <div className="p-6 border rounded-lg bg-muted/30 text-center space-y-4">
          <h3 className="text-xl font-medium">No Active Subscription</h3>
          <p className="text-muted-foreground">Subscribe to a plan to access premium features</p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        {subscription && subscription.status === "active" ? (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  onClick={handleChangePlan} 
                  variant="outline" 
                  disabled={isLoading}
                >
                  Change Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Choose a Plan</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                  {renderPlanCard('basic')}
                  {renderPlanCard('professional')}
                  {renderPlanCard('enterprise')}
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="destructive" 
              disabled={isLoading || subscription.status !== "active"}
              onClick={() => toast.error("Please contact support to cancel your subscription")}
            >
              Cancel Subscription
            </Button>
          </>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button disabled={isLoading}>
                Subscribe Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Choose a Plan</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                {renderPlanCard('basic')}
                {renderPlanCard('professional')}
                {renderPlanCard('enterprise')}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default CurrentPlanCard;
