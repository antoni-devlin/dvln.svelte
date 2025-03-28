<script>
  export let error;
</script>

{#if error?.status === 401}
  <h1>Unauthorized</h1>
  <p>
    You do not have permission to access this page. Please <a href="/login"
      >log in</a
    > to continue.
  </p>
{:else if error?.status === 404}
  <h1>Page Not Found</h1>
  <p>The page you are looking for does not exist.</p>
{:else}
  <h1>An Error Occurred</h1>
  <p>{error?.message ?? "Something went wrong."}</p>
{/if}
