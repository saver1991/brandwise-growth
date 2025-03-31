import { useEffect, useState } from "react";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
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
  MessageSquare,
  Loader2
} from "lucide-react";
import { linkedinService } from "@/services/linkedinService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SOCIAL_INTEGRATIONS = [
  { 
    id: "facebook",
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
    id: "instagram",
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
    id: "linkedin",
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
    id: "twitter",
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
    id: "youtube",
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
    id: "pinterest",
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
    id: "tiktok",
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
    id: "mailchimp",
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
    id: "hubspot",
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
    id: "mailerlite",
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
    id: "google-analytics",
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
    id: "google-search-console",
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
    id: "slack",
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
    id: "google-calendar",
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
    id: "zapier",
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
  const [linkedinStatus, setLinkedinStatus] = useState<{
    isChecking: boolean;
    isConnected: boolean;
  }>({
    isChecking: true,
    isConnected: false
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Integrations | BrandWise";
    checkLinkedInConnection();
  }, []);
  
  const checkLinkedInConnection = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLinkedinStatus({ isChecking: false, isConnected: false });
        return;
      }
      
      const isConnected = await linkedinService.isConnected(user.id);
      setLinkedinStatus({ isChecking: false, isConnected });
    } catch (error) {
      console.error("Error checking LinkedIn connection:", error);
      setLinkedinStatus({ isChecking: false, isConnected: false });
    }
  };
  
  const handleLinkedInConnect = async () => {
    try {
      const authUrl = await linkedinService.getAuthUrl();
      if (authUrl) {
        window.location.href = authUrl;
      } else {
        toast.error("Failed to initialize LinkedIn connection");
      }
    } catch (error) {
      console.error("Error connecting to LinkedIn:", error);
      toast.error("Failed to connect to LinkedIn");
    }
  };
  
  const handleViewLinkedIn = () => {
    navigate("/linkedin");
  };

  const IntegrationCard = ({ integration }: { integration: typeof SOCIAL_INTEGRATIONS[0] }) => {
    if (integration.id === "linkedin") {
      return (
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
            <div className="mt-6">
              {linkedinStatus.isChecking ? (
                <Button disabled className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking connection...
                </Button>
              ) : linkedinStatus.isConnected ? (
                <div className="space-y-2">
                  <Button 
                    onClick={handleViewLinkedIn} 
                    className="w-full bg-[#0077B5] hover:bg-[#0077B5]/90"
                  >
                    <Linkedin className="mr-2 h-4 w-4" /> View LinkedIn Dashboard
                  </Button>
                  <p className="text-xs text-center text-green-600">✓ Connected</p>
                </div>
              ) : (
                <Button 
                  onClick={handleLinkedInConnect} 
                  className="w-full bg-[#0077B5] hover:bg-[#0077B5]/90"
                >
                  <Linkedin className="mr-2 h-4 w-4" /> Connect LinkedIn
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      );
    }
    
    return (
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
          <Link 
            to={`/support?integration=${integration.id}`} 
            className="text-sm text-primary hover:underline"
          >
            Learn more about our {integration.name} integration
          </Link>
        </CardContent>
      </Card>
    );
  };

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
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Email Marketing Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EMAIL_INTEGRATIONS.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Analytics Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ANALYTICS_INTEGRATIONS.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Other Useful Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OTHER_INTEGRATIONS.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        </section>

        <section className="bg-muted rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Integration?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Don't see the integration you need? Our team can build custom integrations
            for your specific workflow requirements.
          </p>
          <Link to="/support?integration=custom" className="text-primary font-semibold hover:underline">
            Contact our solutions team to discuss your needs
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Integrations;
