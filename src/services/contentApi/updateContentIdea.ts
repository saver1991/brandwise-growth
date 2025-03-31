
import { supabase } from "@/integrations/supabase/client";
import { ContentIdeaData, PlatformContentFields } from "@/types/ContentData";
import { handleError } from "./utils";
import { toast } from "sonner";

export async function updateContentIdea(
  id: string, 
  contentData: Partial<ContentIdeaData>, 
  platformData?: PlatformContentFields
): Promise<boolean> {
  try {
    // Update the content idea
    const { error: contentError } = await supabase
      .from('content_ideas')
      .update({
        title: contentData.title,
        description: contentData.description,
        platform: contentData.platform,
        topics: contentData.topics,
        image_url: contentData.image_url,
        image_prompt: contentData.image_prompt,
        score: contentData.score ? JSON.stringify(contentData.score) : null
      })
      .eq('id', id);

    if (contentError) {
      handleError(contentError, "Failed to update your content idea");
      return false;
    }

    // If platform-specific data was provided, upsert that too
    if (platformData && Object.keys(platformData).length > 0) {
      // Convert carousel_images to string for storage
      const preparedPlatformData = {
        ...platformData,
        content_id: id,
        carousel_images: platformData.carousel_images ? JSON.stringify(platformData.carousel_images) : null,
        metadata: platformData.metadata ? JSON.stringify(platformData.metadata) : null
      };

      const { error: platformError } = await supabase
        .from('platform_content_fields')
        .upsert(preparedPlatformData);

      if (platformError) {
        handleError(platformError, "Content updated but platform-specific details failed to save");
      }
    }

    toast.success("Content idea updated successfully!");
    return true;
  } catch (error) {
    handleError(error, "An unexpected error occurred while updating your content");
    return false;
  }
}
