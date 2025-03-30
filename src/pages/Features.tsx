
import AuthHeader from "@/components/AuthHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, BarChart2, Calendar, BookOpen, Users, Linkedin, MessageSquare, FileText, TrendingUp } from "lucide-react";

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-slate-50 dark:from-background dark:to-slate-900/50">
          <div className="container mx-auto px-4 py-16 md:py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              All the tools you need to <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-orange bg-clip-text text-transparent">grow your brand</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              BrandWise provides a comprehensive suite of tools designed for content creators and marketing teams to streamline their workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="font-medium">
                  Start free trial
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="font-medium">
                  View pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Dashboard Feature */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 order-2 md:order-1">
                <div className="relative">
                  <div className="absolute -top-8 -left-8 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&h=400"
                    alt="Analytics dashboard" 
                    className="w-full h-auto rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 relative z-10"
                  />
                </div>
              </div>
              <div className="flex-1 order-1 md:order-2 space-y-6">
                <div className="inline-block p-2 bg-brand-blue/10 rounded-lg text-brand-blue">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold">Comprehensive Analytics Dashboard</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Get a birds-eye view of your content performance across all platforms. Track engagement, growth trends, and audience insights in one centralized dashboard.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-teal mt-0.5" />
                    <span>Real-time performance tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-teal mt-0.5" />
                    <span>Customizable reporting periods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-teal mt-0.5" />
                    <span>Comparative analysis between platforms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Content Calendar Feature */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <div className="inline-block p-2 bg-brand-teal/10 rounded-lg text-brand-teal">
                  <Calendar className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold">Intuitive Content Calendar</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Plan, organize, and schedule your content across multiple platforms from a single, user-friendly calendar interface.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-blue mt-0.5" />
                    <span>Drag-and-drop scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-blue mt-0.5" />
                    <span>Platform-specific content views</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-blue mt-0.5" />
                    <span>Automated posting reminders</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&h=400"
                    alt="Content calendar" 
                    className="w-full h-auto rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Integration Grid */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Platform Integrations</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                BrandWise seamlessly connects with your favorite content platforms, allowing you to manage everything from one place.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="p-3 bg-[#0A66C2]/10 rounded-lg w-fit mb-4">
                    <Linkedin className="h-6 w-6 text-[#0A66C2]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">LinkedIn Integration</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Create, schedule, and analyze your LinkedIn posts to build your professional brand.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="p-3 bg-[#00ab6c]/10 rounded-lg w-fit mb-4">
                    <MessageSquare className="h-6 w-6 text-[#00ab6c]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Medium Integration</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Manage your Medium publications and track article performance all in one place.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="p-3 bg-[#21759b]/10 rounded-lg w-fit mb-4">
                    <FileText className="h-6 w-6 text-[#21759b]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">WordPress Integration</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Create, edit, and publish WordPress blog posts directly from BrandWise.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature List */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Feature Highlights</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Everything you need to create, manage, and analyze your content strategy.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex gap-3">
                <div className="p-2 bg-brand-blue/10 rounded-lg h-fit">
                  <BookOpen className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Content Creation</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    AI-powered content ideas and topic suggestions based on your audience.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="p-2 bg-brand-teal/10 rounded-lg h-fit">
                  <Users className="h-5 w-5 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Audience Growth</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Tools and insights to help you grow your audience across platforms.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="p-2 bg-brand-orange/10 rounded-lg h-fit">
                  <TrendingUp className="h-5 w-5 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Performance Analytics</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Comprehensive performance tracking and content optimization suggestions.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="p-2 bg-brand-blue/10 rounded-lg h-fit">
                  <Calendar className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Content Calendar</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Visual calendar for planning and scheduling content across platforms.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="p-2 bg-brand-teal/10 rounded-lg h-fit">
                  <Linkedin className="h-5 w-5 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Platform Integrations</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Seamless connections with LinkedIn, Medium, WordPress, and more.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="p-2 bg-brand-orange/10 rounded-lg h-fit">
                  <BarChart2 className="h-5 w-5 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Custom Reports</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Generate detailed reports for content performance and audience growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-teal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to elevate your content strategy?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Join the thousands of content creators already using BrandWise to grow their audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="font-medium">
                  Start your free trial
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-medium">
                  View pricing plans
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
