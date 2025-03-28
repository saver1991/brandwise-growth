
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, MessageSquare, Linkedin, Twitter, BookOpen, ArrowUpRight } from "lucide-react";
import ContentIdeas from "@/components/ContentIdeas";

const contentIdeas = [
  {
    id: 1,
    title: "The Future of Product Design in AI-Driven Ecosystems",
    description: "Explore how AI is reshaping product design methodologies and creating new opportunities.",
    platform: "linkedin",
    topics: ["AI", "Product Design", "Future Trends"],
    status: "new",
  },
  {
    id: 2,
    title: "5 UX Research Methods That Transformed Our Product Strategy",
    description: "A deep dive into effective research methods that lead to breakthrough product insights.",
    platform: "medium",
    topics: ["UX Research", "Product Strategy", "Case Study"],
    status: "in-progress",
  },
  {
    id: 3,
    title: "Building Design Systems That Scale: Lessons from Enterprise Products",
    description: "Practical insights on creating and maintaining design systems for complex products.",
    platform: "linkedin",
    topics: ["Design Systems", "Enterprise", "Scaling"],
    status: "new",
  },
  {
    id: 4,
    title: "Breaking Down Design Silos: Cross-Functional Collaboration",
    description: "How to foster collaboration between design, engineering, and product teams.",
    platform: "twitter",
    topics: ["Collaboration", "Team Building", "Design Process"],
    status: "planned",
  },
  {
    id: 5,
    title: "Product Design Portfolio Tips: Standing Out in a Competitive Market",
    description: "Practical advice for creating a portfolio that showcases your unique skills and approach.",
    platform: "medium",
    topics: ["Portfolio", "Career Growth", "Design Tips"],
    status: "in-progress",
  },
];

const trendingTopics = [
  { id: 1, name: "AI in Design", count: 120, trending: "up" },
  { id: 2, name: "Design Systems", count: 98, trending: "up" },
  { id: 3, name: "Product Strategy", count: 87, trending: "down" },
  { id: 4, name: "UX Research", count: 76, trending: "up" },
  { id: 5, name: "Design Leadership", count: 65, trending: "down" },
];

const Ideas = () => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-[#0077B5]" />;
      case "medium":
        return <MessageSquare className="h-4 w-4 text-[#00AB6C]" />;
      case "twitter":
        return <Twitter className="h-4 w-4 text-[#1DA1F2]" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">New</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">In Progress</Badge>;
      case "planned":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Planned</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="brand-container space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-heading">Content Ideas</h1>
              <p className="text-muted-foreground">
                Discover, organize, and develop your content ideas
              </p>
            </div>
            <Button className="bg-brand-teal hover:bg-brand-teal/90">
              <Plus className="mr-1 h-4 w-4" /> New Idea
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ContentIdeas />
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
    </div>
  );
};

export default Ideas;
