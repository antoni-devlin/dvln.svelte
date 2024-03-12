<script>
  export let data;
  const { posts } = data;

  function getExcerpt(string) {
    const length = 300;
    return string.substring(0, length) + "...";
  }
</script>

<div class="container mt-5">
  {#each posts as post}
    <div class="post w-80 p-10">
      <h2>{post.title}</h2>
      <div>{@html getExcerpt(post.body)}</div>
      <a href="/posts/{post.slug}">Read more</a>
      <hr />
    </div>
  {/each}
</div>

<style>
</style>
