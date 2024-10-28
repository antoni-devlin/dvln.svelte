<script>
  import { enhance } from "$app/forms";
  import { invalidateAll, goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { PUBLIC_ENV } from "$env/static/public";
  import Footer from "$lib/Footer.svelte";
  export let data;

  let cf_token_string = "{'token': 'e5e954370f1b4cf184896328e3466581'}";

  $: ({ supabase, session } = data);

  onMount(async () => {
    supabase.auth.onAuthStateChange((event, _session) => {
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

  $: menuItems = [
    { linkText: "Home", url: "/", id: "0" },
    { linkText: "Posts", id: "2" },
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
  <title>DVLN.XYZ</title>
</svelte:head>

{#if PUBLIC_ENV === "DEV"}
  <span id="dev-tag"> DEVELOPMENT PREVIEW </span>
{:else}
  <!-- Cloudflare Web Analytics -->
  <script
    defer
    src="https://static.cloudflareinsights.com/beacon.min.js"
    data-cf-beacon={cf_token_string}
  ></script>
  <!-- End Cloudflare Web Analytics -->
{/if}
<nav>
  <menu>
    {#each menuItems as link}
      <li>
        <a href={link.url}
          >{link.linkText} data-umami-event="{main_menu_click}"
        </a>
      </li>
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

{#if !data.session}
  <Footer
    content="Built by Antoni Devlin using Sveltekit"
    link="login"
    linkText="Login"
  />
{:else}
  <Footer
    content="Built by Antoni Devlin using Sveltekit"
    link="admin"
    linkText="Admin"
  />
{/if}

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

  a {
    color: black;
    text-decoration: none;
    padding: 15px;
    transition: color 300ms;
  }

  a:hover {
    color: darkred;
  }
</style>
