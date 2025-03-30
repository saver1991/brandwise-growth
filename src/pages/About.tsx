
import AuthHeader from "@/components/AuthHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-slate-50 dark:from-background dark:to-slate-900/50">
          <div className="container mx-auto px-4 py-16 md:py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our mission is to <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-orange bg-clip-text text-transparent">empower creators</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              BrandWise was founded with a simple idea: make content creation and audience growth accessible to everyone.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
                  <p>
                    Founded in 2020, BrandWise began when our co-founders, Alex and Sophia, struggled with the complexity of managing content across multiple platforms while growing their own personal brands.
                  </p>
                  <p>
                    They realized that many creators were facing the same challenges: scattered analytics, inconsistent posting schedules, and no clear strategy for growth. They envisioned a unified platform that could solve these problems.
                  </p>
                  <p>
                    After months of development and feedback from early users, BrandWise was launched with a mission to simplify content strategy and empower creators to focus on what they do best—creating amazing content.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=400"
                  alt="Team working together" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white dark:bg-slate-800 border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="p-3 bg-brand-blue/10 rounded-full w-fit mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Innovation</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center">
                    We're constantly exploring new ways to make content creation and management more efficient and effective.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-slate-800 border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="p-3 bg-brand-teal/10 rounded-full w-fit mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Community</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center">
                    We believe in fostering a supportive environment where creators can learn, share, and grow together.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-slate-800 border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="p-3 bg-brand-orange/10 rounded-full w-fit mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Trust</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center">
                    We're committed to being transparent and reliable, building tools that creators can depend on day after day.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-teal opacity-30"></div>
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Sophia Chen" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">Sophia Chen</h3>
                <p className="text-sm text-slate-500 mb-2">Co-Founder & CEO</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 px-4">
                  Former content strategist with experience growing brands on social media.
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-teal opacity-30"></div>
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Alex Rivera" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">Alex Rivera</h3>
                <p className="text-sm text-slate-500 mb-2">Co-Founder & CTO</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 px-4">
                  Software engineer with a passion for creating tools that help creators.
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-teal opacity-30"></div>
                  <img 
                    src="https://randomuser.me/api/portraits/women/68.jpg" 
                    alt="Maya Patel" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">Maya Patel</h3>
                <p className="text-sm text-slate-500 mb-2">Head of Product</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 px-4">
                  Product management expert focused on creating intuitive user experiences.
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-teal opacity-30"></div>
                  <img 
                    src="https://randomuser.me/api/portraits/men/75.jpg" 
                    alt="James Wilson" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">James Wilson</h3>
                <p className="text-sm text-slate-500 mb-2">Head of Marketing</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 px-4">
                  Marketing strategist with experience in growing SaaS products globally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-brand-blue mb-2">50K+</div>
                <p className="text-slate-600 dark:text-slate-400">Active Users</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-teal mb-2">120+</div>
                <p className="text-slate-600 dark:text-slate-400">Countries</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-orange mb-2">5M+</div>
                <p className="text-slate-600 dark:text-slate-400">Posts Created</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-blue mb-2">98%</div>
                <p className="text-slate-600 dark:text-slate-400">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-teal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join the BrandWise Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Be part of a growing community of creators who are taking their content to the next level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="font-medium">
                  Get started today
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-medium">
                  Contact our team
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
