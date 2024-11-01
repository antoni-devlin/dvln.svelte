<script>
  let post = $state(data);
  import Markdoc from "@markdoc/markdoc";
  import dayjs from "dayjs";
  let { data } = $props();
  post.created_at = dayjs(post.created_at).format("DD/MM/YYYY");
  function rendermd(source) {
    const config = {};
    const ast = Markdoc.parse(source);
    const content = Markdoc.transform(ast, config);

    const html = Markdoc.renderers.html(content);
    return html;
  }
</script>

<svelte:head>
  <title>DVLN – {post.title}</title>
</svelte:head>

<div class="container w-90 mt-5">
  <h2 class="display-2">{post.title}</h2>
  <small class="text-body-secondary">{post.created_at}</small>
  {@html rendermd(post.body)}
</div>

<style>
  .container {
    margin-bottom: 80px;
  }
</style>
