// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import prettierPluginTailwindcss from "prettier-plugin-tailwindcss";
import baseConfig from "../prettier.config.mjs";

/** @type {import("prettier").Config} */
export default {
  ...baseConfig,
  plugins: [...(baseConfig.plugins ?? []), prettierPluginTailwindcss],
};
