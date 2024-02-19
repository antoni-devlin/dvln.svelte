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
  <div class="row">
    <div class="col-sm-1">
      
    </div>
    <div class="col-lg-auto">
      <div class="card" style="width: 50vw;">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
    <div class="col-sm-1">
      
    </div>
  </div>
</div>

{#if posts.length > 0}
<div class="post-list-wrapper container">
  <table class="table">
    <table>
      <tr>
        <th>Title</th>
        <th>Date created</th>
        <th>Last update</th>
        <th>Actions</th>
        <th>Status</th>
      </tr>
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
</div>

{:else}
<p>There are no posts to show, but you can create a <a href="/admin/new">New Post</a>!</p>
{/if}

<style>
/* 
.post-list-wrapper {
  width: 50vw;
  margin: 0 auto;
}

table {
  margin: 0 auto;
}

  th, td {
  border: 1px solid;
  padding: 10px;
} */
</style>
