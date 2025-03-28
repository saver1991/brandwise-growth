
import { getPlatformCredentials } from './credentialsService';

/**
 * Helper service to interact with the Google Analytics Supabase Edge Function
 */
export const googleAnalyticsEdgeService = {
  /**
   * Get the base URL for the Edge Function
   */
  getEdgeFunctionBaseUrl: () => {
    // Use localhost for local development, otherwise use the deployed URL
    return window.location.origin.includes('localhost') 
      ? 'http://localhost:54321/functions/v1/google-analytics-auth'
      : `${window.location.origin}/functions/v1/google-analytics-auth`;
  },

  /**
   * Get the Auth token from local storage
   */
  getAuthToken: () => {
    return localStorage.getItem('supabase.auth.token');
  },

  /**
   * Fetch Google Analytics properties from the Edge Function
   */
  fetchProperties: async (): Promise<{ id: string, name: string }[]> => {
    try {
      // Check if we have credentials
      const credentials = getPlatformCredentials('googleAnalytics');
      if (!credentials.apiKey || !credentials.connected) {
        throw new Error('Google Analytics is not connected');
      }

      const url = `${googleAnalyticsEdgeService.getEdgeFunctionBaseUrl()}/properties`;
      const token = googleAnalyticsEdgeService.getAuthToken();
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Edge function returned an error: ${errorText}`);
      }

      const data = await response.json();
      return data.properties;
    } catch (error) {
      console.error('Error fetching GA properties from Edge Function:', error);
      throw error;
    }
  },

  /**
   * Start the OAuth flow by redirecting to the auth endpoint
   */
  startOAuthFlow: async () => {
    try {
      const url = `${googleAnalyticsEdgeService.getEdgeFunctionBaseUrl()}/auth`;
      const token = googleAnalyticsEdgeService.getAuthToken();
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Edge function returned an error: ${errorText}`);
      }

      const data = await response.json();
      
      // Redirect to the Google OAuth URL
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No OAuth URL returned from Edge Function');
      }
    } catch (error) {
      console.error('Error starting OAuth flow:', error);
      throw error;
    }
  }
};
