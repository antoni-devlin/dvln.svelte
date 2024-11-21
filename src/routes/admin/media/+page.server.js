import { supabase } from "$lib/supabaseClient";

export const load = async () => {
  // Fetching the list of files from the specified bucket
  const { data, error } = await supabase.storage
    .from("dvln.xyz-images")
    .list("post_images", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  // Logging the bucket contents or error
  if (error) {
    console.error("Error fetching bucket contents:", error);
    return { bucketContents: [], error: error.message };
  }

  // Generate public URLs for the images
  const publicUrls = data.map((file) => {
    const { data: urlData, error: urlError } = supabase.storage
      .from("dvln.xyz-images")
      .getPublicUrl(`post_images/${file.name}`);

    return urlData.publicUrl;
  });

  // console.log("Success! Bucket contents:", publicUrls);
  return { bucketContents: publicUrls };
};

export const prerender = false;
