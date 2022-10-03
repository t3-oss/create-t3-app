import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

/**
 * @link https://astro.build/config
 */
export default defineConfig({
  site: `https://beta.create.t3.gg`,
  markdown: {
    shikiConfig: {
      theme: "material-palenight",
      wrap: true,
    },
  },
  integrations: [react(), tailwind()],
});
