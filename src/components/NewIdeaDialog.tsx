
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Sparkles, Lightbulb, Image as ImageIcon, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  platform: z.enum(["linkedin", "medium", "twitter"]),
  topics: z.array(z.string()).min(1, { message: "Please add at least one topic" }),
  imagePrompt: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type ContentIdeaFormValues = z.infer<typeof formSchema>;

interface NewIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ContentIdeaFormValues) => void;
}

export function NewIdeaDialog({ open, onOpenChange, onSubmit }: NewIdeaDialogProps) {
  const [topicInput, setTopicInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ContentIdeaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      platform: "linkedin",
      topics: [],
      imagePrompt: "",
      imageUrl: "",
    },
  });

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

  const generateContentIdea = async () => {
    try {
      setIsGenerating(true);
      const platform = form.getValues("platform");
      
      // In a real application, this would be an API call to OpenAI or similar
      // For demo purposes, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulated AI responses based on platform
      let title = "", description = "", topics = [];
      
      switch(platform) {
        case "linkedin":
          title = "5 Strategies to Boost Your Personal Brand Authority in 2023";
          description = "Discover proven techniques to establish yourself as a thought leader in your industry through strategic LinkedIn content.";
          topics = ["Personal Branding", "Thought Leadership", "LinkedIn Strategy"];
          break;
        case "medium":
          title = "The Art of Storytelling in Technical Content Writing";
          description = "Learn how to transform complex technical concepts into compelling narratives that engage and educate your readers.";
          topics = ["Content Writing", "Technical Content", "Storytelling"];
          break;
        case "twitter":
          title = "Building a Micro-Content Strategy That Drives Engagement";
          description = "How to create concise, high-impact content that resonates with your audience and encourages meaningful interactions.";
          topics = ["Micro-Content", "Engagement", "Twitter Growth"];
          break;
      }
      
      form.setValue("title", title);
      form.setValue("description", description);
      form.setValue("topics", topics);
      
      toast({
        title: "Content idea generated!",
        description: "The AI has suggested content based on your selected platform.",
      });
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
        toast({
          variant: "destructive",
          title: "Image prompt required",
          description: "Please enter a prompt to generate an image.",
        });
        setIsGeneratingImage(false);
        return;
      }
      
      // In a real application, this would be an API call to Stability AI, DALL-E, or similar
      // For demo purposes, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, we'll use a placeholder image related to content marketing
      const placeholderImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=80";
      setGeneratedImage(placeholderImage);
      form.setValue("imageUrl", placeholderImage);
      
      toast({
        title: "Image generated!",
        description: "The AI has created an image based on your prompt.",
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
    onSubmit(data);
    onOpenChange(false);
    form.reset();
    setGeneratedImage(null);
  };

  const platformOptions = [
    { value: "linkedin", label: "LinkedIn" },
    { value: "medium", label: "Medium" },
    { value: "twitter", label: "Twitter" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Content Idea</DialogTitle>
          <DialogDescription>
            Fill in the details below or let AI help you generate content ideas.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content Details</TabsTrigger>
                <TabsTrigger value="visuals">Visuals</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Content Information</h3>
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

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a title for your content idea" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your content idea" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                    disabled={isGeneratingImage || !form.getValues("imagePrompt")}
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
                        Generate Image
                      </>
                    )}
                  </Button>
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
                        Provide a detailed prompt for the AI to generate an image.
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
                <Lightbulb className="mr-2 h-4 w-4" />
                Save Idea
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
