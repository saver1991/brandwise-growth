
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Link, Image as ImageIcon, List, Heading } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UseFormReturn } from "react-hook-form";
import { ContentIdeaFormValues } from "@/components/NewIdeaDialog";

interface MediumEditorProps {
  form: UseFormReturn<ContentIdeaFormValues>;
}

const MediumEditor: React.FC<MediumEditorProps> = ({ form }) => {
  const { toast } = useToast();

  const handleFormatClick = (format: string) => {
    const textarea = document.getElementById("description") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let formattedText = "";

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "heading":
        formattedText = `## ${selectedText}`;
        break;
      case "link":
        formattedText = `[${selectedText}](url)`;
        break;
      case "list":
        formattedText = `\n- ${selectedText}`;
        break;
      default:
        return;
    }

    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    form.setValue("description", newValue);
    
    toast({
      title: "Formatting applied",
      description: `Applied ${format} formatting to selected text.`,
    });
  };

  // Preview the formatted text with basic markdown rendering
  const renderPreview = (text: string): string => {
    if (!text) return "";
    
    let formattedText = text;
    
    // Format headings (## Heading)
    formattedText = formattedText.replace(/## (.*?)(\n|$)/g, '<h2>$1</h2>');
    
    // Format bold (**text**)
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Format italic (*text*)
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Format links ([text](url))
    formattedText = formattedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // Format lists (- item)
    formattedText = formattedText.replace(/- (.*?)(\n|$)/g, '<li>$1</li>');
    
    // Wrap lists in <ul> tags
    if (formattedText.includes('<li>')) {
      formattedText = '<ul>' + formattedText + '</ul>';
    }
    
    // Handle paragraphs
    formattedText = formattedText.split('\n\n')
      .map(para => {
        if (!para.startsWith('<h2>') && !para.startsWith('<ul>')) {
          return `<p>${para}</p>`;
        }
        return para;
      })
      .join('');
    
    return formattedText;
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Article Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter a compelling title for your Medium article" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Card className="border-muted">
        <CardContent className="p-2">
          <div className="flex items-center gap-1 border-b pb-2 mb-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleFormatClick("bold")}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleFormatClick("italic")}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleFormatClick("heading")}
              title="Heading"
            >
              <Heading className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleFormatClick("link")}
              title="Link"
            >
              <Link className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleFormatClick("list")}
              title="List"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Article Content</FormLabel>
            <FormControl>
              <Textarea
                id="description"
                placeholder="Write your Medium article content here. Use the formatting toolbar above to style your text."
                className="min-h-[200px] font-sans"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Medium supports rich text formatting. Use markdown syntax like **bold**, *italic*, ## headings, etc.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("description") && (
        <div className="border rounded-md p-4">
          <h4 className="text-sm font-medium mb-2">Preview</h4>
          <div 
            className="prose prose-sm max-w-none text-sm"
            dangerouslySetInnerHTML={{ __html: renderPreview(form.watch("description")) }} 
          />
        </div>
      )}
    </div>
  );
};

export default MediumEditor;
