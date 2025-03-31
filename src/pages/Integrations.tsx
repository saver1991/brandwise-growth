
import { useEffect } from "react";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  Share2, 
  Video, 
  AtSign, 
  Slack,
  Mail,
  BarChart4,
  Calendar,
  MessageSquare
} from "lucide-react";

const SOCIAL_INTEGRATIONS = [
  { 
    name: "Facebook", 
    icon: <Facebook className="h-10 w-10 text-blue-600" />, 
    description: "Connect your Facebook pages and groups to schedule posts and analyze performance.", 
    features: [
      "Schedule posts to pages, groups, and profiles",
      "Track engagement metrics for all your content",
      "Respond to comments and messages from BrandWise",
      "Analyze audience demographics and interests"
    ],
    category: "social" 
  },
  { 
    name: "Instagram", 
    icon: <Instagram className="h-10 w-10 text-pink-600" />, 
    description: "Schedule and publish Instagram posts directly from BrandWise.", 
    features: [
      "Auto-publish posts, stories, and reels",
      "Plan and visualize your Instagram grid",
      "Hashtag recommendations for better reach",
      "Track follower growth and engagement rates"
    ],
    category: "social" 
  },
  { 
    name: "LinkedIn", 
    icon: <Linkedin className="h-10 w-10 text-blue-800" />, 
    description: "Publish professional content to your company page and personal profile.", 
    features: [
      "Create and schedule content for company pages",
      "Publish articles and documents",
      "Track engagement from professional audiences",
      "Analyze post performance by industry and job title"
    ],
    category: "social" 
  },
  { 
    name: "Twitter", 
    icon: <Twitter className="h-10 w-10 text-blue-400" />, 
    description: "Schedule tweets and analyze your Twitter engagement metrics.", 
    features: [
      "Schedule and publish tweets with media",
      "Create and manage Twitter threads",
      "Monitor mentions and engage with followers",
      "Analyze hashtag performance and reach"
    ],
    category: "social" 
  },
  { 
    name: "YouTube", 
    icon: <Youtube className="h-10 w-10 text-red-600" />, 
    description: "Manage your YouTube channel and videos all in one place.", 
    features: [
      "Schedule video uploads and premieres",
      "Track video performance metrics",
      "Manage comments and audience engagement",
      "Analyze viewer demographics and watch times"
    ],
    category: "social" 
  },
  { 
    name: "Pinterest", 
    icon: <Share2 className="h-10 w-10 text-red-700" />, 
    description: "Create and schedule pins to boost your visual marketing.", 
    features: [
      "Schedule pins to boards and create carousels",
      "Track pin performance and saves",
      "Analyze traffic from Pinterest to your website",
      "Research trending content in your niche"
    ],
    category: "social" 
  },
  { 
    name: "TikTok", 
    icon: <Video className="h-10 w-10 text-black" />, 
    description: "Plan your TikTok content strategy and analyze performance.", 
    features: [
      "Schedule TikTok video uploads",
      "Track video performance and engagement",
      "Identify trending sounds and hashtags",
      "Analyze audience demographics and interests"
    ],
    category: "social" 
  }
];

const EMAIL_INTEGRATIONS = [
  { 
    name: "Mailchimp", 
    icon: <AtSign className="h-10 w-10 text-yellow-500" />, 
    description: "Sync your email campaigns with your content calendar.", 
    features: [
      "Coordinate email and social campaigns",
      "Import subscriber analytics into BrandWise",
      "Create content that works across channels",
      "Track campaign performance holistically"
    ],
    category: "email" 
  },
  { 
    name: "HubSpot", 
    icon: <Mail className="h-10 w-10 text-orange-600" />, 
    description: "Connect your HubSpot marketing campaigns with BrandWise.", 
    features: [
      "Sync contacts between platforms",
      "Coordinate inbound and social strategies",
      "Track lead sources from social campaigns",
      "Create integrated marketing reports"
    ],
    category: "email" 
  },
  { 
    name: "Mailerlite", 
    icon: <Mail className="h-10 w-10 text-green-600" />, 
    description: "Integrate your email marketing with your content strategy.", 
    features: [
      "Sync subscriber lists and segments",
      "Coordinate email newsletters with social posts",
      "Track cross-channel engagement",
      "Create consistent messaging across platforms"
    ],
    category: "email" 
  }
];

const ANALYTICS_INTEGRATIONS = [
  { 
    name: "Google Analytics", 
    icon: <BarChart4 className="h-10 w-10 text-yellow-600" />, 
    description: "Track website performance alongside your content metrics.", 
    features: [
      "Correlate social media campaigns with website traffic",
      "Track conversion paths from social posts",
      "Measure ROI of social media initiatives",
      "Create comprehensive cross-channel reports"
    ],
    category: "analytics" 
  },
  { 
    name: "Google Search Console", 
    icon: <BarChart4 className="h-10 w-10 text-blue-600" />, 
    description: "Monitor your search engine visibility and performance.", 
    features: [
      "Track SEO impact of your content strategy",
      "Identify keywords driving traffic to your content",
      "Optimize social content for search visibility",
      "Coordinate SEO and social media efforts"
    ],
    category: "analytics" 
  }
];

const OTHER_INTEGRATIONS = [
  { 
    name: "Slack", 
    icon: <Slack className="h-10 w-10 text-purple-600" />, 
    description: "Get notifications and collaborate with your team via Slack.", 
    features: [
      "Receive alerts about campaign performance",
      "Coordinate with team members on content approval",
      "Get notifications about scheduled posts",
      "Share reports directly to channels"
    ],
    category: "other" 
  },
  { 
    name: "Google Calendar", 
    icon: <Calendar className="h-10 w-10 text-green-600" />, 
    description: "Sync your content calendar with Google Calendar.", 
    features: [
      "View your content schedule alongside meetings",
      "Set reminders for content creation deadlines",
      "Coordinate team availability for content creation",
      "Plan content around key events and holidays"
    ],
    category: "other" 
  },
  { 
    name: "Zapier", 
    icon: <MessageSquare className="h-10 w-10 text-orange-500" />, 
    description: "Connect BrandWise to thousands of other apps through Zapier.", 
    features: [
      "Create custom workflows with 3000+ applications",
      "Automate repetitive tasks in your content workflow",
      "Send data between BrandWise and other tools",
      "Build custom integrations without coding"
    ],
    category: "other" 
  }
];

const ALL_INTEGRATIONS = [
  ...SOCIAL_INTEGRATIONS,
  ...EMAIL_INTEGRATIONS,
  ...ANALYTICS_INTEGRATIONS,
  ...OTHER_INTEGRATIONS
];

const Integrations = () => {
  useEffect(() => {
    document.title = "Integrations | BrandWise";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      
      <div className="container mx-auto px-4 py-12">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 gradient-heading">
            Connect Your Marketing Stack
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            BrandWise integrates with your favorite tools to streamline your content creation
            and marketing workflows. Connect once and manage everything from a single dashboard.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Social Media Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOCIAL_INTEGRATIONS.map((integration) => (
              <Card key={integration.name} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">{integration.icon}</div>
                    <h3 className="text-xl font-bold">{integration.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{integration.description}</p>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                    {integration.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-primary">Learn more about our {integration.name} integration</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Email Marketing Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EMAIL_INTEGRATIONS.map((integration) => (
              <Card key={integration.name} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">{integration.icon}</div>
                    <h3 className="text-xl font-bold">{integration.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{integration.description}</p>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                    {integration.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-primary">Learn more about our {integration.name} integration</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Analytics Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ANALYTICS_INTEGRATIONS.map((integration) => (
              <Card key={integration.name} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">{integration.icon}</div>
                    <h3 className="text-xl font-bold">{integration.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{integration.description}</p>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                    {integration.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-primary">Learn more about our {integration.name} integration</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Other Useful Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OTHER_INTEGRATIONS.map((integration) => (
              <Card key={integration.name} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">{integration.icon}</div>
                    <h3 className="text-xl font-bold">{integration.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{integration.description}</p>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                    {integration.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-primary">Learn more about our {integration.name} integration</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-muted rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Integration?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Don't see the integration you need? Our team can build custom integrations
            for your specific workflow requirements.
          </p>
          <p className="text-primary font-semibold">Contact our solutions team to discuss your needs</p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Integrations;
