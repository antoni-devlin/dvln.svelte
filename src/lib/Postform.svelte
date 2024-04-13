<script>
  export let title = "",
    body = "",
    status;
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";

  let editor;

  export let toolbarOptions = [
    [{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "ordered" }],
    [{ align: [] }],
    ["clean"],
  ];

  onMount(async () => {
    const { default: Quill } = await import("quill");

    let quillEditor = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
      placeholder: "Write your story...",
    });

    // quillEditor.setContents([{ insert: body }]);
    quillEditor.root.innerHTML = "";
    quillEditor.clipboard.dangerouslyPasteHTML(0, body);
    // quillEditor.setText([{ insert: body }]);
    quillEditor.on("text-change", function (delta, oldDelta, source) {
      document.getElementById("hiddenBody").value = quillEditor.root.innerHTML;
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
      value={title}
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
