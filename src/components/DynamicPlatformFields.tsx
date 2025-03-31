
import React from "react";
import { useFormContext } from "react-hook-form";
import { ContentPlatform, PLATFORM_FIELDS } from "@/types/ContentData";
import { PlatformContentFields } from "@/types/ContentData";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { FieldConfig } from "@/types/PlatformFieldConfig";

interface DynamicPlatformFieldsProps {
  platform: ContentPlatform;
  initialData?: PlatformContentFields;
}

export const DynamicPlatformFields: React.FC<DynamicPlatformFieldsProps> = ({ platform, initialData }) => {
  const { control, setValue } = useFormContext();
  const platformConfig = PLATFORM_FIELDS[platform];
  
  if (!platformConfig) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">{platformConfig.name} Specific Fields</h3>
      {platformConfig.fields.map((field: FieldConfig) => (
        <FormField
          key={field.name}
          control={control}
          name={`platformData.${field.name}`}
          defaultValue={initialData?.[field.name as keyof PlatformContentFields] || ""}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                {field.type === "textarea" ? (
                  <Textarea 
                    placeholder={field.placeholder} 
                    className="min-h-[100px]" 
                    {...formField} 
                  />
                ) : (
                  <Input 
                    placeholder={field.placeholder} 
                    {...formField} 
                  />
                )}
              </FormControl>
              {field.description && (
                <FormDescription>
                  {field.description}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};
