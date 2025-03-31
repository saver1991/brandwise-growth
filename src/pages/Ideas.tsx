import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, ArrowUpRight } from "lucide-react";
import ContentIdeas from "@/components/ContentIdeas";
import { NewIdeaDialog, ContentIdeaFormValues } from "@/components/NewIdeaDialog";
import { useToast } from "@/hooks/use-toast";
import { ContentIdea } from "@/types/ContentIdea";
import { ContentScore } from "@/services/aiGenerationService";
import { Pagination } from "@/components/ui/pagination";
import { useProfile } from "@/contexts/ProfileContext";
import { useAuth } from "@/contexts/AuthContext";
import { contentService } from "@/services/contentService";
import { mapDbRecordToContentIdea } from "@/types/ContentData";

const trendingTopicsData = [
  [
    { id: 1, name: "AI in Design", count: 120, trending: "up" },
    { id: 2, name: "Design Systems", count: 98, trending: "up" },
    { id: 3, name: "Product Strategy", count: 87, trending: "down" },
    { id: 4, name: "UX Research", count: 76, trending: "up" },
    { id: 5, name: "Design Leadership", count: 65, trending: "down" },
  ],
  [
    { id: 6, name: "User Testing", count: 110, trending: "up" },
    { id: 7, name: "Responsive Design", count: 88, trending: "down" },
    { id: 8, name: "Accessibility", count: 95, trending: "up" },
    { id: 9, name: "Design Tokens", count: 72, trending: "up" },
    { id: 10, name: "Design Ethics", count: 63, trending: "down" },
  ],
  [
    { id: 11, name: "Motion Design", count: 105, trending: "up" },
    { id: 12, name: "Design Sprints", count: 83, trending: "up" },
    { id: 13, name: "User Personas", count: 79, trending: "down" },
    { id: 14, name: "Information Architecture", count: 70, trending: "up" },
    { id: 15, name: "Mobile First Design", count: 67, trending: "down" },
  ],
  [
    { id: 16, name: "Dark Mode Design", count: 102, trending: "up" },
    { id: 17, name: "Micro-interactions", count: 91, trending: "up" },
    { id: 18, name: "Color Theory", count: 85, trending: "down" },
    { id: 19, name: "Typography", count: 74, trending: "up" },
    { id: 20, name: "Voice UI", count: 62, trending: "down" },
  ],
  [
    { id: 21, name: "Sustainable Design", count: 99, trending: "up" },
    { id: 22, name: "Design Thinking", count: 93, trending: "down" },
    { id: 23, name: "UI Animation", count: 81, trending: "up" },
    { id: 24, name: "Inclusive Design", count: 77, trending: "up" },
    { id: 25, name: "Data Visualization", count: 69, trending: "down" },
  ],
].map(page => 
  page.sort((a, b) => b.count - a.count)
);

const inspirationArticlesData = [
  [
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
  ],
  [
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
  ],
  [
    {
      id: 7,
      title: "Ethical Design: Creating Responsible Digital Experiences",
      source: "Ethical Design Handbook",
      url: "https://ethicaldesignhandbook.com/"
    },
    {
      id: 8,
      title: "Measuring UX Success: Beyond Vanity Metrics",
      source: "UX Matters",
      url: "https://www.uxmatters.com/"
    },
    {
      id: 9,
      title: "The Future of Design Systems in Enterprise",
      source: "Design Systems Conference",
      url: "https://designsystems.com/"
    }
  ],
  [
    {
      id: 10,
      title: "Creating Accessible Web Applications",
      source: "Web Accessibility Initiative",
      url: "https://www.w3.org/WAI/"
    },
    {
      id: 11,
      title: "Design Thinking for Innovation",
      source: "IDEO",
      url: "https://www.ideo.com/blog"
    },
    {
      id: 12,
      title: "The Art of Product Management",
      source: "Mind the Product",
      url: "https://www.mindtheproduct.com/"
    }
  ],
  [
    {
      id: 13,
      title: "The Intersection of AI and Design",
      source: "Interaction Design Foundation",
      url: "https://www.interaction-design.org/"
    },
    {
      id: 14,
      title: "Design Leadership: Building Creative Teams",
      source: "InVision",
      url: "https://www.invisionapp.com/inside-design/"
    },
    {
      id: 15,
      title: "Research Methods for Better User Understanding",
      source: "UX Research Institute",
      url: "https://www.uxresearch.com/"
    }
  ],
];

const Ideas = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentEditIdea, setCurrentEditIdea] = useState<ContentIdea | null>(null);
  const [currentTopicsPage, setCurrentTopicsPage] = useState(1);
  const [currentInspirationPage, setCurrentInspirationPage] = useState(1);
  const { toast } = useToast();
  const { currentProfile } = useProfile();
  const { user } = useAuth();

  useEffect(() => {
    const fetchContentIdeas = async () => {
      if (user) {
        setLoading(true);
        try {
          const data = await contentService.getContentIdeas(user.id);
          const mappedIdeas = data.map(record => mapDbRecordToContentIdea(record));
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

  const handleCreateIdea = async (data: ContentIdeaFormValues) => {
    if (user) {
      const data = await contentService.getContentIdeas(user.id);
      const mappedIdeas = data.map(record => mapDbRecordToContentIdea(record));
      setContentIdeas(mappedIdeas);
    }
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
          const mappedIdeas = data.map(record => mapDbRecordToContentIdea(record));
          setContentIdeas(mappedIdeas);
        });
      }
    }
  };

  const handleGenerateMoreIdeas = () => {
    const newIdea: ContentIdea = {
      id: Date.now(),
      title: "Building a Design-Driven Culture",
      description: "Strategies for fostering a design-thinking approach across your entire organization.",
      platform: "linkedin",
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

  const openExternalLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const displayedTopics = trendingTopicsData[currentTopicsPage - 1];
  const displayedInspiration = inspirationArticlesData[currentInspirationPage - 1];

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
          
          <div className="flex items-center mb-4 space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search content ideas..." 
                className="pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="wordpress">WordPress</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {loading ? (
                <Card className="w-full h-64 flex items-center justify-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="h-8 w-8 border-4 border-t-brand-teal border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground">Loading your content ideas...</p>
                  </div>
                </Card>
              ) : contentIdeas.length === 0 ? (
                <Card className="w-full p-8 flex flex-col items-center justify-center">
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-medium">No content ideas yet</h3>
                    <p className="text-muted-foreground">
                      Create your first content idea to get started.
                    </p>
                    <Button 
                      onClick={() => setDialogOpen(true)}
                      className="bg-brand-teal hover:bg-brand-teal/90 mt-2"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Idea
                    </Button>
                  </div>
                </Card>
              ) : (
                <ContentIdeas 
                  ideas={contentIdeas} 
                  onGenerateMore={handleGenerateMoreIdeas}
                  onEditIdea={handleEditIdea}
                />
              )}
            </div>
            
            <div className="space-y-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Trending Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {displayedTopics.map((topic) => (
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
                  
                  <Pagination className="mt-4">
                    <PaginationContent>
                      {[1, 2, 3, 4, 5].map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            isActive={currentTopicsPage === page} 
                            onClick={() => setCurrentTopicsPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </PaginationContent>
                  </Pagination>
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
                  
                  <Pagination className="mt-4">
                    <PaginationContent>
                      {[1, 2, 3, 4, 5].map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            isActive={currentInspirationPage === page} 
                            onClick={() => setCurrentInspirationPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </PaginationContent>
                  </Pagination>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <NewIdeaDialog 
        open={dialogOpen} 
        onOpenChange={handleDialogOpenChange} 
        initialData={currentEditIdea || undefined}
        editMode={!!currentEditIdea}
        availablePlatforms={currentProfile.integrations || []}
      />
    </div>
  );
};

export default Ideas;
