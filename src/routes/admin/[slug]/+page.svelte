<script>
  // import Tiptap from "$lib/Tiptap.svelte";
  export let data;
  let post = data;
  import dayjs from "dayjs";
    import Postform from "$lib/Postform.svelte";

  post.created_at = dayjs(post.created_at).format("DD/MM/YYYY");
</script>

<h2>Edit post</h2>

<Postform title="{post.title}" body="{post.body}"/>

<!-- 
<Tiptap editorContent={post.body} /> -->
