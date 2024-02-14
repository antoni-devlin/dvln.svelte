<script>
  import Tiptap from "$lib/Tiptap.svelte";
  import { enhance } from "$app/forms";
</script>

<h2>Create new post</h2>

<form method="POST" use:enhance>
  <label>
    Title
    <input name="title" type="text" />
  </label>
  <label>
    Body
    <textarea name="body" rows="4" cols="50" />
  </label>
  <button>Save post</button>
</form>
