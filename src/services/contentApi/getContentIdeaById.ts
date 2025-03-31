
import { supabase } from "@/integrations/supabase/client";
import { ContentIdeaRecord, ContentWithPlatformData, PlatformContentFields } from "@/types/ContentData";
import { parseJsonField, parseScore, parseTopics, handleError } from "./utils";

export async function getContentIdeaById(id: string): Promise<ContentWithPlatformData | null> {
  try {
    // First get the content idea
    const { data: contentData, error: contentError } = await supabase
      .from('content_ideas')
      .select('*')
      .eq('id', id)
      .single();

    if (contentError) {
      handleError(contentError, "Failed to load content idea details");
      return null;
    }

    // Parse the JSONB columns
    const content = {
      ...contentData,
      topics: parseTopics(contentData.topics),
      score: parseScore(contentData.score)
    } as ContentIdeaRecord;

    // Get platform-specific data if available
    const { data: platformData, error: platformError } = await supabase
      .from('platform_content_fields')
      .select('*')
      .eq('content_id', id)
      .eq('platform', content.platform)
      .maybeSingle();

    if (platformError) {
      handleError(platformError, "Error fetching platform-specific content");
      // Continue without platform data
      return content;
    }

    let parsedPlatformData = platformData;
    if (platformData) {
      // Parse the JSONB columns
      parsedPlatformData = {
        ...platformData,
        hashtags: platformData.hashtags || [],
        carousel_images: parseJsonField(platformData.carousel_images, []),
        metadata: parseJsonField(platformData.metadata, {})
      };
    }

    return {
      ...content,
      platformData: parsedPlatformData as unknown as PlatformContentFields
    };
  } catch (error) {
    handleError(error, "An unexpected error occurred while loading content details");
    return null;
  }
}
