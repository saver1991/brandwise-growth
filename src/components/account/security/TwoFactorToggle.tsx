
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TwoFactorToggleProps {
  userId: string | undefined;
  initialEnabled: boolean;
}

const TwoFactorToggle = ({ userId, initialEnabled }: TwoFactorToggleProps) => {
  const { toast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(initialEnabled);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleTwoFactor = async () => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      
      // Update two-factor settings in Supabase
      const { error } = await supabase
        .from("profiles")
        .update({
          two_factor_enabled: !twoFactorEnabled,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);
        
      if (error) {
        throw error;
      }
      
      setTwoFactorEnabled(!twoFactorEnabled);
      
      toast({
        title: twoFactorEnabled ? "Two-factor disabled" : "Two-factor enabled",
        description: twoFactorEnabled 
          ? "Two-factor authentication has been disabled" 
          : "Two-factor authentication has been enabled",
      });
    } catch (error: any) {
      console.error("Error updating two-factor settings: ", error);
      toast({
        title: "Error updating two-factor settings",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Two-factor authentication</p>
          <p className="text-sm text-muted-foreground">
            Protect your account with an additional verification step
          </p>
        </div>
        <Switch
          checked={twoFactorEnabled}
          onCheckedChange={handleToggleTwoFactor}
          disabled={isLoading}
        />
      </div>
      
      {twoFactorEnabled && (
        <div className="mt-6 space-y-4">
          <Separator />
          <p className="text-sm">
            Two-factor authentication is now enabled. We'll ask for a verification code when you sign in on new devices.
          </p>
        </div>
      )}
    </div>
  );
};

export default TwoFactorToggle;
