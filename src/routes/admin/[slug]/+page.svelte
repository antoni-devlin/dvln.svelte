<script>
  let post = $state(data);
  import dayjs from "dayjs";
  import Postform from "$lib/Postform.svelte";
  let { data } = $props();

  post.created_at = dayjs(post.created_at).format("DD/MM/YYYY");
</script>

<h2>Edit post</h2>

<Postform
  title={post.title}
  excerpt={post.excerpt}
  body={post.body}
  status={post.publishing_status}
/>
