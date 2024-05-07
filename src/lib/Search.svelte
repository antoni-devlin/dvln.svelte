<script>
</script>

<search>
  <form id="search-form" data-sveltekit-reload>
    <div id="search-field" class="input-group">
      <input
        type="search"
        name="search"
        class="form-control"
        placeholder="Search posts by title"
        aria-label="Search posts by title"
        aria-describedby="basic-addon2"
      />
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="submit">Search</button>
      </div>
    </div>
  </form>
</search>

<style>
  #search-form {
    width: 100%;
    padding-bottom: 10px;
  }

  #search-field {
    width: 50%;
    float: right;
  }
</style>
