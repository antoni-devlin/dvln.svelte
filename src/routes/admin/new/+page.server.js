import { supabase } from "$lib/supabaseClient";
export const prerender = false;

// export async function load() {
//   const { data } = await supabase.from("posts").select();
//   return {
//     posts: data ?? [],
//   };
// }

import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

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
  },
};
