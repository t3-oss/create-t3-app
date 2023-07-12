import baseConfig from "../prettier.config.mjs";
import prettierPluginAstro from "prettier-plugin-astro";
import prettierPluginTailwindcss from "prettier-plugin-tailwindcss";

/** @type {import('prettier').Config} */
export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    prettierPluginAstro,
    prettierPluginTailwindcss, // MUST come last
  ],
  pluginSearchDirs: false,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  astroAllowShorthand: false,
  tailwindConfig: "./tailwind.config.ts",
};
