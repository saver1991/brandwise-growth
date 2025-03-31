
import React from "react";
import { Link } from "react-router-dom";
import AuthHeader from "@/components/AuthHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, Coins, Gift, Globe, LineChart, RefreshCw, Users } from "lucide-react";

const Affiliate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 mb-2">
              <Coins className="h-3.5 w-3.5" />
              Start earning today
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Turn Your Connections Into{" "}
              <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-orange bg-clip-text text-transparent">Earnings</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Join our affiliate program and earn commissions for every new customer you refer to BrandWise. The more you share, the more you earn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="gap-2">
                Join Affiliate Program
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How Our Affiliate Program Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've designed our program to be as simple and rewarding as possible. Just three easy steps to start earning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">1. Sign Up</h3>
              <p className="text-muted-foreground">
                Complete a simple application to join our affiliate program. No fees or minimum requirements.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-2">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">2. Share</h3>
              <p className="text-muted-foreground">
                Promote BrandWise using your unique referral link on your website, social media, or email.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-2">
                <Coins className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">3. Earn</h3>
              <p className="text-muted-foreground">
                Receive commissions on every qualified purchase. Monthly payouts via your preferred method.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Generous Commission Structure</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer some of the highest commission rates in the industry, ensuring you're rewarded fairly for your efforts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <CardTitle className="text-center">Starter Referrals</CardTitle>
                <CardDescription className="text-center text-4xl font-bold">20%</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p>Per sale commission on Starter plan referrals</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/30 shadow-md hover:border-primary/70 transition-all">
              <CardHeader>
                <CardTitle className="text-center">Professional Referrals</CardTitle>
                <CardDescription className="text-center text-4xl font-bold">25%</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p>Per sale commission on Professional plan referrals</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <CardTitle className="text-center">Enterprise Referrals</CardTitle>
                <CardDescription className="text-center text-4xl font-bold">30%</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p>Per sale commission on Enterprise plan referrals</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 text-center">
            <p className="font-medium mb-2">Recurring Commissions</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Earn commission on the initial purchase <strong>and</strong> recurring subscription payments for 12 months after the referral.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Join Our Affiliate Program?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our affiliate program is designed to provide you with everything you need to successfully promote BrandWise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <Gift className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">High Commissions</h3>
                <p className="text-muted-foreground">
                  Earn up to 30% commission on all referrals, including recurring subscriptions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <RefreshCw className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Reliable Tracking</h3>
                <p className="text-muted-foreground">
                  Our system accurately tracks all referrals with 90-day cookie duration.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <LineChart className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-Time Dashboard</h3>
                <p className="text-muted-foreground">
                  Monitor your performance, clicks, conversions, and earnings in real-time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Marketing Resources</h3>
                <p className="text-muted-foreground">
                  Access to banners, email templates, and landing pages to boost conversions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about our affiliate program.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Who can join the BrandWise affiliate program?",
                answer:
                  "Anyone can join! We welcome content creators, bloggers, influencers, marketing consultants, and anyone with an audience interested in content marketing and social media management tools.",
              },
              {
                question: "How and when do I get paid?",
                answer:
                  "We process payments on a monthly basis for all commissions earned in the previous month. You can choose to be paid via PayPal, direct bank transfer, or cryptocurrency. The minimum payout threshold is $50.",
              },
              {
                question: "Is there a cost to join the affiliate program?",
                answer:
                  "No, joining our affiliate program is completely free. There are no hidden fees or charges at any point.",
              },
              {
                question: "How long do cookies last?",
                answer:
                  "Our tracking cookies have a 90-day duration. This means if someone clicks your link but purchases within 90 days, you'll still receive the commission.",
              },
              {
                question: "Can I promote BrandWise on multiple websites?",
                answer:
                  "Yes! You can promote BrandWise on multiple websites, social media platforms, and through email marketing. We just ask that you disclose your affiliate relationship as required by law.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Ready to Start Earning?</h2>
            <p className="text-xl opacity-90 max-w-2xl">
              Join our affiliate program today and start turning your influence into income. It only takes a few minutes to sign up.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" variant="secondary" className="gap-2">
                Apply Now
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Contact Affiliate Manager
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BrandWise. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link to="/terms" className="text-sm text-muted-foreground hover:underline">
                Terms
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:underline">
                Privacy
              </Link>
              <Link to="/support" className="text-sm text-muted-foreground hover:underline">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Affiliate;
