<script>
  let name = "Antoni";
</script>

<div class="container-fluid home-content w-60 text-center">
  <img
    class="w-10"
    src="https://cdn.jsdelivr.net/gh/antoni-devlin/dvln.svelte/src/images/headshot.jpeg"
    alt=""
  />
  <!-- TODO: Make this content editable from the admin area -->
  <h1 class="text-start">
    Hi, my name's Antoni <span class="pronouns">(he/him)</span>
  </h1>
  <h2 class="text-start">
    Someone called me a "Full-stack Content Designer" and I'm running with it.
  </h2>
  <p class="text-start">
    Currently in the <a
      data-umami-event="gds_click"
      href="https://www.gov.uk/government/organisations/government-digital-service/about"
      >Government Digital Service (GDS)</a
    >, working on
    <a href="https://gov.uk" data-umami-event="gov_uk_click">GOV.UK</a>.
  </p>
  <p class="text-start">
    Find me on <a
      data-umami-event="bluesky_click"
      href="https://bsky.app/profile/dvln.xyz">Bluesky (@dvln.xyz)</a
    >
    and
    <a data-umami-event="github_click" href="https://github.com/antoni-devlin"
      >Github (antoni-devlin)</a
    >.
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
