// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qfxcfoleeityixcwqbzq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmeGNmb2xlZWl0eWl4Y3dxYnpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5OTQwMDcsImV4cCI6MjA1ODU3MDAwN30.xSm3uoag3Ra7LHeSi--RobZ8_Xg4ow_lSSx8GvXvPSA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);