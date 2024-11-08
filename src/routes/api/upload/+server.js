import { json } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name}`;

    // Read file content as buffer
    const fileBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from("dvln.xyz-images")
      .upload(fileName, fileBuffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return json({ error: "Error uploading file" }, { status: 500 });
    }

    const { data } = supabase.storage
      .from("dvln.xyz-images")
      .getPublicUrl(fileName);

    const publicUrl = data.publicUrl;

    return json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return json({ error: "Server error" }, { status: 500 });
  }
}
