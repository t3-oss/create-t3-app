/** @type {import('prettier').Config} */
const config = {
  ...require("../.prettierrc.cjs"),
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindConfig: "./template/extras/config/tailwind.config.cjs",
};

module.exports = config;
