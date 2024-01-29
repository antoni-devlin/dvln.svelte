<script>
  import Tiptap from "$lib/Tiptap.svelte";
  export let data;
  let post = data;

  import dayjs from "dayjs";
  post.created_at = dayjs(post.created_at).format("DD/MM/YYYY");
</script>

<form>
  <label>
    Title
    <input name="title" type="text" value={post.title} />
  </label>
  <label>
    Body
    <input name="body" type="textarea" value={post.body} />
  </label>
  <button>Save post</button>
</form>

<Tiptap />
