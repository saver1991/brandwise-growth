
import { ContentIdeaData, ContentIdeaRecord, ContentWithPlatformData, PlatformContentFields } from "@/types/ContentData";
import { getContentIdeas } from "./contentApi/getContentIdeas";
import { getContentIdeaById } from "./contentApi/getContentIdeaById";
import { createContentIdea } from "./contentApi/createContentIdea";
import { updateContentIdea } from "./contentApi/updateContentIdea";
import { deleteContentIdea } from "./contentApi/deleteContentIdea";

export const contentService = {
  getContentIdeas,
  getContentIdeaById,
  createContentIdea,
  updateContentIdea,
  deleteContentIdea
};
