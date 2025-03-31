
import { useState, useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { X, Plus, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { PLATFORM_FIELDS, PlatformContentFields, ContentPlatform, FieldConfig } from "@/types/ContentData";
import { useFormContext } from "react-hook-form";

interface DynamicPlatformFieldsProps {
  platform: ContentPlatform;
  initialData?: PlatformContentFields;
}

export function DynamicPlatformFields({ platform, initialData }: DynamicPlatformFieldsProps) {
  const form = useFormContext();
  const fieldConfig = PLATFORM_FIELDS[platform]?.fields || [];

  if (!fieldConfig.length) {
    return (
      <div className="text-sm text-muted-foreground">
        No additional fields are required for this platform.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">
        Additional fields for {PLATFORM_FIELDS[platform]?.name || platform}
      </h3>
      
      {fieldConfig.map(field => (
        <DynamicField
          key={field.name}
          field={field}
          initialValue={initialData?.[field.name as keyof PlatformContentFields]}
        />
      ))}
    </div>
  );
}

interface DynamicFieldProps {
  field: FieldConfig;
  initialValue?: any;
}

function DynamicField({ field, initialValue }: DynamicFieldProps) {
  const form = useFormContext();
  const [tagInput, setTagInput] = useState("");
  
  // Set initial value for this field if provided
  useEffect(() => {
    if (initialValue !== undefined) {
      form.setValue(`platformData.${field.name}`, initialValue);
    }
  }, [initialValue, field.name]);

  // Special handling for tag-type fields
  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      const currentTags = form.getValues(`platformData.${field.name}`) || [];
      if (!currentTags.includes(tagInput.trim())) {
        form.setValue(`platformData.${field.name}`, [...currentTags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    const currentTags = form.getValues(`platformData.${field.name}`);
    form.setValue(
      `platformData.${field.name}`,
      currentTags.filter((t: string) => t !== tag)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Render different field types
  switch (field.type) {
    case 'textarea':
      return (
        <FormField
          control={form.control}
          name={`platformData.${field.name}`}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={field.placeholder} 
                  className="min-h-[120px]" 
                  {...formField} 
                />
              </FormControl>
              {field.description && (
                <FormDescription>{field.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
      
    case 'tags':
      return (
        <FormField
          control={form.control}
          name={`platformData.${field.name}`}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Input
                    placeholder={field.placeholder}
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddTag}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(formField.value || []).map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="bg-muted">
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-muted-foreground hover:text-foreground"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              {field.description && (
                <FormDescription>{field.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
      
    case 'url':
      return (
        <FormField
          control={form.control}
          name={`platformData.${field.name}`}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input 
                  type="url"
                  placeholder={field.placeholder} 
                  {...formField} 
                />
              </FormControl>
              {field.description && (
                <FormDescription>{field.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
      
    case 'image':
    case 'video':
      return (
        <FormField
          control={form.control}
          name={`platformData.${field.name}`}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Input 
                    placeholder={field.placeholder || `Enter ${field.type} URL`}
                    {...formField} 
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // This would typically open a file picker or upload dialog
                    alert("File upload functionality would go here");
                  }}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {formField.value && (field.type === 'image') && (
                <div className="mt-2 border rounded-md p-2">
                  <img 
                    src={formField.value} 
                    alt="Preview" 
                    className="max-h-40 rounded-md" 
                  />
                </div>
              )}
              {field.description && (
                <FormDescription>{field.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
      
    // For carousel and other complex types, we'd implement custom UI components
    case 'carousel':
      return (
        <FormField
          control={form.control}
          name={`platformData.${field.name}`}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <div className="border rounded-md p-4 bg-muted/40">
                <p className="text-sm text-muted-foreground">
                  Carousel image upload feature will be implemented here
                </p>
              </div>
              {field.description && (
                <FormDescription>{field.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
      
    default:
      return (
        <FormField
          control={form.control}
          name={`platformData.${field.name}`}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={field.placeholder} 
                  {...formField} 
                />
              </FormControl>
              {field.description && (
                <FormDescription>{field.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
  }
}
