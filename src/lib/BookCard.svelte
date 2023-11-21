<script>
  export let title, author, thumb, desc, infoLink;
</script>

<div class="book">
  <h2>{title}</h2>
  <h3>{author}</h3>
  <img src={thumb} alt="" />
  <p>{desc} <a href={infoLink}>Read more</a>.</p>
</div>

<style>
  h2 {
    padding: 0;
    margin: 0;
  }

  h3 {
    font-size: 90%;
    padding: 0;
    margin: 0;
  }
</style>
