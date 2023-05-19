const baseConfig = require("../.prettierrc.cjs");
/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    "prettier-plugin-astro",
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss", // MUST come last
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

module.exports = config;
