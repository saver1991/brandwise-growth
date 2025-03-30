
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UseFormReturn } from "react-hook-form";
import { ContentIdeaFormValues } from "@/components/NewIdeaDialog";

interface WordPressEditorProps {
  form: UseFormReturn<ContentIdeaFormValues>;
}

const WordPressEditor: React.FC<WordPressEditorProps> = ({ form }) => {
  const [characterCount, setCharacterCount] = React.useState(0);
  const maxCharCount = 1500;
  
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
            <FormLabel>Post Title</FormLabel>
            <FormControl>
              <Input placeholder="Write an engaging title for your WordPress post" {...field} />
            </FormControl>
            <FormDescription>
              Make your title SEO-friendly and compelling for readers.
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
                <Badge variant={characterCount > maxCharCount ? "destructive" : "outline"} className="ml-2">
                  {characterCount}/{maxCharCount}
                </Badge>
              </div>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Write your WordPress post content here..."
                className="min-h-[200px] font-sans"
                onChange={(e) => {
                  field.onChange(e);
                  setCharacterCount(e.target.value.length);
                }}
                value={field.value}
              />
            </FormControl>
            <FormDescription>
              Optimal WordPress content is around {maxCharCount} characters for reader engagement.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-muted/40 p-3 rounded-md">
        <h4 className="text-sm font-medium mb-2">WordPress Best Practices:</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Use proper headings (H2, H3) for structure</li>
          <li>• Include relevant categories and tags</li>
          <li>• Add featured images for better engagement</li>
          <li>• Optimize for SEO with keywords in first paragraph</li>
          <li>• Use short paragraphs and include lists where appropriate</li>
        </ul>
      </div>
    </div>
  );
};

export default WordPressEditor;
