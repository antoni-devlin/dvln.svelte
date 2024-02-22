import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

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

export async function updatePostBySlug(slug, postContent, postTitle) {
  const { data, error } = await supabase
    .from("posts")
    .update({ title: postTitle, body: postContent })
    .eq("slug", slug);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
