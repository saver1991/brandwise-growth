import { useEffect, useState } from "react";
import { Linkedin, Users, TrendingUp, Award, MessageSquare } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProfileSummary from "@/components/ProfileSummary";
import StatCard from "@/components/StatCard";
import EngagementChart from "@/components/EngagementChart";
import ContentPerformance from "@/components/ContentPerformance";
import ContentIdeas from "@/components/ContentIdeas";
import UpcomingContent from "@/components/UpcomingContent";
import RecentActivity from "@/components/RecentActivity";
import { useToast } from "@/hooks/use-toast";
import { NewIdeaDialog, ContentIdeaFormValues } from "@/components/NewIdeaDialog";
import { ContentIdea } from "@/types/ContentIdea";
import { ContentScore } from "@/services/aiGenerationService";
import { useAuth } from "@/contexts/AuthContext";
import { contentService } from "@/services/contentService";
import { mapDbRecordToContentIdea } from "@/types/ContentData";

const Dashboard = () => {
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentEditIdea, setCurrentEditIdea] = useState<ContentIdea | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchContentIdeas = async () => {
      if (user) {
        setLoading(true);
        try {
          const data = await contentService.getContentIdeas(user.id);
          const mappedIdeas = data
            .map(record => mapDbRecordToContentIdea(record))
            .slice(0, 2);
          setContentIdeas(mappedIdeas);
        } catch (error) {
          console.error("Error fetching content ideas:", error);
          toast.error("Failed to load your content ideas");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchContentIdeas();
  }, [user]);

  const handleGenerateMoreIdeas = () => {
    const newIdea: ContentIdea = {
      id: Date.now(),
      title: "The Future of Remote Work: Trends to Watch",
      description: "Analysis of emerging remote work patterns and how they're reshaping the modern workplace.",
      platform: "linkedin",
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

  const handleEditIdea = (idea: ContentIdea) => {
    setCurrentEditIdea(idea);
    setDialogOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setCurrentEditIdea(null);
      if (user) {
        contentService.getContentIdeas(user.id).then(data => {
          const mappedIdeas = data
            .map(record => mapDbRecordToContentIdea(record))
            .slice(0, 2);
          setContentIdeas(mappedIdeas);
        });
      }
    }
  };

  const handleCreateIdea = async (data: ContentIdeaFormValues) => {
    if (user) {
      const data = await contentService.getContentIdeas(user.id);
      const mappedIdeas = data
        .map(record => mapDbRecordToContentIdea(record))
        .slice(0, 2);
      setContentIdeas(mappedIdeas);
    }
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
          
          <div>
            {loading ? (
              <div className="flex justify-center my-8">
                <div className="h-8 w-8 border-4 border-t-brand-teal border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <ContentIdeas 
                ideas={contentIdeas} 
                onGenerateMore={handleGenerateMoreIdeas}
                onEditIdea={handleEditIdea}
              />
            )}
          </div>
        </div>
      </main>

      <NewIdeaDialog 
        open={dialogOpen} 
        onOpenChange={handleDialogOpenChange} 
        onSubmit={handleCreateIdea}
        initialData={currentEditIdea || undefined}
        editMode={!!currentEditIdea}
      />
    </div>
  );
};

export default Dashboard;
