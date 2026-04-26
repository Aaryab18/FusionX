import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Idea = {
  id: string;
  name: string;
  year: string;
  idea_title: string;
  description: string;
  skills_required: string;
  votes: number;
  created_at: string;
};

export type ContactMessage = {
  id?: string;
  name: string;
  email: string;
  message: string;
};
