<script>
  export let data;

  const { photographyPosts, error } = data;

  // Function to handle image click for expanded view (optional)
  function handleImageClick(post) {
    // You could implement a modal or expanded view here
    console.log("Image clicked:", post);
  }
</script>

<div class="photography-feed">
  <h1>Photography Posts</h1>

  {#if error}
    <div class="error">
      <p>Error loading posts: {error}</p>
    </div>
  {:else if photographyPosts.length === 0}
    <p>No photography posts found.</p>
  {:else}
    <!-- Instagram-style grid layout -->
    <div class="instagram-grid">
      {#each photographyPosts as post}
        {#each post.post.embed.images as image, imageIndex}
          <!-- Each image becomes a grid item -->
          <div
            class="grid-item"
            on:click={() => handleImageClick(post)}
            on:keydown={(e) => e.key === "Enter" && handleImageClick(post)}
            tabindex="0"
          >
            <img
              src={image.fullsize}
              alt={`Photo by @${post.post.author.handle}`}
              loading="lazy"
              class="grid-image"
            />

            <!-- Hover overlay with info -->
            <div class="overlay">
              <div class="overlay-content">
                <div class="author-info">
                  {#if post.post.author.avatar}
                    <img
                      src={post.post.author.avatar}
                      alt="Profile"
                      class="avatar"
                    />
                  {/if}
                  <span class="author-name">@{post.post.author.handle}</span>
                </div>

                <!-- Show truncated text as a caption -->
                {#if post.post.record.text}
                  <p class="caption">
                    {post.post.record.text.length > 60
                      ? post.post.record.text.substring(0, 60) + "..."
                      : post.post.record.text}
                  </p>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      {/each}
    </div>
  {/if}
</div>

<style>
  .photography-feed {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    margin-bottom: 20px;
    text-align: center;
  }

  /* Instagram-style grid */
  .instagram-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }

  @media (max-width: 768px) {
    .instagram-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .instagram-grid {
      grid-template-columns: 1fr;
    }
  }

  .grid-item {
    position: relative;
    aspect-ratio: 1/1;
    overflow: hidden;
    cursor: pointer;
  }

  .grid-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  /* Hover effects */
  .grid-item:hover .grid-image {
    transform: scale(1.05);
  }

  .grid-item:hover .overlay {
    opacity: 1;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 15px;
    opacity: 0;
    transition: opacity 0.3s ease;
    color: white;
  }

  .author-info {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
    border: 1px solid white;
  }

  .author-name {
    font-weight: bold;
    font-size: 0.9rem;
  }

  .caption {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.4;
  }

  .error {
    color: red;
    padding: 10px;
    border: 1px solid red;
    border-radius: 4px;
    background: rgba(255, 0, 0, 0.05);
    margin-bottom: 20px;
  }
</style>
