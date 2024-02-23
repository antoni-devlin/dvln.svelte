<script>
  export let data;
  let post = data;

  import dayjs from "dayjs";
  post.created_at = dayjs(post.created_at).format("DD/MM/YYYY");
</script>

<svelte:head>
    <title>{post.title}</title> 
</svelte:head>

<h1>{post.title}</h1>
<span>Posted: {post.created_at}</span>
<p>{@html post.body}</p>
