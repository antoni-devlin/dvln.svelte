<script>
  export let data;
  import Search from "$lib/Search.svelte";

  const { posts = [] } = data ?? {};
</script>

<svelte:head>
  <title>DVLN – Posts</title>
</svelte:head>

<Search />
<div class="container mt-5">
  {#if posts.length > 0}
    {#each posts as post}
      <div class="post w-80 p-10">
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <a href="/posts/{post.slug}" data-umami-event="blog_post_read_more"
          >Read more</a
        >
        <hr />
      </div>
    {/each}
  {:else}
    <div class="post w-80 p-10"><p>Could not find any posts</p></div>
  {/if}
</div>

<style>
</style>
