
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AppearanceSettingsProps {
  theme: "light" | "dark" | "system";
  language: string;
  onThemeChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  isLoading: boolean;
}

const AppearanceSettings = ({
  theme,
  language,
  onThemeChange,
  onLanguageChange,
  isLoading
}: AppearanceSettingsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="theme">Theme</Label>
        <Select value={theme} onValueChange={onThemeChange} disabled={isLoading}>
          <SelectTrigger id="theme" className="w-full sm:w-[240px]">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System Default</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <Select value={language} onValueChange={onLanguageChange} disabled={isLoading}>
          <SelectTrigger id="language" className="w-full sm:w-[240px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="german">German</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AppearanceSettings;
