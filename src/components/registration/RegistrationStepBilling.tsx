
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BillingInfo } from "@/types/registration";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Wallet, Building, ArrowRight } from "lucide-react";

interface RegistrationStepBillingProps {
  data: BillingInfo;
  updateData: (data: Partial<BillingInfo>) => void;
  onNext: () => void;
  onBack: () => void;
}

const formSchema = z.object({
  paymentMethod: z.enum(["creditCard", "paypal", "bankTransfer", "googlePay", "applePay", "amazonPay"]),
  cardholderName: z.string().min(2, "Cardholder name is required").optional(),
  cardNumber: z.string().min(12, "Card number is invalid").optional(),
  expiryDate: z.string().min(4, "Expiry date is invalid").optional(),
  cvv: z.string().min(3, "CVV is invalid").optional(),
  country: z.string().min(2, "Country is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(3, "ZIP code is required"),
});

const RegistrationStepBilling: React.FC<RegistrationStepBillingProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: data.paymentMethod,
      cardholderName: data.cardholderName,
      cardNumber: data.cardNumber,
      expiryDate: data.expiryDate,
      cvv: data.cvv,
      country: data.country,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
    },
  });

  const watchPaymentMethod = form.watch("paymentMethod");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateData(values);
    onNext();
  };

  const paymentMethods = [
    { id: "creditCard", name: "Credit Card", icon: <CreditCard className="h-5 w-5" /> },
    { id: "paypal", name: "PayPal", icon: <Wallet className="h-5 w-5" /> },
    { id: "bankTransfer", name: "Bank Transfer", icon: <Building className="h-5 w-5" /> },
    { id: "googlePay", name: "Google Pay", icon: <span className="font-semibold">G</span> },
    { id: "applePay", name: "Apple Pay", icon: <span className="font-semibold">A</span> },
    { id: "amazonPay", name: "Amazon Pay", icon: <span className="font-semibold">Am</span> },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Payment Method</h3>
          <FormField
            control={form.control}
            name="paymentMethod"
            render={() => (
              <FormItem>
                <FormControl>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {paymentMethods.map((method) => (
                      <Card
                        key={method.id}
                        className={`cursor-pointer transition-all hover:border-primary/50 ${
                          watchPaymentMethod === method.id
                            ? "border-primary ring-1 ring-primary"
                            : ""
                        }`}
                        onClick={() => form.setValue("paymentMethod", method.id as any)}
                      >
                        <CardContent className="flex items-center space-x-2 p-4">
                          <div className="flex-shrink-0">{method.icon}</div>
                          <span>{method.name}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {watchPaymentMethod === "creditCard" && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Card Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cardholderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cardholder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="**** **** **** ****" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="***" type="password" maxLength={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Billing Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="GB">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="NY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP/Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="10001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">
            Review Order <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationStepBilling;
