
import { isPlatformConnected, getPlatformCredentials } from './credentialsService';

export async function fetchLinkedInData() {
  if (!isPlatformConnected('linkedin')) {
    throw new Error('LinkedIn is not connected. Please add your API credentials.');
  }
  
  const credentials = getPlatformCredentials('linkedin');
  
  // In a real implementation, this would make API calls to LinkedIn using the provided credentials
  try {
    console.log('Fetching LinkedIn data with credentials:', credentials);
    
    // For demo purposes, we're returning hardcoded data
    // In a real app, you would make actual API calls
    return {
      followers: 2845,
      monthlyGrowth: 125,
      engagement: 4.8,
      engagementGrowth: 0.6,
      posts: 8,
      performanceData: [
        { date: "Jun 1", followers: 2450, engagement: 3.2, posts: 2 },
        { date: "Jun 8", followers: 2520, engagement: 3.5, posts: 1 },
        { date: "Jun 15", followers: 2580, engagement: 4.1, posts: 3 },
        { date: "Jun 22", followers: 2650, engagement: 3.8, posts: 2 },
        { date: "Jun 29", followers: 2720, engagement: 4.5, posts: 2 },
        { date: "Jul 6", followers: 2845, engagement: 4.8, posts: 3 },
      ],
      topPosts: [
        {
          id: 1,
          title: "The Future of Design Systems in Product Development",
          date: "Jul 2, 2023",
          views: 2850,
          likes: 189,
          comments: 42,
          shares: 28,
        },
        {
          id: 2,
          title: "UX Research Methods That Drive Product Innovation",
          date: "Jun 18, 2023",
          views: 2240,
          likes: 152,
          comments: 31,
          shares: 19,
        },
        {
          id: 3,
          title: "Building Cross-Functional Product Teams: A Designer's Perspective",
          date: "Jun 5, 2023",
          views: 1980,
          likes: 124,
          comments: 28,
          shares: 15,
        },
      ]
    };
  } catch (error) {
    console.error('Error fetching LinkedIn data:', error);
    throw error;
  }
}

export async function fetchMediumData() {
  if (!isPlatformConnected('medium')) {
    throw new Error('Medium is not connected. Please add your API credentials.');
  }
  
  const credentials = getPlatformCredentials('medium');
  
  // In a real implementation, this would make API calls to Medium using the provided credentials
  try {
    console.log('Fetching Medium data with credentials:', credentials);
    
    // For demo purposes, we're returning hardcoded data
    // In a real app, you would make actual API calls
    return {
      followers: 1249,
      views: 5200,
      readRatio: 58,
      performanceData: [
        { month: "Jan", views: 3200, reads: 1850, followers: 980 },
        { month: "Feb", views: 3800, reads: 2200, followers: 1020 },
        { month: "Mar", views: 4200, reads: 2500, followers: 1080 },
        { month: "Apr", views: 4500, reads: 2650, followers: 1150 },
        { month: "May", views: 4800, reads: 2750, followers: 1220 },
        { month: "Jun", views: 5200, reads: 2950, followers: 1249 },
      ],
      topArticles: [
        {
          id: 1,
          title: "10 UX Research Methods Every Product Designer Should Master",
          date: "Jun 15, 2023",
          stats: {
            views: 1850,
            reads: 1200,
            claps: 380,
            responses: 28
          }
        },
        {
          id: 2,
          title: "Building a Design System from Scratch: A Practical Guide",
          date: "May 22, 2023",
          stats: {
            views: 1620,
            reads: 980,
            claps: 310,
            responses: 22
          }
        },
        {
          id: 3,
          title: "The Product Designer's Guide to Working with Engineers",
          date: "Apr 10, 2023",
          stats: {
            views: 1400,
            reads: 850,
            claps: 280,
            responses: 18
          }
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching Medium data:', error);
    throw error;
  }
}

export async function fetchGoogleAnalyticsData() {
  if (!isPlatformConnected('googleAnalytics')) {
    throw new Error('Google Analytics is not connected. Please add your API credentials.');
  }
  
  const credentials = getPlatformCredentials('googleAnalytics');
  
  // In a real implementation, this would make API calls to Google Analytics using the provided credentials
  try {
    console.log('Fetching Google Analytics data with credentials:', credentials);
    
    // For demo purposes, we're returning hardcoded data
    // In a real app, you would make actual API calls
    return {
      visitors: 12450,
      pageViews: 28750,
      averageSessionDuration: 125,
      bounceRate: 45.2,
      trafficBySource: [
        { source: "Direct", value: 35 },
        { source: "Organic Search", value: 28 },
        { source: "Social", value: 22 },
        { source: "Referral", value: 10 },
        { source: "Email", value: 5 },
      ],
      pagePerformance: [
        { page: "/blog/design-systems", views: 1850, avgTime: 145 },
        { page: "/portfolio", views: 1240, avgTime: 210 },
        { page: "/services", views: 980, avgTime: 85 },
        { page: "/about", views: 720, avgTime: 65 },
        { page: "/contact", views: 540, avgTime: 50 },
      ]
    };
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error);
    throw error;
  }
}
