/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],

  theme: {
    extend: {
      colors: {
        "dark-background": "#1f2937",
        "brand-primary": "#e8ddff",
      },
    },
  },

  darkMode: "class",
  plugins: [require("@tailwindcss/typography"), require("tailwind-scrollbar")],
};
