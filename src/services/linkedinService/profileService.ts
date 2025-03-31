
import { toast } from "sonner";
import { LinkedInProfile } from "./types";

// LinkedIn API endpoints
const LINKEDIN_ME_URL = "https://api.linkedin.com/v2/me";

export const getProfile = async (accessToken: string): Promise<LinkedInProfile | null> => {
  try {
    const response = await fetch(LINKEDIN_ME_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error("LinkedIn profile request failed:", response.statusText);
      toast.error("Failed to retrieve LinkedIn profile");
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error("Unexpected error getting LinkedIn profile:", error);
    toast.error("An unexpected error occurred while retrieving LinkedIn profile");
    return null;
  }
};
