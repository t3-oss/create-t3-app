import baseConfig from "../prettier.config.mjs";

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  arrowParens: "always",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindConfig: "./template/extras/config/tailwind.config.ts",
  trailingComma: "es5",
  overrides: [
    {
      files: [
        "**/*postcss.config.cjs",
        "cli/template/extras/config/prettier.config.mjs",
      ],
      options: {
        plugins: [],
      },
    },
  ],
};

export default config;
