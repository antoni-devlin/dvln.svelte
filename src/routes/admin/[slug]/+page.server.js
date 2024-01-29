import { supabase, getPostBySlug } from "$lib/supabaseClient";

export const prerender = false;

export const load = ({ params }) => {
  const data = getPostBySlug(params.slug);
  return data;
};

export const actions = {
  default: async (event) => {
    // Update post you're currently editing
  },
};
