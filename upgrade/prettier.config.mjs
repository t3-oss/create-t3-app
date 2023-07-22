import baseConfig from "../prettier.config.mjs";

/** @type {import("prettier").Config} */
const config = {
  ...baseConfig,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
