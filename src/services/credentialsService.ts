
interface PlatformCredential {
  apiKey: string;
  apiSecret?: string;
  accessToken?: string;
  connected: boolean;
}

export type PlatformType = 'linkedin' | 'medium' | 'googleAnalytics';

const STORAGE_KEY = 'brandwise_credentials';

// Get all platform credentials
export const getAllCredentials = (): Record<string, PlatformCredential> => {
  const savedCredentials = localStorage.getItem(STORAGE_KEY);
  if (savedCredentials) {
    try {
      return JSON.parse(savedCredentials);
    } catch (e) {
      console.error("Failed to parse saved credentials", e);
    }
  }
  
  return {
    linkedin: { apiKey: "", apiSecret: "", connected: false },
    medium: { apiKey: "", accessToken: "", connected: false },
    googleAnalytics: { apiKey: "", connected: false }
  };
};

// Get credentials for a specific platform
export const getPlatformCredentials = (platform: PlatformType): PlatformCredential | null => {
  const allCredentials = getAllCredentials();
  return allCredentials[platform] || null;
};

// Check if a platform is connected
export const isPlatformConnected = (platform: PlatformType): boolean => {
  const credentials = getPlatformCredentials(platform);
  return credentials?.connected || false;
};

// Save platform credentials
export const savePlatformCredentials = (
  platform: PlatformType, 
  credentials: Partial<PlatformCredential>
): void => {
  const allCredentials = getAllCredentials();
  
  const updatedCredentials = {
    ...allCredentials,
    [platform]: {
      ...allCredentials[platform],
      ...credentials,
    }
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCredentials));
};
