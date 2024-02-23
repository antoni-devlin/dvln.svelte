<script>
  export let data;
  const { posts } = data;
  import dayjs from "dayjs";
  import { supabase } from "$lib/supabaseClient";
  import { goto } from '$app/navigation';
  
  async function deletePostBySlug(slug) {
    if (confirm("Are you sure you want to delete this post?")) {
      const { error } = await supabase.from("posts").delete().eq("slug", slug);
      goto("/admin")
    }
  }
</script>



<div class="container">
  <a class="btn btn-primary" href="/admin/new">New post</a>
    <div class="mx-auto">
      <div class="card" style="width: 50vw;">
        {#if posts.length > 0}
  <table class="table">
    <table>
      <thead class="thead-dark">
        <tr>
          <th>Title</th>
          <th>Date created</th>
          <th>Last update</th>
          <th>Actions</th>
          <th>Status</th>
        </tr>
      </thead>
      
      {#each posts as post}
        <tr>
          <td>{post.title}</td>
          <td>{dayjs(post.created_at).format("DD/MM/YYYY")}</td>
          <td>{dayjs(post.updated_at).format("DD/MM/YYYY hh:mm:ss")}</td>
          <td
            ><a href="/posts/{post.slug}">View live</a> |
            <a href="/admin/{post.slug}">Edit post</a> |
            <a data-sveltekit-reload href="/admin/" on:click={() => deletePostBySlug(post.slug)}>Delete post</a>
          </td>
          <td>
            {post.publishing_status}
          </td>
        </tr>
      {/each}
    </table>
  </table>

{:else}
<p>There are no posts to show, but you can create a <a href="/admin/new">New Post</a>!</p>
{/if}
      </div>
    </div>
  </div>


<style>

table {
  /* margin: 0 auto; */
}

</style>
