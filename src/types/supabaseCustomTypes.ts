
import { Database } from '@/types/supabase';

// Profiles table row type
export type ProfilesRow = Database['public']['Tables']['profiles']['Row'];

// Brand profiles table types
export interface BrandProfileRow {
  id: string;
  user_id: string;
  name: string;
  role: string;
  avatar: string | null;
  fallback: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface BrandProfileInsert {
  id?: string;
  user_id: string;
  name: string;
  role: string;
  avatar?: string | null;
  fallback?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BrandProfileUpdate {
  id?: string;
  user_id?: string;
  name?: string;
  role?: string;
  avatar?: string | null;
  fallback?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Profile tags table types
export interface ProfileTagRow {
  id: string;
  profile_id: string;
  label: string;
  bg_color: string;
  text_color: string;
  created_at: string;
}

export interface ProfileTagInsert {
  id?: string;
  profile_id: string;
  label: string;
  bg_color: string;
  text_color: string;
  created_at?: string;
}

// Profile integrations table types
export interface ProfileIntegrationRow {
  id: string;
  profile_id: string;
  integration_type: string;
  created_at: string;
}

export interface ProfileIntegrationInsert {
  id?: string;
  profile_id: string;
  integration_type: string;
  created_at?: string;
}
