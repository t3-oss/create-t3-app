import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";

import remarkCodeTitles from "remark-code-titles";

/**
 * @link https://astro.build/config
 */
export default defineConfig({
  site: `https://beta.create.t3.gg`,
  markdown: {
    remarkPlugins: [remarkCodeTitles],
    shikiConfig: {
      theme: "rose-pine",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
  integrations: [
    react(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
