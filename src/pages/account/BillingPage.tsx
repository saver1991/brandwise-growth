
import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import AccountSidebar from "@/components/account/AccountSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import CurrentPlanCard from "@/components/account/billing/CurrentPlanCard";
import PaymentMethodForm from "@/components/account/billing/PaymentMethodForm";
import InvoiceHistory from "@/components/account/billing/InvoiceHistory";

type Subscription = {
  plan: string;
  price: string;
  renewal_date: string;
  status: "active" | "canceled" | "past_due";
  payment_method: {
    type: "card";
    last4: string;
    expiry: string;
  } | null;
};

type Invoice = {
  id: string;
  date: string;
  amount: string;
};

const BillingPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState<Subscription>({
    plan: "Professional Plan",
    price: "$29/month",
    renewal_date: "September 30, 2023",
    status: "active",
    payment_method: {
      type: "card",
      last4: "4242",
      expiry: "12/2025"
    }
  });
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: "12345", date: "Aug 1, 2023", amount: "$29.00" },
    { id: "12344", date: "Jul 1, 2023", amount: "$29.00" },
    { id: "12343", date: "Jun 1, 2023", amount: "$29.00" }
  ]);

  useEffect(() => {
    async function getBillingInfo() {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // In a real app, you would fetch subscription data from your billing system
        // via a Supabase edge function or another backend service
        
        // For demonstration purposes, we'll just check if the user has any subscription data
        const { data, error } = await supabase
          .from("profiles")
          .select("subscription_data")
          .eq("id", user.id)
          .single();
          
        if (error) {
          console.error("Error fetching subscription data:", error);
          return;
        }
        
        // If we have subscription data in the profile, use it
        if (data && data.subscription_data) {
          setSubscription(data.subscription_data as Subscription);
        }
        
        // In a real app, you'd fetch invoices from your billing system
        // This is just placeholder data
        
      } catch (error: any) {
        console.error("Error loading billing information: ", error);
        toast({
          title: "Error loading billing information",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    getBillingInfo();
  }, [user, toast]);

  const updatePaymentMethod = (newPaymentMethod: Subscription["payment_method"]) => {
    setSubscription({
      ...subscription,
      payment_method: newPaymentMethod
    });
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
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription plan</CardDescription>
              </CardHeader>
              <CardContent>
                <CurrentPlanCard 
                  subscription={subscription} 
                  isLoading={isLoading} 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Update your payment information</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentMethodForm 
                  userId={user?.id}
                  paymentMethod={subscription.payment_method}
                  onUpdate={updatePaymentMethod}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <InvoiceHistory 
                  invoices={invoices} 
                  isLoading={isLoading} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingPage;
