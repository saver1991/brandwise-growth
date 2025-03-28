
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Profile {
  id: string;
  name: string;
  role: string;
  avatar: string;
  fallback: string;
  tags: {
    label: string;
    bgColor: string;
    textColor: string;
  }[];
  description: string;
}

export const profiles: Profile[] = [
  {
    id: "salvatore",
    name: "Salvatore Mezzatesta",
    role: "Product Design & Strategy Expert",
    avatar: "https://placehold.co/200x200/0F2E3D/FFFFFF?text=SM",
    fallback: "SM",
    tags: [
      { label: "Product Design", bgColor: "bg-brand-blue/10", textColor: "text-brand-blue" },
      { label: "Product Strategy", bgColor: "bg-brand-teal/10", textColor: "text-brand-teal" },
      { label: "UX Leadership", bgColor: "bg-brand-orange/10", textColor: "text-brand-orange" },
      { label: "Thought Leader", bgColor: "bg-muted", textColor: "text-foreground" }
    ],
    description: "Building a strong personal brand to establish authority in product design and strategy, drive audience growth, and increase industry recognition."
  },
  {
    id: "hanako",
    name: "Hanako Yamamasu",
    role: "Food Blogger & Dining Expert",
    avatar: "https://placehold.co/200x200/4A1D1F/FFFFFF?text=HY",
    fallback: "HY",
    tags: [
      { label: "Food Photography", bgColor: "bg-red-500/10", textColor: "text-red-500" },
      { label: "Restaurant Reviews", bgColor: "bg-amber-500/10", textColor: "text-amber-600" },
      { label: "Culinary Trends", bgColor: "bg-green-500/10", textColor: "text-green-600" },
      { label: "Recipe Creator", bgColor: "bg-muted", textColor: "text-foreground" }
    ],
    description: "Sharing authentic culinary experiences and food photography to inspire foodies and build a community of passionate dining enthusiasts."
  }
];

interface ProfileContextType {
  currentProfile: Profile;
  setCurrentProfile: (profile: Profile) => void;
  availableProfiles: Profile[];
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [currentProfile, setCurrentProfile] = useState<Profile>(profiles[0]);

  return (
    <ProfileContext.Provider
      value={{
        currentProfile,
        setCurrentProfile,
        availableProfiles: profiles
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
