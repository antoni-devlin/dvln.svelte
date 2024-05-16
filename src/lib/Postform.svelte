<script>
  export let title = "",
    body = "",
    status,
    excerpt = "";
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";

  onMount(async () => {});
</script>

<form method="POST" use:enhance>
  <div class="form-floating m-3">
    <input
      type="text"
      class="form-control form-control-lg"
      id="name"
      name="title"
      value={title}
      placeholder="titlehere"
    />
    <label for="name" class="form-label">Title</label>
  </div>
  <div class="form-floating m-3">
    <input
      type="text"
      class="form-control form-control-sm"
      id="excerpt"
      name="excerpt"
      value={excerpt}
      placeholder="Excerpt..."
    />
    <label for="name" class="form-label">Excerpt</label>
  </div>
  <div class="m-3">
    <label for="status" class="form-label">Publishing status</label>
    <select
      bind:value={status}
      name="status"
      id="status-dropdown"
      class="form-select form-select-sm"
      aria-label={status}
    >
      <option value="draft">Draft</option>
      <option value="published">Published</option>
    </select>
  </div>

  <div data-mdb-input-init class="editor-wrapper form-outline m-3">
    <label class="form-label" for="textAreaExample">Body</label>
    <textarea
      class="form-control post-body"
      name="post-body"
      id="post-body"
      rows="10"
      value={body}
    ></textarea>
  </div>

  <button class="btn btn-primary m-3">Save</button>
</form>

<style>
  .editor-wrapper {
    margin-top: 20px;
  }
</style>
