import baseConfig from "../prettier.config.cjs";

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss", // MUST come last
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  astroAllowShorthand: false,
  tailwindConfig: "./tailwind.config.ts",
};

export default config;
