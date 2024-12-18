export interface PipelineRow {
  Advisor: string | null;
  LinkedIn_URL: string;
  Full_Name: string | null;
  First_Name: string | null;
  Last_Name: string | null;
  Email: string | null;
  Company: string | null;
  created_at: string | null;
  Profile_Picture?: string | null;
  Company_Website: string | null;
  Deal_Size: string | null;
  Timestamp?: {
    created_at: string;
  } | null;
}