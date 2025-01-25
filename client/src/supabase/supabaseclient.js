import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vuyuuepkipzpczihnkxs.supabase.co';

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1eXV1ZXBraXB6cGN6aWhua3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NDkwMzgsImV4cCI6MjA1MzMyNTAzOH0.LwBxSPCureqoLKj-hB2Bt1Itx85Zo2rL1btYYF5YJkg'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);