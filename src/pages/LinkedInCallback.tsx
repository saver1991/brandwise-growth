import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { linkedinService } from "@/services/linkedinService";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const LinkedInCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleLinkedInCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");
        const error = params.get("error");
        
        if (error) {
          setError("LinkedIn authorization was denied or failed");
          setLoading(false);
          return;
        }
        
        if (!code) {
          setError("No authorization code received from LinkedIn");
          setLoading(false);
          return;
        }
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setError("You must be logged in to connect LinkedIn");
          setLoading(false);
          return;
        }

        // Exchange code for token via Supabase Edge Function
        // This keeps client_secret secure
        const { data, error: tokenError } = await supabase.functions.invoke('linkedin-auth-exchange', {
          body: { 
            code,
            redirect_uri: window.location.origin + "/linkedin-callback"
          }
        });
        
        if (tokenError || !data?.access_token) {
          console.error("Token exchange error:", tokenError);
          setError("Failed to complete LinkedIn authentication");
          setLoading(false);
          return;
        }
        
        // Store tokens in Supabase
        const stored = await linkedinService.storeTokens(user.id, data);
        
        if (!stored) {
          setError("Failed to store LinkedIn credentials");
          setLoading(false);
          return;
        }
        
        toast.success("LinkedIn connected successfully!");
        
        // Redirect back to the platform page
        setTimeout(() => {
          navigate("/linkedin");
        }, 1500);
        
      } catch (err) {
        console.error("LinkedIn callback error:", err);
        setError("An unexpected error occurred during LinkedIn authentication");
        setLoading(false);
      }
    };

    handleLinkedInCallback();
  }, [location.search, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[380px] border shadow-md">
        <CardContent className="flex flex-col items-center justify-center p-6">
          {loading ? (
            <>
              <Loader2 className="h-8 w-8 text-[#0077B5] animate-spin my-4" />
              <p className="text-center text-muted-foreground">
                Connecting your LinkedIn account...
              </p>
            </>
          ) : error ? (
            <>
              <div className="rounded-full bg-red-100 p-3 my-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Connection Failed</h3>
              <p className="text-center text-muted-foreground mb-4">{error}</p>
              <button 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                onClick={() => navigate("/linkedin")}
              >
                Return to LinkedIn Page
              </button>
            </>
          ) : (
            <>
              <div className="rounded-full bg-green-100 p-3 my-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">LinkedIn Connected!</h3>
              <p className="text-center text-muted-foreground">
                Your LinkedIn account has been successfully connected.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkedInCallback;
