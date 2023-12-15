/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.24.5",
  "@next-auth/prisma-adapter": "^1.0.7",
  "@auth/drizzle-adapter": "^0.3.6",

  // Basehub
  basehub: "^1.2.9",

  // TailwindCSS
  tailwindcss: "^3.3.5",
  autoprefixer: "^10.4.14",
  postcss: "^8.4.31",
  prettier: "^3.1.0",
  "prettier-plugin-tailwindcss": "^0.5.7",

  // creative stack
  three: "0.154.0",
  "@types/three": "^0.158.2",
  "@react-three/drei": "9.78.1",
  "@react-three/fiber": "8.13.0",
  leva: "^0.9.35",
  maath: "^0.10.4",
  "three-stdlib": "^2.28.7",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
