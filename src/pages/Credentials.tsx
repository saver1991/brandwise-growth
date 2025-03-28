
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Linkedin, BarChart4, MessageSquare, AlertCircle, CheckCircle, Key } from "lucide-react";
import { 
  PlatformType, 
  getPlatformCredentials, 
  savePlatformCredentials, 
  disconnectPlatform,
  verifyCredentials 
} from "@/services/credentialsService";
import type { PlatformCredential } from "@/services/credentialsService";

const Credentials = () => {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState<Record<string, boolean>>({});
  const [credentials, setCredentials] = useState<Record<string, PlatformCredential>>(() => {
    const platforms: PlatformType[] = ['linkedin', 'medium', 'googleAnalytics'];
    const creds: Record<string, PlatformCredential> = {};
    
    platforms.forEach(platform => {
      creds[platform] = getPlatformCredentials(platform);
    });
    
    return creds;
  });

  const updateCredential = (platform: string, field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }));
  };

  const saveCredentials = (platform: PlatformType) => {
    savePlatformCredentials(platform, credentials[platform]);
    
    toast({
      title: "Credentials updated",
      description: `Your ${platform} credentials have been saved.`,
      duration: 3000,
    });
  };

  const handleConnect = async (platform: PlatformType) => {
    const platformData = credentials[platform];
    
    if (!platformData.apiKey || platformData.apiKey.trim() === "") {
      toast({
        title: "Connection failed",
        description: "Please enter a valid API key.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Show verifying state
    setIsVerifying(prev => ({ ...prev, [platform]: true }));
    
    try {
      toast({
        title: "Connecting...",
        description: `Verifying your ${platform} credentials.`,
        duration: 2000,
      });
      
      // Attempt to verify credentials
      const isValid = await verifyCredentials(platform, platformData);
      
      if (isValid) {
        // Save with connected flag
        savePlatformCredentials(platform, { 
          ...platformData,
          connected: true 
        });
        
        // Update local state
        setCredentials(prev => ({
          ...prev,
          [platform]: {
            ...prev[platform],
            connected: true
          }
        }));
        
        toast({
          title: "Connection successful",
          description: `Your ${platform} account has been connected.`,
          duration: 3000,
        });
      } else {
        toast({
          title: "Connection failed",
          description: "Invalid credentials. Please check and try again.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: `An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsVerifying(prev => ({ ...prev, [platform]: false }));
    }
  };

  const handleDisconnect = (platform: PlatformType) => {
    disconnectPlatform(platform);
    
    // Update local state
    setCredentials(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        connected: false
      }
    }));
    
    toast({
      title: "Disconnected",
      description: `Your ${platform} account has been disconnected.`,
      duration: 3000,
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
      ]
    },
    medium: {
      title: "Medium",
      description: "Connect your Medium account to track article performance and audience growth.",
      icon: <MessageSquare className="h-5 w-5 text-[#00AB6C]" />,
      color: "text-[#00AB6C]",
      fields: [
        { name: "apiKey", label: "API Key" },
        { name: "accessToken", label: "Access Token" }
      ]
    },
    googleAnalytics: {
      title: "Google Analytics",
      description: "Connect Google Analytics to track website traffic and user behavior.",
      icon: <BarChart4 className="h-5 w-5 text-[#E37400]" />,
      color: "text-[#E37400]",
      fields: [
        { name: "apiKey", label: "API Key" }
      ]
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
                
                {Object.entries(platformConfigs).map(([platform, config]) => (
                  <TabsContent key={platform} value={platform} className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full p-2 bg-muted flex-shrink-0">
                        {config.icon}
                      </div>
                      <div>
                        <h3 className={`font-medium ${config.color}`}>{config.title}</h3>
                        <p className="text-sm text-muted-foreground">{config.description}</p>
                      </div>
                      
                      {credentials[platform]?.connected && (
                        <div className="ml-auto flex items-center text-sm text-green-600 gap-1">
                          <CheckCircle className="h-4 w-4" />
                          <span>Connected</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="space-y-4">
                        {config.fields.map((field) => (
                          <div key={field.name} className="grid gap-2">
                            <Label htmlFor={`${platform}-${field.name}`}>{field.label}</Label>
                            <Input
                              id={`${platform}-${field.name}`}
                              type="password"
                              placeholder={`Enter your ${field.label}`}
                              value={credentials[platform][field.name as keyof PlatformCredential] as string || ""}
                              onChange={(e) => {
                                updateCredential(platform, field.name, e.target.value);
                              }}
                            />
                          </div>
                        ))}
                        
                        <div className="pt-2 flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => saveCredentials(platform as PlatformType)}
                          >
                            Save
                          </Button>
                          
                          {credentials[platform]?.connected ? (
                            <Button
                              variant="outline"
                              onClick={() => handleDisconnect(platform as PlatformType)}
                            >
                              Disconnect
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleConnect(platform as PlatformType)}
                              disabled={isVerifying[platform]}
                            >
                              {isVerifying[platform] ? "Connecting..." : "Connect"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {!credentials[platform]?.connected && (
                      <div className="flex items-center gap-2 p-4 border rounded-md bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          You need to connect your {config.title} account to see real-time data on your dashboard.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                ))}
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
