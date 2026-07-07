import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export type Idea = {
  id: string;
  name: string;
  year: string;
  idea_title: string;
  description: string;
  skills_required: string;
  votes: number;
  created_at: string;
  status: string;
  usn: string;
  team: string;
};
export type Project = {
  id: string;
  title: string;
  slug: string | null;
  short_description: string | null;
  description: string;
  category: string;
  tech_stack: string[];
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  status: string;
  featured: boolean;
  team_members: string | null;
  created_by: string | null;
  created_at: string;
};
export type ContactMessage = {
  id?: string;
  name: string;
  email: string;
  message: string;
};