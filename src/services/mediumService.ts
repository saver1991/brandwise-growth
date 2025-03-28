
import { toast } from "sonner";

interface MediumCredentials {
  accessToken?: string;
}

interface MediumStats {
  followers: number;
  articles: number;
  totalReads: number;
  engagement: number;
}

/**
 * Service to interact with Medium API
 * For demo purposes, this returns mock data
 * In production, replace with actual API calls
 */
export class MediumService {
  private credentials: MediumCredentials;
  
  constructor(credentials: MediumCredentials) {
    this.credentials = credentials;
  }
  
  /**
   * Check if credentials are valid
   */
  public hasValidCredentials(): boolean {
    return !!this.credentials.accessToken;
  }
  
  /**
   * Get Medium statistics
   */
  public async getStats(): Promise<MediumStats> {
    try {
      // In a real app, call Medium API here
      if (!this.hasValidCredentials()) {
        throw new Error("Missing Medium credentials");
      }
      
      // For demo purposes, return mock data
      await new Promise(resolve => setTimeout(resolve, 600));
      
      return {
        followers: 1249,
        articles: 23,
        totalReads: 18750,
        engagement: 3.2
      };
    } catch (error) {
      console.error("Medium API error:", error);
      toast.error("Failed to fetch Medium data");
      return {
        followers: 0,
        articles: 0,
        totalReads: 0,
        engagement: 0
      };
    }
  }
}

export default MediumService;
