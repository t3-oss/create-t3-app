/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.22.1",
  "@next-auth/prisma-adapter": "^1.0.7",

  // Prisma
  prisma: "^5.0.0",
  "@prisma/client": "^5.0.0",

  // TailwindCSS
  tailwindcss: "^3.3.3",
  autoprefixer: "^10.4.14",
  postcss: "^8.4.26",
  prettier: "^2.8.8",
  "prettier-plugin-tailwindcss": "^0.2.8",
  "@types/prettier": "^2.7.2",

  // tRPC
  "@trpc/client": "^10.34.0",
  "@trpc/server": "^10.34.0",
  "@trpc/react-query": "^10.34.0",
  "@trpc/next": "^10.34.0",
  "@tanstack/react-query": "^4.29.25",
  superjson: "^1.13.1",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
