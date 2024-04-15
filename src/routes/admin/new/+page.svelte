<script>
  import Postform from "$lib/Postform.svelte";
  export let form;
</script>

<h2>Create new post</h2>

<Postform />

{#if form?.slugExists}
  <div class="alert alert-warning" role="alert">
    A post with the same slug already exists. Please pick a different title.
  </div>
{/if}
