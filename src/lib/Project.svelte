<script>
  let {
    thumb,
    name,
    summary,
    link,
    tags
  } = $props();
</script>

<div class="project">
  <img src={thumb} alt="" />
  <h2><a href={link}>{name}</a></h2>
  <p>{summary}.</p>
  {#if tags}
    <span
      >{#each tags as tag, i (tag)}
        {tag}{i !== tags.length - 1 ? "," : ""}
      {/each}
    </span>
  {/if}
</div>

<style>
  h2 {
    padding: 0;
    margin: 0;
  }

  img {
    width: 100%;
  }

  .project {
    min-width: 400px;
    max-width: 10vw;
  }
</style>
