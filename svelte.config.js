// Default "auto" adapter
// import adapter from "@sveltejs/adapter-auto";

// // Static adapter
// import adapter from "@sveltejs/adapter-static";

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
//   kit: {
//     adapter: adapter({
//       pages: "build",
//       assets: "build",
//       fallback: undefined,
//       precompress: false,
//       strict: true,
//     }),
//   },
// };

// Default config

import adapter from "@sveltejs/adapter-auto";
/** @type {import('@sveltejs/kit').Config} */ const config = {
  kit: { adapter: adapter(),
    csrf: {
      checkOrigin: false
} },
};

export default config;
