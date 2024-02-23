import { supabase } from "$lib/supabaseClient";
import { error, redirect } from "@sveltejs/kit";

export const prerender = false;

export async function load({locals: {getSession}}) {
  const loggedin = await getSession()
  if (!loggedin) {
    throw error(401, { message: 'Unauthorized' })
    // redirect(303, "/")
  } else {
  const { data } = await supabase.from("posts").select();
  return {
    posts: data ?? [],
  };}
}
