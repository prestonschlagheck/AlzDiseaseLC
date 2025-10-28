import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type NewsPost = {
  id: string;
  title: string;
  author: string;
  content: string;
  image_url: string | null;
  is_pinned: boolean;
  published: boolean;
  deleted: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

