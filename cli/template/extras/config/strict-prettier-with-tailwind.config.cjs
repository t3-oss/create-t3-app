/** @type {import("prettier").Config} */
const config = {
  plugins: [
    require.resolve("@ianvs/prettier-plugin-sort-import"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};

module.exports = config;
