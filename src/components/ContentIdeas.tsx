
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ContentIdea {
  id: number;
  title: string;
  description: string;
  platform: "linkedin" | "medium" | "twitter";
  topics: string[];
}

const ideas: ContentIdea[] = [
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

  return (
    <Card className="col-span-full card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Content Ideas</CardTitle>
        <Button size="sm" className="bg-brand-teal hover:bg-brand-teal/90">
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentIdeas;
