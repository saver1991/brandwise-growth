
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, MessageSquare, Linkedin, Twitter, BookOpen, ArrowUpRight } from "lucide-react";
import ContentIdeas from "@/components/ContentIdeas";
import { useState } from "react";
import { NewIdeaDialog, ContentIdeaFormValues } from "@/components/NewIdeaDialog";
import { useToast } from "@/hooks/use-toast";

const trendingTopics = [
  { id: 1, name: "AI in Design", count: 120, trending: "up" },
  { id: 2, name: "Design Systems", count: 98, trending: "up" },
  { id: 3, name: "Product Strategy", count: 87, trending: "down" },
  { id: 4, name: "UX Research", count: 76, trending: "up" },
  { id: 5, name: "Design Leadership", count: 65, trending: "down" },
];

// Sample content ideas for the ContentIdeas component
const sampleContentIdeas = [
  {
    id: 1,
    title: "The Future of UX Design in 2023",
    description: "Exploring emerging trends and technologies shaping the future of user experience design.",
    platform: "medium" as const,
    topics: ["UX Design", "Technology", "Future Trends"],
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800",
    score: {
      overall: 85,
      breakdown: {
        "Depth of Content": 90,
        "Formatting": 80,
        "Estimated Read Time": 85
      },
      feedback: "Great depth and structure for a Medium article."
    }
  },
  {
    id: 2,
    title: "5 Design System Tips for Growing Teams",
    description: "Learn how to scale your design system as your team and product portfolio expands.",
    platform: "linkedin" as const,
    topics: ["Design Systems", "Team Growth", "Product Design"],
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
    score: {
      overall: 78,
      breakdown: {
        "Professional Tone": 85,
        "Call to Action": 70,
        "Strategic Hashtags": 80
      },
      feedback: "Good professional content, consider adding more specific call to action."
    }
  }
];

const Ideas = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contentIdeas, setContentIdeas] = useState(sampleContentIdeas);
  const { toast } = useToast();

  const handleCreateIdea = (data: ContentIdeaFormValues) => {
    // In a real app, this would save to a database
    // For now, we'll just show a toast notification
    toast({
      title: "Idea Created!",
      description: "Your new content idea has been added to the list.",
    });
  };

  const handleGenerateMoreIdeas = () => {
    // In a real app, this would call an AI service to generate more ideas
    // For demo purposes, we'll just add a sample idea
    const newIdea = {
      id: Date.now(),
      title: "Building a Design-Driven Culture",
      description: "Strategies for fostering a design-thinking approach across your entire organization.",
      platform: "linkedin" as const,
      topics: ["Design Culture", "Leadership", "Organizational Change"],
      imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800",
      score: {
        overall: 82,
        breakdown: {
          "Professional Tone": 88,
          "Call to Action": 75,
          "Strategic Hashtags": 83
        },
        feedback: "Strong professional content with good engagement hooks."
      }
    };
    
    setContentIdeas([...contentIdeas, newIdea]);
    
    toast({
      title: "New Idea Generated!",
      description: "An AI-generated content idea has been added to your list.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="brand-container space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-heading">Content Creation</h1>
              <p className="text-muted-foreground">
                Discover, organize, and develop your content ideas
              </p>
            </div>
            <Button 
              className="bg-brand-teal hover:bg-brand-teal/90"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="mr-1 h-4 w-4" /> New Idea
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ContentIdeas 
                ideas={contentIdeas} 
                onGenerateMore={handleGenerateMoreIdeas} 
              />
            </div>
            
            <div className="space-y-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Trending Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingTopics.map((topic) => (
                      <div key={topic.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 transition-colors">
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
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Inspiration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="rounded-md border p-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">
                          Design Trends in 2023: What's New and What's Next
                        </h3>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        From Nielsen Norman Group
                      </p>
                    </div>
                    
                    <div className="rounded-md border p-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">
                          The Role of Design Systems in Product Development
                        </h3>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        From Smashing Magazine
                      </p>
                    </div>
                    
                    <div className="rounded-md border p-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">
                          Product Strategy: Aligning Business Goals with User Needs
                        </h3>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        From Harvard Business Review
                      </p>
                    </div>
                  </div>
                  
                  <Button variant="link" className="text-brand-teal mt-3 p-0 h-auto">
                    View more inspiration
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <NewIdeaDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onSubmit={handleCreateIdea}
      />
    </div>
  );
};

export default Ideas;
