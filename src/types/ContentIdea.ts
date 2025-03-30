
import { ContentScore } from "@/services/aiGenerationService";

export interface ContentIdea {
  id: number;
  title: string;
  description: string;
  platform: "linkedin" | "medium" | "twitter";
  topics: string[];
  imageUrl: string;
  score: ContentScore;
  imagePrompt?: string;
}
