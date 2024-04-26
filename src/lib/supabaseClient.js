import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";

import { PUBLIC_ENV } from "$env/static/public";
let table;

PUBLIC_ENV === "DEV" ? (table = "dev_posts") : (table = "posts");

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("slug", slug)
    .neq("publishing_status", "deleted")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
