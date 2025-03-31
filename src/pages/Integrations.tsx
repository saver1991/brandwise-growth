
import { useEffect } from "react";
import AuthHeader from "@/components/AuthHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  Pinterest, 
  TikTok, 
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
    category: "social" 
  },
  { 
    name: "Instagram", 
    icon: <Instagram className="h-10 w-10 text-pink-600" />, 
    description: "Schedule and publish Instagram posts directly from BrandWise.", 
    category: "social" 
  },
  { 
    name: "LinkedIn", 
    icon: <Linkedin className="h-10 w-10 text-blue-800" />, 
    description: "Publish professional content to your company page and personal profile.", 
    category: "social" 
  },
  { 
    name: "Twitter", 
    icon: <Twitter className="h-10 w-10 text-blue-400" />, 
    description: "Schedule tweets and analyze your Twitter engagement metrics.", 
    category: "social" 
  },
  { 
    name: "YouTube", 
    icon: <Youtube className="h-10 w-10 text-red-600" />, 
    description: "Manage your YouTube channel and videos all in one place.", 
    category: "social" 
  },
  { 
    name: "Pinterest", 
    icon: <Pinterest className="h-10 w-10 text-red-700" />, 
    description: "Create and schedule pins to boost your visual marketing.", 
    category: "social" 
  },
  { 
    name: "TikTok", 
    icon: <TikTok className="h-10 w-10 text-black" />, 
    description: "Plan your TikTok content strategy and analyze performance.", 
    category: "social" 
  }
];

const EMAIL_INTEGRATIONS = [
  { 
    name: "Mailchimp", 
    icon: <AtSign className="h-10 w-10 text-yellow-500" />, 
    description: "Sync your email campaigns with your content calendar.", 
    category: "email" 
  },
  { 
    name: "HubSpot", 
    icon: <Mail className="h-10 w-10 text-orange-600" />, 
    description: "Connect your HubSpot marketing campaigns with BrandWise.", 
    category: "email" 
  },
  { 
    name: "Mailerlite", 
    icon: <Mail className="h-10 w-10 text-green-600" />, 
    description: "Integrate your email marketing with your content strategy.", 
    category: "email" 
  }
];

const ANALYTICS_INTEGRATIONS = [
  { 
    name: "Google Analytics", 
    icon: <BarChart4 className="h-10 w-10 text-yellow-600" />, 
    description: "Track website performance alongside your content metrics.", 
    category: "analytics" 
  },
  { 
    name: "Google Search Console", 
    icon: <BarChart4 className="h-10 w-10 text-blue-600" />, 
    description: "Monitor your search engine visibility and performance.", 
    category: "analytics" 
  }
];

const OTHER_INTEGRATIONS = [
  { 
    name: "Slack", 
    icon: <Slack className="h-10 w-10 text-purple-600" />, 
    description: "Get notifications and collaborate with your team via Slack.", 
    category: "other" 
  },
  { 
    name: "Google Calendar", 
    icon: <Calendar className="h-10 w-10 text-green-600" />, 
    description: "Sync your content calendar with Google Calendar.", 
    category: "other" 
  },
  { 
    name: "Zapier", 
    icon: <MessageSquare className="h-10 w-10 text-orange-500" />, 
    description: "Connect BrandWise to thousands of other apps through Zapier.", 
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
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">{integration.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{integration.name}</h3>
                  <p className="text-muted-foreground mb-6">{integration.description}</p>
                  <Button>Connect</Button>
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
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">{integration.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{integration.name}</h3>
                  <p className="text-muted-foreground mb-6">{integration.description}</p>
                  <Button>Connect</Button>
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
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">{integration.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{integration.name}</h3>
                  <p className="text-muted-foreground mb-6">{integration.description}</p>
                  <Button>Connect</Button>
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
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">{integration.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{integration.name}</h3>
                  <p className="text-muted-foreground mb-6">{integration.description}</p>
                  <Button>Connect</Button>
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
          <Button size="lg">Contact Us</Button>
        </section>
      </div>
    </div>
  );
};

export default Integrations;
