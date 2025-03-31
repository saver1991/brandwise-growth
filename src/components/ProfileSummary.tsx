
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/contexts/ProfileContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfilesRow } from "@/types/supabaseCustomTypes";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfileSummary = () => {
  const { currentProfile, isLoading, hasProfiles, setHasProfiles } = useProfile();
  const { user } = useAuth();
  const [dbProfile, setDbProfile] = useState<ProfilesRow | null>(null);
  const [isDbProfileLoading, setIsDbProfileLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      if (!user) return;
      
      try {
        setIsDbProfileLoading(true);
        
        // First, check if there are any brand profiles for this user
        const { data: brandProfiles, error: brandProfilesError } = await supabase
          .from("brand_profiles")
          .select("id")
          .eq("user_id", user.id);
          
        if (brandProfilesError) {
          console.error("Error checking brand profiles:", brandProfilesError);
          return;
        }
        
        // Update the hasProfiles state based on actual database data
        if (brandProfiles && brandProfiles.length > 0) {
          setHasProfiles(true);
        } else {
          setHasProfiles(false);
        }
        
        // Then get the user profile
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
          
        if (error) {
          console.error("Error loading profile:", error);
          return;
        }
        
        if (data) {
          setDbProfile(data as ProfilesRow);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsDbProfileLoading(false);
      }
    }
    
    getProfile();
  }, [user, setHasProfiles]);

  // Display name in order of preference: database profile name, auth user name, then fallback to context
  const displayName = dbProfile?.full_name || user?.user_metadata?.full_name || currentProfile.name;
  
  // Use avatar from database if available, otherwise use the one from context
  const avatarUrl = dbProfile?.avatar_url || currentProfile.avatar;
  
  // Calculate avatar fallback text based on display name
  const avatarFallback = displayName
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  if (isLoading || isDbProfileLoading) {
    return (
      <Card className="bg-gradient-to-br from-card via-card to-accent/10 card-hover">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-3 text-center md:text-left w-full">
              <div>
                <Skeleton className="h-8 w-40 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Display a create profile prompt if no profiles exist
  if (!hasProfiles) {
    return (
      <Card className="bg-gradient-to-br from-card via-card to-accent/10 card-hover">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="h-24 w-24 rounded-full bg-accent/20 flex items-center justify-center">
              <UserPlus className="h-12 w-12 text-accent/70" />
            </div>
            <div className="space-y-3">
              <div>
                <h2 className="text-2xl font-bold">Welcome, {displayName}!</h2>
                <p className="text-muted-foreground">Let's create your first profile to get started</p>
              </div>
              
              <Button 
                onClick={() => navigate("/profiles/new")} 
                className="mt-4"
                size="lg"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Create Your First Profile
              </Button>
              
              <p className="text-sm max-w-md mt-4">
                Profiles help you manage different brands, projects or personas with separate content strategies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-card via-card to-accent/10 card-hover">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-accent">
            <AvatarFallback className="text-xl">{avatarFallback}</AvatarFallback>
            <AvatarImage src={avatarUrl} alt={displayName} />
          </Avatar>
          
          <div className="space-y-3 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold">{displayName}</h2>
              <p className="text-muted-foreground">{currentProfile.role}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {currentProfile.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className={`${tag.bgColor} ${tag.textColor}`}>
                  {tag.label}
                </Badge>
              ))}
            </div>
            
            <p className="text-sm max-w-md">
              {currentProfile.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
