
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UseFormReturn } from "react-hook-form";
import { ContentIdeaFormValues } from "@/components/NewIdeaDialog";

interface LinkedInEditorProps {
  form: UseFormReturn<ContentIdeaFormValues>;
}

const LinkedInEditor: React.FC<LinkedInEditorProps> = ({ form }) => {
  const [characterCount, setCharacterCount] = React.useState(0);
  const maxCharCount = 3000;
  const recommendedCharCount = 1300;
  
  React.useEffect(() => {
    const description = form.watch("description");
    setCharacterCount(description ? description.length : 0);
  }, [form.watch("description")]);

  // Detects if post has hashtags
  const hasHashtags = form.watch("description")?.includes('#') || false;

  // Detects if post has a call to action
  const hasCTA = React.useMemo(() => {
    const content = form.watch("description")?.toLowerCase() || "";
    return content.includes("agree?") || 
           content.includes("thoughts?") || 
           content.includes("comment") || 
           content.includes("share") || 
           content.includes("like if");
  }, [form.watch("description")]);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Post Headline</FormLabel>
            <FormControl>
              <Input placeholder="Enter an attention-grabbing headline for your LinkedIn post" {...field} />
            </FormControl>
            <FormDescription>
              LinkedIn headlines should be concise and professional.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <div className="flex items-center justify-between">
                <span>Post Content</span>
                <Badge 
                  variant={
                    characterCount > maxCharCount ? "destructive" : 
                    characterCount > recommendedCharCount ? "default" : 
                    "outline"
                  } 
                  className="ml-2"
                >
                  {characterCount}/{maxCharCount}
                </Badge>
              </div>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Write your LinkedIn post content here. Keep it professional and include relevant hashtags."
                className="min-h-[150px] font-sans"
                onChange={(e) => {
                  field.onChange(e);
                  setCharacterCount(e.target.value.length);
                }}
                value={field.value}
              />
            </FormControl>
            <FormDescription>
              LinkedIn has a {maxCharCount} character limit, but posts around {recommendedCharCount} characters tend to perform best.
            </FormDescription>
            
            <div className="flex gap-2 mt-2">
              {!hasHashtags && (
                <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                  Missing hashtags
                </Badge>
              )}
              {!hasCTA && (
                <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                  Missing call to action
                </Badge>
              )}
              {characterCount > recommendedCharCount && (
                <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                  Consider shortening
                </Badge>
              )}
            </div>
            
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-muted/40 p-3 rounded-md">
        <h4 className="text-sm font-medium mb-2">LinkedIn Post Tips:</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Start with a hook to grab attention in the first 2-3 lines</li>
          <li>• Use short paragraphs and line breaks for better readability</li>
          <li>• Include 3-5 relevant hashtags at the end of your post</li>
          <li>• Mention relevant connections with @mentions when appropriate</li>
          <li>• End with a call to action or thought-provoking question</li>
        </ul>
      </div>
    </div>
  );
};

export default LinkedInEditor;
