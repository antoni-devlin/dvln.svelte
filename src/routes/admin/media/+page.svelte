<script>
  export let data;
</script>

<h2>Media gallery</h2>
<ul>
  {#each data.bucketContents as imageUrl}
    <li><img src={imageUrl} alt="" /></li>
  {/each}
</ul>

<style>
  ul {
    --numcolumns: 2;
    --gap: 1em;
    --size: calc(100vw / var(--numcolumns));
    display: grid;
    grid-template-columns: repeat(var(--numcolumns), 1fr);

    grid-template-rows: auto;
    gap: var(--gap);
    align-items: stretch;

    list-style: none;
  }

  ul > li {
    display: block;
    height: calc(var(--size) - var(--gap));
  }

  ul > li img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
