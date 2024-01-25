<script>
  export let data;
  const { posts } = data;
</script>

{#each posts as post}
  {post.title}
  {post.body.substring(0, 15)}
{/each}
