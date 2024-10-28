<script>
  let name = "Antoni";
</script>

<div class="container-fluid home-content w-60 text-center">
  <img
    class="w-10"
    src="https://cdn.jsdelivr.net/gh/antoni-devlin/dvln.svelte/src/images/headshot.jpeg"
    alt=""
  />
  <h1 class="text-start">
    Hi, my name's Antoni <span class="pronouns">(he/him)</span>
  </h1>
  <h2 class="text-start">
    Someone called me a "Full stack Content Designer" and I'm running with it.
  </h2>
  <p class="text-start">
    Currently in the <a
      href="https://www.gov.uk/government/organisations/government-digital-service/about"
      >Government Digital Service (GDS) data-umami-event="{gds_click}"</a
    >, working on
    <a href="https://gov.uk" data-umami-event={gov_uk_click}>GOV.UK</a> and AI.
  </p>
</div>

<style>
  .home-content > img {
    clip-path: circle(50% at 50% 50%);
  }
  .pronouns {
    color: rgba(0, 0, 0, 0.5);
    font-size: 20px;
  }

  h1,
  h2,
  img {
    margin-bottom: 20px;
  }
</style>
