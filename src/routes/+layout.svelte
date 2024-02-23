<script>
  import { enhance } from "$app/forms";
  import { invalidate, invalidateAll, goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let data;

  $: ({ supabase } = data);

  onMount(async () => {
    supabase.auth.onAuthStateChange((event, _session) => {
      // invalidate("supabase:auth");
      invalidateAll();
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
  ];

  if (data.session) {
    menuItems.push({ linkText: "Admin", id: "5" })
  } else {
    menuItems.push({ linkText: "Login", id: "6"})
  }

  for (const item of menuItems) {
    if (item.linkText !== "Home") {
      item["url"] = `/${item.linkText.replaceAll(" ", "-").toLowerCase()}`;
    }
  }

</script>

<nav>
  <menu>
    {#each menuItems as link}
      <li><a href={link.url}>{link.linkText}</a></li>
      |
    {:else}
      No links!
    {/each}
    {#if data.session}
    <span id="auth_header">
    <form action="/logout" method="POST" use:enhance={submitLogout}>
      <button type="submit">Logout</button>
    </form>
  </span>
  {/if}
  </menu>
</nav>

<slot />

<style>
  #auth_header {
    float: right;
  }
  form {
    display: inline;
  }
  li a {
    text-decoration: none;
  }

  menu {
    list-style: none;
  }

  li {
    display: inline-block;
    /* padding: 15px; */
    color: black;
  }

  a {
    padding: 15px;
  }

  a:hover {
    color: white;
    background: black;
  }
</style>
