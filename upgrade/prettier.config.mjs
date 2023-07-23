import baseConfig from "../prettier.config.mjs";

/**
 * @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options &
 *       import("@ianvs/prettier-plugin-sort-imports").PluginConfig}
 */
const config = {
  ...baseConfig,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
