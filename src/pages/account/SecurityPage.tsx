
import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import AccountSidebar from "@/components/account/AccountSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import PasswordChangeForm from "@/components/account/security/PasswordChangeForm";
import TwoFactorToggle from "@/components/account/security/TwoFactorToggle";
import SessionManagement from "@/components/account/security/SessionManagement";

const SecurityPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSessions, setActiveSessions] = useState([
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
  ]);

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
              <PasswordChangeForm userId={user?.id} />
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <TwoFactorToggle userId={user?.id} initialEnabled={twoFactorEnabled} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Login Sessions</CardTitle>
                <CardDescription>Manage your active login sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <SessionManagement sessions={activeSessions} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecurityPage;
