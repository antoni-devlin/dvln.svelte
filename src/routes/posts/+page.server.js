import { supabase } from "$lib/supabaseClient";
import { PUBLIC_ENV } from "$env/static/public";
let table;

PUBLIC_ENV === "DEV" ? (table = "dev_posts") : (table = "posts");

export async function load() {
  const { data } = await supabase
    .from(table)
    .select()
    .eq("publishing_status", "published")
    .not("body", "is", null);
  return {
    posts: data ?? [],
  };
}
