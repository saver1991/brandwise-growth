
import { ContentScore } from "@/types/ContentIdea";
import { toast } from "sonner";

// Helper functions for parsing JSONB data from Supabase
export const parseTopics = (topics: any): string[] => {
  if (!topics) return [];
  if (Array.isArray(topics)) return topics;
  try {
    return JSON.parse(String(topics));
  } catch (e) {
    console.error("Error parsing topics:", e);
    return [];
  }
};

export const parseScore = (score: any): ContentScore | null => {
  if (!score) return null;
  try {
    const parsedScore = typeof score === 'string' ? JSON.parse(score) : score;
    // Ensure the score has all required properties
    if (!parsedScore.overall || !parsedScore.breakdown || !parsedScore.feedback) {
      return {
        overall: parsedScore.overall || 70,
        breakdown: parsedScore.breakdown || { "Content Quality": 70 },
        feedback: parsedScore.feedback || "Score partially calculated."
      };
    }
    return parsedScore;
  } catch (e) {
    console.error("Error parsing score:", e);
    return null;
  }
};

export const parseJsonField = <T>(field: any, defaultValue: T): T => {
  if (!field) return defaultValue;
  if (typeof field === 'object') return field as T;
  try {
    return JSON.parse(String(field));
  } catch (e) {
    console.error(`Error parsing JSON field:`, e);
    return defaultValue;
  }
};

export const handleError = (error: any, message: string): void => {
  console.error(`${message}:`, error);
  toast.error(message);
};
