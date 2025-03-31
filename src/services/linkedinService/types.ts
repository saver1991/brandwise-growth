
export interface LinkedInProfile {
  id: string;
  localizedFirstName: string;
  localizedLastName: string;
  profilePicture?: {
    displayImage: string;
  };
}

export interface LinkedInShare {
  author: string;
  lifecycleState: string;
  specificContent: {
    "com.linkedin.ugc.ShareContent": {
      shareCommentary: {
        text: string;
      };
      shareMediaCategory: string;
      media?: Array<{
        status: string;
        description?: {
          text: string;
        };
        originalUrl?: string;
        title?: {
          text: string;
        };
      }>;
    };
  };
  visibility: {
    "com.linkedin.ugc.MemberNetworkVisibility": string;
  };
}

export interface LinkedInTokens {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}
