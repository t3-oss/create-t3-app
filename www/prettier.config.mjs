import baseConfig from "../prettier.config.mjs";

/** @type {import('prettier').Config} */
export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    require.resolve("prettier-plugin-astro"),
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
