/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("@ianvs/prettier-plugin-sort-import")],
};

module.exports = config;
