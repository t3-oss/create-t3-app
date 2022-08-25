import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact(), // Enable React for the Algolia search component.
    react(),
    tailwind(),
    image(),
  ],
  site: `https://create.t3.gg`,
});
