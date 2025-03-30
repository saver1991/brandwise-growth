
// AI content generation templates for different platforms and content types

type TemplateCategory = 'linkedin' | 'medium' | 'wordpress';

interface Template {
  id: string;
  name: string;
  description: string;
  titleTemplate: string;
  contentTemplate: string;
  suggestedTopics: string[];
}

// Content generation templates by platform
export const contentTemplates: Record<TemplateCategory, Template[]> = {
  linkedin: [
    {
      id: 'linkedin-thought-leadership',
      name: 'Thought Leadership',
      description: 'Establish yourself as an authority in your field',
      titleTemplate: 'The Future of [Industry]: [Number] Trends Reshaping How We [Action]',
      contentTemplate: 'In this insightful exploration of [industry] trends, I share my perspective on how [trend1] and [trend2] are transforming the landscape. Based on my experience...',
      suggestedTopics: ['Industry Insights', 'Leadership', 'Future Trends', 'Professional Development']
    },
    {
      id: 'linkedin-case-study',
      name: 'Case Study',
      description: 'Share success stories and real-world applications',
      titleTemplate: 'How [Company/Client] Achieved [Result] by Implementing [Strategy/Solution]',
      contentTemplate: 'In this case study, I break down the approach that helped [Company/Client] overcome [challenge] and achieve [specific result] in just [timeframe]...',
      suggestedTopics: ['Case Study', 'Success Story', 'ROI', 'Implementation']
    },
    {
      id: 'linkedin-listicle',
      name: 'Listicle',
      description: 'Easy-to-consume content with actionable points',
      titleTemplate: '[Number] Essential [Resources/Strategies/Tools] for [Professional Goal]',
      contentTemplate: 'Based on my experience helping professionals achieve [goal], I\'ve compiled these [number] proven [resources/strategies/tools] that can help you...',
      suggestedTopics: ['Professional Tips', 'Career Growth', 'Productivity', 'Skills Development']
    }
  ],
  medium: [
    {
      id: 'medium-how-to',
      name: 'How-To Guide',
      description: 'Step-by-step instructions for solving specific problems',
      titleTemplate: 'How to [Accomplish Task] in [Number] Simple Steps',
      contentTemplate: 'In this comprehensive guide, I\'ll walk you through the exact process I use to [accomplish task], breaking it down into manageable steps that anyone can follow...',
      suggestedTopics: ['Tutorial', 'Process', 'Guide', 'Skill Building']
    },
    {
      id: 'medium-deep-dive',
      name: 'Deep Dive',
      description: 'Comprehensive analysis of a specific topic',
      titleTemplate: 'The Ultimate Guide to [Topic]: Everything You Need to Know',
      contentTemplate: 'In this in-depth exploration of [topic], we\'ll cover everything from the fundamental concepts to advanced strategies that few experts are discussing...',
      suggestedTopics: ['Analysis', 'Comprehensive Guide', 'Research', 'Industry Knowledge']
    },
    {
      id: 'medium-opinion',
      name: 'Opinion Piece',
      description: 'Share your unique perspective on industry trends',
      titleTemplate: 'Why [Common Belief] Is Wrong (And What to Do Instead)',
      contentTemplate: 'In this article, I challenge the conventional wisdom about [topic] and propose an alternative approach based on my experience with [relevant experience]...',
      suggestedTopics: ['Opinion', 'Perspective', 'Industry Debate', 'Alternative Approach']
    }
  ],
  wordpress: [
    {
      id: 'wordpress-blog-post',
      name: 'Blog Post',
      description: 'Create engaging and SEO-friendly blog content',
      titleTemplate: '[Number] Ways to [Achieve Goal] in [Timeframe/Industry]',
      contentTemplate: 'In this detailed blog post, I explore practical strategies for [goal] that you can implement right away. Based on my experience with [relevant experience]...',
      suggestedTopics: ['How-To', 'Tips & Tricks', 'Industry Insights', 'Best Practices']
    },
    {
      id: 'wordpress-seo-article',
      name: 'SEO Article',
      description: 'Optimized content to rank well in search engines',
      titleTemplate: 'The Complete Guide to [Topic]: Everything You Need to Know in [Year]',
      contentTemplate: 'In this comprehensive guide to [topic], I\'ll cover everything from the basics to advanced strategies, including [subtopic1], [subtopic2], and [subtopic3]...',
      suggestedTopics: ['Complete Guide', 'SEO Optimization', 'Industry Expertise', 'Current Trends']
    },
    {
      id: 'wordpress-listicle',
      name: 'Listicle',
      description: 'Easy-to-scan content with valuable points',
      titleTemplate: '[Number] Essential [Resources/Tips/Strategies] for [Target Audience]',
      contentTemplate: 'Looking to improve your [skill/area]? Here are [number] proven [resources/tips/strategies] that will help you [achieve goal] faster and more effectively...',
      suggestedTopics: ['Resources', 'Tools', 'Strategies', 'Best Practices']
    }
  ]
};

// Prompt templates for generating images
export const imagePromptTemplates = [
  {
    id: 'professional-portrait',
    name: 'Professional Portrait',
    prompt: 'Professional headshot of a [gender] [profession] with [appearance details] against a [color/style] background, professional lighting, high quality, corporate'
  },
  {
    id: 'concept-illustration',
    name: 'Concept Illustration',
    prompt: 'Conceptual illustration representing [concept/idea], minimalist design, professional, suitable for a business presentation, clean lines, abstract'
  },
  {
    id: 'data-visualization',
    name: 'Data Visualization',
    prompt: 'Clean, modern data visualization showing [type of data] for [industry/topic], professional chart/graph, corporate style, information design, clear labels'
  },
  {
    id: 'workspace-scene',
    name: 'Workspace Scene',
    prompt: 'Modern professional workspace with [details of items], organized desk, [style] aesthetic, productivity focused, professional environment'
  }
];

export const getTemplateByPlatform = (platform: TemplateCategory): Template[] => {
  return contentTemplates[platform] || [];
};

export const getRandomTemplate = (platform: TemplateCategory): Template => {
  const templates = contentTemplates[platform];
  return templates[Math.floor(Math.random() * templates.length)];
};

export const getRandomImagePrompt = (): string => {
  const template = imagePromptTemplates[Math.floor(Math.random() * imagePromptTemplates.length)];
  return template.prompt;
};

// Generate an image prompt based on content details
export const generateImagePromptFromContent = (title: string, description: string, platform: string): string => {
  // Choose a template based on content type/platform
  let template = '';
  
  switch(platform) {
    case 'linkedin':
      template = 'Professional business illustration representing the concept of "[title]", clean corporate style, professional, minimalist, suitable for LinkedIn';
      break;
    case 'medium':
      template = 'Conceptual illustration for an article titled "[title]", editorial style, clean design, intellectual, thought-provoking, suitable for Medium';
      break;
    case 'wordpress':
      template = 'Featured image for a blog post titled "[title]", professional, clean design, web-friendly, suitable for WordPress';
      break;
    default:
      template = 'Conceptual illustration representing "[title]", minimalist design, professional, clean lines';
  }
  
  // Replace placeholders with actual content
  const prompt = template.replace('[title]', title);
  
  return prompt;
};

export default {
  contentTemplates,
  imagePromptTemplates,
  getTemplateByPlatform,
  getRandomTemplate,
  getRandomImagePrompt,
  generateImagePromptFromContent
};
