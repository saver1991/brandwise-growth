
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import AccountSidebar from "@/components/account/AccountSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import CurrentPlanCard from "@/components/account/billing/CurrentPlanCard";
import PaymentMethodForm from "@/components/account/billing/PaymentMethodForm";
import InvoiceHistory from "@/components/account/billing/InvoiceHistory";
import { useSubscription } from "@/hooks/useSubscription";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const BillingPage = () => {
  const { user } = useAuth();
  const { 
    subscription, 
    isLoading, 
    error, 
    refreshSubscription 
  } = useSubscription();

  // Sample invoice data - in a real app, these would come from Stripe
  const invoices = [
    { id: "12345", date: "Aug 1, 2023", amount: "$29.00" },
    { id: "12344", date: "Jul 1, 2023", amount: "$29.00" },
    { id: "12343", date: "Jun 1, 2023", amount: "$29.00" }
  ];

  useEffect(() => {
    // Check URL parameters for success/canceled message from Stripe
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('success') === 'true') {
      toast.success('Subscription updated successfully');
      refreshSubscription();
      // Remove the query parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlParams.get('canceled') === 'true') {
      toast.error('Subscription update was canceled');
      // Remove the query parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [refreshSubscription]);

  const updatePaymentMethod = (newPaymentMethod: { type: "card"; last4: string; expiry: string }) => {
    // In a real application, this would interact with the Stripe API
    // and update the payment method server-side
    refreshSubscription();
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <AccountSidebar activeItem="billing" />
          </div>
          
          <div className="md:w-3/4 space-y-8">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was a problem loading your billing information. Please try again later.
                </AlertDescription>
              </Alert>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription plan</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-20 w-full rounded" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Skeleton className="h-16 w-full rounded" />
                      <Skeleton className="h-16 w-full rounded" />
                      <Skeleton className="h-16 w-full rounded" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-10 w-28 rounded" />
                      <Skeleton className="h-10 w-28 rounded" />
                    </div>
                  </div>
                ) : (
                  <CurrentPlanCard 
                    subscription={subscription} 
                    isLoading={isLoading} 
                  />
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Update your payment information</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-full rounded" />
                    <Skeleton className="h-40 w-full rounded" />
                  </div>
                ) : (
                  <PaymentMethodForm 
                    userId={user?.id}
                    paymentMethod={subscription?.payment_method}
                    onUpdate={updatePaymentMethod}
                    subscriptionId={subscription?.stripe_subscription_id}
                  />
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between py-2">
                        <div>
                          <Skeleton className="h-5 w-36 rounded mb-1" />
                          <Skeleton className="h-4 w-24 rounded" />
                        </div>
                        <div className="flex items-center gap-4">
                          <Skeleton className="h-5 w-16 rounded" />
                          <Skeleton className="h-8 w-24 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <InvoiceHistory 
                    invoices={invoices} 
                    isLoading={isLoading} 
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingPage;
