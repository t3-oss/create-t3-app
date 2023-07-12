// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import prettierPluginTailwindcss from "prettier-plugin-tailwindcss";

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  plugins: [...baseConfig.plugins, prettierPluginTailwindcss],
  tailwindConfig: "./template/extras/config/tailwind.config.ts",
  trailingComma: "es5",
};

module.exports = config;
