import { type Config } from "prettier";

export default {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
} satisfies Config;
