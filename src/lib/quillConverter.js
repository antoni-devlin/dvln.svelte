import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
const cfg = {};

export function convertQuill(deltaBody) {
  try {
    JSON.stringify(JSON.parse(deltaBody));
    const converter = new QuillDeltaToHtmlConverter(
      JSON.parse(deltaBody).ops,
      cfg
    );

    const html = converter.convert();
    console.log("is json, converting!");
    return html;
  } catch (e) {
    console.log("not json, so no converting!");
    return deltaBody;
  }
}
