/** @type {import('prettier').Config} */
const config = {
  ...require("../.prettierrc.cjs"),
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
  ],
  tailwindConfig: "./template/extras/config/tailwind.config.ts",
};

module.exports = config;
