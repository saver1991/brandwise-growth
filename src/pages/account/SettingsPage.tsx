
import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import AccountSidebar from "@/components/account/AccountSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import NotificationSettings from "@/components/account/settings/NotificationSettings";
import AppearanceSettings from "@/components/account/settings/AppearanceSettings";
import DangerZone from "@/components/account/settings/DangerZone";

type UserSettings = {
  notifications: {
    newsletters: boolean;
    accountActivities: boolean;
    contentUpdates: boolean;
    promotions: boolean;
  };
  appearance: {
    theme: "light" | "dark" | "system";
    language: string;
  };
};

const SettingsPage = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [emailNotifications, setEmailNotifications] = useState({
    newsletters: true,
    accountActivities: true,
    contentUpdates: false,
    promotions: false,
  });
  
  const [language, setLanguage] = useState("english");
  
  useEffect(() => {
    async function getUserSettings() {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Fetch user settings from Supabase
        const { data, error } = await supabase
          .from("profiles")
          .select("settings")
          .eq("id", user.id)
          .single();
          
        if (error) {
          console.error("Error fetching settings:", error);
          return;
        }
        
        // If user has settings stored in their profile, use them
        if (data && data.settings) {
          const userSettings = data.settings as UserSettings;
          
          // Update email notification settings
          if (userSettings.notifications) {
            setEmailNotifications(userSettings.notifications);
          }
          
          // Update language preference
          if (userSettings.appearance && userSettings.appearance.language) {
            setLanguage(userSettings.appearance.language);
          }
          
          // Update theme (this is managed by ThemeContext)
          if (userSettings.appearance && userSettings.appearance.theme && theme !== userSettings.appearance.theme) {
            setTheme(userSettings.appearance.theme);
          }
        }
        
      } catch (error: any) {
        console.error("Error loading user settings: ", error);
        toast({
          title: "Error loading settings",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    getUserSettings();
  }, [user, toast, theme, setTheme]);
  
  const saveSettings = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Prepare settings object to save
      const settings: UserSettings = {
        notifications: emailNotifications,
        appearance: {
          theme: theme,
          language: language
        }
      };
      
      // Save settings to Supabase
      const { error } = await supabase
        .from("profiles")
        .update({
          settings: settings,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
      
    } catch (error: any) {
      console.error("Error saving settings: ", error);
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationUpdate = async (newNotifications: typeof emailNotifications) => {
    setEmailNotifications(newNotifications);
    await saveSettings();
  };

  const handleThemeChange = async (value: string) => {
    // Update theme through the context
    setTheme(value as "light" | "dark" | "system");
    await saveSettings();
  };
  
  const handleLanguageChange = async (value: string) => {
    // Update the local state
    setLanguage(value);
    await saveSettings();
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <AccountSidebar activeItem="settings" />
          </div>
          
          <div className="md:w-3/4 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how we contact you</CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationSettings 
                  userId={user?.id} 
                  initialSettings={emailNotifications}
                  onUpdate={handleNotificationUpdate}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the app looks</CardDescription>
              </CardHeader>
              <CardContent>
                <AppearanceSettings 
                  theme={theme}
                  language={language}
                  onThemeChange={handleThemeChange}
                  onLanguageChange={handleLanguageChange}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>Permanent changes to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <DangerZone userId={user?.id} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
