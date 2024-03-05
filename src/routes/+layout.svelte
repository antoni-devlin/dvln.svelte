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
    { linkText: "Projects", id: "1" },
    { linkText: "Posts", id: "2" },
  ];

  if (data.session) {
    menuItems.push({ linkText: "Admin", id: "3" });
  } else {
    menuItems.push({ linkText: "Login", id: "4" });
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
      <span id="logout">
        <form action="/logout" method="POST" use:enhance={submitLogout}>
          <button class="btn btn-secondary" type="submit">Logout</button>
        </form>
      </span>
    {/if}
  </menu>
</nav>

<div class="container">
  <slot />
</div>

<style>
  #logout {
    float: right;
  }

  li a {
    text-decoration: none;
    color: black;
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
