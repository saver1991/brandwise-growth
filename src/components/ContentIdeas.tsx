
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Lightbulb, Linkedin, MessageSquare, Twitter, Edit, BarChart } from "lucide-react";
import { NewIdeaDialog, ContentIdeaFormValues } from "@/components/NewIdeaDialog";
import { useToast } from "@/hooks/use-toast";
import { ContentScore } from "@/services/aiGenerationService";
import { Progress } from "@/components/ui/progress";

interface ContentIdea {
  id: number;
  title: string;
  description: string;
  platform: "linkedin" | "medium" | "twitter";
  topics: string[];
  imageUrl?: string;
  score?: ContentScore;
}

const initialIdeas: ContentIdea[] = [
  {
    id: 1,
    title: "The Future of Product Design in AI-Driven Ecosystems",
    description: "Explore how AI is reshaping product design methodologies and creating new opportunities.",
    platform: "linkedin",
    topics: ["AI", "Product Design", "Future Trends"],
    score: {
      overall: 78,
      breakdown: {
        "Content Length": 65,
        "Paragraphs": 80,
        "Call to Action": 70,
        "Professional Tone": 85,
        "Strategic Hashtags": 90
      },
      feedback: "Good professional tone. Consider breaking your content into more paragraphs for better readability."
    }
  },
  {
    id: 2,
    title: "5 UX Research Methods That Transformed Our Product Strategy",
    description: "A deep dive into effective research methods that lead to breakthrough product insights.",
    platform: "medium",
    topics: ["UX Research", "Product Strategy", "Case Study"],
    score: {
      overall: 82,
      breakdown: {
        "Estimated Read Time": 75,
        "Formatting": 85,
        "Depth of Content": 85
      },
      feedback: "Good use of formatting to structure your article. Article has good depth for Medium readers."
    }
  },
  {
    id: 3,
    title: "Building Design Systems That Scale: Lessons from Enterprise Products",
    description: "Practical insights on creating and maintaining design systems for complex products.",
    platform: "linkedin",
    topics: ["Design Systems", "Enterprise", "Scaling"],
    score: {
      overall: 71,
      breakdown: {
        "Content Length": 65,
        "Paragraphs": 60,
        "Call to Action": 80,
        "Professional Tone": 90,
        "Strategic Hashtags": 60
      },
      feedback: "Excellent professional tone. Adding 3-5 relevant hashtags would increase discoverability."
    }
  },
];

const ContentIdeas = () => {
  const [ideas, setIdeas] = useState<ContentIdea[]>(initialIdeas);
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null);
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  const handleCreateIdea = (data: ContentIdeaFormValues) => {
    const newIdea: ContentIdea = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      platform: data.platform,
      topics: data.topics,
      imageUrl: data.imageUrl,
      score: data.score,
    };

    setIdeas([newIdea, ...ideas]);
    
    toast({
      title: "Idea Created!",
      description: "Your new content idea has been added to the list.",
    });
  };

  const handleEditIdea = (data: ContentIdeaFormValues) => {
    if (!selectedIdea) return;
    
    const updatedIdeas = ideas.map(idea => 
      idea.id === selectedIdea.id 
        ? { 
            ...idea, 
            title: data.title,
            description: data.description,
            platform: data.platform,
            topics: data.topics,
            imageUrl: data.imageUrl,
            score: data.score
          } 
        : idea
    );
    
    setIdeas(updatedIdeas);
    
    toast({
      title: "Idea Updated!",
      description: "Your content idea has been successfully updated.",
    });
  };

  const handleIdeaClick = (idea: ContentIdea) => {
    setSelectedIdea(idea);
    setEditDialogOpen(true);
  };

  return (
    <Card className="col-span-full card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Content Ideas</CardTitle>
        <Button 
          size="sm" 
          className="bg-brand-teal hover:bg-brand-teal/90"
          onClick={() => setNewDialogOpen(true)}
        >
          <Plus className="mr-1 h-4 w-4" /> New Idea
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {ideas.map((idea) => (
            <div 
              key={idea.id} 
              className="border rounded-lg p-4 hover:border-brand-teal/50 transition-colors cursor-pointer group"
              onClick={() => handleIdeaClick(idea)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {platformIcons[idea.platform]}
                  <h3 className="font-medium">{idea.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={platformColors[idea.platform]}
                  >
                    {platformNames[idea.platform]}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIdea(idea);
                      setEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
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
              
              {idea.score && (
                <div className="mt-3 mb-3">
                  <div className="flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm font-medium">Content Effectiveness Score</div>
                    <div className={`text-sm font-bold ${getScoreColor(idea.score.overall)}`}>
                      {idea.score.overall}/100
                    </div>
                  </div>
                  <Progress 
                    value={idea.score.overall} 
                    className="h-2 mt-1" 
                    indicatorClassName={getProgressColor(idea.score.overall)}
                  />
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
      
      {/* Dialog for creating a new idea */}
      <NewIdeaDialog 
        open={newDialogOpen} 
        onOpenChange={setNewDialogOpen} 
        onSubmit={handleCreateIdea}
      />
      
      {/* Dialog for editing an existing idea */}
      {selectedIdea && (
        <NewIdeaDialog 
          open={editDialogOpen} 
          onOpenChange={setEditDialogOpen} 
          onSubmit={handleEditIdea}
          initialData={selectedIdea}
          editMode={true}
        />
      )}
    </Card>
  );
};

export default ContentIdeas;
