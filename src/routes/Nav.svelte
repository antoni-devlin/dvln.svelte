<script>
  let menuItems = [
    { linkText: "Home", url: "/", id: "0" },
    { linkText: "About", id: "1" },
    { linkText: "Past work", id: "2" },
    { linkText: "Projects", id: "3" },
    { linkText: "Posts", id: "4" },
    { linkText: "Admin", id: "5" },
  ];
  for (const item of menuItems) {
    if (item.linkText !== "Home") {
      item["url"] = `/${item.linkText.replaceAll(" ", "-").toLowerCase()}`;
    }
  }
</script>

<nav>
  <menu>
    {#each menuItems as link}
      <li><a href={link.url}>{link.linkText}</a></li>
      |
    {:else}
      No links!
    {/each}
  </menu>
</nav>

<style>
  li a {
    text-decoration: none;
  }

  menu {
    list-style: none;
  }

  li {
    display: inline-block;
    /* padding: 15px; */
    color: black;
  }

  a {
    padding: 15px;
  }

  a:hover {
    color: white;
    background: black;
  }
</style>
