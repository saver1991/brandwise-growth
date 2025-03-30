
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { PlanInfo } from "@/types/registration";
import { Badge } from "@/components/ui/badge";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface RegistrationStepPlanProps {
  data: PlanInfo;
  updateData: (data: Partial<PlanInfo>) => void;
  onNext: () => void;
  onBack: () => void;
}

const formSchema = z.object({
  selectedPlan: z.enum(["starter", "professional", "enterprise"]),
  billingCycle: z.enum(["monthly", "yearly"]),
});

const RegistrationStepPlan: React.FC<RegistrationStepPlanProps> = ({ 
  data, 
  updateData, 
  onNext, 
  onBack 
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedPlan: data.selectedPlan,
      billingCycle: data.billingCycle,
    },
  });

  const watchBillingCycle = form.watch("billingCycle");
  const watchSelectedPlan = form.watch("selectedPlan");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateData(values);
    onNext();
  };

  const planFeatures = {
    starter: [
      "Content calendar",
      "Basic analytics",
      "3 social accounts",
      "Email support",
    ],
    professional: [
      "Everything in Starter",
      "Advanced analytics",
      "10 social accounts",
      "Content creation tools",
      "Priority support",
    ],
    enterprise: [
      "Everything in Professional",
      "Custom reporting",
      "Unlimited social accounts",
      "Advanced AI content suggestions",
      "Dedicated account manager",
      "White-label options",
    ],
  };

  const getPlanPrice = (plan: string, cycle: string) => {
    const prices = {
      starter: { monthly: "$9.99", yearly: "$7.99" },
      professional: { monthly: "$19.99", yearly: "$16.99" },
      enterprise: { monthly: "$29.99", yearly: "$24.99" },
    };
    return prices[plan as keyof typeof prices][cycle as keyof typeof prices["starter"]];
  };

  const getYearlySavings = (plan: string) => {
    const savings = {
      starter: "Save $24",
      professional: "Save $36",
      enterprise: "Save $60",
    };
    return savings[plan as keyof typeof savings];
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <div className="flex justify-center space-x-4 mb-8">
            <button
              type="button"
              className={`px-4 py-2 rounded-l-md ${
                watchBillingCycle === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
              onClick={() => form.setValue("billingCycle", "monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-r-md flex items-center ${
                watchBillingCycle === "yearly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
              onClick={() => form.setValue("billingCycle", "yearly")}
            >
              Yearly
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            </button>
          </div>

          <FormField
            control={form.control}
            name="selectedPlan"
            render={() => (
              <FormItem>
                <FormControl>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(["starter", "professional", "enterprise"] as const).map((plan) => (
                      <Card 
                        key={plan}
                        className={`cursor-pointer transition-all ${
                          watchSelectedPlan === plan
                            ? "border-primary ring-1 ring-primary"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => form.setValue("selectedPlan", plan)}
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="capitalize">{plan}</CardTitle>
                              <p className="text-3xl font-bold mt-2">
                                {getPlanPrice(plan, watchBillingCycle)}
                                <span className="text-sm font-normal text-muted-foreground">
                                  {watchBillingCycle === "monthly" ? "/month" : "/month, billed yearly"}
                                </span>
                              </p>
                              {watchBillingCycle === "yearly" && (
                                <Badge variant="outline" className="mt-1">
                                  {getYearlySavings(plan)}
                                </Badge>
                              )}
                            </div>
                            {watchSelectedPlan === plan && (
                              <div className="size-6 rounded-full bg-primary flex items-center justify-center">
                                <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 mt-2">
                            {planFeatures[plan].map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">
            Next Step
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationStepPlan;
