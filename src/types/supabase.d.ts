
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export interface Database {
  public: {
    Tables: {
      brand_profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          role: string;
          avatar: string | null;
          fallback: string | null;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          role: string;
          avatar?: string | null;
          fallback?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          role?: string;
          avatar?: string | null;
          fallback?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      profile_tags: {
        Row: {
          id: string;
          profile_id: string;
          label: string;
          bg_color: string;
          text_color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          label: string;
          bg_color: string;
          text_color: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          label?: string;
          bg_color?: string;
          text_color?: string;
          created_at?: string;
        };
      };
      profile_integrations: {
        Row: {
          id: string;
          profile_id: string;
          integration_type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          integration_type: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          integration_type?: string;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          username: string | null;
          avatar_url: string | null;
          updated_at: string | null;
          two_factor_enabled: boolean | null;
          active_brand_profile_id: string | null;
          settings: any | null;
          subscription_data: any | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          updated_at?: string | null;
          two_factor_enabled?: boolean | null;
          active_brand_profile_id?: string | null;
          settings?: any | null;
          subscription_data?: any | null;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          updated_at?: string | null;
          two_factor_enabled?: boolean | null;
          active_brand_profile_id?: string | null;
          settings?: any | null;
          subscription_data?: any | null;
        };
      };
    };
  };
}
