<script>
  import Nav from "$lib/Nav.svelte";

  import { enhance } from "$app/forms";
  import { invalidate, invalidateAll, goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let data;

  $: ({ supabase } = data);

  onMount(async () => {
    supabase.auth.onAuthStateChange((event, _session) => {
      // If you want to fain grain which routes should rerun their load function
      // when onAuthStateChange changes
      // use invalidate('supabase:auth')
      // which is linked to +layout.js depends('supabase:auth').
      // This should mainly concern all routes
      //that should be accesible only for logged in user.
      // Otherwise use invalidateAll()
      // which will rerun every load function of you app.
      invalidate("supabase:auth");
      // invalidateAll();
    });
    return () => subscription.unsubscribe();
  });

  const submitLogout = async ({ cancel }) => {
    const { error } = await data.supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    cancel();
    await goto("/");
  };

  let menuItems = [
    { linkText: "Home", url: "/", id: "0" },
    { linkText: "About", id: "1" },
    { linkText: "Past work", id: "2" },
    { linkText: "Projects", id: "3" },
    { linkText: "Posts", id: "4" },
    { linkText: "Admin", id: "5" },
  ];
  for (const item of menuItems) {
    if (item.linkText !== "Home") {
      item["url"] = `/${item.linkText.replaceAll(" ", "-").toLowerCase()}`;
    }
  }
</script>

<Nav />

<span id="auth_header">
  {#if data.session}
    <form action="/logout?/logout" method="POST" use:enhance={submitLogout}>
      <button type="submit">Logout</button>
    </form>
  {:else}
    <a href="/login">login</a>
  {/if}
</span>

<slot />

<style>
  #auth_header {
    float: right;
  }
  form {
    display: inline;
  }
</style>
