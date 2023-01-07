/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.18.7",
  "@next-auth/prisma-adapter": "^1.0.5",

  // Prisma
  prisma: "^4.8.0",
  "@prisma/client": "^4.8.0",

  // TailwindCSS
  tailwindcss: "^3.2.0",
  autoprefixer: "^10.4.7",
  postcss: "^8.4.14",
  prettier: "^2.8.1",
  "prettier-plugin-tailwindcss": "^0.2.1",
  "@types/prettier": "^2.7.2",

  // tRPC
  "@trpc/client": "^10.7.0",
  "@trpc/server": "^10.7.0",
  "@trpc/react-query": "^10.7.0",
  "@trpc/next": "^10.7.0",
  "@tanstack/react-query": "^4.20.0",
  superjson: "1.9.1",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
