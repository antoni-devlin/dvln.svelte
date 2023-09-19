<script>

  let projects = [
  {name: "Project 1", slug: null, language: "Node", id: 0},
  {name: "Project 2", slug: null, language: "Python", id: 1},
  {name: "Project 3", slug: null, language: "Rubyh", id: 2}
];


</script>

<h1>Projects</h1>

<ul>
  {#each projects as project (project.id)}
  <li><a href="/projects/{project.slug}">{project.name} ({project.language})</a></li>
  {:else}
  No projects!
  {/each}
</ul>

<style>

</style>