
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  fetchPopularTrendingTopics, 
  PopularTrendingTopic 
} from "@/services/googleTrendsService";
import { useToast } from "@/hooks/use-toast";

const TrendingTopics = () => {
  const [topics, setTopics] = useState<PopularTrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTrendingTopics();
  }, []);

  const loadTrendingTopics = async () => {
    setIsLoading(true);
    try {
      const trendingTopics = await fetchPopularTrendingTopics();
      setTopics(trendingTopics);
    } catch (error) {
      console.error("Failed to fetch trending topics", error);
      toast({
        title: "Failed to load trending topics",
        description: "Could not fetch trending topics data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadTrendingTopics();
    toast({
      title: "Refreshing trending topics",
      description: "Getting the latest trending topic data.",
    });
  };

  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Trending Topics</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh} 
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-brand-teal" />
          </div>
        ) : (
          <div className="space-y-3">
            {topics.map((topic) => (
              <div 
                key={topic.id} 
                className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{topic.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">{topic.count}</span>
                  {topic.trending === "up" ? (
                    <div className="text-green-500">↑</div>
                  ) : (
                    <div className="text-red-500">↓</div>
                  )}
                </div>
              </div>
            ))}
            {topics.length === 0 && !isLoading && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No trending topics found. Try refreshing.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;
