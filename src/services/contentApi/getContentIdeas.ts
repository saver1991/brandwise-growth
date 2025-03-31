
import { supabase } from "@/integrations/supabase/client";
import { ContentIdeaRecord } from "@/types/ContentData";
import { parseScore, parseTopics, handleError } from "./utils";

export async function getContentIdeas(userId: string): Promise<ContentIdeaRecord[]> {
  try {
    const { data, error } = await supabase
      .from('content_ideas')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      handleError(error, "Failed to load your content ideas");
      return [];
    }

    // Parse the JSONB columns
    return data.map(item => ({
      ...item,
      topics: parseTopics(item.topics),
      score: parseScore(item.score)
    })) as ContentIdeaRecord[];
    
  } catch (error) {
    handleError(error, "An unexpected error occurred while loading your content ideas");
    return [];
  }
}
