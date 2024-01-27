<script>
  export let data;
  const { posts } = data;
  import dayjs from "dayjs";
</script>

<table>
  <table>
    <tr>
      <th>Title</th>
      <th>Date created</th>
      <th>Actions</th>
    </tr>
    {#each posts as post}
      <tr>
        <td>{post.title}</td>
        <td>{dayjs(post.created_at).format("DD/MM/YYYY")}</td>
        <td
          ><a href="/posts/{post.slug}">View live</a> |
          <a href="/admin/{post.slug}">Edit post</a></td
        >
      </tr>
    {/each}
  </table>
</table>
