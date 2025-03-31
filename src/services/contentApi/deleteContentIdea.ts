
import { supabase } from "@/integrations/supabase/client";
import { handleError } from "./utils";
import { toast } from "sonner";

export async function deleteContentIdea(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('content_ideas')
      .delete()
      .eq('id', id);

    if (error) {
      handleError(error, "Failed to delete content idea");
      return false;
    }

    toast.success("Content idea deleted successfully");
    return true;
  } catch (error) {
    handleError(error, "An unexpected error occurred while deleting your content");
    return false;
  }
}
