
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { 
  BrandProfileRow, 
  BrandProfileInsert,
  BrandProfileUpdate,
  ProfileTagRow, 
  ProfileTagInsert,
  ProfileIntegrationRow,
  ProfileIntegrationInsert
} from "@/types/supabaseCustomTypes";
import { useNavigate } from "react-router-dom";

export interface Profile {
  id: string;
  name: string;
  role: string;
  avatar: string;
  fallback: string;
  tags: {
    label: string;
    bgColor: string;
    textColor: string;
  }[];
  description: string;
  integrations?: string[];
}

// Define all available integration platforms
export const availableIntegrations = [
  "linkedin", 
  "medium", 
  "twitter", 
  "instagram", 
  "wordpress", 
  "pinterest"
];

// Default profile to show while loading or when no profiles exist
const defaultProfile: Profile = {
  id: "default",
  name: "Default Profile",
  role: "Loading...",
  avatar: "",
  fallback: "DP",
  tags: [],
  description: "Loading profile data...",
  integrations: []
};

interface ProfileContextType {
  currentProfile: Profile;
  setCurrentProfile: (profile: Profile) => void;
  availableProfiles: Profile[];
  addProfile: (profile: Profile) => Promise<boolean>;
  updateProfile: (profile: Profile) => Promise<boolean>;
  deleteProfile: (profileId: string) => Promise<boolean>;
  availableIntegrations: string[];
  isLoading: boolean;
  hasProfiles: boolean;
  setHasProfiles: (hasProfiles: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profilesList, setProfilesList] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile>(defaultProfile);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasProfiles, setHasProfiles] = useState<boolean>(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load profiles from Supabase
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!user) {
        setIsLoading(false);
        setHasProfiles(false);
        return;
      }
      
      setIsLoading(true);
      try {
        // Fetch brand profiles from Supabase
        const { data: brandProfiles, error: profilesError } = await supabase
          .from("brand_profiles")
          .select("*")
          .eq("user_id", user.id) as { data: BrandProfileRow[] | null, error: any };
          
        if (profilesError) {
          throw profilesError;
        }

        if (brandProfiles && brandProfiles.length > 0) {
          setHasProfiles(true);
          
          // For each profile, fetch its tags and integrations
          const profilesWithDetails = await Promise.all(
            brandProfiles.map(async (profile) => {
              // Fetch tags
              const { data: tagData, error: tagError } = await supabase
                .from("profile_tags")
                .select("*")
                .eq("profile_id", profile.id) as { data: ProfileTagRow[] | null, error: any };
                
              if (tagError) {
                console.error("Error fetching tags:", tagError);
              }

              // Fetch integrations
              const { data: integrationData, error: integrationError } = await supabase
                .from("profile_integrations")
                .select("*")
                .eq("profile_id", profile.id) as { data: ProfileIntegrationRow[] | null, error: any };
                
              if (integrationError) {
                console.error("Error fetching integrations:", integrationError);
              }

              // Map to our Profile interface
              return {
                id: profile.id,
                name: profile.name,
                role: profile.role,
                avatar: profile.avatar || "",
                fallback: profile.fallback || profile.name.substring(0, 2).toUpperCase(),
                description: profile.description || "",
                tags: tagData ? tagData.map(tag => ({
                  label: tag.label,
                  bgColor: tag.bg_color,
                  textColor: tag.text_color
                })) : [],
                integrations: integrationData ? integrationData.map(int => int.integration_type) : []
              };
            })
          );

          setProfilesList(profilesWithDetails);
          
          // Fetch active profile from user profile
          const { data: userData, error: userError } = await supabase
            .from("profiles")
            .select("active_brand_profile_id")
            .eq("id", user.id)
            .single();
          
          if (userError) {
            console.error("Error fetching user data:", userError);
          }
          
          if (userData?.active_brand_profile_id) {
            // Find and set the active profile
            const activeProfile = profilesWithDetails.find(p => p.id === userData.active_brand_profile_id);
            if (activeProfile) {
              setCurrentProfile(activeProfile);
            } else if (profilesWithDetails.length > 0) {
              setCurrentProfile(profilesWithDetails[0]);
            }
          } else if (profilesWithDetails.length > 0) {
            // If no active profile is set, use the first one
            setCurrentProfile(profilesWithDetails[0]);
          }
        } else {
          // If the user has no profiles, leave the list empty and set hasProfiles to false
          setProfilesList([]);
          setHasProfiles(false);
          
          // Set default empty profile
          setCurrentProfile({
            id: "empty",
            name: "Create Your First Profile",
            role: "New User",
            avatar: "",
            fallback: "NP",
            tags: [],
            description: "Please create your first profile to get started",
            integrations: []
          });
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
        toast.error("Failed to load profiles");
        setHasProfiles(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [user]);

  const addProfile = async (profile: Profile): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Insert the brand profile
      const { data: brandProfile, error: profileError } = await supabase
        .from("brand_profiles")
        .insert({
          name: profile.name,
          role: profile.role,
          avatar: profile.avatar,
          fallback: profile.fallback,
          description: profile.description,
          user_id: user.id
        } as BrandProfileInsert)
        .select()
        .single() as { data: BrandProfileRow | null, error: any };
        
      if (profileError) throw profileError;
      if (!brandProfile) throw new Error("Failed to create profile");
      
      // Insert the tags
      if (profile.tags.length > 0) {
        const tagsToInsert: ProfileTagInsert[] = profile.tags.map(tag => ({
          profile_id: brandProfile.id,
          label: tag.label,
          bg_color: tag.bgColor,
          text_color: tag.textColor
        }));
        
        const { error: tagError } = await supabase
          .from("profile_tags")
          .insert(tagsToInsert as any);
          
        if (tagError) throw tagError;
      }
      
      // Insert the integrations
      if (profile.integrations && profile.integrations.length > 0) {
        const integrationsToInsert: ProfileIntegrationInsert[] = profile.integrations.map(integration => ({
          profile_id: brandProfile.id,
          integration_type: integration
        }));
        
        const { error: integrationError } = await supabase
          .from("profile_integrations")
          .insert(integrationsToInsert as any);
          
        if (integrationError) throw integrationError;
      }
      
      // Set as active profile if it's the first one
      if (profilesList.length === 0) {
        const { error: activeError } = await supabase
          .from("profiles")
          .update({ active_brand_profile_id: brandProfile.id })
          .eq("id", user.id);
          
        if (activeError) throw activeError;
      }
      
      // Format the new profile with the database ID
      const newProfile: Profile = {
        id: brandProfile.id,
        name: profile.name,
        role: profile.role,
        avatar: profile.avatar,
        fallback: profile.fallback,
        description: profile.description || "",
        tags: profile.tags,
        integrations: profile.integrations
      };
      
      // Update local state
      setProfilesList(prev => [...prev, newProfile]);
      
      // If this is the first profile, set it as current
      if (profilesList.length === 0) {
        setCurrentProfile(newProfile);
      }
      
      toast.success("New profile created successfully!");
      return true;
    } catch (error: any) {
      console.error("Error creating profile:", error);
      toast.error(`Failed to create profile: ${error.message}`);
      return false;
    }
  };

  const updateProfile = async (updatedProfile: Profile): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Update the brand profile
      const { error: profileError } = await supabase
        .from("brand_profiles")
        .update({
          name: updatedProfile.name,
          role: updatedProfile.role,
          avatar: updatedProfile.avatar,
          fallback: updatedProfile.fallback,
          description: updatedProfile.description
        } as BrandProfileUpdate)
        .eq("id", updatedProfile.id)
        .eq("user_id", user.id);
        
      if (profileError) throw profileError;
      
      // Delete existing tags and insert new ones
      const { error: deleteTagsError } = await supabase
        .from("profile_tags")
        .delete()
        .eq("profile_id", updatedProfile.id);
        
      if (deleteTagsError) throw deleteTagsError;
      
      if (updatedProfile.tags.length > 0) {
        const tagsToInsert: ProfileTagInsert[] = updatedProfile.tags.map(tag => ({
          profile_id: updatedProfile.id,
          label: tag.label,
          bg_color: tag.bgColor,
          text_color: tag.textColor
        }));
        
        const { error: insertTagsError } = await supabase
          .from("profile_tags")
          .insert(tagsToInsert as any);
          
        if (insertTagsError) throw insertTagsError;
      }
      
      // Delete existing integrations and insert new ones
      const { error: deleteIntegrationsError } = await supabase
        .from("profile_integrations")
        .delete()
        .eq("profile_id", updatedProfile.id);
        
      if (deleteIntegrationsError) throw deleteIntegrationsError;
      
      if (updatedProfile.integrations && updatedProfile.integrations.length > 0) {
        const integrationsToInsert: ProfileIntegrationInsert[] = updatedProfile.integrations.map(integration => ({
          profile_id: updatedProfile.id,
          integration_type: integration
        }));
        
        const { error: insertIntegrationsError } = await supabase
          .from("profile_integrations")
          .insert(integrationsToInsert as any);
          
        if (insertIntegrationsError) throw insertIntegrationsError;
      }
      
      // Update local state
      setProfilesList(prev => 
        prev.map(profile => 
          profile.id === updatedProfile.id ? updatedProfile : profile
        )
      );
      
      // If the current profile was updated, also update the current profile state
      if (currentProfile.id === updatedProfile.id) {
        setCurrentProfile(updatedProfile);
      }
      
      toast.success("Profile updated successfully!");
      return true;
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(`Failed to update profile: ${error.message}`);
      return false;
    }
  };

  const deleteProfile = async (profileId: string): Promise<boolean> => {
    if (!user) return false;
    
    // Don't allow deleting if there's only one profile left
    if (profilesList.length <= 1) {
      toast.error("You must have at least one profile.");
      return false;
    }

    try {
      // Check if the profile is currently active
      const isActive = currentProfile.id === profileId;
      
      // Delete the profile (cascade will handle tags and integrations)
      const { error: deleteError } = await supabase
        .from("brand_profiles")
        .delete()
        .eq("id", profileId)
        .eq("user_id", user.id);
        
      if (deleteError) throw deleteError;
      
      // Update local state
      const updatedProfiles = profilesList.filter(profile => profile.id !== profileId);
      setProfilesList(updatedProfiles);
      
      // If the deleted profile was active, switch to another profile
      if (isActive && updatedProfiles.length > 0) {
        const newActiveProfile = updatedProfiles[0];
        setCurrentProfile(newActiveProfile);
        
        // Update active profile in database
        const { error: activeError } = await supabase
          .from("profiles")
          .update({ active_brand_profile_id: newActiveProfile.id })
          .eq("id", user.id);
          
        if (activeError) throw activeError;
      }
      
      toast.success("Profile deleted successfully!");
      return true;
    } catch (error: any) {
      console.error("Error deleting profile:", error);
      toast.error(`Failed to delete profile: ${error.message}`);
      return false;
    }
  };

  const handleSetCurrentProfile = async (profile: Profile) => {
    if (!user) return;
    
    try {
      // Update active profile in database
      const { error } = await supabase
        .from("profiles")
        .update({ active_brand_profile_id: profile.id })
        .eq("id", user.id);
        
      if (error) throw error;
      
      // Update local state
      setCurrentProfile(profile);
    } catch (error: any) {
      console.error("Error setting active profile:", error);
      toast.error(`Failed to switch profile: ${error.message}`);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        currentProfile,
        setCurrentProfile: handleSetCurrentProfile,
        availableProfiles: profilesList,
        addProfile,
        updateProfile,
        deleteProfile,
        availableIntegrations,
        isLoading,
        hasProfiles,
        setHasProfiles
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
