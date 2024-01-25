<script>
  export let data;
  const { posts } = data;
</script>

{#await posts}
  Loading
{:then posts}
  {posts}
{/await}
