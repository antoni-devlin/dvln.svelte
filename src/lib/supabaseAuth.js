import { createClient } from "@supabase/auth-helpers-sveltekit";
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";

export const supabaseAuth = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_KEY
);
