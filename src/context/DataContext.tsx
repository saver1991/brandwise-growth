
import React, { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./AuthContext";
import LinkedInService from "@/services/linkedinService";
import MediumService from "@/services/mediumService";

interface DataContextProps {
  isLoading: boolean;
  linkedInStats: {
    followers: number;
    posts: number;
    engagement: number;
    weeklyGrowth: number;
  };
  mediumStats: {
    followers: number;
    articles: number;
    totalReads: number;
    engagement: number;
  };
  refreshData: () => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [linkedInService] = useState(() => new LinkedInService({
    clientId: user?.linkedInClientId,
    clientSecret: user?.linkedInClientSecret,
    accessToken: user?.linkedInAccessToken,
  }));
  
  const [mediumService] = useState(() => new MediumService({
    accessToken: user?.mediumAccessToken,
  }));
  
  const {
    data: linkedInData,
    isLoading: isLinkedInLoading,
    refetch: refetchLinkedIn
  } = useQuery({
    queryKey: ['linkedin-stats', user?.id],
    queryFn: async () => {
      if (!user || !linkedInService.hasValidCredentials()) {
        return {
          followers: 2845, // Example fallback data for demo
          posts: 48,
          engagement: 4.8,
          weeklyGrowth: 12
        };
      }
      return await linkedInService.getStats();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!user
  });

  const {
    data: mediumData,
    isLoading: isMediumLoading,
    refetch: refetchMedium
  } = useQuery({
    queryKey: ['medium-stats', user?.id],
    queryFn: async () => {
      if (!user || !mediumService.hasValidCredentials()) {
        return {
          followers: 1249, // Example fallback data for demo
          articles: 23,
          totalReads: 18750,
          engagement: 3.2
        };
      }
      return await mediumService.getStats();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!user
  });

  const refreshData = () => {
    refetchLinkedIn();
    refetchMedium();
  };
  
  const value = {
    isLoading: isLinkedInLoading || isMediumLoading,
    linkedInStats: linkedInData || {
      followers: 0,
      posts: 0,
      engagement: 0,
      weeklyGrowth: 0
    },
    mediumStats: mediumData || {
      followers: 0,
      articles: 0,
      totalReads: 0,
      engagement: 0
    },
    refreshData
  };
  
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
