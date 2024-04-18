<script>
  export let title = "",
    body = "",
    status;
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";
  import Delta from "quill-delta";

  let editor;

  export let toolbarOptions = [
    [{ header: 1 }, { header: 2 }, "blockquote", "link"],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "ordered" }],
    [{ align: [] }],
    ["clean"],
  ];

  onMount(async () => {
    const { default: Quill } = await import("quill");

    let Block = Quill.import("blots/block");
    class CustomBlockQuote extends Block {
      static create(value) {
        let node = super.create(value);
        node.classList.add("post-blockquote"); // Add the desired class
        return node;
      }
    }
    CustomBlockQuote.blotName = "blockquote";
    CustomBlockQuote.tagName = "blockquote";

    Quill.register(CustomBlockQuote, true);

    let quillEditor = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
      placeholder: "Compose your post...",
    });

    if (body) {
      try {
        const delta = JSON.parse(body); // Parse the existing post content from JSON
        quillEditor.setContents(delta); // Set the parsed delta as the editor content
      } catch (error) {
        console.error("Error parsing post content:", error);
      }
    }

    quillEditor.on("text-change", function (delta, oldDelta, source) {
      body = JSON.stringify(quillEditor.getContents());
    });
  });
</script>

<form method="POST" use:enhance>
  <div class="form-floating m-3">
    <input
      type="text"
      class="form-control form-control-lg"
      id="name"
      name="title"
      bind:value={title}
      placeholder="titlehere"
    />
    <label for="name" class="form-label">Title</label>
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

  <div class="editor-wrapper m-3">
    <div id="editor" bind:this={editor} />
  </div>
  <label>
    <textarea hidden name="hiddenBody" id="hiddenBody" value={body} />
  </label>
  <button class="btn btn-primary m-3">Save</button>
</form>

<style>
  @import "https://cdn.quilljs.com/1.3.6/quill.snow.css";

  .editor-wrapper {
    margin-top: 20px;
  }
</style>
