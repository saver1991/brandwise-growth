
import { useState } from "react";
import { Key, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PlatformVerificationStatus from "@/components/PlatformVerificationStatus";
import GAPropertySelector from "@/components/GAPropertySelector";
import type { PlatformType, PlatformCredential } from "@/services/credentialsService";
import { savePlatformCredentials, verifyCredentials, disconnectPlatform } from "@/services/credentialsService";

interface PlatformConfig {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  fields: { name: string; label: string }[];
  helpUrl?: string;
}

interface PlatformCredentialCardProps {
  platform: PlatformType;
  config: PlatformConfig;
  credentials: PlatformCredential;
  updateCredential: (platform: string, field: string, value: string) => void;
}

const PlatformCredentialCard = ({ 
  platform, 
  config,
  credentials, 
  updateCredential 
}: PlatformCredentialCardProps) => {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPropertySelector, setShowPropertySelector] = useState(false);
  
  const handleSave = () => {
    savePlatformCredentials(platform, credentials);
    
    toast({
      title: "Credentials updated",
      description: `Your ${platform} credentials have been saved.`,
      duration: 3000,
    });
  };
  
  const handleConnect = async () => {
    if (!credentials.apiKey || credentials.apiKey.trim() === "") {
      toast({
        title: "Connection failed",
        description: "Please enter a valid API key.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      toast({
        title: "Connecting...",
        description: `Verifying your ${platform} credentials.`,
        duration: 2000,
      });
      
      // Attempt to verify credentials
      const isValid = await verifyCredentials(platform, credentials);
      
      if (isValid) {
        // Save with connected flag
        savePlatformCredentials(platform, { 
          ...credentials,
          connected: true 
        });
        
        toast({
          title: "Connection successful",
          description: `Your ${platform} account has been connected.`,
          duration: 3000,
        });
        
        // If Google Analytics, show property selector
        if (platform === 'googleAnalytics') {
          setShowPropertySelector(true);
        }
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
      setIsVerifying(false);
    }
  };

  const handleDisconnect = () => {
    disconnectPlatform(platform);
    
    // Update local state via parent
    updateCredential(platform, 'connected', 'false');
    
    toast({
      title: "Disconnected",
      description: `Your ${platform} account has been disconnected.`,
      duration: 3000,
    });
    
    // Hide property selector if showing
    setShowPropertySelector(false);
  };
  
  const handleVerify = async () => {
    await handleConnect();
  };
  
  const handleConfigureProperties = () => {
    setShowPropertySelector(true);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="rounded-full p-2 bg-muted flex-shrink-0">
            {config.icon}
          </div>
          <div>
            <CardTitle className={config.color}>{config.title}</CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-md p-4">
          <div className="space-y-4">
            {config.fields.map((field) => (
              <div key={field.name} className="grid gap-2">
                <Label htmlFor={`${platform}-${field.name}`}>{field.label}</Label>
                <Input
                  id={`${platform}-${field.name}`}
                  type="password"
                  placeholder={`Enter your ${field.label}`}
                  value={credentials[field.name as keyof PlatformCredential] as string || ""}
                  onChange={(e) => {
                    updateCredential(platform, field.name, e.target.value);
                  }}
                />
              </div>
            ))}
            
            <div className="pt-2 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={handleSave}
              >
                <Key className="mr-2 h-4 w-4" />
                Save
              </Button>
              
              {credentials?.connected ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleDisconnect}
                  >
                    Disconnect
                  </Button>
                  
                  {platform === 'googleAnalytics' && (
                    <Button
                      onClick={handleConfigureProperties}
                    >
                      Configure Properties
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  onClick={handleConnect}
                  disabled={isVerifying}
                >
                  {isVerifying ? "Connecting..." : "Connect"}
                </Button>
              )}
              
              {config.helpUrl && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="ml-auto"
                  onClick={() => window.open(config.helpUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <PlatformVerificationStatus
          platform={platform}
          onVerify={handleVerify}
          isVerifying={isVerifying}
        />
        
        {platform === 'googleAnalytics' && showPropertySelector && credentials?.connected && (
          <div className="mt-4">
            <GAPropertySelector onSave={() => setShowPropertySelector(false)} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlatformCredentialCard;
