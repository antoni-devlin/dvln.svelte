<script>
  let loading = $state(false);
  let tooShort = $state(false);
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";
  /**
   * @typedef {Object} Props
   * @property {string} [title]
   * @property {string} [body]
   * @property {any} status
   * @property {string} [excerpt]
   */

  /** @type {Props} */
  let {
    title = "",
    body = "",
    status = $bindable(),
    excerpt = $bindable("")
  } = $props();

  async function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const imageUrl = data.url;
      insertImageAtCursor(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  function insertImageAtCursor(url) {
    const textarea = document.getElementById("post-body");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    textarea.value = `${before}![Image](${url})${after}`;

    // Update body binding
    body = textarea.value;
  }

  async function generateExcerpt() {
    const content = document.getElementById("post-body").value;
    if (content.length < 300) {
      tooShort = true;
      throw new Error("Post not long enough to summarise - write more!");
    }

    try {
      const requestBody = { userInput: content };
      loading = true;
      tooShort = false;
      const response = await fetch(
        "https://generate-excerpt.antoni-devlin.workers.dev/",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Await the JSON parsing
      excerpt = data.response; // Update excerpt variable with the response
      return data; // parses JSON response into native JavaScript objects
    } catch (error) {
      console.error("Error generating excerpt:", error);
    } finally {
      loading = false;
    }
  }

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
  <div class="input-group m-3">
    <!-- Input field -->
    <div class="form-floating">
      <input
        type="text"
        class="form-control"
        id="excerpt"
        name="excerpt"
        value={excerpt}
        placeholder="Excerpt..."
      />
      <label for="excerpt" class="form-label">Excerpt</label>
    </div>

    <!-- Button -->
    {#if loading}
      <button
        class="btn btn-outline-secondary"
        type="button"
        id="generate-excerpt-button"
        disabled
      >
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="false"
        ></span>
        Loading...
      </button>
    {:else}
      <button
        class="btn btn-outline-secondary"
        type="button"
        id="generate-excerpt-button"
        onclick={generateExcerpt}
      >
        Generate excerpt
      </button>
    {/if}
  </div>
  {#if tooShort}
    <div class="alert alert-warning m-3" role="alert">
      Post not long enough to summarise. Write more!
    </div>
  {/if}

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

  <div class="m-3">
    <label for="image-upload" class="form-label">Upload Image</label>
    <input
      type="file"
      class="form-control"
      id="image-upload"
      accept="image/*"
      on:change={uploadImage}
    />
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
