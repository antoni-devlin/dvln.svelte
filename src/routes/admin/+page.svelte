<script>
  export let data;
  const { posts } = data;
  import dayjs from "dayjs";
  import { supabase } from "$lib/supabaseClient";
  async function deletePostBySlug(slug) {
    if (confirm("Are you sure you want to delete this post?")) {
      const { error } = await supabase.from("posts").delete().eq("slug", slug);
    }
  }
</script>

<a href="/admin/new">New post</a>
<table>
  <table>
    <tr>
      <th>Title</th>
      <th>Date created</th>
      <th>Actions</th>
    </tr>
    {#each posts as post}
      <tr>
        <td>{post.title}</td>
        <td>{dayjs(post.created_at).format("DD/MM/YYYY")}</td>
        <td
          ><a href="/posts/{post.slug}">View live</a> |
          <a href="/admin/{post.slug}">Edit post</a> |
          <a href="/admin/" on:click={() => deletePostBySlug(post.slug)}
            >Delete post</a
          ></td
        >
      </tr>
    {/each}
  </table>
</table>
