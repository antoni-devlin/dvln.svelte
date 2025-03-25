<script>
  export let data;

  const { photographyPosts, error } = data;

  // Variables to track modal state
  let isModalOpen = false;
  let currentModalImage = null;
  let currentModalCaption = null;
  let currentModalAuthor = null;
  let currentModalAltText = null;

  // Function to handle image click for expanded view
  function handleImageClick(post, image) {
    currentModalImage = image.fullsize;
    currentModalCaption = post.post.record.text;
    currentModalAuthor = post.post.author.handle;
    currentModalAltText =
      image.altText || `Photo by @${post.post.author.handle}`;
    isModalOpen = true;
    umami.track("Photo clicked");
  }

  // Function to close the modal
  function closeModal() {
    isModalOpen = false;
    currentModalImage = null;
  }

  // Close modal when clicking outside the image
  function handleModalClick(event) {
    if (event.target.classList.contains("image-modal")) {
      closeModal();
    }
  }

  // Handle keyboard events for accessibility
  function handleKeydown(event) {
    if (isModalOpen && event.key === "Escape") {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="photography-feed">
  <h1>Photography</h1>
  <p>
    This page automatically displays any photos I've taken and posted to bluesky
    (<a href="https://bsky.app/profile/dvln.xyz">@dvln.xyz</a>) with the
    <a href="https://bsky.app/hashtag/photography">#photography</a> tag.
  </p>
  <!-- <div class="error">
    <p>
      ¯\_(ツ)_/¯ This page is still a work in progress at the moment, and isn't
      reliably displaying all images from my bluesky feed.
    </p>
  </div> -->

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
          <div class="grid-item" on:click={() => handleImageClick(post, image)}>
            <img
              src={image.fullsize}
              alt={image.altText || `Photo by @${post.post.author.handle}`}
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

  <!-- Image Modal -->
  {#if isModalOpen}
    <div class="image-modal" on:click={handleModalClick}>
      <div class="modal-container">
        <span class="close-modal" on:click={closeModal}>&times;</span>
        <img
          src={currentModalImage}
          alt={currentModalAltText}
          class="modal-content"
        />
        {#if currentModalCaption}
          <div class="modal-caption">
            <span class="modal-author">@{currentModalAuthor}</span>
            <p>{currentModalCaption}</p>
          </div>
        {/if}
      </div>
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

  /* Modal styles */
  .image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
  }

  .modal-container {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    flex-direction: column;
  }

  .close-modal {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 35px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1001;
  }

  .modal-content {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border: 2px solid white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  }

  .modal-caption {
    margin-top: 15px;
    color: white;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
  }

  .modal-author {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
</style>
