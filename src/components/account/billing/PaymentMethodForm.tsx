
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type PaymentMethod = {
  type: "card";
  last4: string;
  expiry: string;
  brand?: string;
};

interface PaymentMethodFormProps {
  userId: string | undefined;
  paymentMethod: PaymentMethod | null;
  onUpdate: (newPaymentMethod: PaymentMethod) => void;
  subscriptionId?: string;
}

const PaymentMethodForm = ({ userId, paymentMethod, onUpdate, subscriptionId }: PaymentMethodFormProps) => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isManagingOnStripe, setIsManagingOnStripe] = useState(false);

  useEffect(() => {
    // Check URL parameters for success/canceled message from Stripe
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('payment_success') === 'true') {
      toast.success('Payment method updated successfully');
      // Remove the query parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlParams.get('payment_canceled') === 'true') {
      toast.error('Payment method update was canceled');
      // Remove the query parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const managePaymentOnStripe = async () => {
    if (!userId || !subscriptionId) {
      toast.error("Missing user or subscription information");
      return;
    }
    
    try {
      setIsManagingOnStripe(true);
      
      // Call Supabase edge function to create customer portal session
      const { data, error } = await supabase.functions.invoke('create-customer-portal', {
        body: { 
          return_url: window.location.origin + '/account/billing?payment_success=true'
        }
      });
      
      if (error) throw new Error(error.message);
      
      if (data?.url) {
        // Redirect to Stripe Customer Portal
        window.location.href = data.url;
      } else {
        throw new Error('No portal URL returned');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast.error('Failed to open payment management portal');
    } finally {
      setIsManagingOnStripe(false);
    }
  };

  const handleUpdateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error("You must be logged in");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // For demo purposes, create a mock payment method
      const newPaymentMethod: PaymentMethod = {
        type: "card",
        last4: cardNumber.slice(-4),
        expiry: cardExpiry,
        brand: cardNumber.startsWith('4') ? 'visa' : 
               cardNumber.startsWith('5') ? 'mastercard' : 'unknown'
      };
      
      // In a real implementation, we would call the Stripe API or our backend
      // to update the payment method
      
      // Update the payment method via callback
      onUpdate(newPaymentMethod);
      
      // Update the payment method information in user profile
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_data: {
            ...JSON.parse(JSON.stringify(await supabase.from('profiles').select('subscription_data').eq('id', userId).single().then(res => res.data?.subscription_data))),
            payment_method: newPaymentMethod
          }
        })
        .eq('id', userId);

      if (error) throw error;
      
      toast.success('Payment method updated successfully');
      
      // Clear the form
      setCardName("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
      
    } catch (error: any) {
      console.error("Error updating payment method: ", error);
      toast.error(error.message || 'Failed to update payment method');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {paymentMethod ? (
        <div className="p-4 border rounded-lg flex items-center gap-4">
          <CreditCard className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="font-medium">
              {paymentMethod.brand ? `${paymentMethod.brand.charAt(0).toUpperCase() + paymentMethod.brand.slice(1)}` : 'Card'} ending in {paymentMethod.last4}
            </p>
            <p className="text-sm text-muted-foreground">Expires {paymentMethod.expiry}</p>
          </div>
        </div>
      ) : (
        <div className="p-4 border rounded-lg bg-amber-50/50 border-amber-100">
          <p className="text-amber-600">No payment method on file</p>
        </div>
      )}
      
      {subscriptionId && (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={managePaymentOnStripe}
          disabled={isManagingOnStripe}
        >
          {isManagingOnStripe ? "Opening Stripe..." : "Manage Payment Method on Stripe"}
        </Button>
      )}
      
      <Separator />
      
      <form onSubmit={handleUpdateCard} className="space-y-4">
        <h3 className="font-medium">Update Card Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="cardName">Name on Card</Label>
          <Input 
            id="cardName" 
            placeholder="John Doe" 
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input 
            id="cardNumber" 
            placeholder="4242 4242 4242 4242" 
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
            disabled={isLoading}
            required
            minLength={16}
            maxLength={16}
            pattern="[0-9]{16}"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiration Date</Label>
            <Input 
              id="expiry" 
              placeholder="MM/YY" 
              value={cardExpiry}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d]/g, '');
                
                if (value.length <= 2) {
                  setCardExpiry(value);
                } else if (value.length <= 4) {
                  setCardExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
                }
              }}
              disabled={isLoading}
              required
              maxLength={5}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input 
              id="cvc" 
              placeholder="123" 
              value={cardCvc}
              onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
              disabled={isLoading}
              required
              minLength={3}
              maxLength={3}
              pattern="[0-9]{3}"
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Updating..." : "Update Payment Method"}
        </Button>
      </form>
    </div>
  );
};

export default PaymentMethodForm;
