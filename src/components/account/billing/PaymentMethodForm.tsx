
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethod {
  type: "card";
  last4: string;
  expiry: string;
}

interface PaymentMethodFormProps {
  userId: string | undefined;
  paymentMethod: PaymentMethod | null;
  onUpdate: (newPaymentMethod: PaymentMethod) => void;
}

const PaymentMethodForm = ({ userId, paymentMethod, onUpdate }: PaymentMethodFormProps) => {
  const { toast } = useToast();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) return;
    
    try {
      setIsLoading(true);
      
      // In a real app, you would send this data to your payment processor
      // via a Supabase edge function or another backend service
      
      // Here we'll just simulate a successful update
      const newPaymentMethod = {
        type: "card" as const,
        last4: cardNumber.slice(-4),
        expiry: cardExpiry
      };
      
      // Update the payment method via callback
      onUpdate(newPaymentMethod);
      
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

  return (
    <div className="space-y-6">
      {paymentMethod ? (
        <div className="p-4 border rounded-lg flex items-center gap-4">
          <CreditCard className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="font-medium">Visa ending in {paymentMethod.last4}</p>
            <p className="text-sm text-muted-foreground">Expires {paymentMethod.expiry}</p>
          </div>
        </div>
      ) : (
        <div className="p-4 border rounded-lg bg-amber-50/50 border-amber-100">
          <p className="text-amber-600">No payment method on file</p>
        </div>
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
        
        <Button 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Payment Method"}
        </Button>
      </form>
    </div>
  );
};

export default PaymentMethodForm;
