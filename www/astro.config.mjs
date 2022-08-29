import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";

/**
 * @link https://astro.build/config
 */
export default defineConfig({
  site: `https://create.t3.gg`,
  integrations: [
    react(),
    tailwind(),
    robotsTxt({
      transform(content) {
        return `# Algolia-Crawler-Verif: 013A1A14AB9EE32B\n\n${content}`;
      },
    }),
  ],
  experimental: {
    integrations: true,
  },
});
