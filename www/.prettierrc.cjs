const baseConfig = require("../.prettierrc.cjs");
/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    require.resolve("prettier-plugin-astro"),
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"), // MUST come last
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
