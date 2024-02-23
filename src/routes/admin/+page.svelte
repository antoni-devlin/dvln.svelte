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
<a class="btn btn-primary" href="/admin/new">New post</a>
{#if posts.length > 0}
<table class="table table-striped">
  <thead class="">
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Date created</th>
      <th scope="col">Last update</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each posts as post}
        <tr>
          <td><a href="/admin/{post.slug}">{post.title}</a> {#if post.publishing_status == 'draft'}<span class="badge bg-secondary">Draft</span>{:else if post.publishing_status == 'published'}<span class="badge bg-success">Published</span>{/if}</td>
          <td>{dayjs(post.created_at).format("DD/MM/YYYY")}</td>
          <td>{dayjs(post.updated_at).format("DD/MM/YYYY hh:mm:ss")}</td>
          <td>
            <a class="btn btn-danger" role='button' href="/admin/" on:click={() => deletePostBySlug(post.slug)}>Delete</a>
          </td>
        </tr>
      {/each}
  </tbody>
</table>
{:else}
<p>There are no posts to show, but you can create a <a href="/admin/new">New Post</a>!</p>
{/if}

<style>
</style>
