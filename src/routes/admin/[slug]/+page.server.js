import { supabase, getPostBySlug, updatePostBySlug } from "$lib/supabaseClient";

export const prerender = false;

export const load = ({ params }) => {
  const data = getPostBySlug(params.slug);
  return data;
};

import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, params }) => {
    const formData = await request.formData();

    const title = formData.get("title");
    const body = formData.get("body");
    const status = formData.get("status");
    const { error } = await supabase
      .from("posts")
      .update({
        title: title,
        body: body,
        published: status,
      })
      .eq("slug", params.slug);

      redirect(303, '/admin');
  },
};
