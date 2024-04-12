<script>
  import Postform from "$lib/Postform.svelte";
  export let form;
</script>

<svelte:head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
  />
</svelte:head>

<h2>Create new post</h2>

<Postform />

{#if form?.slugExists}
  <div id="alert alert-danger" role="alert">
    There is already a post with that slug/title. Choose a different title to
    fix this error.
  </div>
{/if}
