
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Linkedin, BarChart4, MessageSquare, Key } from "lucide-react";
import { 
  PlatformType, 
  getPlatformCredentials, 
} from "@/services/credentialsService";
import type { PlatformCredential } from "@/services/credentialsService";
import PlatformCredentialCard from "@/components/PlatformCredentialCard";

const Credentials = () => {
  const [credentials, setCredentials] = useState<Record<string, PlatformCredential>>(() => {
    const platforms: PlatformType[] = ['linkedin', 'medium', 'googleAnalytics'];
    const creds: Record<string, PlatformCredential> = {};
    
    platforms.forEach(platform => {
      creds[platform] = getPlatformCredentials(platform);
    });
    
    return creds;
  });

  const updateCredential = (platform: string, field: string, value: string) => {
    setCredentials(prev => {
      // Convert string 'true'/'false' to boolean for connected property
      const fieldValue = field === 'connected' ? value === 'true' : value;
      
      return {
        ...prev,
        [platform]: {
          ...prev[platform],
          [field]: fieldValue
        }
      };
    });
  };

  const platformConfigs = {
    linkedin: {
      title: "LinkedIn",
      description: "Connect your LinkedIn profile to track and analyze your professional growth.",
      icon: <Linkedin className="h-5 w-5 text-[#0077B5]" />,
      color: "text-[#0077B5]",
      fields: [
        { name: "apiKey", label: "Client ID" },
        { name: "apiSecret", label: "Client Secret" }
      ],
      helpUrl: "https://www.linkedin.com/developers/apps"
    },
    medium: {
      title: "Medium",
      description: "Connect your Medium account to track article performance and audience growth.",
      icon: <MessageSquare className="h-5 w-5 text-[#00AB6C]" />,
      color: "text-[#00AB6C]",
      fields: [
        { name: "apiKey", label: "API Key" },
        { name: "accessToken", label: "Access Token" }
      ],
      helpUrl: "https://medium.com/me/settings"
    },
    googleAnalytics: {
      title: "Google Analytics",
      description: "Connect Google Analytics to track website traffic and user behavior.",
      icon: <BarChart4 className="h-5 w-5 text-[#E37400]" />,
      color: "text-[#E37400]",
      fields: [
        { name: "apiKey", label: "API Key" }
      ],
      helpUrl: "https://console.cloud.google.com/"
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="brand-container space-y-6">
          <div>
            <h1 className="text-3xl font-bold gradient-heading">API Credentials</h1>
            <p className="text-muted-foreground">
              Connect your platforms to display real-time data
            </p>
          </div>
          
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Manage Platform Credentials
              </CardTitle>
              <CardDescription>
                Enter API keys and credentials for each platform you want to connect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="linkedin" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                  <TabsTrigger value="medium">Medium</TabsTrigger>
                  <TabsTrigger value="googleAnalytics">Google Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="linkedin">
                  <PlatformCredentialCard
                    platform="linkedin"
                    config={platformConfigs.linkedin}
                    credentials={credentials.linkedin}
                    updateCredential={updateCredential}
                  />
                </TabsContent>
                
                <TabsContent value="medium">
                  <PlatformCredentialCard
                    platform="medium"
                    config={platformConfigs.medium}
                    credentials={credentials.medium}
                    updateCredential={updateCredential}
                  />
                </TabsContent>
                
                <TabsContent value="googleAnalytics">
                  <PlatformCredentialCard
                    platform="googleAnalytics"
                    config={platformConfigs.googleAnalytics}
                    credentials={credentials.googleAnalytics}
                    updateCredential={updateCredential}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-muted/50 flex-col items-start text-xs text-muted-foreground space-y-2 rounded-b-lg">
              <p>
                <strong>Important:</strong> Your API credentials are stored locally in your browser.
              </p>
              <p>
                For production use, we recommend using a secure backend service for token storage and management.
              </p>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>How to Find Your API Keys</CardTitle>
              <CardDescription>
                Follow these guides to locate your API credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-[#0077B5] flex items-center gap-2">
                    <Linkedin className="h-4 w-4" /> LinkedIn API Credentials
                  </h3>
                  <ol className="list-decimal list-inside text-sm space-y-1 ml-4">
                    <li>Go to the <a href="https://www.linkedin.com/developers/apps" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">LinkedIn Developer Portal</a></li>
                    <li>Create a new app or select an existing one</li>
                    <li>Navigate to the Auth tab to find your Client ID and Client Secret</li>
                    <li>Make sure you've added the necessary API permissions</li>
                  </ol>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-[#00AB6C] flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Medium API Credentials
                  </h3>
                  <ol className="list-decimal list-inside text-sm space-y-1 ml-4">
                    <li>Go to the <a href="https://medium.com/me/settings" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Medium Settings</a></li>
                    <li>Navigate to the "Integration tokens" section</li>
                    <li>Create a new token with a descriptive name</li>
                    <li>Copy the token immediately as it won't be shown again</li>
                  </ol>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-[#E37400] flex items-center gap-2">
                    <BarChart4 className="h-4 w-4" /> Google Analytics API Credentials
                  </h3>
                  <ol className="list-decimal list-inside text-sm space-y-1 ml-4">
                    <li>Go to the <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                    <li>Create a new project or select an existing one</li>
                    <li>Navigate to "APIs & Services" → "Credentials"</li>
                    <li>Create a new API Key or OAuth client ID</li>
                    <li>Enable the Google Analytics API in the API Library</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Credentials;
