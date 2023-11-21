<script>

  let projects = [
    { name: "Project 1", language: "Node", id: 0 },
    { name: "Project 2", language: "Python", id: 1 },
    { name: "Project 3", language: "Ruby", id: 2 },
  ];

// for (const item of projects) {
//     item["slug"] = `/projects/${item.linkText.replaceAll(" ", "-").toLowerCase()}`;
//   }

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