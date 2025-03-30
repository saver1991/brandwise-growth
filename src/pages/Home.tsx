
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthHeader from "@/components/AuthHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, BarChart2, Calendar, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-background to-slate-50 dark:from-background dark:to-slate-900/50">
          <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Grow your audience with <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-orange bg-clip-text text-transparent">content that resonates</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl">
                BrandWise helps content creators, thought leaders, and businesses build stronger connections through strategic content planning and analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="font-medium">
                    Start for free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" size="lg" className="font-medium">
                    See features
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=450"
                  alt="Dashboard preview" 
                  className="w-full h-auto rounded-lg shadow-2xl border border-slate-200 dark:border-slate-800 relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">All-in-one content solution</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                BrandWise provides everything you need to create, schedule, and analyze content across multiple platforms.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="p-3 bg-brand-blue/10 rounded-lg w-fit mb-4">
                    <BarChart2 className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Track engagement, growth, and content performance across all your platforms in one place.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="p-3 bg-brand-teal/10 rounded-lg w-fit mb-4">
                    <Calendar className="h-6 w-6 text-brand-teal" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Content Calendar</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Plan, schedule, and organize your content strategy with our intuitive calendar system.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="p-3 bg-brand-orange/10 rounded-lg w-fit mb-4">
                    <Users className="h-6 w-6 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Audience Growth</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Understand your audience better and create content that drives meaningful engagement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-10">Trusted by content creators worldwide</h2>
              
              <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
                <p className="text-lg md:text-xl italic text-slate-600 dark:text-slate-300 mb-6">
                  "BrandWise has completely transformed how I approach content creation. The analytics insights alone have helped me grow my LinkedIn audience by 327% in just 6 months."
                </p>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-slate-500">Content Creator & Digital Strategist</p>
                </div>
              </div>
              
              <div className="mt-10 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-70">
                <span className="text-slate-400 dark:text-slate-600 font-semibold">TechCrunch</span>
                <span className="text-slate-400 dark:text-slate-600 font-semibold">Forbes</span>
                <span className="text-slate-400 dark:text-slate-600 font-semibold">Entrepreneur</span>
                <span className="text-slate-400 dark:text-slate-600 font-semibold">Business Insider</span>
                <span className="text-slate-400 dark:text-slate-600 font-semibold">Inc.</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-teal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to grow your audience?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of content creators who are using BrandWise to plan, create, and analyze their content strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="font-medium">
                  Start your free trial
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-medium">
                  View pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
}
