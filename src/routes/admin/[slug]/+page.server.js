import { supabase, getPostBySlug } from "$lib/supabaseClient";
import { getCurrentDateTime } from "$lib/dayjs.js";
export const prerender = false;
export const load = ({ params }) => {
  const data = getPostBySlug(params.slug);
  return data;
};

import { PUBLIC_ENV } from "$env/static/public";
let table;

PUBLIC_ENV === "DEV" ? (table = "dev_posts") : (table = "posts");

import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, params }) => {
    const formData = await request.formData();

    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const body = formData.get("post-body");
    const status = formData.get("status");
    const updated_at = getCurrentDateTime();
    const { error } = await supabase
      .from(table)
      .update({
        title: title,
        excerpt: excerpt,
        body: body,
        publishing_status: status,
        updated_at: updated_at,
      })
      .eq("slug", params.slug);
    if (error) {
      console.log(error);
    }
    redirect(303, "/admin");
  },
};
