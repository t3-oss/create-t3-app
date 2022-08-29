import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

/**
 * @link https://astro.build/config
 */
export default defineConfig({
  site: `https://create.t3.gg`,
  integrations: [react(), tailwind()],
});
