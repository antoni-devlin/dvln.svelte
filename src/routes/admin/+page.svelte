<script>
  export let data;
  const { posts } = data;
  import dayjs from "dayjs";
  import { supabase } from "$lib/supabaseClient";
  import { goto } from '$app/navigation';
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
      <th>Status</th>
    </tr>
    {#each posts as post}
      <tr>
        <td>{post.title}</td>
        <td>{dayjs(post.created_at).format("DD/MM/YYYY")}</td>
        <td
          ><a href="/posts/{post.slug}">View live</a> |
          <a href="/admin/{post.slug}">Edit post</a> |
        </td>
        <td>
          {#if post.published}
            Published
            {:else}
            Draft
          {/if}
        </td>
      </tr>
    {/each}
  </table>
</table>
<style>
table {
  margin: 0 auto;
}

  th, td {
  border: 1px solid;
  padding: 10px;
}
</style>
