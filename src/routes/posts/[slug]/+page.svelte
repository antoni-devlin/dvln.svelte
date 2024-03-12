<script>
  export let data;
  let post = data;

  import dayjs from "dayjs";
  post.created_at = dayjs(post.created_at).format("DD/MM/YYYY");
</script>

<div class="container w-90 mt-5">
  <h2 class="display-2">{post.title}</h2>
  <small class="text-body-secondary">{post.created_at}</small>
  <p class="pt-1">{@html post.body}</p>
</div>
