// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require("../.prettierrc.cjs");

/** @type {import("prettier").Config} */
const config = {
  ...baseConfig,
  plugins: [
    ...(baseConfig.plugins ?? []),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};

module.exports = config;
