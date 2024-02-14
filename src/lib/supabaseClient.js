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
    .eq("slug", slug)
    

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export class db {
  // Create new post
  async newPost(requestObject) {
    const formData = await requestObject.formData();

    const title = formData.get("title");
    // const slug = title.replaceAll(" ", "-").toLowerCase();
    const slug = title
      .replace(/[^\w\s\']|_/g, "")
      .replace(/\s+/g, " ")
      .replaceAll(" ", "-")
      .toLowerCase();
    const body = formData.get("body");

    const { error } = await supabase.from("posts").insert({
      title: title,
      body: body,
      slug: slug,
    });
    redirect (303, '/admin')
  }
  // Read post
  // Update post
  // Delete post
}