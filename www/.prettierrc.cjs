/** @type {import('prettier').Config} */
module.exports = {
  ...require("../.prettierrc.cjs"),
  plugins: [
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
  tailwindConfig: "./tailwind.config.cjs",
};
