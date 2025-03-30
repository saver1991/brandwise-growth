import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthHeader from "@/components/AuthHeader";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { 
  CreditCard, 
  HelpCircle, 
  Laptop, 
  LifeBuoy, 
  MessagesSquare, 
  Search, 
  Send, 
  Settings, 
  Sparkles,
  Users
} from "lucide-react";

interface SupportCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  topics: SupportTopic[];
}

interface SupportTopic {
  id: string;
  title: string;
  content: React.ReactNode;
}

const supportCategories: SupportCategory[] = [
  {
    id: "platforms",
    name: "Platform Integration",
    icon: <Laptop className="h-5 w-5" />,
    topics: [
      {
        id: "linkedin",
        title: "LinkedIn Integration",
        content: (
          <div className="space-y-4">
            <p>Connect your LinkedIn account to automatically sync your content, analyze engagement, and schedule posts.</p>
            <h4 className="font-medium text-lg">How to connect:</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the LinkedIn section in your dashboard</li>
              <li>Click "Connect Account"</li>
              <li>Authorize BrandWise to access your LinkedIn profile</li>
              <li>Set your content preferences and posting schedule</li>
            </ol>
            <p className="text-sm bg-blue-50 dark:bg-blue-950/50 p-3 rounded-md">Note: BrandWise only requests the permissions needed to manage your content and view analytics.</p>
          </div>
        ),
      },
      {
        id: "medium",
        title: "Medium Integration",
        content: (
          <div className="space-y-4">
            <p>Publish and analyze your Medium stories directly from BrandWise to grow your readership.</p>
            <h4 className="font-medium text-lg">Key features:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Draft and publish stories without leaving BrandWise</li>
              <li>Track story performance and reader engagement</li>
              <li>Schedule publications for optimal times</li>
              <li>Analyze which topics perform best with your audience</li>
            </ul>
          </div>
        ),
      },
      {
        id: "wordpress",
        title: "WordPress Integration",
        content: (
          <div className="space-y-4">
            <p>Manage your WordPress blog alongside your other platforms for a unified content strategy.</p>
            <h4 className="font-medium text-lg">Setup guide:</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Install the BrandWise plugin on your WordPress site</li>
              <li>Generate an API key in your WordPress admin panel</li>
              <li>Enter the API key and site URL in BrandWise settings</li>
              <li>Start managing your WordPress content from BrandWise dashboard</li>
            </ol>
          </div>
        ),
      },
    ],
  },
  {
    id: "ai",
    name: "AI Features",
    icon: <Sparkles className="h-5 w-5" />,
    topics: [
      {
        id: "content-generation",
        title: "AI Content Generation",
        content: (
          <div className="space-y-4">
            <p>BrandWise AI helps you create engaging content tailored to your brand voice and audience preferences.</p>
            <h4 className="font-medium text-lg">How to use AI generation:</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Select the platform you're creating content for</li>
              <li>Choose a content type (post, article, etc.)</li>
              <li>Enter your topic or keywords</li>
              <li>Click "Generate" and review the AI suggestions</li>
              <li>Edit as needed or regenerate with different parameters</li>
            </ol>
          </div>
        ),
      },
      {
        id: "content-analysis",
        title: "Content Performance Analysis",
        content: (
          <div className="space-y-4">
            <p>Our AI analyzes your content performance across platforms to provide actionable insights.</p>
            <h4 className="font-medium text-lg">Key insights provided:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Engagement patterns by content type, topic, and time of posting</li>
              <li>Audience sentiment analysis</li>
              <li>Content readability and accessibility scores</li>
              <li>Personalized recommendations for improvement</li>
            </ul>
          </div>
        ),
      },
      {
        id: "audience-insights",
        title: "AI Audience Insights",
        content: (
          <div className="space-y-4">
            <p>Understand your audience better with AI-powered analytics that reveal preferences and behaviors.</p>
            <h4 className="font-medium text-lg">Available insights:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Demographic analysis across platforms</li>
              <li>Interest mapping and content affinity</li>
              <li>Engagement patterns and peak activity times</li>
              <li>Audience growth opportunities</li>
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    id: "billing",
    name: "Billing & Subscription",
    icon: <CreditCard className="h-5 w-5" />,
    topics: [
      {
        id: "plans",
        title: "Subscription Plans",
        content: (
          <div className="space-y-4">
            <p>BrandWise offers flexible plans to fit your needs, from solo creators to enterprise teams.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h5 className="font-bold">Starter</h5>
                  <p className="text-2xl font-bold mt-2">$19/month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> 3 connected platforms
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Basic analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> 20 AI content ideas/month
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-brand-teal">
                <CardContent className="pt-6">
                  <h5 className="font-bold">Professional</h5>
                  <p className="text-2xl font-bold mt-2">$49/month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Unlimited platforms
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Advanced analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> 100 AI content ideas/month
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h5 className="font-bold">Enterprise</h5>
                  <p className="text-2xl font-bold mt-2">Custom</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Multi-user access
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Custom integrations
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Unlimited AI generation
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        ),
      },
      {
        id: "payment",
        title: "Payment Methods",
        content: (
          <div className="space-y-4">
            <p>We accept multiple payment methods to make managing your subscription easy.</p>
            <h4 className="font-medium text-lg">Accepted payment methods:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>All major credit and debit cards (Visa, Mastercard, Amex)</li>
              <li>PayPal</li>
              <li>Bank transfers (for annual enterprise plans)</li>
            </ul>
            <p className="text-sm bg-amber-50 dark:bg-amber-950/50 p-3 rounded-md">Note: All payments are processed securely through Stripe or PayPal. BrandWise does not store your payment information.</p>
          </div>
        ),
      },
      {
        id: "invoices",
        title: "Invoices & Receipts",
        content: (
          <div className="space-y-4">
            <p>Access and download your billing history at any time from your account settings.</p>
            <h4 className="font-medium text-lg">How to access invoices:</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Go to "Account Settings"</li>
              <li>Select "Billing History"</li>
              <li>View or download invoices in PDF format</li>
            </ol>
            <p>For specific billing queries, please contact our billing team at billing@brandwise.com</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "account",
    name: "Account Management",
    icon: <Users className="h-5 w-5" />,
    topics: [
      {
        id: "profile",
        title: "Profile Settings",
        content: (
          <div className="space-y-4">
            <p>Manage your personal details, notification preferences, and connected accounts.</p>
            <h4 className="font-medium text-lg">Key profile settings:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Update personal information and profile picture</li>
              <li>Manage email preferences and notifications</li>
              <li>Set your default timezone for scheduling</li>
              <li>Change password and security settings</li>
            </ul>
          </div>
        ),
      },
      {
        id: "teams",
        title: "Team Collaboration",
        content: (
          <div className="space-y-4">
            <p>Available on Professional and Enterprise plans, invite team members to collaborate on your content strategy.</p>
            <h4 className="font-medium text-lg">Team features:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Role-based permissions (Admin, Editor, Viewer)</li>
              <li>Content approval workflows</li>
              <li>Collaborative content calendar</li>
              <li>Team activity logs and notifications</li>
            </ul>
          </div>
        ),
      },
      {
        id: "data",
        title: "Data & Privacy",
        content: (
          <div className="space-y-4">
            <p>BrandWise takes data security and privacy seriously. You have full control over your data.</p>
            <h4 className="font-medium text-lg">Data management options:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Download your data in portable formats</li>
              <li>Control what data is stored and for how long</li>
              <li>Manage third-party platform permissions</li>
              <li>Request data deletion at any time</li>
            </ul>
            <p className="text-sm bg-blue-50 dark:bg-blue-950/50 p-3 rounded-md">We comply with GDPR, CCPA, and other privacy regulations. See our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> for details.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "developer",
    name: "Developer Resources",
    icon: <Settings className="h-5 w-5" />,
    topics: [
      {
        id: "api",
        title: "API Documentation",
        content: (
          <div className="space-y-4">
            <p>BrandWise provides a robust API for developers to integrate our features into their own applications.</p>
            <h4 className="font-medium text-lg">API Resources:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>REST API endpoints for content management</li>
              <li>Webhook integration for real-time updates</li>
              <li>Analytics data access</li>
              <li>Authentication and security guidelines</li>
            </ul>
            <Button variant="outline" className="mt-2">View API Documentation</Button>
          </div>
        ),
      },
      {
        id: "webhooks",
        title: "Webhooks & Integrations",
        content: (
          <div className="space-y-4">
            <p>Set up custom webhooks to automate workflows and integrate with your existing tools.</p>
            <h4 className="font-medium text-lg">Available webhook events:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Content publication and scheduling events</li>
              <li>Engagement milestones and thresholds</li>
              <li>Analytics reports and summaries</li>
              <li>Account and billing notifications</li>
            </ul>
          </div>
        ),
      },
    ],
  },
];

const faqs = [
  {
    question: "How do I connect my social media accounts?",
    answer: "You can connect your accounts by navigating to your dashboard, clicking on 'Settings', then 'Connected Accounts'. From there, select the platform you want to connect and follow the authentication steps."
  },
  {
    question: "Can I schedule posts across multiple platforms simultaneously?",
    answer: "Yes! BrandWise allows you to create content once and schedule it across any of your connected platforms. You can customize the content for each platform or use the AI to adapt it automatically to fit each platform's best practices."
  },
  {
    question: "How accurate are the analytics?",
    answer: "Our analytics pull data directly from platform APIs and are typically refreshed every 4 hours. For most metrics, you'll see the same numbers as reported on the native platforms, though there may be slight delays in data updates."
  },
  {
    question: "Can I collaborate with my team?",
    answer: "Yes, on Professional and Enterprise plans, you can invite team members and assign roles such as Admin, Editor, or Viewer to control what actions they can perform within your BrandWise account."
  },
  {
    question: "How many AI content ideas can I generate?",
    answer: "The number of AI content ideas depends on your subscription plan. Starter plans include 20 ideas per month, Professional plans include 100 ideas per month, and Enterprise plans have unlimited access."
  },
  {
    question: "Is there a limit to how many platforms I can connect?",
    answer: "Starter plans allow up to 3 connected platforms, while Professional and Enterprise plans offer unlimited platform connections. Each connected account (e.g., multiple LinkedIn pages) counts as one platform."
  },
  {
    question: "Can I try BrandWise before purchasing?",
    answer: "Yes, we offer a 14-day free trial with access to all Professional plan features. No credit card is required to start your trial."
  },
  {
    question: "How secure is my data?",
    answer: "We take security seriously at BrandWise. All data is encrypted both in transit and at rest. We use industry-standard security practices and regular audits to ensure your information remains protected."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access to BrandWise until the end of your current billing period."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 7-day money-back guarantee for monthly plans and 14 days for annual plans. If you're not satisfied with BrandWise within this period, contact our support team for a full refund."
  }
];

const Support = () => {
  const [activeCategory, setActiveCategory] = useState(supportCategories[0].id);
  const [activeTopic, setActiveTopic] = useState<string | null>(supportCategories[0].topics[0].id);
  const [searchTerm, setSearchTerm] = useState("");

  const currentCategory = supportCategories.find((category) => category.id === activeCategory);
  const currentTopic = currentCategory?.topics.find((topic) => topic.id === activeTopic);

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-background to-slate-50 dark:from-background dark:to-slate-900/50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">How can we help?</h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                Find answers to common questions or get in touch with our support team
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  type="text" 
                  placeholder="Search for help articles, topics, or FAQs..." 
                  className="pl-10 py-6 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-64">
                <h2 className="text-lg font-medium mb-4">Support Categories</h2>
                <div className="space-y-1">
                  {supportCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setActiveTopic(category.topics[0].id);
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent/10 transition-colors",
                        activeCategory === category.id
                          ? "bg-accent/20 text-accent-foreground font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
                {currentCategory && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">
                      {currentCategory.name}
                    </h2>

                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <h3 className="font-medium text-lg mb-3">Topics</h3>
                        <div className="space-y-1">
                          {currentCategory.topics.map((topic) => (
                            <button
                              key={topic.id}
                              onClick={() => setActiveTopic(topic.id)}
                              className={cn(
                                "w-full text-left rounded-md px-3 py-2 text-sm hover:bg-accent/10 transition-colors",
                                activeTopic === topic.id
                                  ? "bg-accent/20 text-accent-foreground font-medium"
                                  : "text-muted-foreground"
                              )}
                            >
                              {topic.title}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="md:w-2/3 md:border-l dark:border-slate-800 md:pl-6">
                        {currentTopic ? (
                          <div>
                            <h3 className="font-semibold text-xl mb-4">{currentTopic.title}</h3>
                            <div className="prose dark:prose-invert max-w-none">
                              {currentTopic.content}
                            </div>
                            <div className="mt-8 pt-6 border-t dark:border-slate-800">
                              <p className="text-sm text-slate-500">Was this article helpful?</p>
                              <div className="flex gap-2 mt-2">
                                <Button variant="outline" size="sm">Yes, thanks</Button>
                                <Button variant="outline" size="sm">No, I need more help</Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-40">
                            <p className="text-muted-foreground">Select a topic to view content</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-slate-600 dark:text-slate-300">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-10 text-center">
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Can't find what you're looking for?
                </p>
                <Button>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Browse Knowledge Base
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Still need help?</h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Our support team is here to assist you. Please fill out the form below.
                </p>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Your Name
                        </label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="What's your question about?" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category
                      </label>
                      <select 
                        id="category" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="">Select a category</option>
                        <option value="account">Account Issues</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="technical">Technical Problems</option>
                        <option value="feature">Feature Request</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea 
                        id="message" 
                        placeholder="Please describe your issue in detail..."
                        rows={6}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Send className="mr-2 h-4 w-4" />
                        Submit Request
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <div className="mt-8 text-center">
                <div className="flex items-center justify-center gap-2">
                  <MessagesSquare className="h-5 w-5 text-brand-teal" />
                  <p className="text-slate-600 dark:text-slate-300">
                    Average response time: <span className="font-medium">Under 24 hours</span>
                  </p>
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  For urgent matters, please email <a href="mailto:urgent@brandwise.com" className="text-brand-blue hover:underline">urgent@brandwise.com</a>
                </p>
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

export default Support;
