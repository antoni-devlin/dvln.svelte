<script>
  import Tiptap from "$lib/Tiptap.svelte";
  import { enhance } from '$app/forms'
  export let data;
  let post = data;
  let slug = post.slug;
  import dayjs from "dayjs";
  post.created_at = dayjs(post.created_at).format("DD/MM/YYYY");
</script>

<form method="POST" use:enhance>
	<label>
		Title
		<input name="title" type="text">
	</label>
	<label>
		Body
		<textarea name="body" rows="4" cols="50"/>
	</label>
	<button>Log in</button>
</form>

<!-- <label>
    Body
    <Tiptap editorContent={post.body} />
  </label> -->