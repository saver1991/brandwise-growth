
import { toast } from "sonner";
import { LinkedInShare } from "./types";

// LinkedIn API endpoints
const LINKEDIN_SHARE_URL = "https://api.linkedin.com/v2/ugcPosts";

export const sharePost = async (accessToken: string, userId: string, text: string, imageUrl?: string): Promise<boolean> => {
  try {
    const shareData: LinkedInShare = {
      author: `urn:li:person:${userId}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: text
          },
          shareMediaCategory: imageUrl ? "IMAGE" : "NONE"
        }
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
      }
    };
    
    // Add image if provided
    if (imageUrl) {
      shareData.specificContent["com.linkedin.ugc.ShareContent"].media = [
        {
          status: "READY",
          originalUrl: imageUrl,
          title: {
            text: "Image"
          }
        }
      ];
    }
    
    const response = await fetch(LINKEDIN_SHARE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(shareData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("LinkedIn share request failed:", errorData);
      toast.error("Failed to share content to LinkedIn");
      return false;
    }
    
    toast.success("Content successfully shared to LinkedIn!");
    return true;
  } catch (error) {
    console.error("Unexpected error sharing to LinkedIn:", error);
    toast.error("An unexpected error occurred while sharing to LinkedIn");
    return false;
  }
};
