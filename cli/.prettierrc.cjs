const baseConfig = require("../.prettierrc.cjs");

const cliPlugins = [...baseConfig.plugins, "prettier-plugin-tailwindcss"];

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  plugins: cliPlugins,
  tailwindConfig: "./template/extras/config/tailwind.config.ts",
  overrides: [
    {
      // Don't perform import sorting on these files
      files: [
        "template/extras/src/server/api/trpc/*",
        "src/utils/renderVersionWarning.ts",
      ],
      options: {
        plugins: baseConfig.plugins.filter(
          (p) => p !== "@ianvs/prettier-plugin-sort-imports",
        ),
      },
    },
  ],
};

module.exports = config;
