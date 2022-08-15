/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,md,mdx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        "dark-background": "#1f2937",
        "brand-primary": "#e8ddff",
      },
    },
  },

  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography") /*, require("tailwind-scrollbar")*/,
  ],
};
