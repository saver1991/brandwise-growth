import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Sparkles, Lightbulb, Image as ImageIcon, X, Plus, Edit, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import aiGenerationService, { ContentScore } from "@/services/aiGenerationService";
import { generateImagePromptFromContent } from "@/utils/aiTemplates";
import LinkedInEditor from "./platform-editors/LinkedInEditor";
import MediumEditor from "./platform-editors/MediumEditor";
import TwitterEditor from "./platform-editors/TwitterEditor";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentIdea } from "@/types/ContentIdea";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  platform: z.enum(["linkedin", "medium", "twitter"]),
  topics: z.array(z.string()).min(1, { message: "Please add at least one topic" }),
  imagePrompt: z.string().optional(),
  imageUrl: z.string().optional(),
  score: z.object({
    overall: z.number(),
    breakdown: z.record(z.string(), z.number()),
    feedback: z.string()
  }).optional(),
});

export type ContentIdeaFormValues = z.infer<typeof formSchema>;

interface NewIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ContentIdeaFormValues) => void;
  initialData?: ContentIdea;
  editMode?: boolean;
}

export function NewIdeaDialog({ 
  open, 
  onOpenChange, 
  onSubmit, 
  initialData, 
  editMode = false 
}: NewIdeaDialogProps) {
  const [topicInput, setTopicInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [autoGenerateImage, setAutoGenerateImage] = useState(true);
  const [isScoring, setIsScoring] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContentIdeaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      platform: initialData.platform,
      topics: initialData.topics,
      imagePrompt: "",
      imageUrl: initialData.imageUrl || "",
      score: initialData.score,
    } : {
      title: "",
      description: "",
      platform: "linkedin",
      topics: [],
      imagePrompt: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (initialData && open) {
      form.reset({
        title: initialData.title,
        description: initialData.description,
        platform: initialData.platform,
        topics: initialData.topics,
        imagePrompt: "",
        imageUrl: initialData.imageUrl || "",
        score: initialData.score,
      });
      
      if (initialData.imageUrl) {
        setGeneratedImage(initialData.imageUrl);
      }
    }
  }, [initialData, open, form]);

  const title = form.watch("title");
  const description = form.watch("description");
  const platform = form.watch("platform");
  const score = form.watch("score");

  useEffect(() => {
    const hasContent = title && description && autoGenerateImage;
    
    if (hasContent && title.length > 3 && description.length > 10) {
      if (!generatedImage && !isGeneratingImage) {
        const imagePrompt = generateImagePromptFromContent(title, description, platform);
        form.setValue("imagePrompt", imagePrompt);
      }
    }
  }, [title, description, platform, autoGenerateImage, generatedImage, isGeneratingImage]);

  useEffect(() => {
    if (activeTab === "visuals" && autoGenerateImage && title && description && !generatedImage && !isGeneratingImage) {
      generateImage();
    }
  }, [activeTab]);

  useEffect(() => {
    if (description && description.length > 10 && platform) {
      scoreContent();
    }
  }, [description, platform]);

  const handleAddTopic = () => {
    if (topicInput.trim() !== "") {
      const currentTopics = form.getValues("topics") || [];
      if (!currentTopics.includes(topicInput.trim())) {
        form.setValue("topics", [...currentTopics, topicInput.trim()]);
        setTopicInput("");
      }
    }
  };

  const handleRemoveTopic = (topic: string) => {
    const currentTopics = form.getValues("topics");
    form.setValue(
      "topics",
      currentTopics.filter((t) => t !== topic)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTopic();
    }
  };

  const scoreContent = () => {
    if (isScoring) return;
    
    try {
      setIsScoring(true);
      const description = form.getValues("description");
      const platform = form.getValues("platform");
      
      if (description && description.length > 10) {
        const contentScore = aiGenerationService.scoreContent(description, platform);
        form.setValue("score", contentScore);
      }
    } catch (error) {
      console.error("Error scoring content:", error);
    } finally {
      setIsScoring(false);
    }
  };

  const generateContentIdea = async () => {
    try {
      setIsGenerating(true);
      const platform = form.getValues("platform");
      
      const generatedContent = await aiGenerationService.generateContent({
        platform,
      });
      
      form.setValue("title", generatedContent.title);
      form.setValue("description", generatedContent.description);
      form.setValue("topics", generatedContent.topics);
      
      if (generatedContent.score) {
        form.setValue("score", generatedContent.score);
      }
      
      const imagePrompt = generateImagePromptFromContent(generatedContent.title, generatedContent.description, platform);
      form.setValue("imagePrompt", imagePrompt);
      
      toast({
        title: "Content idea generated!",
        description: "The AI has suggested content based on your selected platform.",
      });
      
      setTimeout(() => {
        setActiveTab("visuals");
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: "Failed to generate content idea. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async () => {
    try {
      setIsGeneratingImage(true);
      const imagePrompt = form.getValues("imagePrompt");
      
      if (!imagePrompt || imagePrompt.trim() === "") {
        const title = form.getValues("title");
        const description = form.getValues("description");
        const platform = form.getValues("platform");
        
        if (title && description) {
          const generatedPrompt = generateImagePromptFromContent(title, description, platform);
          form.setValue("imagePrompt", generatedPrompt);
        } else {
          toast({
            variant: "destructive",
            title: "Content required",
            description: "Please generate or enter content details first.",
          });
          setIsGeneratingImage(false);
          return;
        }
      }
      
      const imagePromptToUse = form.getValues("imagePrompt");
      
      const generatedImage = await aiGenerationService.generateImage({
        prompt: imagePromptToUse,
      });
      
      setGeneratedImage(generatedImage.url);
      form.setValue("imageUrl", generatedImage.url);
      
      toast({
        title: "Image generated!",
        description: "The AI has created an image based on your content.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Image generation failed",
        description: "Failed to generate image. Please try again.",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSubmitForm = (data: ContentIdeaFormValues) => {
    if (!data.score) {
      const contentScore = aiGenerationService.scoreContent(data.description, data.platform);
      data.score = contentScore;
    }
    
    onSubmit(data);
    onOpenChange(false);
    form.reset();
    setGeneratedImage(null);
    setActiveTab("content");
  };

  const platformOptions = [
    { value: "linkedin", label: "LinkedIn" },
    { value: "medium", label: "Medium" },
    { value: "twitter", label: "Twitter" },
  ];

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

  const renderPlatformEditor = () => {
    const currentPlatform = form.watch("platform");
    
    switch (currentPlatform) {
      case "linkedin":
        return <LinkedInEditor form={form} />;
      case "medium":
        return <MediumEditor form={form} />;
      case "twitter":
        return <TwitterEditor form={form} />;
      default:
        return <LinkedInEditor form={form} />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit Content Idea" : "Create New Content Idea"}</DialogTitle>
          <DialogDescription>
            {editMode 
              ? "Make changes to your content idea below."
              : "Fill in the details below or let AI help you generate content ideas."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
            <Tabs 
              defaultValue="content" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content Details</TabsTrigger>
                <TabsTrigger value="visuals">Visuals</TabsTrigger>
                <TabsTrigger value="score">Effectiveness Score</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Content Information</h3>
                  {!editMode && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={generateContentIdea}
                      disabled={isGenerating}
                      className="flex items-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 text-amber-500" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {platformOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the platform for this content idea.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {renderPlatformEditor()}

                <FormField
                  control={form.control}
                  name="topics"
                  render={() => (
                    <FormItem>
                      <FormLabel>Topics</FormLabel>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Input
                            placeholder="Add topics"
                            value={topicInput}
                            onChange={(e) => setTopicInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddTopic}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.watch("topics").map((topic) => (
                          <Badge key={topic} variant="secondary" className="bg-muted">
                            {topic}
                            <button
                              type="button"
                              className="ml-1 text-muted-foreground hover:text-foreground"
                              onClick={() => handleRemoveTopic(topic)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <FormDescription>
                        Press Enter or click the plus button to add a topic.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="visuals" className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Visual Content</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={generateImage}
                    disabled={isGeneratingImage}
                    className="flex items-center gap-2"
                  >
                    {isGeneratingImage ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-4 w-4 text-blue-500" />
                        {generatedImage || form.watch("imageUrl") ? "Regenerate" : "Generate Image"}
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="autoGenerateImage"
                    checked={autoGenerateImage}
                    onChange={(e) => setAutoGenerateImage(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="autoGenerateImage" className="text-sm text-muted-foreground">
                    Automatically generate image from content
                  </label>
                </div>

                <FormField
                  control={form.control}
                  name="imagePrompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Prompt</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the image you want to generate" 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        The prompt is automatically generated from your content, but you can modify it.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {(generatedImage || form.watch("imageUrl")) && (
                  <div className="border rounded-md p-4">
                    <div className="font-medium mb-2">Generated Image</div>
                    <div className="rounded-md overflow-hidden relative aspect-video">
                      <img 
                        src={generatedImage || form.watch("imageUrl")} 
                        alt="Generated content visual" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="score" className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Content Effectiveness Score</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={scoreContent}
                    disabled={isScoring}
                    className="flex items-center gap-2"
                  >
                    {isScoring ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <BarChart className="h-4 w-4 text-blue-500" />
                        Recalculate Score
                      </>
                    )}
                  </Button>
                </div>

                {score ? (
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          Overall Score
                        </CardTitle>
                        <div className={`text-2xl font-bold ${getScoreColor(score.overall)}`}>
                          {score.overall}
                        </div>
                      </div>
                      <Progress 
                        value={score.overall} 
                        className="h-2" 
                        indicatorClassName={getProgressColor(score.overall)}
                      />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Score Breakdown</h4>
                        <div className="space-y-2">
                          {Object.entries(score.breakdown).map(([criteria, value]) => (
                            <div key={criteria} className="flex items-center justify-between">
                              <div className="text-sm">{criteria}</div>
                              <div className="flex items-center">
                                <div className={`text-sm font-medium ${getScoreColor(value)}`}>
                                  {value}
                                </div>
                                <div className="w-24 ml-2">
                                  <Progress 
                                    value={value} 
                                    className="h-1.5" 
                                    indicatorClassName={getProgressColor(value)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-1">Improvement Suggestions</h4>
                        <p className="text-sm text-muted-foreground">{score.feedback}</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 border rounded-md border-dashed text-center">
                    <BarChart className="h-12 w-12 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No Score Available</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      Add content to your idea to generate an effectiveness score. 
                    </p>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("content")}
                    >
                      Return to Content
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-brand-teal hover:bg-brand-teal/90"
              >
                {editMode ? (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Update Idea
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Save Idea
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
