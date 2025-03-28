
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import type { PlatformType } from "@/services/credentialsService";
import { needsReVerification, isPlatformConnected } from "@/services/credentialsService";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface PlatformVerificationStatusProps {
  platform: PlatformType;
  onVerify: () => Promise<void>;
  isVerifying: boolean;
}

const PlatformVerificationStatus = ({ 
  platform, 
  onVerify, 
  isVerifying 
}: PlatformVerificationStatusProps) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [needsVerification, setNeedsVerification] = useState<boolean>(false);
  
  useEffect(() => {
    // Check connection status
    const connected = isPlatformConnected(platform);
    setIsConnected(connected);
    
    // Check if needs verification
    if (connected) {
      setNeedsVerification(needsReVerification(platform));
    }
  }, [platform]);

  if (!isConnected) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Not Connected</AlertTitle>
        <AlertDescription>
          Your {platform} account is not connected. Please add your credentials and connect your account.
        </AlertDescription>
      </Alert>
    );
  }

  if (needsVerification) {
    return (
      <Alert className="mt-4 border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20">
        <Clock className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800 dark:text-amber-300">Verification Needed</AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-400 flex flex-wrap gap-2 items-center">
          Your {platform} credentials need to be verified again.
          <Button 
            size="sm" 
            onClick={onVerify} 
            disabled={isVerifying}
            className="ml-auto"
          >
            {isVerifying ? "Verifying..." : "Verify Now"}
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mt-4 border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-800 dark:text-green-300">Connected</AlertTitle>
      <AlertDescription className="text-green-700 dark:text-green-400">
        Your {platform} account is connected and verified.
      </AlertDescription>
    </Alert>
  );
};

export default PlatformVerificationStatus;
