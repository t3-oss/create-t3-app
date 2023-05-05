/** @type {import("prettier").Config} */
const config = {
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("@ianvs/prettier-plugin-sort-import"),
  ],
};

module.exports = config;
