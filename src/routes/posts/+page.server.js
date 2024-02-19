import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("posts").select().eq('publishing_status', 'published');
  return {
    posts: data ?? [],
  };
}
