import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
const cfg = {
  customCssClasses: {
    blockquote: "post-blockquote",
  },
};

export function convertQuill(deltaBody) {
  try {
    JSON.stringify(JSON.parse(deltaBody));
    const converter = new QuillDeltaToHtmlConverter(
      JSON.parse(deltaBody).ops,
      cfg
    );

    const html = converter.convert();
    return html;
  } catch (e) {
    return deltaBody;
  }
}
