
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import AccountSidebar from "@/components/account/AccountSidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialog 
} from "@/components/ui/alert-dialog";

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
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
          
        if (error && error.code !== "PGRST116") {
          throw error;
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

  const handleNotificationChange = async (key: keyof typeof emailNotifications) => {
    // Update the local state
    const updatedNotifications = {
      ...emailNotifications,
      [key]: !emailNotifications[key],
    };
    
    setEmailNotifications(updatedNotifications);
    
    // Save the updated settings
    try {
      setIsLoading(true);
      
      // Save to Supabase
      await saveSettings();
      
      toast({
        title: "Notification preference updated",
        description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${emailNotifications[key] ? "disabled" : "enabled"}.`,
      });
      
    } catch (error) {
      // Error is handled in saveSettings function
      // Reset the local state if there was an error
      setEmailNotifications(emailNotifications);
    }
  };
  
  const handleThemeChange = async (value: string) => {
    // Update theme through the context
    setTheme(value as "light" | "dark" | "system");
    
    // Save the updated settings
    try {
      await saveSettings();
      
      toast({
        title: "Theme updated",
        description: `Theme changed to ${value}.`,
      });
      
    } catch (error) {
      // Error is handled in saveSettings function
    }
  };
  
  const handleLanguageChange = async (value: string) => {
    // Update the local state
    setLanguage(value);
    
    // Save the updated settings
    try {
      await saveSettings();
      
      toast({
        title: "Language updated",
        description: `Language changed to ${value}.`,
      });
      
    } catch (error) {
      // Error is handled in saveSettings function
      // Reset the local state if there was an error
      setLanguage(language);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // In a real app, this would involve more steps:
      // 1. Delete user data from your database
      // 2. Delete the user from authentication
      
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) {
        throw error;
      }
      
      // Sign the user out
      await supabase.auth.signOut();
      
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      });
      
      // Redirect to home page
      window.location.href = "/";
      
    } catch (error: any) {
      console.error("Error deleting account: ", error);
      toast({
        title: "Error deleting account",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
    }
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
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the app looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={theme} onValueChange={handleThemeChange} disabled={isLoading}>
                    <SelectTrigger id="theme" className="w-full sm:w-[240px]">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={handleLanguageChange} disabled={isLoading}>
                    <SelectTrigger id="language" className="w-full sm:w-[240px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>Permanent changes to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                  <h3 className="font-semibold text-destructive">Delete Account</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Permanently delete your account and all of your content. This action cannot be undone.
                  </p>
                  <Button 
                    variant="destructive" 
                    className="mt-4" 
                    onClick={() => setIsDeleteDialogOpen(true)}
                    disabled={isLoading}
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove all of your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount} 
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SettingsPage;
