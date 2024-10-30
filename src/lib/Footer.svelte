<script>
  /**
   * @typedef {Object} Props
   * @property {string} [content]
   * @property {string} [link]
   * @property {string} [linkText]
   */

  /** @type {Props} */
  let { content = "", link = "", linkText = "" } = $props();
</script>

<footer class="footer mt-auto py-3 bg-light">
  <div class="container">
    <span class="text-muted">{content} | <a href="/{link}">{linkText}</a></span>
  </div>
</footer>

<style>
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: red;
    color: white;
    text-align: center;
    font-size: 10px;
  }

  a {
    color: rgb(0, 0, 238);
  }

  a:hover {
    color: rgba(0, 0, 238, 0.8);
  }
</style>
