// eslint-disable-next-line @typescript-eslint/no-var-requires
import baseConfig from "../prettier.config.mjs";

/** @type {import("prettier").Config} */
export default {
  ...baseConfig,
  plugins: [
    ...(baseConfig.plugins ?? []),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};
