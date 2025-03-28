import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, MessageSquare, Linkedin, Twitter, BookOpen, ArrowUpRight } from "lucide-react";
import ContentIdeas from "@/components/ContentIdeas";
import TrendingTopics from "@/components/TrendingTopics";
import { useState } from "react";

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
              
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <CardTitle>My Ideas</CardTitle>
                  <CardDescription>
                    Manage and develop your content ideas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="search" 
                        placeholder="Search ideas..." 
                        className="pl-8 w-[250px]" 
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Platforms</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="planned">Planned</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All Ideas</TabsTrigger>
                      <TabsTrigger value="new">New</TabsTrigger>
                      <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                      <TabsTrigger value="planned">Planned</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="animate-slide-up space-y-4">
                      {contentIdeas.map((idea) => (
                        <div 
                          key={idea.id} 
                          className="border rounded-lg p-4 hover:border-brand-teal/50 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              {getPlatformIcon(idea.platform)}
                              <h3 className="font-medium">{idea.title}</h3>
                            </div>
                            {getStatusBadge(idea.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{idea.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {idea.topics.map((topic) => (
                              <Badge key={topic} variant="secondary" className="bg-muted">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="new" className="animate-slide-up">
                      {contentIdeas.filter(idea => idea.status === "new").map((idea) => (
                        <div 
                          key={idea.id} 
                          className="border rounded-lg p-4 hover:border-brand-teal/50 transition-colors mb-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              {getPlatformIcon(idea.platform)}
                              <h3 className="font-medium">{idea.title}</h3>
                            </div>
                            {getStatusBadge(idea.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{idea.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {idea.topics.map((topic) => (
                              <Badge key={topic} variant="secondary" className="bg-muted">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="in-progress" className="animate-slide-up">
                      {contentIdeas.filter(idea => idea.status === "in-progress").map((idea) => (
                        <div 
                          key={idea.id} 
                          className="border rounded-lg p-4 hover:border-brand-teal/50 transition-colors mb-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              {getPlatformIcon(idea.platform)}
                              <h3 className="font-medium">{idea.title}</h3>
                            </div>
                            {getStatusBadge(idea.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{idea.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {idea.topics.map((topic) => (
                              <Badge key={topic} variant="secondary" className="bg-muted">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="planned" className="animate-slide-up">
                      {contentIdeas.filter(idea => idea.status === "planned").map((idea) => (
                        <div 
                          key={idea.id} 
                          className="border rounded-lg p-4 hover:border-brand-teal/50 transition-colors mb-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              {getPlatformIcon(idea.platform)}
                              <h3 className="font-medium">{idea.title}</h3>
                            </div>
                            {getStatusBadge(idea.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{idea.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {idea.topics.map((topic) => (
                              <Badge key={topic} variant="secondary" className="bg-muted">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <TrendingTopics />
              
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
