<script></script>

<h1>Projects</h1>

<p>
  These are some things I've built or worked on recently, primarily in
  Javascript and Python.
</p>

<div class="flex-grid">
  <div class="col">
    <h2>DVLN.XYZ (this website!)</h2>
    <p>
      My personal website. It's built in Sveltekit, uses Supabase for
      authentication, database, and storage, Cloudflare for hosting, and Umami
      for analytics. It's still a work in progress and I try to write-up new
      features <a href="/posts">on my blog</a>.
    </p>
    <p>Tags: Javascript, Sveltekit, Cloudflare</p>
    <a href="https://www.github.com">See the code on Github</a>
  </div>
  <div class="col">
    <h2>Siteimprove bookmarklet</h2>
    <p>
      Tiny utility bookmarklet to quickly deeplink a user onto the Siteimprove
      report of GOV.UK page they're currently looking at. Avoids having to log
      into Siteimprove, and navigate to the report page using menus and url
      searches.
    </p>
    <a href="https://www.github.com">See the code on Github</a>
  </div>
  <div class="col">
    <h2>Whisper notes</h2>
    <p>
      A note transcription tool. It uses Whisper, OpenAI's general-purpose
      speech recognition model, to transcribe audio files. It allows the user to
      upload an audio file which is then sent to a python script for processing
      and transcription. The transcript is returned to the user in the browser.
    </p>
    <a href="https://www.github.com">See the code on Github</a>
  </div>
  <div class="col">
    <h2>Siteimprove bookmarklet</h2>
    <p>
      Tiny utility bookmarklet to quickly deeplink a user onto the Siteimprove
      report of GOV.UK page they're currently looking at. Avoids having to log
      into Siteimprove, and navigate to the report page using menus and url
      searches.
    </p>
    <a href="https://www.github.com">See the code on Github</a>
  </div>
  <div class="col">
    <h2>AI change note generator</h2>
    <p>
      A webapp for generating changes notes in the specific style Content
      Designers on GOV.UK need to use. It takes two versions of content, and
      using the Open AI API, gives the change notes back to the user.
    </p>
    <a href="https://www.github.com">See the code on Github</a>
  </div>
</div>

<style>
  .flex-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px; /* Adjust the gap between columns as needed */
  }

  .col {
    flex: 1 1 calc(25% - 16px); /* Ensure 4 equal columns on large screens */
    max-width: calc(25% - 16px);
    box-sizing: border-box;
  }

  @media (max-width: 1200px) {
    .col {
      flex: 1 1 calc(33.33% - 16px); /* 3 equal columns on medium screens */
      max-width: calc(33.33% - 16px);
    }
  }

  @media (max-width: 900px) {
    .col {
      flex: 1 1 calc(50% - 16px); /* 2 equal columns on smaller screens */
      max-width: calc(50% - 16px);
    }
  }

  @media (max-width: 600px) {
    .col {
      flex: 1 1 100%; /* 1 equal column on the smallest screens */
      max-width: 100%;
    }
  }
</style>
