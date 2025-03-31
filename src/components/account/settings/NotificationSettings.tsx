
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NotificationSettings {
  newsletters: boolean;
  accountActivities: boolean;
  contentUpdates: boolean;
  promotions: boolean;
}

interface NotificationSettingsProps {
  userId: string | undefined;
  initialSettings: NotificationSettings;
  onUpdate: (newSettings: NotificationSettings) => Promise<void>;
}

const NotificationSettings = ({ 
  userId, 
  initialSettings,
  onUpdate
}: NotificationSettingsProps) => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(initialSettings);
  const [isLoading, setIsLoading] = useState(false);

  const handleNotificationChange = async (key: keyof NotificationSettings) => {
    if (!userId) return;
    
    // Update the local state
    const updatedNotifications = {
      ...emailNotifications,
      [key]: !emailNotifications[key],
    };
    
    setEmailNotifications(updatedNotifications);
    
    // Save the updated settings
    try {
      setIsLoading(true);
      
      // Save via callback
      await onUpdate(updatedNotifications);
      
      toast({
        title: "Notification preference updated",
        description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${emailNotifications[key] ? "disabled" : "enabled"}.`,
      });
      
    } catch (error: any) {
      // Reset the local state if there was an error
      setEmailNotifications(emailNotifications);
      
      toast({
        title: "Error updating notifications",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Newsletter</p>
          <p className="text-sm text-muted-foreground">
            Receive our monthly newsletter with updates
          </p>
        </div>
        <Switch
          checked={emailNotifications.newsletters}
          onCheckedChange={() => handleNotificationChange("newsletters")}
          disabled={isLoading}
        />
      </div>
      
      <Separator />
      
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Account Activities</p>
          <p className="text-sm text-muted-foreground">
            Get notified about account logins and changes
          </p>
        </div>
        <Switch
          checked={emailNotifications.accountActivities}
          onCheckedChange={() => handleNotificationChange("accountActivities")}
          disabled={isLoading}
        />
      </div>
      
      <Separator />
      
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Content Updates</p>
          <p className="text-sm text-muted-foreground">
            Get notified when content is published or updated
          </p>
        </div>
        <Switch
          checked={emailNotifications.contentUpdates}
          onCheckedChange={() => handleNotificationChange("contentUpdates")}
          disabled={isLoading}
        />
      </div>
      
      <Separator />
      
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Promotional Emails</p>
          <p className="text-sm text-muted-foreground">
            Receive promotional offers and updates
          </p>
        </div>
        <Switch
          checked={emailNotifications.promotions}
          onCheckedChange={() => handleNotificationChange("promotions")}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default NotificationSettings;
