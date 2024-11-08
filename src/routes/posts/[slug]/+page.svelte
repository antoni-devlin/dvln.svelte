<script>
  export let data;
  let post = data;
  import Markdoc from "@markdoc/markdoc";
  import dayjs from "dayjs";
  post.created_at = dayjs(post.created_at).format("DD/MM/YYYY");

  function rendermd(source) {
    const config = {
      nodes: {
        image: {
          render: "div",
          attributes: {
            src: { type: String, required: true },
            alt: { type: String },
            title: { type: String },
          },
          transform(node, config) {
            const attributes = node.transformAttributes(config);
            const { src, alt, title } = attributes;

            return new Markdoc.Tag(
              "div",
              { class: "markdoc-image-wrapper" },
              [
                new Markdoc.Tag("img", {
                  src,
                  alt: alt || "",
                  title: title || "",
                  class: "markdoc-image",
                }),
                alt
                  ? new Markdoc.Tag("span", { class: "image-caption" }, [alt])
                  : null,
              ].filter(Boolean)
            );
          },
        },
      },
    };

    const ast = Markdoc.parse(source);
    const content = Markdoc.transform(ast, config);
    return Markdoc.renderers.html(content);
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
