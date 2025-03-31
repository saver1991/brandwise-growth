
import { supabase } from "@/integrations/supabase/client";
import { ContentIdeaData, PlatformContentFields } from "@/types/ContentData";
import { handleError } from "./utils";
import { toast } from "sonner";

export async function createContentIdea(
  contentData: ContentIdeaData, 
  platformData?: PlatformContentFields
): Promise<string | null> {
  try {
    // First insert the base content idea
    const { data: insertedContent, error: contentError } = await supabase
      .from('content_ideas')
      .insert({
        user_id: contentData.user_id,
        title: contentData.title,
        description: contentData.description,
        platform: contentData.platform,
        topics: contentData.topics,
        image_url: contentData.image_url,
        image_prompt: contentData.image_prompt,
        score: contentData.score ? JSON.stringify(contentData.score) : null
      })
      .select('id')
      .single();

    if (contentError) {
      handleError(contentError, "Failed to save your content idea");
      return null;
    }

    const contentId = insertedContent.id;

    // If platform-specific data was provided, insert that too
    if (platformData && Object.keys(platformData).length > 0) {
      // Convert carousel_images to string for storage
      const preparedPlatformData = {
        ...platformData,
        content_id: contentId,
        carousel_images: platformData.carousel_images ? JSON.stringify(platformData.carousel_images) : null,
        metadata: platformData.metadata ? JSON.stringify(platformData.metadata) : null
      };

      const { error: platformError } = await supabase
        .from('platform_content_fields')
        .insert(preparedPlatformData);

      if (platformError) {
        handleError(platformError, "Content saved but platform-specific details failed to save");
      }
    }

    toast.success("Content idea saved successfully!");
    return contentId;
  } catch (error) {
    handleError(error, "An unexpected error occurred while saving your content");
    return null;
  }
}
