import { supabase, getPostBySlug, updatePostBySlug } from "$lib/supabaseClient";
import { getCurrentDateTime } from "$lib/dayjs.js";
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
    const body = formData.get("hiddenBody");
    const status = formData.get("status");
    const updated_at = getCurrentDateTime();
    const { error } = await supabase
      .from("posts")
      .update({
        title: title,
        body: body,
        published: status,
        updated_at: updated_at,
      })
      .eq("slug", params.slug);

    redirect(303, "/admin");
  },
};
