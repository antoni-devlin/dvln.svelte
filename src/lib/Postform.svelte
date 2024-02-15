<script>
export let title = "", body = "", status
import { enhance } from "$app/forms";
</script>

<form method="POST" use:enhance>
    <label>
      Title
      <br />
      <input name="title" type="text" value={title} />
    </label>
    <label for="status"><br /><br />Published status:
      <br />
      <select bind:value={status} name="status" id="status-dropdown">
        <option value="false">Draft</option>
        <option value="true">Published</option>
      </select>
    </label>
    <br /><br />
    <label>
      Body
      <br />
      <textarea name="body" value={body} rows="40" cols="100" />
    </label>
    <br /><br />
    <button>Save post</button>
  </form>

  <style>

  </style>