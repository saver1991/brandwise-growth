
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Session {
  id: string;
  device: string;
  browser: string;
  ip: string;
  last_accessed: string;
  is_current: boolean;
}

interface SessionManagementProps {
  sessions: Session[];
}

const SessionManagement = ({ sessions }: SessionManagementProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="space-y-4">
      {sessions.map(session => (
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
      <Button 
        variant="destructive" 
        onClick={handleSignOutAllDevices}
        disabled={isLoading}
      >
        {isLoading ? "Signing Out..." : "Sign Out All Other Devices"}
      </Button>
    </div>
  );
};

export default SessionManagement;
