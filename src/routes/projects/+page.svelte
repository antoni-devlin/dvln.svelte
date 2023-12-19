<script>
  import Project from "$lib/Project.svelte";

  let projects = [];
</script>

<h1>Projects</h1>

<ul>
  {#each projects as project (project.id)}
    <Project
      thumb={project.thumb}
      name={project.name}
      summary={project.summary}
      link={project.link}
    />
  {:else}
    No projects! Check out <a href="https://www.github.com/antoni-devlin"
      >my Github</a
    >!
  {/each}
</ul>

<style>
</style>
