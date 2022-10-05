/** @type {import('prettier').Config} */
module.exports = {
  ...require("../.prettierrc.cjs"),
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindConfig: "./template/addons/tailwind/tailwind.config.cjs",
};
