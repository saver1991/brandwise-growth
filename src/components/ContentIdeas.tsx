
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw, Loader2 } from "lucide-react";
import { fetchTrendingTopics, TrendingTopic } from "@/services/googleTrendsService";
import { useToast } from "@/hooks/use-toast";

const ContentIdeas = () => {
  const [ideas, setIdeas] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const platformColors = {
    linkedin: "bg-[#0077B5]/10 text-[#0077B5] border-[#0077B5]/20",
    medium: "bg-[#00AB6C]/10 text-[#00AB6C] border-[#00AB6C]/20", 
    googleAnalytics: "bg-[#F4B400]/10 text-[#F4B400] border-[#F4B400]/20",
  };

  const platformNames = {
    linkedin: "LinkedIn",
    medium: "Medium",
    googleAnalytics: "Google Analytics",
  };

  useEffect(() => {
    loadTrendingTopics();
  }, []);

  const loadTrendingTopics = async () => {
    setIsLoading(true);
    try {
      const trendingIdeas = await fetchTrendingTopics();
      setIdeas(trendingIdeas);
    } catch (error) {
      console.error("Failed to fetch trending topics", error);
      toast({
        title: "Failed to load content ideas",
        description: "Could not fetch trending topics. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadTrendingTopics();
    toast({
      title: "Refreshing content ideas",
      description: "Finding the latest trending topics for you.",
    });
  };

  return (
    <Card className="col-span-full card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Content Ideas</CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <RefreshCcw className="h-4 w-4 mr-1" />
            )}
            Refresh Ideas
          </Button>
          <Button size="sm" className="bg-brand-teal hover:bg-brand-teal/90">
            <Plus className="mr-1 h-4 w-4" /> New Idea
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-brand-teal" />
          </div>
        ) : (
          <div className="grid gap-4">
            {ideas.map((idea) => (
              <div 
                key={idea.id} 
                className="border rounded-lg p-4 hover:border-brand-teal/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="font-medium">{idea.title}</h3>
                  <Badge 
                    variant="outline" 
                    className={platformColors[idea.platform]}
                  >
                    {platformNames[idea.platform]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{idea.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {idea.topics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="bg-muted">
                      {topic}
                    </Badge>
                  ))}
                </div>
                {idea.query && (
                  <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                    <span>Trending search: </span>
                    <span className="font-medium">{idea.query}</span>
                    {idea.formattedTraffic && (
                      <Badge variant="outline" className="text-[0.65rem] h-4 py-0">
                        {idea.formattedTraffic}
                      </Badge>
                    )}
                    {idea.isRising && (
                      <span className="text-green-500 font-bold">↑</span>
                    )}
                  </div>
                )}
              </div>
            ))}
            {ideas.length === 0 && !isLoading && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No content ideas found. Try refreshing or changing your search criteria.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentIdeas;
