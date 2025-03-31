
import { ContentPlatform } from "./ContentData";

export interface ContentScore {
  overall: number;
  breakdown: Record<string, number>;
  feedback: string;
}

export interface ContentIdea {
  id: number;
  title: string;
  description: string;
  platform: "linkedin" | "medium" | "wordpress" | "twitter" | "facebook" | "instagram" | "youtube" | "tiktok" | "pinterest";
  topics: string[];
  imageUrl: string;
  score: ContentScore;
  imagePrompt?: string;
}
