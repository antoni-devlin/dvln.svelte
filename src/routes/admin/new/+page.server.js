import { supabase } from "$lib/supabaseClient";

export const prerender = false;






import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const title = formData.get("title");
    const slug = title
      .replace(/[^\w\s\']|_/g, "")
      .replace(/\s+/g, " ")
      .replaceAll(" ", "-")
      .toLowerCase();
    const body = formData.get("hiddenBody");
    const status = formData.get("status")

    const { error } = await supabase.from("posts").insert({
      title: title,
      body: body,
      slug: slug,
      publishing_status: status
    });
    if (error) {
      console.log(error)
    }
    redirect(303, '/admin');
  },
};
