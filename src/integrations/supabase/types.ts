export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      brand_profiles: {
        Row: {
          avatar: string | null
          created_at: string
          description: string | null
          fallback: string | null
          id: string
          name: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          description?: string | null
          fallback?: string | null
          id?: string
          name: string
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          description?: string | null
          fallback?: string | null
          id?: string
          name?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profile_integrations: {
        Row: {
          created_at: string
          id: string
          integration_type: string
          profile_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          integration_type: string
          profile_id: string
        }
        Update: {
          created_at?: string
          id?: string
          integration_type?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_integrations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "brand_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_tags: {
        Row: {
          bg_color: string
          created_at: string
          id: string
          label: string
          profile_id: string
          text_color: string
        }
        Insert: {
          bg_color: string
          created_at?: string
          id?: string
          label: string
          profile_id: string
          text_color: string
        }
        Update: {
          bg_color?: string
          created_at?: string
          id?: string
          label?: string
          profile_id?: string
          text_color?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_tags_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "brand_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active_brand_profile_id: string | null
          avatar_url: string | null
          full_name: string | null
          id: string
          settings: Json | null
          subscription_data: Json | null
          two_factor_enabled: boolean | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          active_brand_profile_id?: string | null
          avatar_url?: string | null
          full_name?: string | null
          id: string
          settings?: Json | null
          subscription_data?: Json | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          active_brand_profile_id?: string | null
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          settings?: Json | null
          subscription_data?: Json | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_active_brand_profile_id_fkey"
            columns: ["active_brand_profile_id"]
            isOneToOne: false
            referencedRelation: "brand_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
