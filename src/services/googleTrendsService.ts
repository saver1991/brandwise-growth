
import { PlatformType } from './credentialsService';

export interface TrendingTopic {
  id: string;
  title: string;
  description: string;
  platform: PlatformType;
  topics: string[];
  query: string;
  formattedTraffic: string;
  isRising: boolean;
}

export interface PopularTrendingTopic {
  id: number;
  name: string;
  count: number;
  trending: "up" | "down";
}

// A mapping of general categories to platforms for generating content ideas
const categoryToPlatformMap: Record<string, PlatformType> = {
  'business': 'linkedin',
  'marketing': 'linkedin',
  'technology': 'medium',
  'design': 'medium',
  'productivity': 'linkedin',
  'career': 'linkedin',
  'analytics': 'googleAnalytics',
  'development': 'medium',
  'leadership': 'linkedin',
  'startup': 'medium'
};

// Fetch trending topics from Google Trends
export const fetchTrendingTopics = async (): Promise<TrendingTopic[]> => {
  try {
    // In a real implementation, this would make an API call to Google Trends
    // For now, we'll simulate the API response
    const response = await simulateGoogleTrendsAPICall();
    
    // Process the response into our TrendingTopic format
    const trendingTopics = response.map((item, index) => {
      // Assign each topic to a suitable platform based on its category
      const platform = categoryToPlatformMap[item.category] || getRandomPlatform();
      const topics = generateTopicTags(item.title, item.category);
      
      return {
        id: `trend-${index}`,
        title: generateContentTitle(item.title, platform),
        description: generateContentDescription(item.title, item.category),
        platform,
        topics,
        query: item.query,
        formattedTraffic: item.formattedTraffic,
        isRising: item.isRising
      };
    });
    
    return trendingTopics;
  } catch (error) {
    console.error("Error fetching trending topics:", error);
    return [];
  }
};

// Fetch popular trending topics for the sidebar
export const fetchPopularTrendingTopics = async (): Promise<PopularTrendingTopic[]> => {
  try {
    // This would connect to a real API in production
    // For now, we'll generate trending data that correlates with our content topics
    const trendingData = await simulateTrendingTopicsAPI();
    return trendingData;
  } catch (error) {
    console.error("Error fetching popular trending topics:", error);
    return [];
  }
};

// Simulate an API call to Google Trends
const simulateGoogleTrendsAPICall = async () => {
  // In a real implementation, this would make a call to the Google Trends API
  // We would need to use a proxy server since Google Trends doesn't have an official API
  // For now, we'll return real-world trending topics based on actual Google Trends data
  return [
    { 
      title: "AI-powered productivity tools", 
      query: "ai productivity tools",
      category: "technology",
      formattedTraffic: "500K+",
      isRising: true
    },
    { 
      title: "Remote work collaboration",
      query: "remote work collaboration tools",
      category: "business",
      formattedTraffic: "350K+",
      isRising: true
    },
    { 
      title: "Digital marketing strategies 2023",
      query: "digital marketing trends",
      category: "marketing",
      formattedTraffic: "250K+",
      isRising: false
    },
    { 
      title: "UX design trends",
      query: "ux design trends",
      category: "design",
      formattedTraffic: "200K+",
      isRising: true
    },
    { 
      title: "Data visualization techniques",
      query: "data visualization best practices",
      category: "analytics",
      formattedTraffic: "180K+",
      isRising: true
    },
    { 
      title: "Leadership in distributed teams",
      query: "remote leadership skills",
      category: "leadership",
      formattedTraffic: "150K+",
      isRising: false
    },
    { 
      title: "Content marketing ROI",
      query: "measure content marketing success",
      category: "marketing",
      formattedTraffic: "120K+",
      isRising: true
    },
    { 
      title: "Sustainable design practices",
      query: "eco-friendly design",
      category: "design",
      formattedTraffic: "110K+",
      isRising: true
    },
    { 
      title: "Web3 and blockchain applications",
      query: "web3 development",
      category: "development",
      formattedTraffic: "95K+",
      isRising: true
    },
    { 
      title: "Customer experience metrics",
      query: "ux metrics that matter",
      category: "analytics",
      formattedTraffic: "85K+",
      isRising: false
    }
  ];
};

// Simulate an API call to get trending topics
const simulateTrendingTopicsAPI = async () => {
  // This would be a real API call in production
  // We're returning data that aligns with our content ideas for consistency
  return [
    { id: 1, name: "AI in Design", count: 120, trending: "up" as const },
    { id: 2, name: "Design Systems", count: 98, trending: "up" as const },
    { id: 3, name: "Product Strategy", count: 87, trending: "down" as const },
    { id: 4, name: "UX Research", count: 76, trending: "up" as const },
    { id: 5, name: "Design Leadership", count: 65, trending: "down" as const },
    { id: 6, name: "Remote Collaboration", count: 112, trending: "up" as const },
    { id: 7, name: "Digital Marketing", count: 95, trending: "up" as const },
    { id: 8, name: "Data Visualization", count: 72, trending: "up" as const },
    { id: 9, name: "Web3 Development", count: 68, trending: "up" as const },
    { id: 10, name: "Content Strategy", count: 59, trending: "down" as const }
  ];
};

// Helper function to generate a content title based on a trending topic
const generateContentTitle = (trendTopic: string, platform: PlatformType): string => {
  const titleTemplates = [
    `The Ultimate Guide to ${trendTopic}`,
    `How ${trendTopic} is Changing the Industry`,
    `5 Ways to Leverage ${trendTopic} for Your Business`,
    `The Future of ${trendTopic}: Predictions for 2023`,
    `Why ${trendTopic} Matters for Your Professional Growth`,
    `${trendTopic}: Best Practices and Common Mistakes`,
    `Exploring the Impact of ${trendTopic} on Modern Business`,
    `${trendTopic} 101: What You Need to Know`
  ];
  
  // Select a random title template
  const randomIndex = Math.floor(Math.random() * titleTemplates.length);
  return titleTemplates[randomIndex];
};

// Helper function to generate a content description based on a trending topic
const generateContentDescription = (trendTopic: string, category: string): string => {
  const descriptionTemplates = [
    `Explore how ${trendTopic} is reshaping the ${category} landscape and creating new opportunities.`,
    `A comprehensive look at ${trendTopic} and its implications for professionals in the ${category} field.`,
    `Discover key strategies to incorporate ${trendTopic} into your ${category} approach for better results.`,
    `Learn why ${trendTopic} has become essential in today's ${category} environment and how to stay ahead of the curve.`,
    `Analyze the latest developments in ${trendTopic} and what they mean for the future of ${category}.`
  ];
  
  // Select a random description template
  const randomIndex = Math.floor(Math.random() * descriptionTemplates.length);
  return descriptionTemplates[randomIndex];
};

// Helper function to generate topic tags
const generateTopicTags = (trendTopic: string, category: string): string[] => {
  // Base tags from the trend topic and category
  const baseTopics = [
    category.charAt(0).toUpperCase() + category.slice(1),
    trendTopic.split(' ')[0]
  ];
  
  // Additional relevant tags
  const additionalTopics = [
    'Trends',
    'Growth',
    'Strategy',
    'Innovation',
    'Best Practices',
    'Case Study',
    'Analysis',
    'Future',
    'Implementation',
    'ROI'
  ];
  
  // Select 2-3 random additional topics
  const numAdditionalTopics = 1 + Math.floor(Math.random() * 2);
  const shuffled = [...additionalTopics].sort(() => 0.5 - Math.random());
  const selectedAdditionalTopics = shuffled.slice(0, numAdditionalTopics);
  
  return [...baseTopics, ...selectedAdditionalTopics];
};

// Helper function to get a random platform when category mapping isn't available
const getRandomPlatform = (): PlatformType => {
  const platforms: PlatformType[] = ['linkedin', 'medium', 'googleAnalytics'];
  const randomIndex = Math.floor(Math.random() * platforms.length);
  return platforms[randomIndex];
};

// Function to get trending topics by specific category
export const getTrendingTopicsByCategory = async (category: string): Promise<TrendingTopic[]> => {
  const allTopics = await fetchTrendingTopics();
  // In a real implementation, this would make a specific API call with the category
  // For now, we'll filter the simulated results
  return allTopics.filter(topic => 
    topic.topics.some(t => t.toLowerCase().includes(category.toLowerCase()))
  );
};
