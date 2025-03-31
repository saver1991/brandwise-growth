
import { useEffect, useState } from "react";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MessageSquare, 
  Mail, 
  FileText, 
  Phone, 
  HelpCircle,
  ChevronDown,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Share2,
  Video,
  AtSign,
  Slack,
  BarChart4,
  Calendar
} from "lucide-react";

const faqs = [
  {
    question: "How do I connect my social media accounts?",
    answer: "You can connect your social media accounts by navigating to the Integrations page and clicking on the platform you want to connect. Follow the authentication steps to grant BrandWise access to your account."
  },
  {
    question: "Can I schedule posts across multiple platforms?",
    answer: "Yes, BrandWise allows you to schedule content across multiple platforms simultaneously. Simply create your content, select the platforms you want to publish to, and set your preferred date and time."
  },
  {
    question: "How does the AI content generation work?",
    answer: "Our AI content generation tool uses advanced natural language processing to help you create engaging content. You can provide a topic and some keywords, and the AI will generate content ideas or full drafts that you can edit and customize."
  },
  {
    question: "What analytics are available in BrandWise?",
    answer: "BrandWise provides comprehensive analytics including engagement metrics (likes, comments, shares), audience growth, best performing content, optimal posting times, and demographic insights across all your connected platforms."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription by going to your Account Settings and selecting the Billing section. Click on 'Cancel Subscription' and follow the prompts. Your access will continue until the end of your current billing period."
  },
  {
    question: "Is there a limit to how many posts I can schedule?",
    answer: "The number of posts you can schedule depends on your subscription plan. Basic plans include up to 100 scheduled posts per month, while Premium and Professional plans offer unlimited scheduling."
  }
];

const integrationHelp = [
  {
    id: "facebook",
    title: "Facebook Integration",
    icon: <Facebook className="h-10 w-10 text-blue-600" />,
    description: "Connect your Facebook pages and groups to schedule posts and analyze performance.",
    sections: [
      {
        title: "Getting Started with Facebook Integration",
        content: "To connect your Facebook account to BrandWise, navigate to the Integrations page and click on Facebook. You'll need to authorize BrandWise to access your Facebook accounts by logging in and accepting the permissions. Once connected, you can manage all your Facebook pages and groups from the BrandWise dashboard."
      },
      {
        title: "Features and Capabilities",
        content: "With the Facebook integration, you can schedule posts to pages, groups, and profiles, track engagement metrics for all your content, respond to comments and messages directly from BrandWise, and analyze audience demographics and interests to optimize your content strategy."
      },
      {
        title: "Troubleshooting Common Issues",
        content: "If you're experiencing issues with your Facebook connection, try disconnecting and reconnecting the integration. Make sure you've granted all the necessary permissions. For business pages, ensure you have admin access to the page you're trying to manage."
      }
    ]
  },
  {
    id: "instagram",
    title: "Instagram Integration",
    icon: <Instagram className="h-10 w-10 text-pink-600" />,
    description: "Schedule and publish Instagram posts directly from BrandWise.",
    sections: [
      {
        title: "Setting Up Instagram Integration",
        content: "To connect Instagram, you'll need a Facebook Business account linked to your Instagram profile. Navigate to Integrations, select Instagram, and follow the authorization steps. Once connected, BrandWise can publish directly to your Instagram account."
      },
      {
        title: "Content Publishing Options",
        content: "With BrandWise, you can auto-publish posts, stories, and reels to Instagram. Our visual planner helps you design and visualize your Instagram grid before publishing. We also provide hashtag recommendations to maximize your reach."
      },
      {
        title: "Analytics and Growth",
        content: "Track follower growth and engagement rates over time. Our analytics provide insights into your best-performing content types, optimal posting times, and audience demographics to help you refine your Instagram strategy."
      }
    ]
  },
  {
    id: "linkedin",
    title: "LinkedIn Integration",
    icon: <Linkedin className="h-10 w-10 text-blue-800" />,
    description: "Publish professional content to your company page and personal profile.",
    sections: [
      {
        title: "Connecting LinkedIn to BrandWise",
        content: "To connect your LinkedIn account, go to the Integrations page, select LinkedIn, and authorize BrandWise with your credentials. You can connect both personal profiles and company pages that you manage."
      },
      {
        title: "Creating Professional Content",
        content: "Our LinkedIn editor is optimized for professional content. You can create and schedule posts, articles, and documents. The editor includes formatting options specifically designed for LinkedIn's platform."
      },
      {
        title: "Advanced Analytics",
        content: "BrandWise provides detailed LinkedIn analytics, including engagement metrics by industry and job title. This helps you understand which content resonates with specific professional audiences and optimize accordingly."
      }
    ]
  },
  {
    id: "twitter",
    title: "Twitter Integration",
    icon: <Twitter className="h-10 w-10 text-blue-400" />,
    description: "Schedule tweets and analyze your Twitter engagement metrics.",
    sections: [
      {
        title: "Connecting Your Twitter Account",
        content: "Navigate to Integrations, select Twitter, and authorize BrandWise to access your account. Once connected, you can manage multiple Twitter profiles from a single dashboard."
      },
      {
        title: "Tweet Management",
        content: "Schedule and publish tweets with media attachments, create and manage Twitter threads, and monitor mentions to engage with followers. Our editor supports all Twitter-specific features like polls and hashtags."
      },
      {
        title: "Hashtag Analytics",
        content: "Our Twitter integration includes hashtag performance tracking and reach analytics. We help you identify trending topics in your niche and optimize your hashtag strategy for maximum visibility."
      }
    ]
  },
  {
    id: "youtube",
    title: "YouTube Integration",
    icon: <Youtube className="h-10 w-10 text-red-600" />,
    description: "Manage your YouTube channel and videos all in one place.",
    sections: [
      {
        title: "Linking Your YouTube Channel",
        content: "To connect your YouTube channel, go to Integrations and select YouTube. You'll need to sign in with your Google account and grant BrandWise permission to manage your YouTube content."
      },
      {
        title: "Video Management",
        content: "Schedule video uploads and premieres in advance, manage your publishing calendar, and coordinate video releases with your other social content. BrandWise helps you maintain a consistent posting schedule."
      },
      {
        title: "Performance Tracking",
        content: "Track video performance metrics including views, watch time, audience retention, and engagement. Analyze viewer demographics to understand who's watching your content and refine your video strategy."
      }
    ]
  },
  {
    id: "pinterest",
    title: "Pinterest Integration",
    icon: <Share2 className="h-10 w-10 text-red-700" />,
    description: "Create and schedule pins to boost your visual marketing.",
    sections: [
      {
        title: "Setting Up Pinterest Integration",
        content: "Connect your Pinterest business account by navigating to Integrations and selecting Pinterest. Authorize BrandWise to manage your pins and boards. You can connect multiple Pinterest accounts if needed."
      },
      {
        title: "Pin Creation and Scheduling",
        content: "Create and schedule pins to boards, design carousels, and plan your Pinterest content calendar. Our visual editor is optimized for Pinterest's dimensions and best practices."
      },
      {
        title: "Traffic and Conversion Tracking",
        content: "Track pin performance, saves, and website traffic generated from Pinterest. Our analytics help you identify which content drives the most engagement and conversions from Pinterest to your website."
      }
    ]
  },
  {
    id: "tiktok",
    title: "TikTok Integration",
    icon: <Video className="h-10 w-10 text-black" />,
    description: "Plan your TikTok content strategy and analyze performance.",
    sections: [
      {
        title: "Connecting TikTok to BrandWise",
        content: "To integrate TikTok, navigate to the Integrations page, select TikTok, and follow the authorization steps. Once connected, you can manage your TikTok content alongside other platforms."
      },
      {
        title: "Content Planning",
        content: "Schedule TikTok video uploads, plan your content calendar, and coordinate with your broader social media strategy. Our platform helps you maintain consistency across all channels."
      },
      {
        title: "Trend Analysis",
        content: "Our TikTok integration helps you identify trending sounds and hashtags in your niche. Stay ahead of the curve by getting insights into what's gaining traction on the platform."
      }
    ]
  },
  {
    id: "mailchimp",
    title: "Mailchimp Integration",
    icon: <AtSign className="h-10 w-10 text-yellow-500" />,
    description: "Sync your email campaigns with your content calendar.",
    sections: [
      {
        title: "Connecting Mailchimp",
        content: "To integrate Mailchimp, go to Integrations, select Mailchimp, and enter your API key. Once connected, you can coordinate email campaigns with your social media content calendar."
      },
      {
        title: "Campaign Coordination",
        content: "Coordinate email and social campaigns for consistent messaging across all channels. Import subscriber analytics into BrandWise to get a complete view of your audience engagement."
      },
      {
        title: "Performance Analysis",
        content: "Track campaign performance holistically by combining email metrics with social media engagement. Understand how your audience interacts with your content across different channels."
      }
    ]
  },
  {
    id: "hubspot",
    title: "HubSpot Integration",
    icon: <Mail className="h-10 w-10 text-orange-600" />,
    description: "Connect your HubSpot marketing campaigns with BrandWise.",
    sections: [
      {
        title: "Setting Up HubSpot Integration",
        content: "Connect your HubSpot account by navigating to Integrations and selecting HubSpot. Authorize BrandWise to access your HubSpot data and start synchronizing your marketing efforts."
      },
      {
        title: "Contact Management",
        content: "Sync contacts between platforms to ensure your audience data is consistent. Track lead sources from social campaigns and understand how your social media efforts contribute to your sales pipeline."
      },
      {
        title: "Integrated Marketing",
        content: "Coordinate inbound and social strategies for a cohesive marketing approach. Create integrated marketing reports that combine data from HubSpot and social media to measure overall campaign effectiveness."
      }
    ]
  },
  {
    id: "mailerlite",
    title: "MailerLite Integration",
    icon: <Mail className="h-10 w-10 text-green-600" />,
    description: "Integrate your email marketing with your content strategy.",
    sections: [
      {
        title: "Connecting MailerLite",
        content: "To integrate MailerLite, go to Integrations, select MailerLite, and enter your API key. Once connected, you can coordinate email newsletters with your social posts."
      },
      {
        title: "Subscriber Management",
        content: "Sync subscriber lists and segments between MailerLite and BrandWise. Ensure your audience targeting is consistent across email and social channels."
      },
      {
        title: "Content Coordination",
        content: "Create consistent messaging across platforms by coordinating email newsletters with social posts. Our calendar view shows both email and social campaigns in one place."
      }
    ]
  },
  {
    id: "google-analytics",
    title: "Google Analytics Integration",
    icon: <BarChart4 className="h-10 w-10 text-yellow-600" />,
    description: "Track website performance alongside your content metrics.",
    sections: [
      {
        title: "Setting Up Google Analytics",
        content: "Connect your Google Analytics account by navigating to Integrations, selecting Google Analytics, and authorizing BrandWise through your Google account. You can link multiple properties if needed."
      },
      {
        title: "Campaign Tracking",
        content: "Correlate social media campaigns with website traffic to understand which content drives the most visitors to your site. Track conversion paths from social posts to measure ROI."
      },
      {
        title: "Comprehensive Reporting",
        content: "Create comprehensive cross-channel reports that combine social media metrics with website performance data. Get a complete picture of your digital marketing effectiveness."
      }
    ]
  },
  {
    id: "google-search-console",
    title: "Google Search Console Integration",
    icon: <BarChart4 className="h-10 w-10 text-blue-600" />,
    description: "Monitor your search engine visibility and performance.",
    sections: [
      {
        title: "Connecting Search Console",
        content: "To integrate Google Search Console, go to Integrations, select Search Console, and authorize through your Google account. Once connected, you can view search performance data alongside social metrics."
      },
      {
        title: "SEO and Social Coordination",
        content: "Track SEO impact of your content strategy and identify keywords driving traffic to your content. Optimize social content for search visibility to maximize your reach."
      },
      {
        title: "Content Strategy Optimization",
        content: "Use search data to inform your social content strategy. Identify topics with search potential and create social content that reinforces your SEO efforts."
      }
    ]
  },
  {
    id: "slack",
    title: "Slack Integration",
    icon: <Slack className="h-10 w-10 text-purple-600" />,
    description: "Get notifications and collaborate with your team via Slack.",
    sections: [
      {
        title: "Setting Up Slack Integration",
        content: "Connect Slack by navigating to Integrations, selecting Slack, and authorizing BrandWise to send messages to your workspace. You can select which channels should receive notifications."
      },
      {
        title: "Notification Management",
        content: "Receive alerts about campaign performance, scheduled posts, and content approvals directly in Slack. Keep your team informed without having to log into BrandWise."
      },
      {
        title: "Team Collaboration",
        content: "Coordinate with team members on content approval and share reports directly to channels. Streamline your team's workflow by integrating social media management with your existing communication tools."
      }
    ]
  },
  {
    id: "google-calendar",
    title: "Google Calendar Integration",
    icon: <Calendar className="h-10 w-10 text-green-600" />,
    description: "Sync your content calendar with Google Calendar.",
    sections: [
      {
        title: "Connecting Google Calendar",
        content: "To integrate Google Calendar, navigate to Integrations, select Google Calendar, and authorize through your Google account. You can choose which calendar to sync with BrandWise."
      },
      {
        title: "Calendar Synchronization",
        content: "View your content schedule alongside meetings and other events. Set reminders for content creation deadlines and coordinate team availability for content production."
      },
      {
        title: "Event Planning",
        content: "Plan content around key events and holidays by seeing everything in one calendar. Ensure your content strategy aligns with important dates and company initiatives."
      }
    ]
  },
  {
    id: "zapier",
    title: "Zapier Integration",
    icon: <MessageSquare className="h-10 w-10 text-orange-500" />,
    description: "Connect BrandWise to thousands of other apps through Zapier.",
    sections: [
      {
        title: "Setting Up Zapier Integration",
        content: "Connect Zapier by navigating to Integrations and selecting Zapier. You'll receive an API key to use when creating Zaps that connect BrandWise with other applications."
      },
      {
        title: "Custom Workflow Creation",
        content: "Create custom workflows with 3000+ applications without coding. Automate repetitive tasks in your content workflow and send data between BrandWise and other tools."
      },
      {
        title: "Integration Examples",
        content: "Popular Zapier integrations include connecting BrandWise to CRMs, project management tools, customer support platforms, and more. The possibilities are virtually limitless."
      }
    ]
  }
];

export default function Support() {
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);
  const [activeIntegration, setActiveIntegration] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("faq");
  const [activeDocCategory, setActiveDocCategory] = useState("integrations");
  
  useEffect(() => {
    document.title = "Support | BrandWise";
    
    // Check if we have an integration ID in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const integrationId = urlParams.get('integration');
    if (integrationId) {
      setActiveIntegration(integrationId);
      setActiveTab("documentation");
      setActiveDocCategory("integrations");
      
      // Scroll to the integration section
      setTimeout(() => {
        const integrationElement = document.getElementById(`integration-${integrationId}`);
        if (integrationElement) {
          integrationElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);
  
  const toggleFAQ = (index: number) => {
    if (openFAQs.includes(index)) {
      setOpenFAQs(openFAQs.filter(i => i !== index));
    } else {
      setOpenFAQs([...openFAQs, index]);
    }
  };
  
  // Filter integrations by search query
  const filteredIntegrations = searchQuery 
    ? integrationHelp.filter(
        integration => integration.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : integrationHelp;

  const documentationCategories = [
    { id: "getting-started", title: "Getting Started", icon: <FileText className="h-5 w-5" /> },
    { id: "integrations", title: "Platform Integrations", icon: <Share2 className="h-5 w-5" /> },
    { id: "content-creation", title: "Content Creation", icon: <FileText className="h-5 w-5" /> },
    { id: "analytics", title: "Analytics", icon: <BarChart4 className="h-5 w-5" /> },
    { id: "account", title: "Account Management", icon: <HelpCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Search our knowledge base, browse the FAQs, or get in touch with our support team.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Search for answers..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Button className="absolute right-1 top-1 h-10">
              Search
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-16">
          <TabsList className="grid grid-cols-3 max-w-lg mx-auto mb-8">
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="documentation" id="documentation-tab">Documentation</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq">
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="cursor-pointer overflow-hidden">
                  <div 
                    className="p-6 flex justify-between items-center"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform ${openFAQs.includes(index) ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {openFAQs.includes(index) && (
                    <CardContent className="pt-0 pb-6 text-muted-foreground">
                      {faq.answer}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="documentation">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Documentation Sidebar */}
              <div className="md:w-1/4">
                <div className="sticky top-24 border rounded-lg overflow-hidden">
                  <div className="p-4 bg-muted/50">
                    <h3 className="font-medium">Categories</h3>
                  </div>
                  <div className="p-2">
                    {documentationCategories.map((category) => (
                      <button
                        key={category.id}
                        className={`w-full flex items-center gap-2 p-3 text-left rounded-md transition-colors ${
                          activeDocCategory === category.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent"
                        }`}
                        onClick={() => setActiveDocCategory(category.id)}
                      >
                        {category.icon}
                        <span>{category.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Documentation Content */}
              <div className="md:w-3/4">
                {activeDocCategory === "getting-started" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Getting Started with BrandWise</h2>
                    <Card className="mb-8">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Setting Up Your Account</h3>
                        <p className="text-muted-foreground mb-4">
                          Learn how to create your account, set up your profile, and get started with BrandWise.
                        </p>
                        <Button>View Guide</Button>
                      </CardContent>
                    </Card>
                    <Card className="mb-8">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Creating Your First Campaign</h3>
                        <p className="text-muted-foreground mb-4">
                          Learn how to create, schedule, and publish your first content campaign.
                        </p>
                        <Button>View Guide</Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {activeDocCategory === "integrations" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Platform Integrations</h2>
                    
                    {filteredIntegrations.length > 0 ? (
                      filteredIntegrations.map((integration) => (
                        <Card key={integration.id} id={`integration-${integration.id}`} className="mb-8">
                          <CardContent className="p-6">
                            <div className="flex items-start mb-6">
                              <div className="mr-4">{integration.icon}</div>
                              <div>
                                <h3 className="text-2xl font-bold">{integration.title}</h3>
                                <p className="text-muted-foreground">{integration.description}</p>
                              </div>
                            </div>
                            
                            {integration.sections.map((section, index) => (
                              <div key={index} className="mb-6">
                                <h4 className="text-xl font-semibold mb-2">{section.title}</h4>
                                <p className="text-muted-foreground">{section.content}</p>
                              </div>
                            ))}
                            
                            <div className="mt-6 pt-6 border-t">
                              <h4 className="text-lg font-semibold mb-2">Need more help?</h4>
                              <p className="text-muted-foreground mb-4">
                                If you're still having issues with this integration, our support team is here to help.
                              </p>
                              <Button className="mr-2">Contact Support</Button>
                              <Button variant="outline">View API Documentation</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center p-8 bg-muted rounded-lg">
                        <p className="text-lg mb-4">No integration guides match your search.</p>
                        <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
                      </div>
                    )}
                  </div>
                )}
                
                {activeDocCategory === "content-creation" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Content Creation Guides</h2>
                    <Card className="mb-8">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Creating Effective Social Media Content</h3>
                        <p className="text-muted-foreground mb-4">
                          Learn how to create engaging content that resonates with your audience.
                        </p>
                        <Button>View Guide</Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {activeDocCategory === "analytics" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Analytics Guides</h2>
                    <Card className="mb-8">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Understanding Your Analytics Dashboard</h3>
                        <p className="text-muted-foreground mb-4">
                          Learn how to interpret and use the analytics data to improve your content strategy.
                        </p>
                        <Button>View Guide</Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {activeDocCategory === "account" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Account Management</h2>
                    <Card className="mb-8">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Managing Your Subscription</h3>
                        <p className="text-muted-foreground mb-4">
                          Learn how to update your subscription, billing information, and account details.
                        </p>
                        <Button>View Guide</Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Live Chat</h3>
                  <p className="text-muted-foreground mb-4">Chat with our support team in real-time.</p>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Email Support</h3>
                  <p className="text-muted-foreground mb-4">Send us an email and we'll respond within 24 hours.</p>
                  <Button variant="outline" className="w-full">Send Email</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Phone Support</h3>
                  <p className="text-muted-foreground mb-4">For Premium and Enterprise customers only.</p>
                  <Button variant="outline" className="w-full">Schedule Call</Button>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Send us a message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="Your email address" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="What is your question about?" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea 
                      id="message" 
                      placeholder="Please describe your issue in detail" 
                      className="w-full h-32 rounded-md border border-input bg-background px-3 py-2"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full md:w-auto">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is available Monday through Friday, 9am-6pm EST.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="flex gap-2">
              <HelpCircle size={18} />
              <span>Help Center</span>
            </Button>
            <Button variant="outline" className="flex gap-2">
              <MessageSquare size={18} />
              <span>Community Forum</span>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
