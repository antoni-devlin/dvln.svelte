<script>
  export let thumb, name, summary, link;
</script>

<div class="project">
  <img src={thumb} alt="" />
  <h2><a href={link}>{name}</a></h2>
  <p>{summary}.</p>
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
