// import adapter from "@sveltejs/adapter-auto";
import adapter from "@sveltejs/adapter-cloudflare";
// import node from "@sveltejs/adapter-node";

// const config = {
// 	kit: {
// 		adapter: node()
// 	}
// };

const config = {
  kit: {
    adapter: adapter(),
    // ... truncated ...
  },
};

// const config = {
//   kit: {
//     adapter: adapter(),
//     csrf: {
//       checkOrigin: false,
//     },
//   },
// };

export default config;
