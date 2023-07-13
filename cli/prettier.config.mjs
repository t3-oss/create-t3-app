import baseConfig from "../prettier.config.cjs";

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  arrowParens: "always",
  plugins: [
    await import("@ianvs/prettier-plugin-sort-imports"),
    "prettier-plugin-tailwindcss",
  ],
  tailwindConfig: "./template/extras/config/tailwind.config.ts",
  trailingComma: "es5",
};

export default config;
