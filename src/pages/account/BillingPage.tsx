
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

const BillingPage = () => {
  const { toast } = useToast();

  const handleUpdateCard = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Payment method updated",
      description: "Your payment method has been updated successfully.",
    });
  };

  const handleChangePlan = () => {
    toast({
      title: "Plan change requested",
      description: "You will be redirected to the plan selection page.",
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
                  <div className="p-4 border rounded-lg bg-green-50/50 border-green-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold">Professional Plan - $29/month</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Your subscription renews on September 30, 2023
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
                <Button onClick={handleChangePlan} variant="outline">Change Plan</Button>
                <Button variant="destructive">Cancel Subscription</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Update your payment information</CardDescription>
              </CardHeader>
              <form onSubmit={handleUpdateCard}>
                <CardContent className="space-y-6">
                  <div className="p-4 border rounded-lg flex items-center gap-4">
                    <CreditCard className="h-10 w-10 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Update Card Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiration Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Update Payment Method</Button>
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
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Invoice #12345</p>
                      <p className="text-sm text-muted-foreground">Aug 1, 2023</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">$29.00</p>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Invoice #12344</p>
                      <p className="text-sm text-muted-foreground">Jul 1, 2023</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">$29.00</p>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Invoice #12343</p>
                      <p className="text-sm text-muted-foreground">Jun 1, 2023</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">$29.00</p>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
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
