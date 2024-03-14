<script>
  import { enhance } from "$app/forms";
  export let form;
</script>

<div class="container-fluid w-50">
  <h2>Log in</h2>
  <form action="?/login" method="POST" use:enhance>
    <div class="form-floating mb-3">
      <input
        type="email"
        name="email"
        class="form-control"
        id="floatingInput"
        placeholder="name@example.com"
        value={form?.email ?? ""}
        required
      />
      <label for="floatingInput">Email address</label>
    </div>

    <div class="form-floating mb-3">
      <input
        type="password"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
        name="password"
      />
      <label for="floatingPassword">Password</label>
      <button class="btn btn-primary mt-3" type="submit">Login</button>
    </div>
  </form>
  {#if form?.invalid}<mark>{form?.message}!</mark>{/if}
</div>
