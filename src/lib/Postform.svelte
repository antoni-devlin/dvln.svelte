<script>
  export let title = "",
    body = "",
    status;
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";

  let editor;

  // Define your toolbar options
  export let toolbarOptions = [
    [{ header: 1 }, { header: 2 }, "blockquote", "link", "code"],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "checked" }], // List options dropdown
    [{ align: [] }],
    [{ pre: "code-block" }], // Button for preformatted text
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

    // Define a custom format for <pre>
    const CodeBlock = Quill.import("formats/code-block");

    class PreFormattedText extends CodeBlock {
      static create(value) {
        const node = super.create(value);
        node.setAttribute("data-language", ""); // Optionally, you can set the language attribute for syntax highlighting
        return node;
      }
    }

    Quill.register(PreFormattedText);

    // Add an icon for the pre button
    const icons = Quill.import("ui/icons");
    icons["pre"] =
      '<svg viewBox="0 0 18 18"><rect class="ql-stroke" height="12" width="14" x="2" y="3"></rect><rect class="ql-fill" height="12" width="12" x="3" y="4"></rect></svg>';

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
