<script>
  // import Tiptap from "$lib/Tiptap.svelte";
  import { enhance } from "$app/forms";
  export let data;
  let post = data;
  // let slug = post.slug;
  import dayjs from "dayjs";
  post.created_at = dayjs(post.created_at).format("DD/MM/YYYY");
</script>

<h2>Edit post</h2>

<form method="POST" use:enhance>
  <label>
    Title
    <br />
    <input name="title" type="text" value={post.title} />
  </label>
  <br />
  <br />
  <label>
    Body
    <br />
    <textarea name="body" value={post.body} rows="40" cols="100" />
  </label>
  <button>Log in</button>
</form>
<!-- 
<Tiptap editorContent={post.body} /> -->
