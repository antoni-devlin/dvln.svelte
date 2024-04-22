import adapter from "@sveltejs/adapter-cloudflare";

const config = {
  kit: {
    adapter: adapter(),
    csrf: {
      checkOrigin: process.env.PUBLIC_ENV === "DEV" ? false : true,
    },
  },
};

export default config;
