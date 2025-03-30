
import React from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Percent, TrendingUp, CheckCircle2 } from "lucide-react";

const Affiliate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Badge className="mb-2" variant="outline">BrandWise Affiliate Program</Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter gradient-heading mb-4">
              Earn While Helping Others Grow Their Online Presence
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[800px] mb-6">
              Join our affiliate program and earn up to 30% commission on every customer that signs up through your referral.
            </p>
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Become an Affiliate <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Our affiliate program is designed to be simple and rewarding. Here's how you can start earning:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="text-primary h-6 w-6" />
                </div>
                <CardTitle>1. Sign Up</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Register for the BrandWise affiliate program. It's free and only takes a few minutes to get started.</p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="text-primary h-6 w-6" />
                </div>
                <CardTitle>2. Share & Promote</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Get your unique referral link and start promoting BrandWise through your website, social media, or email lists.</p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Percent className="text-primary h-6 w-6" />
                </div>
                <CardTitle>3. Earn Commission</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Earn up to 30% commission on every successful referral. We track everything automatically.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Commission Structure</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Our generous commission structure rewards you for bringing new customers to BrandWise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-2xl">Starter Plan</CardTitle>
                <CardDescription>20% Commission</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4">$1.99 <span className="text-sm text-muted-foreground">per referral</span></p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Earn on monthly subscriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>30-day cookie tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-primary">
              <CardHeader>
                <div className="absolute right-4 top-4">
                  <Badge>Most Popular</Badge>
                </div>
                <CardTitle className="text-2xl">Professional Plan</CardTitle>
                <CardDescription>25% Commission</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4">$5.00 <span className="text-sm text-muted-foreground">per referral</span></p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Earn on monthly & yearly subscriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>60-day cookie tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Priority payment processing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise Plan</CardTitle>
                <CardDescription>30% Commission</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4">$8.99 <span className="text-sm text-muted-foreground">per referral</span></p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Earn on all subscription types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>90-day cookie tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Custom partnership opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Marketing Tools Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Marketing Tools & Resources</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              We provide everything you need to successfully promote BrandWise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Promotional Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Banner ads in multiple sizes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Email templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Social media graphics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Product screenshots</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Analytics & Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Real-time conversion tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Performance dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Click and conversion reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Payment history</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Have questions about our affiliate program? Find answers below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-4xl mx-auto">
            <div>
              <h3 className="font-bold text-lg mb-2">When do I get paid?</h3>
              <p className="text-muted-foreground">Commissions are paid monthly, with a minimum payout threshold of $50. Payments are processed on the 15th of each month.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">What payment methods do you offer?</h3>
              <p className="text-muted-foreground">We offer payments via PayPal, direct bank transfer, and cryptocurrency (Bitcoin, Ethereum).</p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">How long do cookies last?</h3>
              <p className="text-muted-foreground">Our cookie duration varies by affiliate level, ranging from 30 to 90 days, giving you ample time to earn commissions.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Is there a minimum traffic requirement?</h3>
              <p className="text-muted-foreground">No, there's no minimum traffic requirement to join. However, the more targeted traffic you can send, the better your results will be.</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/register">
              <Button variant="outline" size="lg" className="gap-2">
                Join the Affiliate Program <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Affiliate;
