/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  arrowParens: 'alway',
  plugins: [...baseConfig.plugins, 'prettier-plugin-tailwindcss'],
  tailwindConfig: './template/extras/config/tailwind.config.ts',
  trailingComma: 'es5',
};

export default config;
