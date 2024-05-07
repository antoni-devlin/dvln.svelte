import { supabase } from "$lib/supabaseClient";
import { PUBLIC_ENV } from "$env/static/public";
let table;

PUBLIC_ENV === "DEV" ? (table = "dev_posts") : (table = "posts");

export async function load({ url }) {
  let q = url.searchParams.get("search");
  const supabaseQuery = supabase
    .from(table)
    .select()
    .eq("publishing_status", "published")
    .not("body", "is", null)
    .order("created_at", { ascending: false });

  if (q && !(q == " ")) {
    // supabaseQuery.ilike("title", `%${q}%`);
    supabaseQuery.textSearch("fts", `${q}:*`, { type: "websearch" });
  }
  const { data } = await supabaseQuery;
  return {
    posts: data ?? [],
  };
}
