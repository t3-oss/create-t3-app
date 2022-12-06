/** @type {import('prettier').Config} */
module.exports = {
  ...require("../.prettierrc.cjs"),
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindConfig: "./template/extras/config/tailwind.config.cjs",
};
