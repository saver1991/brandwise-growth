
import { supabase } from "@/integrations/supabase/client";
import { ContentIdeaData, ContentIdeaRecord, ContentPlatform, ContentWithPlatformData, PlatformContentFields } from "@/types/ContentData";
import { toast } from "sonner";

export const contentService = {
  async getContentIdeas(userId: string): Promise<ContentIdeaRecord[]> {
    try {
      const { data, error } = await supabase
        .from('content_ideas')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching content ideas:", error);
        toast.error("Failed to load your content ideas");
        return [];
      }

      // Parse the JSONB columns
      return data.map(item => ({
        ...item,
        topics: Array.isArray(item.topics) ? item.topics : JSON.parse(item.topics || '[]'),
        score: item.score ? JSON.parse(item.score) : null
      })) as ContentIdeaRecord[];
    } catch (error) {
      console.error("Unexpected error fetching content ideas:", error);
      toast.error("An unexpected error occurred while loading your content ideas");
      return [];
    }
  },

  async getContentIdeaById(id: string): Promise<ContentWithPlatformData | null> {
    try {
      // First get the content idea
      const { data: contentData, error: contentError } = await supabase
        .from('content_ideas')
        .select('*')
        .eq('id', id)
        .single();

      if (contentError) {
        console.error("Error fetching content idea:", contentError);
        toast.error("Failed to load content idea details");
        return null;
      }

      // Parse the JSONB columns
      const content = {
        ...contentData,
        topics: Array.isArray(contentData.topics) ? contentData.topics : JSON.parse(contentData.topics || '[]'),
        score: contentData.score ? JSON.parse(contentData.score) : null
      } as ContentIdeaRecord;

      // Get platform-specific data if available
      const { data: platformData, error: platformError } = await supabase
        .from('platform_content_fields')
        .select('*')
        .eq('content_id', id)
        .eq('platform', content.platform)
        .maybeSingle();

      if (platformError) {
        console.error("Error fetching platform-specific content:", platformError);
        // Continue without platform data
        return content;
      }

      let parsedPlatformData = platformData;
      if (platformData) {
        // Parse the JSONB columns
        parsedPlatformData = {
          ...platformData,
          hashtags: platformData.hashtags || [],
          carousel_images: platformData.carousel_images ? JSON.parse(platformData.carousel_images) : [],
          metadata: platformData.metadata ? JSON.parse(platformData.metadata) : {}
        };
      }

      return {
        ...content,
        platformData: parsedPlatformData
      };
    } catch (error) {
      console.error("Unexpected error fetching content idea:", error);
      toast.error("An unexpected error occurred while loading content details");
      return null;
    }
  },

  async createContentIdea(contentData: ContentIdeaData, platformData?: PlatformContentFields): Promise<string | null> {
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
          score: contentData.score
        })
        .select('id')
        .single();

      if (contentError) {
        console.error("Error creating content idea:", contentError);
        toast.error("Failed to save your content idea");
        return null;
      }

      const contentId = insertedContent.id;

      // If platform-specific data was provided, insert that too
      if (platformData && Object.keys(platformData).length > 0) {
        const { error: platformError } = await supabase
          .from('platform_content_fields')
          .insert({
            content_id: contentId,
            platform: contentData.platform,
            ...platformData
          });

        if (platformError) {
          console.error("Error saving platform-specific content data:", platformError);
          toast.error("Content saved but platform-specific details failed to save");
        }
      }

      toast.success("Content idea saved successfully!");
      return contentId;
    } catch (error) {
      console.error("Unexpected error creating content:", error);
      toast.error("An unexpected error occurred while saving your content");
      return null;
    }
  },

  async updateContentIdea(
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
          score: contentData.score
        })
        .eq('id', id);

      if (contentError) {
        console.error("Error updating content idea:", contentError);
        toast.error("Failed to update your content idea");
        return false;
      }

      // If platform-specific data was provided, upsert that too
      if (platformData && Object.keys(platformData).length > 0) {
        const { error: platformError } = await supabase
          .from('platform_content_fields')
          .upsert({
            content_id: id,
            platform: contentData.platform,
            ...platformData
          });

        if (platformError) {
          console.error("Error updating platform-specific content data:", platformError);
          toast.error("Content updated but platform-specific details failed to save");
        }
      }

      toast.success("Content idea updated successfully!");
      return true;
    } catch (error) {
      console.error("Unexpected error updating content:", error);
      toast.error("An unexpected error occurred while updating your content");
      return false;
    }
  },

  async deleteContentIdea(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('content_ideas')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting content idea:", error);
        toast.error("Failed to delete content idea");
        return false;
      }

      toast.success("Content idea deleted successfully");
      return true;
    } catch (error) {
      console.error("Unexpected error deleting content:", error);
      toast.error("An unexpected error occurred while deleting your content");
      return false;
    }
  }
};
