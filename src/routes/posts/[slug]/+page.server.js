import { supabase } from "$lib/supabaseClient";

export async function load({ params }) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug);
  console.log(data);
  return {
    post: data,
  };
}
