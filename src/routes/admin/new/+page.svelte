<script>
  import Postform from "$lib/Postform.svelte";
  export let form;
</script>

<h2>Create new post</h2>

<Postform />

{#if form?.slugExists}

{/if}
