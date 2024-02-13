import { supabase, getPostBySlug, updatePostBySlug } from "$lib/supabaseClient";

export const prerender = false;

export const load = ({ params }) => {
  const data = getPostBySlug(params.slug);
  return data;
};

import { fail } from '@sveltejs/kit'

export const actions = {
	default: async ({request, params}) => {
		const formData = await request.formData();

    const title = formData.get('title')
    const body = formData.get('body')
    console.log(params.slug)
    const { data, error } = await supabase
    .from("posts")
    .update({ title: title, body: body })
    .eq("slug", params.slug)
    return data
	}
};

// export const actions = {
//   default: async (event) => {
//     // Update post you're currently editing
//   },
// };
