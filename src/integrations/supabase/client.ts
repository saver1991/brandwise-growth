// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nfblswfyqrllryptwnyr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mYmxzd2Z5cXJsbHJ5cHR3bnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MzU5MjQsImV4cCI6MjA1OTAxMTkyNH0.yvZQQNrHpVz2IeYNj68bn52BblCq_7YRXrgwg6yCyjk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);