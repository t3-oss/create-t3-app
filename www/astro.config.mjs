import { defineConfig } from "astro/config";
//@ts-lint-ignore

import preact from "@astrojs/preact";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config

export default defineConfig({
  site: `https://create.t3.gg`,
  integrations: [
    preact(), // Enable React for the Algolia search component.
    react(),
    tailwind(),
    image(),
    robotsTxt({
      transform(content) {
        return `# Algolia-Crawler-Verif: 013A1A14AB9EE32B\n\n${content}`;
      },
    }),
  ],
  vite: {
    ssr: {
      external: ["svgo", "tiny-glob", "image-size", "sharp", "preact"],
    },
  },
  experimental: {
    integrations: true,
  },
});
