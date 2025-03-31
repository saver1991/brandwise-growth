
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// LinkedIn API endpoints
const LINKEDIN_API_URL = "https://api.linkedin.com/v2";
const LINKEDIN_SHARE_URL = `${LINKEDIN_API_URL}/ugcPosts`;
const LINKEDIN_ME_URL = `${LINKEDIN_API_URL}/me`;

export interface LinkedInProfile {
  id: string;
  localizedFirstName: string;
  localizedLastName: string;
  profilePicture?: {
    displayImage: string;
  };
}

export interface LinkedInShare {
  author: string;
  lifecycleState: string;
  specificContent: {
    "com.linkedin.ugc.ShareContent": {
      shareCommentary: {
        text: string;
      };
      shareMediaCategory: string;
      media?: Array<{
        status: string;
        description?: {
          text: string;
        };
        originalUrl?: string;
        title?: {
          text: string;
        };
      }>;
    };
  };
  visibility: {
    "com.linkedin.ugc.MemberNetworkVisibility": string;
  };
}

export interface LinkedInTokens {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

export const linkedinService = {
  /**
   * Get LinkedIn authorization URL
   * @returns URL for LinkedIn OAuth login
   */
  getAuthUrl(): string {
    // Retrieve redirect URL from environment or use a default
    const redirectUri = window.location.origin + "/linkedin-callback";
    
    // For real implementation, you would get this from environment variables or Supabase secrets
    const LINKEDIN_CLIENT_ID = "your-linkedin-client-id"; // Placeholder - will be replaced by actual client ID
    
    const scope = encodeURIComponent("r_liteprofile r_emailaddress w_member_social");
    
    return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${Math.random().toString(36).substring(2, 15)}`;
  },
  
  /**
   * Store LinkedIn tokens in Supabase
   * @param userId User ID to associate with tokens
   * @param tokens LinkedIn tokens
   */
  async storeTokens(userId: string, tokens: LinkedInTokens): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('platform_tokens')
        .upsert({
          user_id: userId,
          platform: 'linkedin',
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token || null,
          expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString()
        });
        
      if (error) {
        console.error("Error storing LinkedIn tokens:", error);
        toast.error("Failed to store LinkedIn credentials");
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Unexpected error storing LinkedIn tokens:", error);
      toast.error("An unexpected error occurred while saving LinkedIn credentials");
      return false;
    }
  },
  
  /**
   * Get LinkedIn tokens for a user
   * @param userId User ID to retrieve tokens for
   * @returns LinkedIn tokens if available, null otherwise
   */
  async getTokens(userId: string): Promise<LinkedInTokens | null> {
    try {
      const { data, error } = await supabase
        .from('platform_tokens')
        .select('access_token, refresh_token, expires_at')
        .eq('user_id', userId)
        .eq('platform', 'linkedin')
        .single();
      
      if (error || !data) {
        console.error("Error retrieving LinkedIn tokens:", error);
        return null;
      }
      
      // Check if token is expired and needs refresh
      const expiresAt = new Date(data.expires_at);
      if (expiresAt.getTime() <= Date.now() && data.refresh_token) {
        return await this.refreshTokens(userId, data.refresh_token);
      }
      
      return {
        access_token: data.access_token,
        expires_in: Math.max(0, Math.floor((new Date(data.expires_at).getTime() - Date.now()) / 1000)),
        refresh_token: data.refresh_token
      };
    } catch (error) {
      console.error("Unexpected error getting LinkedIn tokens:", error);
      return null;
    }
  },
  
  /**
   * Refresh expired LinkedIn tokens
   * @param userId User ID to refresh tokens for
   * @param refreshToken Refresh token to use
   * @returns New LinkedIn tokens if refresh successful, null otherwise
   */
  async refreshTokens(userId: string, refreshToken: string): Promise<LinkedInTokens | null> {
    try {
      // In a real implementation, this would make a request to a secure backend service
      // that would handle the token exchange with LinkedIn
      // For demonstration, we'll use a Supabase Edge Function
      
      const { data, error } = await supabase.functions.invoke('refresh-linkedin-token', {
        body: { refresh_token: refreshToken }
      });
      
      if (error || !data?.access_token) {
        console.error("Error refreshing LinkedIn token:", error);
        toast.error("Failed to refresh LinkedIn access");
        return null;
      }
      
      // Store the new tokens
      await this.storeTokens(userId, data);
      
      return data;
    } catch (error) {
      console.error("Unexpected error refreshing LinkedIn tokens:", error);
      toast.error("An unexpected error occurred while refreshing LinkedIn access");
      return null;
    }
  },
  
  /**
   * Get LinkedIn profile information for the authenticated user
   * @param accessToken LinkedIn access token
   * @returns LinkedIn profile if available, null otherwise
   */
  async getProfile(accessToken: string): Promise<LinkedInProfile | null> {
    try {
      const response = await fetch(`${LINKEDIN_ME_URL}`, {
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
  },
  
  /**
   * Post content to LinkedIn
   * @param accessToken LinkedIn access token
   * @param userId LinkedIn user ID (person or organization)
   * @param text Post text content
   * @param imageUrl Optional image URL to include in the post
   * @returns Boolean indicating success or failure
   */
  async sharePost(accessToken: string, userId: string, text: string, imageUrl?: string): Promise<boolean> {
    try {
      const shareData: LinkedInShare = {
        author: `urn:li:person:${userId}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: text
            },
            shareMediaCategory: imageUrl ? "IMAGE" : "NONE"
          }
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
      };
      
      // Add image if provided
      if (imageUrl) {
        shareData.specificContent["com.linkedin.ugc.ShareContent"].media = [
          {
            status: "READY",
            originalUrl: imageUrl,
            title: {
              text: "Image"
            }
          }
        ];
      }
      
      const response = await fetch(LINKEDIN_SHARE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify(shareData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("LinkedIn share request failed:", errorData);
        toast.error("Failed to share content to LinkedIn");
        return false;
      }
      
      toast.success("Content successfully shared to LinkedIn!");
      return true;
    } catch (error) {
      console.error("Unexpected error sharing to LinkedIn:", error);
      toast.error("An unexpected error occurred while sharing to LinkedIn");
      return false;
    }
  },
  
  /**
   * Check if a user has connected their LinkedIn account
   * @param userId User ID to check
   * @returns Boolean indicating if LinkedIn is connected
   */
  async isConnected(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('platform_tokens')
        .select('access_token')
        .eq('user_id', userId)
        .eq('platform', 'linkedin')
        .single();
      
      if (error || !data) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error checking LinkedIn connection:", error);
      return false;
    }
  },
  
  /**
   * Disconnect LinkedIn from the user's account
   * @param userId User ID to disconnect
   * @returns Boolean indicating success or failure
   */
  async disconnect(userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('platform_tokens')
        .delete()
        .eq('user_id', userId)
        .eq('platform', 'linkedin');
      
      if (error) {
        console.error("Error disconnecting LinkedIn:", error);
        toast.error("Failed to disconnect LinkedIn account");
        return false;
      }
      
      toast.success("LinkedIn account disconnected successfully");
      return true;
    } catch (error) {
      console.error("Unexpected error disconnecting LinkedIn:", error);
      toast.error("An unexpected error occurred while disconnecting LinkedIn");
      return false;
    }
  }
};
