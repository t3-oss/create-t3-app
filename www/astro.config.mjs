import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
/**
 * @link https://astro.build/config
 */

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: `https://create.t3.gg`,
  markdown: {
    shikiConfig: {
      theme: "poimandres",
      wrap: true,
    },
  },
  integrations: [react(), tailwind(), mdx()],
});
