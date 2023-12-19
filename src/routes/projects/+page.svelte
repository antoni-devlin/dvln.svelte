<script>
  import Project from "$lib/Project.svelte";

  let projects = [
    {
      name: "Project 1",
      thumb: "https://picsum.photos/960/540",
      summary: "Lorem ipsum",
      link: "https://www.github.com/antoni-devlin",
    },
    {
      name: "Project 2",
      thumb: "https://picsum.photos/960/540",
      summary:
        "Pellentesque venenatis purus nec tellus pharetra, id interdum dui ullamcorper. Donec commodo justo sapien, et facilisis elit malesuada in. Nullam non luctus eros, efficitur hendrerit metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut congue sodales enim. Phasellus sit amet nisl sapien. Curabitur ornare a nisi a sagittis. Sed justo neque, dapibus ut odio nec, viverra sagittis turpis.",
      link: "https://www.github.com/antoni-devlin",
    },
    {
      name: "Project 3",
      thumb: "https://picsum.photos/960/540",
      summary: "Lorem ipsum",
      link: "https://www.github.com/antoni-devlin",
    },
    {
      name: "Project 4",
      thumb: "https://picsum.photos/960/540",
      summary: "Lorem ipsum",
      link: "https://www.github.com/antoni-devlin",
    },
    {
      name: "Project 5",
      thumb: "https://picsum.photos/960/540",
      summary:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut congue sodales enim. Phasellus sit amet nisl sapien.",
      link: "https://www.github.com/antoni-devlin",
    },
    {
      name: "Project 6",
      thumb: "https://picsum.photos/960/540",
      summary: "Lorem ipsum",
      link: "https://www.github.com/antoni-devlin",
    },
    {
      name: "Project 7",
      thumb: "https://picsum.photos/960/540",
      summary: "Lorem ipsum",
      link: "https://www.github.com/antoni-devlin",
    },
  ];
</script>

<h1>Projects</h1>

<ul class="project-list">
  {#each projects as project}
    <Project
      thumb={project.thumb}
      name={project.name}
      summary={project.summary}
      link={project.link}
    />
  {:else}
    No projects! Check out <a
      href="https://https://www.github.com/antoni-devlin">my Github</a
    >!
  {/each}
</ul>

<style>
  .project-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 50px;
  }
</style>
