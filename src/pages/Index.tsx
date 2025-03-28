
import { Linkedin, Users, TrendingUp, Award, MessageSquare } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProfileSummary from "@/components/ProfileSummary";
import StatCard from "@/components/StatCard";
import EngagementChart from "@/components/EngagementChart";
import ContentPerformance from "@/components/ContentPerformance";
import ContentIdeas from "@/components/ContentIdeas";
import UpcomingContent from "@/components/UpcomingContent";
import RecentActivity from "@/components/RecentActivity";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Sample content ideas for the dashboard
const sampleContentIdeas = [
  {
    id: 1,
    title: "10 AI Tools Every Content Creator Should Know",
    description: "A roundup of the best AI tools that can help streamline your content creation process.",
    platform: "medium" as const,
    topics: ["AI Tools", "Content Creation", "Productivity"],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800",
    score: {
      overall: 88,
      breakdown: {
        "Depth of Content": 90,
        "Formatting": 85,
        "Estimated Read Time": 90
      },
      feedback: "Well-structured content with good depth for Medium readers."
    }
  },
  {
    id: 2,
    title: "How I Grew My LinkedIn Network by 500% in 6 Months",
    description: "The exact strategy I used to exponentially grow my professional network and increase engagement.",
    platform: "linkedin" as const,
    topics: ["LinkedIn Growth", "Networking", "Personal Branding"],
    imageUrl: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800",
    score: {
      overall: 92,
      breakdown: {
        "Professional Tone": 95,
        "Call to Action": 90,
        "Strategic Hashtags": 90
      },
      feedback: "Excellent professional content with strong calls to action."
    }
  }
];

const Dashboard = () => {
  const [contentIdeas, setContentIdeas] = useState(sampleContentIdeas);
  const { toast } = useToast();

  const handleGenerateMoreIdeas = () => {
    // In a real app, this would call an AI service to generate more ideas
    // For demo purposes, we'll just add a sample idea
    const newIdea = {
      id: Date.now(),
      title: "The Future of Remote Work: Trends to Watch",
      description: "Analysis of emerging remote work patterns and how they're reshaping the modern workplace.",
      platform: "linkedin" as const,
      topics: ["Remote Work", "Future of Work", "Workplace Trends"],
      imageUrl: "https://images.unsplash.com/photo-1591382386627-349b692688ff?w=800",
      score: {
        overall: 85,
        breakdown: {
          "Professional Tone": 90,
          "Call to Action": 80,
          "Strategic Hashtags": 85
        },
        feedback: "Strong professional analysis with good engagement elements."
      }
    };
    
    setContentIdeas([...contentIdeas, newIdea]);
    
    toast({
      title: "New Idea Generated!",
      description: "An AI-generated content idea has been added to your dashboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="brand-container space-y-8">
          <div>
            <h1 className="text-3xl font-bold gradient-heading">Brand Growth Dashboard</h1>
            <p className="text-muted-foreground">
              Track, analyze and optimize your personal brand
            </p>
          </div>
          
          <ProfileSummary />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="LinkedIn Followers" 
              value="2,845" 
              change={{ value: "12%", positive: true }}
              icon={Linkedin}
              className="bg-gradient-to-br from-card to-[#0077B5]/5"
            />
            <StatCard 
              title="Medium Followers" 
              value="1,249" 
              change={{ value: "8%", positive: true }}
              icon={MessageSquare}
              className="bg-gradient-to-br from-card to-[#00AB6C]/5"
            />
            <StatCard 
              title="Total Audience" 
              value="4,520" 
              change={{ value: "10%", positive: true }}
              icon={Users}
              className="bg-gradient-to-br from-card to-brand-teal/5"
            />
            <StatCard 
              title="Engagement Rate" 
              value="4.8%" 
              change={{ value: "0.5%", positive: true }}
              icon={TrendingUp}
              className="bg-gradient-to-br from-card to-brand-orange/5"
            />
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <EngagementChart />
            <UpcomingContent />
            <ContentPerformance />
            <RecentActivity />
          </div>
          
          <ContentIdeas 
            ideas={contentIdeas} 
            onGenerateMore={handleGenerateMoreIdeas} 
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
