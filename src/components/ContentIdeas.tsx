
import { ContentScore } from "@/services/aiGenerationService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";

interface ContentIdea {
  id: number;
  title: string;
  description: string;
  platform: "linkedin" | "medium" | "twitter";
  topics: string[];
  imageUrl: string;
  score: ContentScore;
}

interface ContentIdeasProps {
  ideas: ContentIdea[];
  onGenerateMore: () => void;
  onEditIdea?: (idea: ContentIdea) => void;
}

const ContentIdeas: React.FC<ContentIdeasProps> = ({ ideas, onGenerateMore, onEditIdea }) => {
  return (
    <Card className="col-span-full md:col-span-1 card-hover">
      <CardHeader>
        <CardTitle>Content Ideas</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {ideas.map((idea) => (
          <div key={idea.id} className="border rounded-lg p-3">
            <div className="flex justify-between">
              <h3 className="font-medium text-sm">{idea.title}</h3>
              {onEditIdea && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => onEditIdea(idea)}
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span className="sr-only">Edit idea</span>
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{idea.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <div className="space-x-2">
                {idea.topics.map((topic) => (
                  <span key={topic} className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full justify-center" onClick={onGenerateMore}>
          <Plus className="mr-2 h-4 w-4" />
          Generate More Ideas
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentIdeas;
