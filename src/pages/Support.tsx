import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Navigation from "@/components/Navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Search, BarChart2, CreditCard, TriangleAlert, Lightbulb, Linkedin, MessageSquare, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SupportCategory = {
  id: string;
  title: string;
  icon: React.ReactNode;
  topics: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
};

const Support = () => {
  const [activeCategory, setActiveCategory] = useState<string>("platforms");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally send the form data to a backend
    toast({
      title: "Support request submitted",
      description: "We'll get back to you as soon as possible.",
    });
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const categories: SupportCategory[] = [
    {
      id: "platforms",
      title: "Platforms & Integration",
      icon: <Linkedin className="h-5 w-5" />,
      topics: [
        {
          id: "linkedin",
          title: "LinkedIn Integration",
          content: (
            <div className="space-y-4">
              <p>
                BrandWise offers seamless integration with LinkedIn, allowing you to schedule posts, analyze performance, and optimize your LinkedIn strategy.
              </p>
              <h4 className="font-semibold">Key Features:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Schedule and automate LinkedIn posts</li>
                <li>Analyze engagement metrics and post performance</li>
                <li>Optimize posting times based on audience activity</li>
                <li>Monitor competitor LinkedIn strategies</li>
              </ul>
              <h4 className="font-semibold">Setup Process:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Navigate to the LinkedIn section in your dashboard</li>
                <li>Click on "Connect LinkedIn Account"</li>
                <li>Authorize BrandWise to access your LinkedIn profile or company page</li>
                <li>Select the permissions you want to grant</li>
              </ol>
              <p>
                For additional support with LinkedIn integration, please see our{" "}
                <Link to="/support" className="text-primary underline">
                  detailed documentation
                </Link>{" "}
                or contact our support team.
              </p>
            </div>
          ),
        },
        {
          id: "medium",
          title: "Medium Publishing",
          content: (
            <div className="space-y-4">
              <p>
                Create, optimize, and publish content directly to Medium from your BrandWise dashboard, ensuring your stories reach the right audience.
              </p>
              <h4 className="font-semibold">Key Features:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Draft and edit articles with AI-powered suggestions</li>
                <li>Schedule publications for optimal reach</li>
                <li>Track article performance and reader engagement</li>
                <li>Optimize content for Medium's algorithm</li>
              </ul>
              <h4 className="font-semibold">Getting Started:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Connect your Medium account in the Platforms section</li>
                <li>Create a new article using our editor</li>
                <li>Use AI recommendations to enhance your content</li>
                <li>Schedule or publish immediately to your Medium publication</li>
              </ol>
            </div>
          ),
        },
        {
          id: "wordpress",
          title: "WordPress Publishing",
          content: (
            <div className="space-y-4">
              <p>
                Connect your WordPress site to BrandWise for seamless content publishing, SEO optimization, and performance tracking.
              </p>
              <h4 className="font-semibold">Key Features:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Publish directly to your WordPress site</li>
                <li>Schedule posts and manage your content calendar</li>
                <li>Built-in SEO recommendations for higher search rankings</li>
                <li>Track post performance and reader engagement</li>
              </ul>
              <h4 className="font-semibold">Integration Steps:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Install the BrandWise WordPress plugin</li>
                <li>Generate an API key in your WordPress admin panel</li>
                <li>Enter the API key in your BrandWise settings</li>
                <li>Select which WordPress categories to connect</li>
              </ol>
            </div>
          ),
        },
      ],
    },
    {
      id: "ai",
      title: "AI Content Creation",
      icon: <Lightbulb className="h-5 w-5" />,
      topics: [
        {
          id: "content-ideas",
          title: "Generating Content Ideas",
          content: (
            <div className="space-y-4">
              <p>
                BrandWise's AI engine helps you overcome writer's block by generating relevant content ideas based on your industry, audience preferences, and trending topics.
              </p>
              <h4 className="font-semibold">How to Generate Ideas:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Go to the "Content Creation" section in your dashboard</li>
                <li>Click on "Generate Ideas"</li>
                <li>Select your industry, topics of interest, and content format</li>
                <li>Refine the generated ideas or use them as inspiration</li>
              </ol>
              <h4 className="font-semibold">Tip:</h4>
              <p>
                For best results, regularly update your audience insights and industry preferences in your profile settings. This helps our AI tailor suggestions specifically for your target audience.
              </p>
            </div>
          ),
        },
        {
          id: "ai-writing",
          title: "AI-Assisted Writing",
          content: (
            <div className="space-y-4">
              <p>
                Leverage BrandWise's advanced AI writing assistant to create high-quality content faster. Our AI helps with everything from drafting outlines to polishing your final piece.
              </p>
              <h4 className="font-semibold">Key Features:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Content outlines and structure suggestions</li>
                <li>Paragraph generation and expansion</li>
                <li>Tone and style adjustment</li>
                <li>Grammar and readability improvements</li>
              </ul>
              <h4 className="font-semibold">Best Practices:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Start with a clear topic and target audience in mind</li>
                <li>Use AI suggestions as a starting point, then add your unique voice</li>
                <li>Review and edit AI-generated content for accuracy</li>
                <li>Blend AI-written passages with your original content for best results</li>
              </ul>
            </div>
          ),
        },
        {
          id: "image-generation",
          title: "AI Image Generation",
          content: (
            <div className="space-y-4">
              <p>
                Create custom images for your content using BrandWise's AI image generation tool. Generate unique visuals that align perfectly with your content and brand identity.
              </p>
              <h4 className="font-semibold">How to Generate Images:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Navigate to the "Media" section in your content editor</li>
                <li>Click on "Generate Image"</li>
                <li>Enter a detailed description of the image you want</li>
                <li>Adjust settings like style, mood, and color palette</li>
                <li>Generate multiple options and select your favorite</li>
              </ol>
              <h4 className="font-semibold">Image Usage Guidelines:</h4>
              <p>
                All AI-generated images are royalty-free for use in your content. However, we recommend adding attribution to "Created with BrandWise AI" when possible.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      id: "analytics",
      title: "Analytics & Reports",
      icon: <BarChart2 className="h-5 w-5" />,
      topics: [
        {
          id: "performance-metrics",
          title: "Understanding Performance Metrics",
          content: (
            <div className="space-y-4">
              <p>
                BrandWise provides comprehensive analytics across all your content platforms, giving you valuable insights into your content performance and audience engagement.
              </p>
              <h4 className="font-semibold">Key Metrics Explained:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Engagement Rate:</span> The percentage of people who interacted with your content (likes, comments, shares) divided by total impressions.
                </li>
                <li>
                  <span className="font-medium">Reach:</span> The number of unique users who viewed your content.
                </li>
                <li>
                  <span className="font-medium">Conversion Rate:</span> The percentage of viewers who completed a desired action (signing up, downloading, purchasing).
                </li>
                <li>
                  <span className="font-medium">Content Score:</span> BrandWise's proprietary metric that evaluates content quality based on multiple factors.
                </li>
              </ul>
              <h4 className="font-semibold">Analytics Dashboard:</h4>
              <p>
                Access your analytics dashboard from the main navigation menu. You can filter data by platform, date range, content type, and more to gain specific insights.
              </p>
            </div>
          ),
        },
        {
          id: "custom-reports",
          title: "Creating Custom Reports",
          content: (
            <div className="space-y-4">
              <p>
                Build custom reports to track specific KPIs and share insights with your team or clients. BrandWise allows you to create, schedule, and export personalized reports.
              </p>
              <h4 className="font-semibold">Creating a Custom Report:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Go to the "Analytics" section and click "Custom Reports"</li>
                <li>Click "Create New Report"</li>
                <li>Select metrics to include and set date ranges</li>
                <li>Choose visualization types (charts, tables, etc.)</li>
                <li>Add custom notes or interpretations</li>
                <li>Save and name your report template</li>
              </ol>
              <h4 className="font-semibold">Report Automation:</h4>
              <p>
                Set up automated report delivery to stakeholders on a daily, weekly, or monthly basis. Reports can be delivered via email in PDF, CSV, or interactive dashboard formats.
              </p>
            </div>
          ),
        },
        {
          id: "competitor-analysis",
          title: "Competitor Analysis",
          content: (
            <div className="space-y-4">
              <p>
                Monitor your competitors' content performance and strategy with BrandWise's competitor analysis tools. Gain insights into what's working in your industry.
              </p>
              <h4 className="font-semibold">Setting Up Competitor Tracking:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Navigate to "Competitor Analysis" in the Analytics section</li>
                <li>Add competitors by entering their social handles or website URLs</li>
                <li>Select which platforms and metrics to track</li>
                <li>Set up alerts for significant competitor activities</li>
              </ol>
              <h4 className="font-semibold">Available Insights:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Content posting frequency and timing</li>
                <li>Top-performing content topics and formats</li>
                <li>Audience growth and engagement rates</li>
                <li>Keyword and hashtag strategy</li>
                <li>Share of voice in your industry</li>
              </ul>
            </div>
          ),
        },
      ],
    },
    {
      id: "billing",
      title: "Billing & Subscriptions",
      icon: <CreditCard className="h-5 w-5" />,
      topics: [
        {
          id: "pricing-plans",
          title: "Subscription Plans",
          content: (
            <div className="space-y-4">
              <p>
                BrandWise offers flexible subscription plans to meet the needs of creators and businesses of all sizes.
              </p>
              <h4 className="font-semibold">Available Plans:</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <Card>
                  <CardContent className="pt-6">
                    <h5 className="font-bold text-lg">Starter</h5>
                    <div className="my-2">
                      <span className="text-2xl font-bold">$9.99</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {["Content calendar", "Basic analytics", "3 social accounts", "Email support"].map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-primary">
                  <CardContent className="pt-6">
                    <h5 className="font-bold text-lg">Professional</h5>
                    <div className="my-2">
                      <span className="text-2xl font-bold">$19.99</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {[
                        "Everything in Starter",
                        "Advanced analytics",
                        "10 social accounts",
                        "Content creation tools",
                        "Priority support"
                      ].map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h5 className="font-bold text-lg">Enterprise</h5>
                    <div className="my-2">
                      <span className="text-2xl font-bold">$29.99</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {[
                        "Everything in Professional",
                        "Custom reporting",
                        "Unlimited social accounts",
                        "Advanced AI content suggestions",
                        "Dedicated account manager",
                        "White-label options"
                      ].map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <p className="mt-4">
                For detailed plan comparison, visit our{" "}
                <Link to="/pricing" className="text-primary underline">
                  pricing page
                </Link>
                .
              </p>
            </div>
          ),
        },
        {
          id: "payment-methods",
          title: "Payment Methods",
          content: (
            <div className="space-y-4">
              <p>
                BrandWise accepts various payment methods to make it convenient for customers worldwide to subscribe to our services.
              </p>
              <h4 className="font-semibold">Accepted Payment Methods:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Credit/Debit Cards (Visa, Mastercard, American Express, Discover)</li>
                <li>PayPal</li>
                <li>Google Pay</li>
                <li>Apple Pay</li>
                <li>Amazon Pay</li>
                <li>Bank Transfers (for annual enterprise plans)</li>
              </ul>
              <h4 className="font-semibold">Managing Payment Methods:</h4>
              <p>
                You can add, remove, or update your payment methods by navigating to Account Settings → Billing → Payment Methods. Your default payment method will be used for automatic renewals.
              </p>
            </div>
          ),
        },
        {
          id: "billing-cycle",
          title: "Billing Cycles & Invoices",
          content: (
            <div className="space-y-4">
              <p>
                Manage your billing cycles, view past invoices, and handle subscription renewals easily within your BrandWise account.
              </p>
              <h4 className="font-semibold">Billing Cycles:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Monthly billing: Charged every month on the date of initial subscription</li>
                <li>Annual billing: Charged once per year with 20% savings compared to monthly billing</li>
              </ul>
              <h4 className="font-semibold">Accessing Invoices:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Go to Account Settings → Billing → Invoices</li>
                <li>View all past and upcoming invoices</li>
                <li>Download invoices as PDF for your records</li>
                <li>Request custom invoice formats if needed for business purposes</li>
              </ol>
              <h4 className="font-semibold">Tax Information:</h4>
              <p>
                You can update your tax information and download tax receipts from the Billing section. For businesses requiring specific tax documentation, please contact our support team.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: <TriangleAlert className="h-5 w-5" />,
      topics: [
        {
          id: "account-issues",
          title: "Account Access Issues",
          content: (
            <div className="space-y-4">
              <p>
                If you're having trouble accessing your account, try these common solutions before contacting support.
              </p>
              <h4 className="font-semibold">Password Reset:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Go to the login page and click "Forgot Password"</li>
                <li>Enter the email address associated with your account</li>
                <li>Check your email for password reset instructions</li>
                <li>Click the reset link and create a new password</li>
              </ol>
              <h4 className="font-semibold">Two-Factor Authentication Issues:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ensure your device's time and date settings are correct</li>
                <li>If you've lost access to your authentication device, use one of your backup codes</li>
                <li>If you've lost your backup codes, contact support with proof of account ownership</li>
              </ul>
              <h4 className="font-semibold">Account Lockouts:</h4>
              <p>
                Accounts may be temporarily locked after multiple failed login attempts. Wait 30 minutes and try again, or contact support if the issue persists.
              </p>
            </div>
          ),
        },
        {
          id: "platform-connection",
          title: "Platform Connection Issues",
          content: (
            <div className="space-y-4">
              <p>
                If you're experiencing problems connecting your social media accounts or publishing platforms to BrandWise, try these troubleshooting steps.
              </p>
              <h4 className="font-semibold">General Connection Troubleshooting:</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Disconnect and reconnect the platform in your integrations settings</li>
                <li>Ensure you're using the correct login credentials for the platform</li>
                <li>Check if the platform is experiencing downtime (status.brandwise.ai)</li>
                <li>Verify that you've granted all necessary permissions during authorization</li>
              </ol>
              <h4 className="font-semibold">Platform-Specific Issues:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>LinkedIn:</strong> Business pages require admin access to connect properly
                </li>
                <li>
                  <strong>WordPress:</strong> Ensure the BrandWise plugin is activated and up-to-date
                </li>
                <li>
                  <strong>Medium:</strong> Check that your token hasn't expired (tokens need renewal every 60 days)
                </li>
              </ul>
            </div>
          ),
        },
        {
          id: "technical-issues",
          title: "Technical Issues",
          content: (
            <div className="space-y-4">
              <p>
                Experiencing technical issues with BrandWise? Try these common fixes before reaching out to our support team.
              </p>
              <h4 className="font-semibold">Browser-Related Issues:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Clear your browser cache and cookies</li>
                <li>Try using an incognito or private browsing window</li>
                <li>Disable browser extensions that might interfere with the application</li>
                <li>Ensure your browser is updated to the latest version</li>
              </ul>
              <h4 className="font-semibold">Application Performance:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Refresh the application page (F5 or Ctrl+R)</li>
                <li>Check your internet connection stability</li>
                <li>Try using a different browser or device</li>
                <li>Check if there are known service disruptions on our status page</li>
              </ul>
              <h4 className="font-semibold">Specific Feature Issues:</h4>
              <p>
                For issues with specific features (like AI content generation or analytics), check the feature's dedicated support documentation or contact our support team with screenshots and detailed information about the issue.
              </p>
            </div>
          ),
        },
      ],
    },
  ];

  const filteredCategories = searchQuery
    ? categories.map((category) => ({
        ...category,
        topics: category.topics.filter((topic) =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((category) => category.topics.length > 0)
    : categories;

  const faqs = [
    {
      question: "How do I connect my social media accounts?",
      answer:
        "Navigate to the 'Integrations' section in your account settings. Click on the platform you want to connect (LinkedIn, Facebook, etc.) and follow the authorization prompts. You'll need to log in to each platform and grant BrandWise permission to access your account.",
    },
    {
      question: "Can I schedule content across multiple platforms at once?",
      answer:
        "Yes! BrandWise allows you to create content once and schedule it for multiple platforms simultaneously. You can customize the format for each platform or use our AI to optimize the content for each specific platform automatically.",
    },
    {
      question: "How accurate are the analytics reports?",
      answer:
        "BrandWise analytics pulls data directly from platform APIs, ensuring high accuracy. Data is typically updated every 4 hours for most metrics, though some specialized reports may update daily. For historical data, we maintain 99.9% accuracy compared to native platform analytics.",
    },
    {
      question: "What's the difference between the subscription plans?",
      answer:
        "Our Starter plan ($9.99/month) includes basic content scheduling and analytics for up to 3 accounts. The Professional plan ($19.99/month) adds advanced analytics, AI content creation, and supports up to 10 accounts. The Enterprise plan ($29.99/month) includes unlimited accounts, custom reporting, and a dedicated account manager.",
    },
    {
      question: "Can I change my subscription plan?",
      answer:
        "Yes, you can upgrade or downgrade your subscription at any time. Changes take effect at the start of your next billing cycle. When upgrading, you'll receive prorated access to new features immediately. Visit Account Settings → Billing to change your plan.",
    },
    {
      question: "How does the AI content generator work?",
      answer:
        "Our AI content generator uses advanced language models trained on successful content across various industries. It analyzes your brand voice, audience preferences, and trending topics to generate relevant content ideas and drafts. You can guide the AI with specific prompts or let it suggest topics based on your historical performance.",
    },
    {
      question: "Is there a limit to how many posts I can schedule?",
      answer:
        "The Starter plan allows up to 50 scheduled posts per month, Professional increases this to 200 posts per month, and Enterprise offers unlimited scheduling. These limits reset at the beginning of each billing cycle.",
    },
    {
      question: "Can I invite team members to collaborate?",
      answer:
        "Yes! Professional plans include 3 team member seats, and Enterprise plans include 10 seats. Additional seats can be purchased for any plan. Team members can be assigned different roles with customized permissions for content creation, scheduling, and analytics access.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes, we offer a 14-day free trial of the Professional plan with no credit card required. This gives you full access to try out all features before making a decision. At the end of the trial, you can choose which plan works best for you.",
    },
    {
      question: "What happens to my data if I cancel my subscription?",
      answer:
        "If you cancel your subscription, you'll maintain access to BrandWise until the end of your current billing period. After that, your account becomes inactive, but we retain your data for 30 days. During this time, you can reactivate your account without losing any data. After 30 days, your data will be permanently deleted.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">How can we help you today?</h1>
            <p className="text-muted-foreground mb-6">
              Search our knowledge base or browse categories to find the answers you need
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Search for answers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support Content Section */}
      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar Categories */}
            <div className="md:col-span-1">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <div className="space-y-1">
                {filteredCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {category.icon}
                    <span>{category.title}</span>
                    <span className="ml-auto bg-muted-foreground/20 px-2 py-0.5 rounded-full text-xs">
                      {category.topics.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="md:col-span-3">
              {filteredCategories.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    {filteredCategories.find((c) => c.id === activeCategory)?.title || "Support"}
                  </h2>

                  <Tabs defaultValue={filteredCategories.find((c) => c.id === activeCategory)?.topics[0]?.id} className="w-full">
                    <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6">
                      {filteredCategories
                        .find((c) => c.id === activeCategory)
                        ?.topics.map((topic) => (
                          <TabsTrigger key={topic.id} value={topic.id}>
                            {topic.title}
                          </TabsTrigger>
                        ))}
                    </TabsList>

                    {filteredCategories
                      .find((c) => c.id === activeCategory)
                      ?.topics.map((topic) => (
                        <TabsContent key={topic.id} value={topic.id} className="p-4 border rounded-md bg-card">
                          {topic.content}
                        </TabsContent>
                      ))}
                  </Tabs>
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search query or browse through our categories
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-center">Still Need Help?</h2>
            <p className="text-center text-muted-foreground mb-8">
              Our support team is here to assist you. Fill out the form below and we'll get back to
              you as soon as possible.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help?"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Please describe your issue in detail..."
                  rows={6}
                  value={contactForm.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">Submit Support Request</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
