// This is a mock service for AI content generation
// In a real application, this would integrate with OpenAI, Stability AI, or other AI APIs

export interface GenerateContentParams {
  platform: string;
  topic?: string;
  tone?: string;
}

export interface GenerateImageParams {
  prompt: string;
  size?: string;
  style?: string;
}

export interface GeneratedContent {
  title: string;
  description: string;
  topics: string[];
  score?: ContentScore;
}

export interface GeneratedImage {
  url: string;
}

export interface ContentScore {
  overall: number; // 0-100 score
  breakdown: {
    [key: string]: number; // Individual criteria scores (0-100)
  };
  feedback: string;
}

export const scorePlatformContent = (content: string, platform: string): ContentScore => {
  // In a real app, this would use NLP or other AI services to evaluate content
  // For now, we'll use a simple scoring system based on basic rules
  
  let score = 60; // Base score
  const breakdown: {[key: string]: number} = {};
  let feedback = "";
  
  // Common scoring criteria
  const lengthScore = Math.min(100, Math.max(0, content.length / 10));
  breakdown["Content Length"] = lengthScore;
  
  // Check for hashtags where appropriate
  const hasHashtags = content.includes('#');
  
  // Platform-specific scoring
  switch(platform) {
    case "linkedin":
      // LinkedIn values professional tone, adequate length, and some hashtags
      const paragraphs = content.split('\n\n').length;
      const hasCTA = content.toLowerCase().includes('comment') || 
                    content.toLowerCase().includes('share') || 
                    content.toLowerCase().includes('thoughts');
                    
      breakdown["Paragraphs"] = Math.min(100, paragraphs * 20);
      breakdown["Call to Action"] = hasCTA ? 90 : 40;
      breakdown["Professional Tone"] = 75; // Would need NLP in real app
      breakdown["Strategic Hashtags"] = hasHashtags ? 80 : 30;
      
      feedback = hasCTA ? 
        "Good use of call-to-action to drive engagement. " : 
        "Consider adding a call-to-action to increase engagement. ";
        
      feedback += hasHashtags ? 
        "Strategic hashtags will improve visibility. " : 
        "Adding 3-5 relevant hashtags would increase discoverability. ";
        
      feedback += paragraphs >= 3 ? 
        "Good structure with multiple paragraphs for readability." : 
        "Consider breaking your content into more paragraphs for better readability.";
      break;
      
    case "medium":
      // Medium values depth, formatting, and structure
      const estimatedReadTime = Math.ceil(content.length / 900); // ~180 words per minute, ~5 chars per word
      const hasFormatting = content.includes('**') || content.includes('*') || content.includes('#');
      
      breakdown["Estimated Read Time"] = Math.min(100, estimatedReadTime * 20);
      breakdown["Formatting"] = hasFormatting ? 85 : 40;
      breakdown["Depth of Content"] = Math.min(100, content.length / 20);
      
      feedback = hasFormatting ? 
        "Good use of formatting to structure your article. " : 
        "Consider adding formatting (headings, bold, italic) to improve readability. ";
        
      feedback += estimatedReadTime >= 3 ? 
        "Article has good depth for Medium readers. " : 
        "Consider expanding your article for Medium's audience who prefer in-depth content. ";
      break;
      
    case "twitter":
      // Twitter values conciseness, engagement hooks, and hashtags
      const isWithinLimit = content.length <= 280;
      const questionOrExclamation = content.includes('?') || content.includes('!');
      
      breakdown["Character Limit"] = isWithinLimit ? 100 : Math.max(0, 100 - ((content.length - 280) / 10));
      breakdown["Engagement Hooks"] = questionOrExclamation ? 85 : 40;
      breakdown["Hashtag Usage"] = hasHashtags ? 90 : 50;
      
      feedback = isWithinLimit ? 
        "Great! Your tweet is within the character limit. " : 
        `Your tweet is ${content.length - 280} characters over the limit. `;
        
      feedback += questionOrExclamation ? 
        "Good use of questions or exclamations to drive engagement. " : 
        "Consider adding a question or exclamation to increase engagement. ";
        
      feedback += hasHashtags ? 
        "Strategic hashtags will improve visibility." : 
        "Adding 1-2 relevant hashtags would increase discoverability.";
      break;
  }
  
  // Calculate overall score as average of all criteria
  const criteriaScores = Object.values(breakdown);
  score = Math.round(criteriaScores.reduce((sum, value) => sum + value, 0) / criteriaScores.length);
  
  return {
    overall: score,
    breakdown,
    feedback
  };
};

export const formatContentForPlatform = (content: string, platform: string): string => {
  switch(platform) {
    case "linkedin":
      // Format for LinkedIn: Add paragraph breaks, ensure professional tone
      let formattedContent = content;
      
      // Ensure paragraphs have proper spacing
      formattedContent = formattedContent.replace(/\n/g, '\n\n');
      
      // Add a call to action if not present
      if (!formattedContent.toLowerCase().includes('comment') && 
          !formattedContent.toLowerCase().includes('thoughts') &&
          !formattedContent.toLowerCase().includes('agree')) {
        formattedContent = formattedContent + "\n\nWhat are your thoughts on this? I'd love to hear your perspective in the comments.";
      }
      
      // Add hashtags if not present
      if (!formattedContent.includes('#')) {
        const topics = ['ProfessionalDevelopment', 'Leadership', 'Innovation', 'BusinessStrategy'];
        const randomTopics = topics.sort(() => 0.5 - Math.random()).slice(0, 3);
        formattedContent = formattedContent + '\n\n' + randomTopics.map(topic => `#${topic}`).join(' ');
      }
      
      return formattedContent;
      
    case "medium":
      // Format for Medium: Add markdown formatting
      let mediumContent = content;
      
      // Add a heading if not present
      if (!mediumContent.includes('#')) {
        const paragraphs = mediumContent.split('\n\n');
        const firstParagraph = paragraphs[0];
        
        // Use first paragraph or part of it as heading
        const headingText = firstParagraph.length > 50 ? 
          firstParagraph.substring(0, 50) + '...' : 
          firstParagraph;
          
        mediumContent = `## ${headingText}\n\n${mediumContent}`;
      }
      
      // Add some bold and italic formatting if not present
      if (!mediumContent.includes('**') && !mediumContent.includes('*')) {
        const words = mediumContent.split(' ');
        
        // Find key phrases to emphasize
        for (let i = 0; i < words.length; i++) {
          if (words[i].length > 6 && Math.random() > 0.7) {
            // Bold some important words
            words[i] = `**${words[i]}**`;
          }
        }
        
        mediumContent = words.join(' ');
      }
      
      return mediumContent;
      
    case "twitter":
      // Format for Twitter: Ensure within character limit, add hashtags
      let twitterContent = content;
      
      // Truncate if over limit
      if (twitterContent.length > 280) {
        twitterContent = twitterContent.substring(0, 277) + '...';
      }
      
      // Add hashtags if not present and there's room
      if (!twitterContent.includes('#') && twitterContent.length < 250) {
        const topics = ['Tech', 'Innovation', 'Growth', 'Strategy'];
        const randomTopics = topics.sort(() => 0.5 - Math.random()).slice(0, 2);
        twitterContent += '\n\n' + randomTopics.map(topic => `#${topic}`).join(' ');
      }
      
      return twitterContent;
      
    default:
      return content;
  }
};

export const aiGenerationService = {
  generateContent: async (params: GenerateContentParams): Promise<GeneratedContent> => {
    // In a real app, this would be an API call to an AI service
    // For now, we'll simulate a response based on the platform
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    const { platform } = params;
    
    // Generate different content ideas based on platform
    let rawContent;
    
    switch(platform) {
      case "linkedin":
        rawContent = {
          title: `${Math.random() > 0.5 ? "5" : "7"} Strategies to Boost Your Personal Brand Authority in 2023`,
          description: "Discover proven techniques to establish yourself as a thought leader in your industry through strategic LinkedIn content.",
          topics: ["Personal Branding", "Thought Leadership", "LinkedIn Strategy"]
        };
        break;
      case "medium":
        rawContent = {
          title: "The Art of Storytelling in Technical Content Writing",
          description: "Learn how to transform complex technical concepts into compelling narratives that engage and educate your readers.",
          topics: ["Content Writing", "Technical Content", "Storytelling"]
        };
        break;
      case "twitter":
        rawContent = {
          title: "Building a Micro-Content Strategy That Drives Engagement",
          description: "How to create concise, high-impact content that resonates with your audience and encourages meaningful interactions.",
          topics: ["Micro-Content", "Engagement", "Twitter Growth"]
        };
        break;
      default:
        rawContent = {
          title: "Content Marketing Trends to Watch in 2023",
          description: "Stay ahead of the curve with these emerging content marketing trends that are reshaping how brands connect with their audiences.",
          topics: ["Content Marketing", "Trends", "Digital Strategy"]
        };
    }
    
    // Format the content appropriately for the platform
    const formattedDescription = formatContentForPlatform(rawContent.description, platform);
    
    // Score the content
    const score = scorePlatformContent(formattedDescription, platform);
    
    return {
      title: rawContent.title,
      description: formattedDescription,
      topics: rawContent.topics,
      score
    };
  },
  
  generateImage: async (params: GenerateImageParams): Promise<GeneratedImage> => {
    // In a real app, this would call Stability AI, DALL-E, or another image generation API
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    
    // Return a placeholder image from Unsplash (in a real app, this would be the generated image)
    const placeholderImages = [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80"
    ];
    
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    
    return {
      url: placeholderImages[randomIndex]
    };
  },
  
  scoreContent: (content: string, platform: string): ContentScore => {
    return scorePlatformContent(content, platform);
  }
};

export default aiGenerationService;
