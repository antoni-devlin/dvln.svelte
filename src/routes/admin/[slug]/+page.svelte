<script>
  export let data;
  let post = data;
  import dayjs from "dayjs";
  import Postform from "$lib/Postform.svelte";

  post.created_at = dayjs(post.created_at).format("DD/MM/YYYY");
</script>

<h2>Edit post</h2>

<Postform title={post.title} body={post.body} status={post.publishing_status} />

<div id="error">
  There is already a post with that slug/title. Choose a different title to fix
  this error.
</div>
