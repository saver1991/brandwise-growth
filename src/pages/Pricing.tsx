
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthHeader from "@/components/AuthHeader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Star, 
  Zap,
  Users,
  Sparkles,
  BarChart3,
  Calendar,
  BookOpen,
  Share2,
  Shield,
  Database,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

type PlanFeature = {
  text: string;
  available: boolean;
};

type PricingPlan = {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: PlanFeature[];
  highlight?: boolean;
  badge?: string;
  buttonText: string;
};

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: {
      monthly: 9.99,
      yearly: 99,
    },
    description: "Perfect for individual creators and small businesses just getting started.",
    features: [
      { text: "3 connected platforms", available: true },
      { text: "Basic analytics", available: true },
      { text: "20 AI content ideas/month", available: true },
      { text: "7-day content calendar", available: true },
      { text: "Basic audience insights", available: true },
      { text: "Mobile app access", available: true },
      { text: "Team collaboration", available: false },
      { text: "Advanced analytics", available: false },
      { text: "Custom integrations", available: false },
      { text: "Priority support", available: false },
    ],
    buttonText: "Start Free Trial",
  },
  {
    name: "Professional",
    price: {
      monthly: 19.99,
      yearly: 199,
    },
    description: "Ideal for growing creators and businesses seeking more features.",
    features: [
      { text: "Unlimited platforms", available: true },
      { text: "Advanced analytics", available: true },
      { text: "100 AI content ideas/month", available: true },
      { text: "30-day content calendar", available: true },
      { text: "Advanced audience insights", available: true },
      { text: "Mobile app access", available: true },
      { text: "Team collaboration (up to 3 users)", available: true },
      { text: "API access", available: true },
      { text: "Custom integrations", available: false },
      { text: "Priority support", available: false },
    ],
    highlight: true,
    badge: "Most Popular",
    buttonText: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: {
      monthly: 29.99,
      yearly: 299,
    },
    description: "For established brands and teams requiring premium features and support.",
    features: [
      { text: "Unlimited platforms", available: true },
      { text: "Advanced analytics with custom reports", available: true },
      { text: "Unlimited AI content ideas", available: true },
      { text: "90-day content calendar", available: true },
      { text: "Premium audience insights", available: true },
      { text: "Mobile app access", available: true },
      { text: "Team collaboration (unlimited users)", available: true },
      { text: "API access", available: true },
      { text: "Custom integrations", available: true },
      { text: "Priority support", available: true },
    ],
    buttonText: "Contact Sales",
  },
];

const featuresDetails = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI-Powered Content Creation",
    description: "Generate engaging content ideas and full posts customized for each platform with our advanced AI tools."
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Comprehensive Analytics",
    description: "Track performance across all platforms with unified metrics and actionable insights."
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Content Calendar",
    description: "Plan, schedule, and manage all your content from a single intuitive calendar interface."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Audience Insights",
    description: "Understand your audience demographics, interests, and engagement patterns across platforms."
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Publishing Tools",
    description: "Draft, edit, and publish content directly to multiple platforms from our unified dashboard."
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: "Multi-Platform Integration",
    description: "Connect to all your favorite platforms including LinkedIn, Medium, WordPress, and more."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure Data Management",
    description: "Enterprise-grade security to keep your accounts and content protected at all times."
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Content Storage",
    description: "Store and organize all your published and draft content in one searchable library."
  }
];

const faqItems = [
  {
    question: "How does the free trial work?",
    answer: "Our 14-day free trial gives you complete access to the Professional plan features with no credit card required. At the end of your trial, you can choose the plan that best fits your needs."
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you upgrade, the new features will be available immediately. If you downgrade, changes will take effect at the end of your billing cycle."
  },
  {
    question: "Is there a discount for annual billing?",
    answer: "Yes, you save approximately 17% when you choose annual billing compared to monthly billing for any of our plans."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual Enterprise plans."
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-slate-50 dark:from-background dark:to-slate-900/50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                Choose the plan that's right for you and start growing your online presence
              </p>

              <div className="flex items-center justify-center gap-2 mb-12">
                <span className={cn("text-sm font-medium", billingCycle === "monthly" ? "text-primary" : "text-slate-500")}>Monthly</span>
                <Switch 
                  checked={billingCycle === "yearly"} 
                  onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")} 
                  className="mx-2" 
                />
                <span className={cn("text-sm font-medium", billingCycle === "yearly" ? "text-primary" : "text-slate-500")}>
                  Yearly <span className="text-emerald-500 ml-1">Save ~17%</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-12 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "relative flex flex-col h-full", 
                    plan.highlight && "mt-0 md:-mt-6"
                  )}
                >
                  <Card 
                    className={cn(
                      "h-full flex flex-col",
                      plan.highlight && "border-primary shadow-lg shadow-primary/10 dark:shadow-primary/20"
                    )}
                  >
                    {plan.badge && (
                      <div className="absolute top-0 right-0 -mt-2 -mr-2">
                        <Badge className="bg-primary">{plan.badge}</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="mt-4">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold">
                            ${billingCycle === "monthly" ? plan.price.monthly.toFixed(2) : (plan.price.yearly / 12).toFixed(2)}
                          </span>
                          <span className="text-sm text-slate-500 ml-1">/month</span>
                        </div>
                        {billingCycle === "yearly" && (
                          <div className="text-sm text-slate-500 mt-1">
                            Billed annually (${plan.price.yearly.toFixed(2)})
                          </div>
                        )}
                      </div>
                      <p className="text-slate-500 mt-2">{plan.description}</p>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2">
                            <div className="mt-1 shrink-0">
                              {feature.available ? (
                                <Check className="h-4 w-4 text-emerald-500" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border border-slate-300 dark:border-slate-700"></div>
                              )}
                            </div>
                            <span className={feature.available ? "" : "text-slate-400"}>
                              {feature.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-4">
                      <Button 
                        className={cn("w-full", plan.highlight ? "" : "variant-outline")}
                        variant={plan.highlight ? "default" : "outline"}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="text-center max-w-lg mx-auto mt-16">
              <p className="text-sm text-slate-500">
                All plans include a 14-day free trial. No credit card required to try.
                Need a custom solution? <Link to="/support" className="text-primary hover:underline">Contact us</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed Online</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                BrandWise provides all the tools you need to manage your online presence across multiple platforms.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {featuresDetails.map((feature, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="p-3 w-fit rounded-lg bg-primary/10 text-primary mb-3">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-slate-500">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-slate-200 dark:border-slate-800 pb-6">
                    <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                    <p className="text-slate-500">{item.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Still have questions about our plans?
                </p>
                <Button asChild>
                  <Link to="/support">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/guides" className="hover:text-white transition-colors">Guides</Link></li>
                <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between">
            <p>© {new Date().getFullYear()} BrandWise. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
