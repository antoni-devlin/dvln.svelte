<script>
export let title = "", body = ""
import { enhance } from "$app/forms";
</script>

<form method="POST" use:enhance>
    <label>
      Title
      <br />
      <input name="title" type="text" value={title} />
    </label>
    <br />
    <br />
    <label>
      Body
      <br />
      <textarea name="body" value={body} rows="40" cols="100" />
    </label>
    <button>Save post</button>
  </form>

  <style>

  </style>