<script>
  export let data;
  const { posts } = data;
</script>

<ul>
  {#each posts as post}
    <li><a href="/posts/{post.slug}">{post.title}</a></li>
  {/each}
</ul>
