
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UseFormReturn } from "react-hook-form";
import { ContentIdeaFormValues } from "@/components/NewIdeaDialog";

interface TwitterEditorProps {
  form: UseFormReturn<ContentIdeaFormValues>;
}

const TwitterEditor: React.FC<TwitterEditorProps> = ({ form }) => {
  const [characterCount, setCharacterCount] = React.useState(0);
  const maxCharCount = 280;
  
  React.useEffect(() => {
    const description = form.watch("description");
    setCharacterCount(description ? description.length : 0);
  }, [form.watch("description")]);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tweet Topic</FormLabel>
            <FormControl>
              <Input placeholder="What's your tweet about? (for your reference only)" {...field} />
            </FormControl>
            <FormDescription>
              This is for your reference and won't be part of the actual tweet.
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
                <span>Tweet Content</span>
                <Badge variant={characterCount > maxCharCount ? "destructive" : "outline"} className="ml-2">
                  {characterCount}/{maxCharCount}
                </Badge>
              </div>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="What's happening? Compose your tweet here..."
                className="min-h-[100px] font-sans"
                onChange={(e) => {
                  field.onChange(e);
                  setCharacterCount(e.target.value.length);
                }}
                value={field.value}
              />
            </FormControl>
            <FormDescription>
              Twitter has a {maxCharCount} character limit. Make it concise but impactful.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-muted/40 p-3 rounded-md">
        <h4 className="text-sm font-medium mb-2">Twitter Best Practices:</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Use hashtags sparingly (1-2 is ideal)</li>
          <li>• Include media like images or videos when possible</li>
          <li>• Ask questions to increase engagement</li>
          <li>• Consider starting a thread for longer content</li>
          <li>• Tag relevant accounts when appropriate</li>
        </ul>
      </div>
    </div>
  );
};

export default TwitterEditor;
