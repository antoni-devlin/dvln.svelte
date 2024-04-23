import { supabase } from "$lib/supabaseClient";
import { error, redirect } from "@sveltejs/kit";
import { PUBLIC_ENV } from "$env/static/public";
let table;

PUBLIC_ENV === "DEV" ? (table = "dev_posts") : (table = "posts");

export const prerender = false;

export async function load({ locals: { getSession } }) {
  const loggedin = await getSession();
  if (!loggedin) {
    throw error(401, { message: "Unauthorized" });
    // redirect(303, "/")
  } else {
    const { data } = await supabase
      .from(table)
      .select()
      .neq("publishing_status", "deleted")
      .order("created_at", { ascending: false });
    return {
      posts: data ?? [],
    };
  }
}
