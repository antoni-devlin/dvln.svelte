<script>
  import Project from "$lib/Project.svelte";

  let projects = [
    {
      name: "dvln.xyz",
      thumb: "https://picsum.photos/960/540",
      summary: "Lorem ipsum",
      link: "https://www.github.com/antoni-devlin/dvln.svelte",
      tags: ["Node", "Sveltekit", "CSS"],
    },
    {
      name: "Whisper Notes",
      thumb: "https://picsum.photos/960/540",
      summary: "Lorem ipsum",
      link: "https://github.com/antoni-devlin/whisper-notes",
      tags: ["Python", "Javascript", "Machine Learning"],
    },
    {
      name: "Link Explorer",
      thumb: "https://picsum.photos/960/540",
      summary: "Lorem ipsum",
      link: "https://github.com/antoni-devlin/link-explorer",
      tags: ["Screen Scraping", "Node"],
    },
    {
      name: "QR Scanner PWA",
      thumb: "https://picsum.photos/960/540",
      summary: "Lorem ipsum",
      link: "https://github.com/antoni-devlin/qr-scanner",
      tags: ["Web API", "Javascript"],
    },
    {
      name: "Paint Mixer",
      thumb: "https://picsum.photos/960/540",
      summary: "Lorem ipsum",
      link: "https://github.com/antoni-devlin/paint-mixer",
      tags: ["Javascript"],
    },
    {
      name: "DoPad",
      thumb: "https://picsum.photos/960/540",
      summary: "Lorem ipsum",
      link: "https://github.com/antoni-devlin/dopad",
      tags: ["Javascript"],
    },
    {
      name: "Siteimprove Bookmarklet",
      thumb: "https://picsum.photos/960/540",
      summary: "Lorem ipsum",
      link: "https://github.com/antoni-devlin/si-bookmarklet",
      tags: ["Javascript"],
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
      tags={project.tags}
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
