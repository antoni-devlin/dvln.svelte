<script>
  import Nav from "./Nav.svelte";
  import { invalidateAll } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(() => {
      invalidateAll();
    });

    return () => {
      subscription.unsubscribe();
    };
  });
</script>

<Nav />

<slot />
