import { supabase } from "$lib/supabaseClient";

export async function load({ params }) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug);
  return {
    data,
  };
}
