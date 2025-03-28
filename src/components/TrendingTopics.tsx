
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Loader2, RefreshCcw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  fetchPopularTrendingTopics, 
  PopularTrendingTopic 
} from "@/services/googleTrendsService";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { isPlatformConnected } from "@/services/credentialsService";
import { fetchGoogleAnalyticsData } from "@/services/platformDataService";

const TrendingTopics = () => {
  const [topics, setTopics] = useState<PopularTrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingGAData, setUsingGAData] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTrendingTopics();
  }, []);

  const loadTrendingTopics = async () => {
    setIsLoading(true);
    setError(null);
    
    // First check if we can use Google Analytics data
    const isGAConnected = isPlatformConnected('googleAnalytics');
    setUsingGAData(false);
    
    try {
      let trendingTopics: PopularTrendingTopic[] = [];
      
      if (isGAConnected) {
        // Try to get topics from GA first
        try {
          const gaData = await fetchGoogleAnalyticsData();
          // Convert page performance to trending topics
          trendingTopics = gaData.pagePerformance.map((page, index) => ({
            id: index + 1, // Convert to number type as required by PopularTrendingTopic
            name: page.page,
            count: page.views,
            trending: page.views > 1000 ? "up" : "down"
          }));
          setUsingGAData(true);
        } catch (gaError) {
          console.error("Failed to fetch GA data for trends:", gaError);
          // Fall back to Google Trends API
          trendingTopics = await fetchPopularTrendingTopics();
        }
      } else {
        // Use Google Trends API directly
        trendingTopics = await fetchPopularTrendingTopics();
      }
      
      setTopics(trendingTopics);
    } catch (error) {
      console.error("Failed to fetch trending topics", error);
      setError("Could not fetch trending topics. We might be experiencing CORS issues with the Google Trends API.");
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
        <CardTitle>
          Trending Topics
          {usingGAData && (
            <span className="text-xs font-normal text-muted-foreground ml-2">
              (from Google Analytics)
            </span>
          )}
        </CardTitle>
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
        ) : error ? (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
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
            {topics.length === 0 && !isLoading && !error && (
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
