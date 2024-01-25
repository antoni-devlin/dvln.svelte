import { supabase } from "$lib/supabaseClient";

export async function load({ params }) {
  console.log(params);

  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq(params.slug);
  return {
    post: data,
  };
}
