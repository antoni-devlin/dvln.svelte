import { supabase, getPostBySlug } from "$lib/supabaseClient";

export const load = ({ params }) => {
  const data = getPostBySlug(params.slug);
  return data;
};
