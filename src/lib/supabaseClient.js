import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "$env/static/private";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
