import { supabase } from "$lib/supabaseClient";
import db from "$lib/supabaseClient"
export const prerender = false;

// export async function load() {
//   const { data } = await supabase.from("posts").select();
//   return {
//     posts: data ?? [],
//   };
// }

import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => db.newPost(request)
};
