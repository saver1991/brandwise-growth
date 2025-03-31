import { ContentIdea, ContentScore } from "@/types/ContentIdea";
import { Database } from "@/types/supabase";

// Define the content platform type manually since the Database.Enums might not be available
export type ContentPlatform = "linkedin" | "medium" | "wordpress" | "twitter" | "facebook" | "instagram" | "youtube" | "tiktok" | "pinterest";

export interface ContentIdeaData {
  id?: string;
  user_id?: string;
  title: string;
  description: string;
  platform: ContentPlatform;
  topics: string[];
  image_url?: string;
  image_prompt?: string;
  score?: ContentScore;
  created_at?: string;
  updated_at?: string;
}

export interface ContentIdeaRecord {
  id: string;
  user_id: string;
  title: string;
  description: string;
  platform: ContentPlatform;
  topics: string[];
  image_url: string | null;
  image_prompt: string | null;
  score: ContentScore | null;
  created_at: string;
  updated_at: string;
}

export interface PlatformContentFields {
  id?: string;
  content_id: string;
  platform: ContentPlatform;
  body?: string;
  link_url?: string;
  hashtags?: string[];
  call_to_action?: string;
  video_url?: string;
  video_duration?: number;
  video_thumbnail?: string;
  carousel_images?: CarouselImage[];
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface CarouselImage {
  url: string;
  caption?: string;
}

export interface ContentWithPlatformData extends ContentIdeaRecord {
  platformData?: PlatformContentFields;
}

// Map the database records to our application types
export function mapDbRecordToContentIdea(record: ContentIdeaRecord): ContentIdea {
  return {
    id: parseInt(record.id.split('-')[0], 16), // Convert UUID to number for compatibility
    title: record.title,
    description: record.description,
    platform: record.platform as ContentIdea["platform"],
    topics: record.topics,
    imageUrl: record.image_url || "",
    score: record.score || {
      overall: 70,
      breakdown: { "Content Quality": 70 },
      feedback: "No score available yet."
    },
    imagePrompt: record.image_prompt
  };
}

export function mapContentIdeaToDbRecord(idea: ContentIdea, userId: string): ContentIdeaData {
  return {
    user_id: userId,
    title: idea.title,
    description: idea.description,
    platform: idea.platform as ContentPlatform,
    topics: idea.topics,
    image_url: idea.imageUrl,
    image_prompt: idea.imagePrompt,
    score: idea.score
  };
}

export const PLATFORM_FIELDS: Record<ContentPlatform, PlatformFieldConfig> = {
  linkedin: {
    name: 'LinkedIn',
    fields: [
      {
        name: 'body',
        label: 'Post Content',
        type: 'textarea',
        placeholder: 'Write your LinkedIn post here...',
        required: true,
        description: 'Keep your post between 1,300-2,000 characters for optimal engagement.'
      },
      {
        name: 'hashtags',
        label: 'Hashtags',
        type: 'tags',
        placeholder: 'Add relevant hashtags',
        description: 'Add 3-5 relevant hashtags to increase discoverability.'
      },
      {
        name: 'call_to_action',
        label: 'Call to Action',
        type: 'text',
        placeholder: 'What do you want readers to do?',
        description: 'Add a clear call to action to increase engagement.'
      },
      {
        name: 'link_url',
        label: 'Link URL',
        type: 'url',
        placeholder: 'https://...',
        description: 'Add a link to your article, website, or other content.'
      }
    ]
  },
  medium: {
    name: 'Medium',
    fields: [
      {
        name: 'body',
        label: 'Article Body',
        type: 'textarea',
        placeholder: 'Write your Medium article here...',
        required: true,
        description: 'Medium articles typically perform best at 7-minute read time (1,600-2,000 words).'
      },
      {
        name: 'hashtags',
        label: 'Topics',
        type: 'tags',
        placeholder: 'Add relevant topics',
        description: 'Add 3-5 relevant topics to increase discoverability.'
      }
    ]
  },
  wordpress: {
    name: 'WordPress',
    fields: [
      {
        name: 'body',
        label: 'Post Content',
        type: 'textarea',
        placeholder: 'Write your WordPress blog post here...',
        required: true,
        description: 'Blog posts typically perform best at 1,500-2,500 words.'
      },
      {
        name: 'call_to_action',
        label: 'Call to Action',
        type: 'text',
        placeholder: 'What do you want readers to do?',
        description: 'Add a clear call to action at the end of your post.'
      },
      {
        name: 'hashtags',
        label: 'Categories',
        type: 'tags',
        placeholder: 'Add relevant categories',
        description: 'Add categories to help organize your content.'
      }
    ]
  },
  twitter: {
    name: 'Twitter',
    fields: [
      {
        name: 'body',
        label: 'Tweet Content',
        type: 'textarea',
        placeholder: 'Write your tweet here...',
        required: true,
        description: 'Keep your tweet under 280 characters.'
      },
      {
        name: 'hashtags',
        label: 'Hashtags',
        type: 'tags',
        placeholder: 'Add relevant hashtags',
        description: 'Use 1-2 relevant hashtags to increase reach.'
      },
      {
        name: 'link_url',
        label: 'Link URL',
        type: 'url',
        placeholder: 'https://...',
        description: 'Add a link to your article, website, or other content.'
      }
    ]
  },
  facebook: {
    name: 'Facebook',
    fields: [
      {
        name: 'body',
        label: 'Post Content',
        type: 'textarea',
        placeholder: 'Write your Facebook post here...',
        required: true,
        description: 'Optimal Facebook posts are between 40-80 characters.'
      },
      {
        name: 'link_url',
        label: 'Link URL',
        type: 'url',
        placeholder: 'https://...',
        description: 'Add a link to your article, website, or other content.'
      },
      {
        name: 'call_to_action',
        label: 'Call to Action',
        type: 'text',
        placeholder: 'What do you want readers to do?',
        description: 'Add a question or call to action to increase engagement.'
      }
    ]
  },
  instagram: {
    name: 'Instagram',
    fields: [
      {
        name: 'body',
        label: 'Caption',
        type: 'textarea',
        placeholder: 'Write your Instagram caption here...',
        required: true,
        description: 'Keep captions between 138-150 characters for optimal engagement.'
      },
      {
        name: 'hashtags',
        label: 'Hashtags',
        type: 'tags',
        placeholder: 'Add relevant hashtags',
        description: 'Add 5-10 relevant hashtags to increase discoverability.'
      },
      {
        name: 'carousel_images',
        label: 'Carousel Images',
        type: 'carousel',
        description: 'Add up to 10 images for an Instagram carousel.'
      },
      {
        name: 'link_url',
        label: 'Link in Bio URL',
        type: 'url',
        placeholder: 'https://...',
        description: 'URL to reference in your "link in bio" call to action.'
      }
    ]
  },
  youtube: {
    name: 'YouTube',
    fields: [
      {
        name: 'title',
        label: 'Video Title',
        type: 'text',
        placeholder: 'Enter video title',
        required: true,
        description: 'Keep titles under 60 characters to avoid truncation.'
      },
      {
        name: 'body',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Write your video description here...',
        required: true,
        description: 'Include relevant keywords in first 100 characters.'
      },
      {
        name: 'video_url',
        label: 'Video URL',
        type: 'video',
        placeholder: 'Upload or link your video',
        required: true,
        description: 'Upload your video or link to an existing one.'
      },
      {
        name: 'hashtags',
        label: 'Tags',
        type: 'tags',
        placeholder: 'Add relevant tags',
        description: 'Add up to 15 relevant tags to improve discoverability.'
      },
      {
        name: 'video_thumbnail',
        label: 'Thumbnail',
        type: 'image',
        description: 'Upload a custom thumbnail for your video.'
      }
    ]
  },
  tiktok: {
    name: 'TikTok',
    fields: [
      {
        name: 'body',
        label: 'Caption',
        type: 'textarea',
        placeholder: 'Write your TikTok caption here...',
        required: true,
        description: 'Keep captions short and engaging, under 150 characters.'
      },
      {
        name: 'video_url',
        label: 'Video',
        type: 'video',
        placeholder: 'Upload or link your video',
        required: true,
        description: 'Upload your TikTok video or link to an existing one.'
      },
      {
        name: 'hashtags',
        label: 'Hashtags',
        type: 'tags',
        placeholder: 'Add relevant hashtags',
        description: 'Add 3-5 trending hashtags to increase visibility.'
      }
    ]
  },
  pinterest: {
    name: 'Pinterest',
    fields: [
      {
        name: 'body',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Write your pin description here...',
        required: true,
        description: 'Keep descriptions between 100-200 characters.'
      },
      {
        name: 'link_url',
        label: 'Destination Link',
        type: 'url',
        placeholder: 'https://...',
        description: 'Link to the page you want to drive traffic to.'
      },
      {
        name: 'hashtags',
        label: 'Tags',
        type: 'tags',
        placeholder: 'Add relevant tags',
        description: 'Add up to 10 relevant hashtags to improve discoverability.'
      }
    ]
  }
};
