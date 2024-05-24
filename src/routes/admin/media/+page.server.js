import { supabase } from "$lib/supabaseClient";

export const load = async () => {
  // Fetching the list of files from the specified bucket
  const { data, error } = await supabase.storage
    .from("dvln.xyz-images")
    .list("post-images", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  // Logging the bucket contents or error
  if (error) {
    console.error("Error fetching bucket contents:", error);
    return { bucketContents: [], error: error.message };
  }

  console.log("Success! Bucket contents:", data);
  return { bucketContents: data };
};

export const prerender = false;
