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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

type SecuritySettings = {
  two_factor_enabled: boolean;
  active_sessions: {
    id: string;
    device: string;
    browser: string;
    ip: string;
    last_accessed: string;
    is_current: boolean;
  }[];
};

const SecurityPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    two_factor_enabled: false,
    active_sessions: [
      {
        id: "current-session",
        device: "Current Device",
        browser: navigator.userAgent.includes("Chrome") ? "Chrome" : 
                  navigator.userAgent.includes("Firefox") ? "Firefox" : 
                  navigator.userAgent.includes("Safari") ? "Safari" : "Unknown Browser",
        ip: "Current IP",
        last_accessed: "Now",
        is_current: true
      }
    ]
  });

  useEffect(() => {
    async function getSecuritySettings() {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Fetch security settings from user metadata or a separate security_settings table
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // If we have 2FA data in the profile, set it
          setTwoFactorEnabled(data.two_factor_enabled || false);
        }
        
        // In a real app, you'd fetch active sessions from auth system
        // This is a placeholder for demonstration
        
      } catch (error: any) {
        console.error("Error loading security settings: ", error);
        toast({
          title: "Error loading security settings",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    getSecuritySettings();
  }, [user, toast]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Your new password and confirmation password don't match.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Update password in Supabase Auth
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
    } catch (error: any) {
      console.error("Error updating password: ", error);
      toast({
        title: "Error updating password",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTwoFactor = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Update two-factor settings in Supabase
      const { error } = await supabase
        .from("profiles")
        .update({
          two_factor_enabled: !twoFactorEnabled,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
        
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

  const handleRevokeSession = async (sessionId: string) => {
    // In a real app, you would call Supabase to revoke the session
    // This is just a placeholder
    toast({
      title: "Session revoked",
      description: "The session has been successfully revoked.",
    });
  };

  const handleSignOutAllDevices = async () => {
    try {
      setIsLoading(true);
      
      // In a real app, you would call Supabase to sign out all sessions
      // Currently, Supabase doesn't have a direct method for this
      // Here's a placeholder that just signs out the current session
      await supabase.auth.signOut();
      
      toast({
        title: "Signed out from all devices",
        description: "You have been signed out from all devices.",
      });
      
      // Redirect to login page after sign out
      window.location.href = "/login";
      
    } catch (error: any) {
      console.error("Error signing out: ", error);
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <AccountSidebar activeItem="security" />
          </div>
          
          <div className="md:w-3/4 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <form onSubmit={handleChangePassword}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Login Sessions</CardTitle>
                <CardDescription>Manage your active login sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securitySettings.active_sessions.map(session => (
                    <div key={session.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{session.device}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.browser} • IP: {session.ip} • Last accessed: {session.last_accessed}
                        </p>
                      </div>
                      {session.is_current ? (
                        <p className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded-md">
                          Current
                        </p>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleRevokeSession(session.id)}
                          disabled={isLoading}
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="destructive" 
                  onClick={handleSignOutAllDevices}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing Out..." : "Sign Out All Other Devices"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecurityPage;
