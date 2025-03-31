
import { ContentPlatform } from "./ContentData";

export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
}

export interface PlatformFieldConfig {
  name: string;
  fields: FieldConfig[];
}
