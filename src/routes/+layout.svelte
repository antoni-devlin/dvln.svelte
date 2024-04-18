<script>
  import { enhance } from "$app/forms";
  import { invalidate, invalidateAll, goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { PUBLIC_ENV } from "$env/static/public";

  export let data;

  $: ({ supabase, session } = data);

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
  // leaving this here to discuss with Hugh
  // let menuItems = [
  //   { linkText: "Home", url: "/", id: "0" },
  //   { linkText: "Projects", id: "1" },
  //   { linkText: "Posts", id: "2" },
  // ];

  // if (data.session) {
  //   menuItems.push({ linkText: "Admin", id: "3" });
  // } else {
  //   menuItems.push({ linkText: "Login", id: "4" });
  // }

  // for (const item of menuItems) {
  //   if (item.linkText !== "Home") {
  //     item["url"] = `/${item.linkText.replaceAll(" ", "-").toLowerCase()}`;
  //   }
  // }

  $: menuItems = [
    { linkText: "Home", url: "/", id: "0" },
    { linkText: "Projects", id: "1" },
    { linkText: "Posts", id: "2" },
    ...(session
      ? [{ linkText: "Admin", id: "3" }]
      : [{ linkText: "Login", id: "4" }]),
  ].map((item) => ({
    ...item,
    url:
      item.linkText !== "Home"
        ? `/${item.linkText.replaceAll(" ", "-").toLowerCase()}`
        : item.url,
  }));
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  />
  <link rel="stylesheet" href="/styles/main.css" />
</svelte:head>

{#if PUBLIC_ENV === "DEV"}
  <span id="dev-tag"> DEVELOPMENT PREVIEW </span>
{/if}
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

  #dev-tag {
    background: orange;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    font-weight: 900;
  }

  li {
    display: inline-block;
  }

  li a {
    text-decoration: none;
    color: black !important;
  }

  a {
    padding: 15px;
  }
</style>
