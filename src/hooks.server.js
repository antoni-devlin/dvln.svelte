// https://dev.to/kvetoslavnovak/supabase-ssr-auth-48j4
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public";
import { createServerClient } from "@supabase/ssr";
import { error } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
  // Initialize Supabase client
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_KEY,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, options) => {
          event.cookies.set(key, value, { ...options, path: "/" });
        },
        remove: (key, options) => {
          event.cookies.delete(key, { ...options, path: "/" });
        },
      },
    }
  );

  // Define getSession helper
  event.locals.getSession = async () => {
    const { data: getUserData } = await event.locals.supabase.auth.getUser();
    let {
      data: { session },
    } = await event.locals.supabase.auth.getSession();

    if (getUserData.user == null) {
      session = null;
    }

    return session;
  };

  // Protect /admin routes
  if (event.url.pathname.startsWith("/admin")) {
    const session = await event.locals.getSession();
    if (!session) {
      console.log("Unauthorized access to /admin");
      throw error(401, "Unauthorized");
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    },
  });
};
