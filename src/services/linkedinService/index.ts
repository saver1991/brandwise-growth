
import { getAuthUrl, storeTokens, getTokens, refreshTokens, isConnected, disconnect } from './authService';
import { getProfile } from './profileService';
import { sharePost } from './contentService';
import { LinkedInProfile, LinkedInShare, LinkedInTokens } from './types';

export const linkedinService = {
  // Auth methods
  getAuthUrl,
  storeTokens,
  getTokens,
  refreshTokens,
  isConnected,
  disconnect,
  
  // Profile methods
  getProfile,
  
  // Content methods
  sharePost
};

// Re-export types
export type { LinkedInProfile, LinkedInShare, LinkedInTokens };
