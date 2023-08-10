import baseConfig from "../prettier.config.mjs";

/**
 * @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options &
 *       import("@ianvs/prettier-plugin-sort-imports").PluginConfig}
 */
const config = {
  ...baseConfig,
  arrowParens: "always",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindConfig: "./template/extras/config/tailwind.config.ts",
  trailingComma: "es5",
};

export default config;
