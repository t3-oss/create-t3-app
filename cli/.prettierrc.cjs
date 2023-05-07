/** @type {import('prettier').Config} */
const config = {
  ...require("../.prettierrc.cjs"),
  plugins: [
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  tailwindConfig: "./template/extras/config/tailwind.config.ts",
};

module.exports = config;
