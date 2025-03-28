
export interface PlatformCredential {
  apiKey: string;
  apiSecret?: string;
  accessToken?: string;
  connected: boolean;
}

export type PlatformType = 'linkedin' | 'medium' | 'googleAnalytics';

const STORAGE_KEY = 'brandwise_credentials';

// Get all platform credentials
export const getAllCredentials = (): Record<PlatformType, PlatformCredential> => {
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
export const getPlatformCredentials = (platform: PlatformType): PlatformCredential => {
  const allCredentials = getAllCredentials();
  return allCredentials[platform];
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
      connected: credentials.apiKey ? credentials.apiKey.trim().length > 0 : allCredentials[platform].connected
    }
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCredentials));
};

// Disconnect a platform
export const disconnectPlatform = (platform: PlatformType): void => {
  const allCredentials = getAllCredentials();
  
  const updatedCredentials = {
    ...allCredentials,
    [platform]: {
      ...allCredentials[platform],
      connected: false
    }
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCredentials));
};

// Verify credentials (in a real app, this would make an API call to validate)
export const verifyCredentials = async (
  platform: PlatformType,
  credentials: PlatformCredential
): Promise<boolean> => {
  // For now, we'll just check if the API key exists
  // In a real app, this would make an API call to validate the credentials
  if (!credentials.apiKey || credentials.apiKey.trim() === "") {
    return false;
  }
  
  // Simulate API verification delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};
