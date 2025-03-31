
import { useState } from "react";
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

const SettingsPage = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState({
    newsletters: true,
    accountActivities: true,
    contentUpdates: false,
    promotions: false,
  });
  
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("english");
  
  const handleNotificationChange = (key: keyof typeof emailNotifications) => {
    setEmailNotifications({
      ...emailNotifications,
      [key]: !emailNotifications[key],
    });
    
    toast({
      title: "Notification preference updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${emailNotifications[key] ? "disabled" : "enabled"}.`,
    });
  };
  
  const handleThemeChange = (value: string) => {
    setTheme(value);
    toast({
      title: "Theme updated",
      description: `Theme changed to ${value}.`,
    });
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Language updated",
      description: `Language changed to ${value}.`,
    });
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
                  <Select value={theme} onValueChange={handleThemeChange}>
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
                  <Select value={language} onValueChange={handleLanguageChange}>
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
                  <Button variant="destructive" className="mt-4">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
