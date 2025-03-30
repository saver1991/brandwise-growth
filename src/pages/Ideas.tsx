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

const inspirationArticles = [
  {
    id: 1,
    title: "Design Trends in 2023: What's New and What's Next",
    source: "Nielsen Norman Group",
    url: "https://www.nngroup.com/articles/design-trends/"
  },
  {
    id: 2,
    title: "The Role of Design Systems in Product Development",
    source: "Smashing Magazine",
    url: "https://www.smashingmagazine.com/2022/05/you-dont-need-a-design-system/"
  },
  {
    id: 3,
    title: "Product Strategy: Aligning Business Goals with User Needs",
    source: "Harvard Business Review",
    url: "https://hbr.org/2018/05/why-design-thinking-works"
  }
];

const additionalInspirationArticles = [
  {
    id: 4,
    title: "The Psychology of User Experience Design",
    source: "UX Collective",
    url: "https://uxdesign.cc/"
  },
  {
    id: 5,
    title: "Making the Business Case for Accessibility",
    source: "A List Apart",
    url: "https://alistapart.com/article/making-the-business-case-for-web-accessibility/"
  },
  {
    id: 6,
    title: "Building Digital Products That Matter",
    source: "Product Hunt",
    url: "https://www.producthunt.com/"
  }
];

const Ideas = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contentIdeas, setContentIdeas] = useState(sampleContentIdeas);
  const [showMoreInspiration, setShowMoreInspiration] = useState(false);
  const [currentEditIdea, setCurrentEditIdea] = useState<typeof sampleContentIdeas[0] | null>(null);
  const { toast } = useToast();

  const handleCreateIdea = (data: ContentIdeaFormValues) => {
    if (currentEditIdea) {
      const updatedIdeas = contentIdeas.map(idea => 
        idea.id === currentEditIdea.id ? { ...idea, ...data, id: currentEditIdea.id } : idea
      );
      setContentIdeas(updatedIdeas);
      setCurrentEditIdea(null);
      
      toast({
        title: "Idea Updated!",
        description: "Your content idea has been successfully updated.",
      });
    } else {
      const newIdea = {
        id: Date.now(),
        ...data,
      };
      
      setContentIdeas([...contentIdeas, newIdea]);
      
      toast({
        title: "Idea Created!",
        description: "Your new content idea has been added to the list.",
      });
    }
  };

  const handleEditIdea = (idea: typeof sampleContentIdeas[0]) => {
    setCurrentEditIdea(idea);
    setDialogOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setCurrentEditIdea(null);
    }
  };

  const handleGenerateMoreIdeas = () => {
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

  const handleViewMoreInspiration = () => {
    setShowMoreInspiration(!showMoreInspiration);
  };

  const openExternalLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const displayedInspiration = showMoreInspiration 
    ? [...inspirationArticles, ...additionalInspirationArticles]
    : inspirationArticles;

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
              onClick={() => handleDialogOpenChange(true)}
            >
              <Plus className="mr-1 h-4 w-4" /> New Idea
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ContentIdeas 
                ideas={contentIdeas} 
                onGenerateMore={handleGenerateMoreIdeas}
                onEditIdea={handleEditIdea}
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
                    {displayedInspiration.map((article) => (
                      <div 
                        key={article.id} 
                        className="rounded-md border p-3 cursor-pointer hover:border-brand-teal/50 transition-colors"
                        onClick={() => openExternalLink(article.url)}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-sm">
                            {article.title}
                          </h3>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          From {article.source}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="link" 
                    className="text-brand-teal mt-3 p-0 h-auto"
                    onClick={handleViewMoreInspiration}
                  >
                    {showMoreInspiration ? "Show less inspiration" : "View more inspiration"}
                  </Button>
                </CardContent>
              </Card>
            </div>
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

export default Ideas;
