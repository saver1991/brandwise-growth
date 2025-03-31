
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LinkedInTokens } from "./types";

export const getAuthUrl = async (): Promise<string> => {
  try {
    // Retrieve redirect URL from environment or use a default
    const redirectUri = window.location.origin + "/linkedin-callback";
    
    console.log("Getting LinkedIn Client ID from edge function");
    
    // Get the client ID from Supabase Edge Function with detailed error handling
    const response = await supabase.functions.invoke('get-linkedin-client-id', {});
    
    console.log("LinkedIn Client ID edge function response:", response);
    
    if (response.error) {
      console.error("Error from edge function:", response.error);
      toast.error("Failed to prepare LinkedIn authentication: Edge function error");
      return "";
    }
    
    if (!response.data || !response.data.clientId) {
      console.error("No client ID returned from edge function:", response.data);
      toast.error("Failed to prepare LinkedIn authentication: Missing client ID");
      return "";
    }
    
    const LINKEDIN_CLIENT_ID = response.data.clientId;
    console.log("Using LinkedIn Client ID:", LINKEDIN_CLIENT_ID.substring(0, 4) + "...");
    
    const scope = encodeURIComponent("r_liteprofile r_emailaddress w_member_social");
    
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${Math.random().toString(36).substring(2, 15)}`;
    
    console.log("Generated LinkedIn Auth URL:", authUrl.substring(0, 50) + "...");
    
    return authUrl;
  } catch (error) {
    console.error("Unexpected error generating LinkedIn auth URL:", error);
    toast.error("Failed to prepare LinkedIn authentication: " + error.message);
    return "";
  }
};

export const storeTokens = async (userId: string, tokens: LinkedInTokens): Promise<boolean> => {
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
};

export const getTokens = async (userId: string): Promise<LinkedInTokens | null> => {
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
      return await refreshTokens(userId, data.refresh_token);
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
};

export const refreshTokens = async (userId: string, refreshToken: string): Promise<LinkedInTokens | null> => {
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
    await storeTokens(userId, data);
    
    return data;
  } catch (error) {
    console.error("Unexpected error refreshing LinkedIn tokens:", error);
    toast.error("An unexpected error occurred while refreshing LinkedIn access");
    return null;
  }
};

export const isConnected = async (userId: string): Promise<boolean> => {
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
};

export const disconnect = async (userId: string): Promise<boolean> => {
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
};
