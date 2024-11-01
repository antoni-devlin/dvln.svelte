<script>
  let { posts } = data;
  import dayjs from "dayjs";
  import { supabase } from "$lib/supabaseClient";
  import { PUBLIC_ENV } from "$env/static/public";
  let { data } = $props();
  let table;
  PUBLIC_ENV === "DEV" ? (table = "dev_posts") : (table = "posts");

  const published_posts = posts.filter(
    (post) => post.publishing_status === "published"
  );

  const draft_posts = posts.filter(
    (post) => post.publishing_status === "draft"
  );

  async function deletePostBySlug(slug) {
    if (
      confirm(`Are you sure you want to delete the post with slug ${slug}?`)
    ) {
      const { error } = await supabase
        .from(table)
        .update({ publishing_status: "deleted" })
        .eq("slug", slug);
      if (!error) {
        posts = posts.filter((post) => post.slug !== slug);
      }
    }
  }
</script>

<a class="btn btn-primary" href="/admin/new">New post</a>
{#if published_posts.length > 0}
  <h2>Published posts</h2>
  <table class="table table-striped">
    <thead class="">
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Excerpt</th>
        <th scope="col">Date created</th>
        <th scope="col">Last update</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each published_posts as post}
        <tr>
          <td class="title-cell"
            ><a class="post-title" href="/admin/{post.slug}">{post.title}</a>
            {#if post.publishing_status == "draft"}<span
                class="badge bg-secondary">Draft</span
              >{:else if post.publishing_status == "published"}<span
                class="badge bg-success">Published</span
              >{/if}</td
          >
          <td class="excerpt-cell">{post.excerpt}</td>
          <td class="created-cell"
            >{dayjs(post.created_at).format("DD/MM/YYYY")}</td
          >
          <td class="updated-cell"
            >{dayjs(post.updated_at).format("DD/MM/YYYY hh:mm:ss")}</td
          >
          <td class="actions-cell">
            <a
              class="btn btn-danger"
              role="button"
              href="/admin/"
              onclick={() => deletePostBySlug(post.slug)}>Delete</a
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p>
    There are no published posts to show, but you can create a <a
      href="/admin/new">New Post</a
    >!
  </p>
{/if}
{#if draft_posts.length > 0}
  <h2>Drafts</h2>
  <table class="table table-striped">
    <thead class="">
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Excerpt</th>
        <th scope="col">Date created</th>
        <th scope="col">Last update</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each draft_posts as post}
        <tr>
          <td class="title-cell"
            ><a class="post-title" href="/admin/{post.slug}">{post.title}</a>
            {#if post.publishing_status == "draft"}<span
                class="badge bg-secondary">Draft</span
              >{:else if post.publishing_status == "published"}<span
                class="badge bg-success">Published</span
              >{/if}</td
          >
          <td class="excerpt-cell">{post.excerpt}</td>
          <td class="created-cell"
            >{dayjs(post.created_at).format("DD/MM/YYYY")}</td
          >
          <td class="updated-cell"
            >{dayjs(post.updated_at).format("DD/MM/YYYY hh:mm:ss")}</td
          >
          <td class="actions-cell">
            <a
              class="btn btn-danger"
              role="button"
              href="/admin/"
              onclick={() => deletePostBySlug(post.slug)}>Delete</a
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p>
    There are no drafts to show, but you can create a <a href="/admin/new"
      >New Post</a
    >!
  </p>
{/if}

<style>
  .post-title {
    color: rgba(0, 112, 224, 1);
  }

  .post-title:hover {
    color: rgba(0, 112, 224, 0.5);
  }

  h2 {
    margin-top: 40px;
  }

  .title-cell {
    width: 15vw;
  }

  .excerpt-cell {
    width: 40vw;
  }
</style>
