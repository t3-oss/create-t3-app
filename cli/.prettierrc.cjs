const baseConfig = require("../.prettierrc.cjs");

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    require.resolve("prettier-plugin-tailwindcss"),
  ],
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
