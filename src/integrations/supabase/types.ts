export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      matches: {
        Row: {
          created_at: string
          id: string
          is_super_like: boolean | null
          matched_user_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_super_like?: boolean | null
          matched_user_id: string
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_super_like?: boolean | null
          matched_user_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          about_video_url: string | null
          bio: string | null
          calendly_url: string | null
          country: string | null
          created_at: string
          email: string
          facebook_url: string | null
          full_name: string | null
          funding_amount_seeking: string | null
          funding_stage: string | null
          id: string
          industry: string | null
          instagram_url: string | null
          investment_range: string | null
          investment_status: string | null
          investor_check_size: string | null
          investor_type: string | null
          investor_type_preference: string[] | null
          linkedin_url: string | null
          open_to_connect: boolean | null
          pitch_deck_url: string | null
          pitch_video_url: string | null
          preferred_sectors: string[] | null
          preferred_stages: string[] | null
          profile_image_url: string | null
          regional_focus: string[] | null
          role: string | null
          startup_name: string | null
          startup_website: string | null
          subscription_tier: string | null
          tiktok_url: string | null
          twitter_url: string | null
          updated_at: string
          user_id: string
          video_pitch_url: string | null
          why_good_fit: string | null
        }
        Insert: {
          about_video_url?: string | null
          bio?: string | null
          calendly_url?: string | null
          country?: string | null
          created_at?: string
          email: string
          facebook_url?: string | null
          full_name?: string | null
          funding_amount_seeking?: string | null
          funding_stage?: string | null
          id?: string
          industry?: string | null
          instagram_url?: string | null
          investment_range?: string | null
          investment_status?: string | null
          investor_check_size?: string | null
          investor_type?: string | null
          investor_type_preference?: string[] | null
          linkedin_url?: string | null
          open_to_connect?: boolean | null
          pitch_deck_url?: string | null
          pitch_video_url?: string | null
          preferred_sectors?: string[] | null
          preferred_stages?: string[] | null
          profile_image_url?: string | null
          regional_focus?: string[] | null
          role?: string | null
          startup_name?: string | null
          startup_website?: string | null
          subscription_tier?: string | null
          tiktok_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id: string
          video_pitch_url?: string | null
          why_good_fit?: string | null
        }
        Update: {
          about_video_url?: string | null
          bio?: string | null
          calendly_url?: string | null
          country?: string | null
          created_at?: string
          email?: string
          facebook_url?: string | null
          full_name?: string | null
          funding_amount_seeking?: string | null
          funding_stage?: string | null
          id?: string
          industry?: string | null
          instagram_url?: string | null
          investment_range?: string | null
          investment_status?: string | null
          investor_check_size?: string | null
          investor_type?: string | null
          investor_type_preference?: string[] | null
          linkedin_url?: string | null
          open_to_connect?: boolean | null
          pitch_deck_url?: string | null
          pitch_video_url?: string | null
          preferred_sectors?: string[] | null
          preferred_stages?: string[] | null
          profile_image_url?: string | null
          regional_focus?: string[] | null
          role?: string | null
          startup_name?: string | null
          startup_website?: string | null
          subscription_tier?: string | null
          tiktok_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id?: string
          video_pitch_url?: string | null
          why_good_fit?: string | null
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
