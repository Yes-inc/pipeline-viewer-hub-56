// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lrtjhnlwapjrslfozwng.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxydGpobmx3YXBqcnNsZm96d25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwOTU2MjIsImV4cCI6MjA0OTY3MTYyMn0.N7iytEAgoOCuSF_EQIDXLwFxI6ulhCoQIVLbM9VCRAw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);