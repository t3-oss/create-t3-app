const baseConfig = require("../.prettierrc.cjs");

console.log("baseConfig", baseConfig.plugins);

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  plugins: [...baseConfig.plugins, "prettier-plugin-tailwindcss"],
  tailwindConfig: "./template/extras/config/tailwind.config.ts",
  overrides: [
    {
      // Don't perform import sorting on these files
      files: [
        "template/extras/src/server/api/trpc/*",
        "src/utils/renderVersionWarning.ts",
      ],
      options: {
        plugins: [
          ...baseConfig.plugins.filter(
            (p) => p !== "@ianvs/prettier-plugin-sort-imports",
          ),
          "prettier-plugin-tailwindcss",
        ],
      },
    },
  ],
};

module.exports = config;
