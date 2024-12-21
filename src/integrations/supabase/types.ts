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
      access_tokens: {
        Row: {
          access_token: string
          expiration_time: number
          id: number
        }
        Insert: {
          access_token: string
          expiration_time: number
          id?: number
        }
        Update: {
          access_token?: string
          expiration_time?: number
          id?: number
        }
        Relationships: []
      }
      alembic_version: {
        Row: {
          version_num: string
        }
        Insert: {
          version_num: string
        }
        Update: {
          version_num?: string
        }
        Relationships: []
      }
      bad_fit_leads: {
        Row: {
          company_prefix: string
          id: string
          linkedin_url: string
          marked_at: string | null
        }
        Insert: {
          company_prefix: string
          id?: string
          linkedin_url: string
          marked_at?: string | null
        }
        Update: {
          company_prefix?: string
          id?: string
          linkedin_url?: string
          marked_at?: string | null
        }
        Relationships: []
      }
      Gimi_Active_Leads: {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          Deal_Size: number | null
          Email: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
          Time_Stamp: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: number | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: number | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Relationships: []
      }
      Gimi_Advisors: {
        Row: {
          Duration: number | null
          Industry: string | null
          LinkedIn: string
          Location: string | null
          Name: string | null
          Picture: string | null
        }
        Insert: {
          Duration?: number | null
          Industry?: string | null
          LinkedIn: string
          Location?: string | null
          Name?: string | null
          Picture?: string | null
        }
        Update: {
          Duration?: number | null
          Industry?: string | null
          LinkedIn?: string
          Location?: string | null
          Name?: string | null
          Picture?: string | null
        }
        Relationships: []
      }
      Gimi_Established_Connections: {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          Deal_Size: number | null
          Email: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
          Time_Stamp: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: number | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: number | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Relationships: []
      }
      Gimi_Leads: {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          Deal_Size: number | null
          Email: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
          Time_Stamp: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: number | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: number | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Relationships: []
      }
      Gimi_Uncertain_Leads: {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
        }
        Relationships: []
      }
      hubspot_tokens: {
        Row: {
          id: number
          token: string
        }
        Insert: {
          id?: number
          token: string
        }
        Update: {
          id?: number
          token?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          adviser_name: string | null
          company_name: string | null
          domain: string | null
          id: number
          lead_name: string | null
          lead_title: string | null
          linkedin_url: string | null
        }
        Insert: {
          adviser_name?: string | null
          company_name?: string | null
          domain?: string | null
          id?: number
          lead_name?: string | null
          lead_title?: string | null
          linkedin_url?: string | null
        }
        Update: {
          adviser_name?: string | null
          company_name?: string | null
          domain?: string | null
          id?: number
          lead_name?: string | null
          lead_title?: string | null
          linkedin_url?: string | null
        }
        Relationships: []
      }
      Mitigram_Active_Leads: {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          Deal_Size: string | null
          Email: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
          Time_Stamp: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Relationships: []
      }
      Mitigram_Advisors: {
        Row: {
          Duration: number | null
          Industry: string | null
          LinkedIn: string | null
          Location: string | null
          Name: string
          Picture: string | null
        }
        Insert: {
          Duration?: number | null
          Industry?: string | null
          LinkedIn?: string | null
          Location?: string | null
          Name?: string
          Picture?: string | null
        }
        Update: {
          Duration?: number | null
          Industry?: string | null
          LinkedIn?: string | null
          Location?: string | null
          Name?: string
          Picture?: string | null
        }
        Relationships: []
      }
      Mitigram_Comments: {
        Row: {
          comment: string
          created_at: string
          id: string
          lead_linkedin_url: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          lead_linkedin_url: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          lead_linkedin_url?: string
        }
        Relationships: []
      }
      Mitigram_Established_Connections: {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          Deal_Size: string | null
          Email: string | null
          First_Name: string | null
          Full_Name: string
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
          Time_Stamp: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name: string
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Relationships: []
      }
      Mitigram_Leads: {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          Deal_Size: string | null
          Email: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
          Time_Stamp: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Relationships: []
      }
      Mitigram_Uncertain_Leads: {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          theme_color: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          theme_color?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          theme_color?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          Company: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          organization_id: string | null
          Type: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          Company?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          organization_id?: string | null
          Type?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          Company?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          organization_id?: string | null
          Type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ToExceed_Active_Leads: {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          Deal_Size: string | null
          Email: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
          Time_Stamp: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Relationships: []
      }
      ToExceed_Advisors: {
        Row: {
          Duration: number | null
          Industry: string | null
          LinkedIn: string
          Location: string | null
          Name: string | null
          Picture: string | null
        }
        Insert: {
          Duration?: number | null
          Industry?: string | null
          LinkedIn: string
          Location?: string | null
          Name?: string | null
          Picture?: string | null
        }
        Update: {
          Duration?: number | null
          Industry?: string | null
          LinkedIn?: string
          Location?: string | null
          Name?: string | null
          Picture?: string | null
        }
        Relationships: []
      }
      ToExceed_Comments: {
        Row: {
          comment: string
          created_at: string
          id: string
          lead_linkedin_url: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          lead_linkedin_url: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          lead_linkedin_url?: string
        }
        Relationships: []
      }
      ToExceed_Established_Connections: {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          Deal_Size: number | null
          Email: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
          Time_Stamp: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: number | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: number | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Relationships: []
      }
      ToExceed_Leads: {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          Deal_Size: number | null
          Email: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
          Time_Stamp: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: number | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: number | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Relationships: []
      }
      ToExceed_Uncertain_Leads: {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string
          id: number
          password: string
        }
        Insert: {
          email: string
          id?: number
          password: string
        }
        Update: {
          email?: string
          id?: number
          password?: string
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
