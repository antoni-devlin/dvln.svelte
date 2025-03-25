import { BLUESKY_USERNAME, BLUESKY_APP_PASSWORD } from "$env/static/private";

export async function load() {
  const BLUESKY_API_BASE = "https://bsky.social/xrpc";
  const userDid = BLUESKY_USERNAME;

  try {
    //Authenticate with Bluesky
    const authResponse = await fetch(
      `${BLUESKY_API_BASE}/com.atproto.server.createSession`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: BLUESKY_USERNAME,
          password: BLUESKY_APP_PASSWORD,
        }),
      }
    );

    if (!authResponse.ok) {
      throw new Error(`Authentication failed: ${authResponse.status}`);
    }

    const authData = await authResponse.json();
    const { accessJwt, did } = authData;

    //Make a request to get the user's feed
    const params = new URLSearchParams({
      actor: userDid,
      limit: 70,
    });

    const feedResponse = await fetch(
      `${BLUESKY_API_BASE}/app.bsky.feed.getAuthorFeed?${params}`,
      {
        headers: {
          Authorization: `Bearer ${accessJwt}`,
        },
      }
    );

    if (!feedResponse.ok) {
      throw new Error(`API request failed: ${feedResponse.status}`);
    }

    const data = await feedResponse.json();

    // Filter posts that:
    // 1. Contain "#photography" hashtag
    // 2. Contain images
    // 3. Are not reposts
    const photographyPosts = data.feed.filter((item) => {
      // Skip reposts
      if (item.reason) {
        return false;
      }

      const post = item.post;
      const text = post.record.text || "";

      // Check for #photography hashtag
      const hasPhotographyTag = text.toLowerCase().includes("#photography");

      // Check for images
      const hasImages =
        post.embed && post.embed.images && post.embed.images.length > 0;

      // Extract alt text if available (new code)
      if (hasImages && post.embed.images) {
        post.embed.images.forEach((img) => {
          // Alt text is available in the 'alt' property if it exists
          img.altText = img.alt || "";
        });
      }

      return hasPhotographyTag && hasImages;
    });

    return {
      photographyPosts,
    };
  } catch (error) {
    console.error("Error fetching Bluesky data:", error);
    return {
      error: error.message,
      photographyPosts: [],
    };
  }
}
