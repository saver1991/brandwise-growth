
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Lightbulb, Linkedin, MessageSquare, Twitter } from "lucide-react";
import { NewIdeaDialog, ContentIdeaFormValues } from "@/components/NewIdeaDialog";
import { useToast } from "@/hooks/use-toast";

interface ContentIdea {
  id: number;
  title: string;
  description: string;
  platform: "linkedin" | "medium" | "twitter";
  topics: string[];
  imageUrl?: string;
}

const initialIdeas: ContentIdea[] = [
  {
    id: 1,
    title: "The Future of Product Design in AI-Driven Ecosystems",
    description: "Explore how AI is reshaping product design methodologies and creating new opportunities.",
    platform: "linkedin",
    topics: ["AI", "Product Design", "Future Trends"],
  },
  {
    id: 2,
    title: "5 UX Research Methods That Transformed Our Product Strategy",
    description: "A deep dive into effective research methods that lead to breakthrough product insights.",
    platform: "medium",
    topics: ["UX Research", "Product Strategy", "Case Study"],
  },
  {
    id: 3,
    title: "Building Design Systems That Scale: Lessons from Enterprise Products",
    description: "Practical insights on creating and maintaining design systems for complex products.",
    platform: "linkedin",
    topics: ["Design Systems", "Enterprise", "Scaling"],
  },
];

const ContentIdeas = () => {
  const [ideas, setIdeas] = useState<ContentIdea[]>(initialIdeas);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const platformColors = {
    linkedin: "bg-[#0077B5]/10 text-[#0077B5] border-[#0077B5]/20",
    medium: "bg-[#00AB6C]/10 text-[#00AB6C] border-[#00AB6C]/20", 
    twitter: "bg-[#1DA1F2]/10 text-[#1DA1F2] border-[#1DA1F2]/20",
  };

  const platformNames = {
    linkedin: "LinkedIn",
    medium: "Medium",
    twitter: "Twitter",
  };

  const platformIcons = {
    linkedin: <Linkedin className="h-4 w-4" />,
    medium: <MessageSquare className="h-4 w-4" />,
    twitter: <Twitter className="h-4 w-4" />,
  };

  const handleCreateIdea = (data: ContentIdeaFormValues) => {
    const newIdea: ContentIdea = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      platform: data.platform,
      topics: data.topics,
      imageUrl: data.imageUrl,
    };

    setIdeas([newIdea, ...ideas]);
    
    toast({
      title: "Idea Created!",
      description: "Your new content idea has been added to the list.",
    });
  };

  return (
    <Card className="col-span-full card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Content Ideas</CardTitle>
        <Button 
          size="sm" 
          className="bg-brand-teal hover:bg-brand-teal/90"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="mr-1 h-4 w-4" /> New Idea
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {ideas.map((idea) => (
            <div 
              key={idea.id} 
              className="border rounded-lg p-4 hover:border-brand-teal/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {platformIcons[idea.platform]}
                  <h3 className="font-medium">{idea.title}</h3>
                </div>
                <Badge 
                  variant="outline" 
                  className={platformColors[idea.platform]}
                >
                  {platformNames[idea.platform]}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{idea.description}</p>
              
              {idea.imageUrl && (
                <div className="mt-3 mb-3">
                  <div className="rounded-md overflow-hidden aspect-video">
                    <img 
                      src={idea.imageUrl} 
                      alt={idea.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mt-3">
                {idea.topics.map((topic) => (
                  <Badge key={topic} variant="secondary" className="bg-muted">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <NewIdeaDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onSubmit={handleCreateIdea}
      />
    </Card>
  );
};

export default ContentIdeas;
