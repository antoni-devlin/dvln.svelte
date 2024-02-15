<script>
export let title = "", body = "", status
import { enhance } from "$app/forms";
import {  onMount } from 'svelte'

let editor;
	
	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "ordered" }],
		[{ align: [] }],
		["clean"]
	];
	
  onMount(async () => {
		const { default: Quill } = await import("quill");
	
    let quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: "snow",
      placeholder: "Write your story..."
    });
  });

</script>

<div class="editor-wrapper">
  <div bind:this={editor} />
</div>

<form method="POST" use:enhance>
    <label>
      Title
      <br />
      <input name="title" type="text" value={title} />
    </label>
    <label for="status"><br /><br />Published status:
      <br />
      <select bind:value={status} name="status" id="status-dropdown">
        <option value="false">Draft</option>
        <option value="true">Published</option>
      </select>
    </label>
    <br /><br />
    <label>
      Body
      <br />
      <textarea name="body" value={body} rows="40" cols="100" />
    </label>
    <br /><br />
    <button>Save post</button>
  </form>

  <style>
    @import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
  </style>