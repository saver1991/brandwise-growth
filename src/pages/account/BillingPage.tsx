
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import AccountSidebar from "@/components/account/AccountSidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

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
          
        if (error && error.code !== "PGRST116") {
          throw error;
        }
        
        if (data && data.subscription_data) {
          // If we have subscription data in the profile, use it
          setSubscription(data.subscription_data);
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

  const handleUpdateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // In a real app, you would send this data to your payment processor
      // via a Supabase edge function or another backend service
      
      // Here we'll just simulate a successful update
      
      // Update the payment method in our local state
      setSubscription({
        ...subscription,
        payment_method: {
          type: "card",
          last4: cardNumber.slice(-4),
          expiry: cardExpiry
        }
      });
      
      toast({
        title: "Payment method updated",
        description: "Your payment method has been updated successfully.",
      });
      
      // Clear the form
      setCardName("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
      
    } catch (error: any) {
      console.error("Error updating payment method: ", error);
      toast({
        title: "Error updating payment method",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
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
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Update your payment information</CardDescription>
              </CardHeader>
              <form onSubmit={handleUpdateCard}>
                <CardContent className="space-y-6">
                  {subscription.payment_method ? (
                    <div className="p-4 border rounded-lg flex items-center gap-4">
                      <CreditCard className="h-10 w-10 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Visa ending in {subscription.payment_method.last4}</p>
                        <p className="text-sm text-muted-foreground">Expires {subscription.payment_method.expiry}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border rounded-lg bg-amber-50/50 border-amber-100">
                      <p className="text-amber-600">No payment method on file</p>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Update Card Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input 
                        id="cardName" 
                        placeholder="John Doe" 
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="4242 4242 4242 4242" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiration Date</Label>
                        <Input 
                          id="expiry" 
                          placeholder="MM/YY" 
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input 
                          id="cvc" 
                          placeholder="123" 
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update Payment Method"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice, index) => (
                    <React.Fragment key={invoice.id}>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Invoice #{invoice.id}</p>
                          <p className="text-sm text-muted-foreground">{invoice.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-medium">{invoice.amount}</p>
                          <Button variant="outline" size="sm" disabled={isLoading}>Download</Button>
                        </div>
                      </div>
                      {index < invoices.length - 1 && <Separator />}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingPage;
