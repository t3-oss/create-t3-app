/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.22.1",
  "@next-auth/prisma-adapter": "^1.0.5",

  // Prisma
  prisma: "^4.14.0",
  "@prisma/client": "^4.14.0",

  // Drizzle
  "drizzle-orm": "^0.26.3",
  "drizzle-kit": "^0.18.1",
  // REVIEW: Is it fine including pscale by default?
  "@planetscale/database": "^1.7.0",

  // TailwindCSS
  tailwindcss: "^3.3.0",
  autoprefixer: "^10.4.14",
  postcss: "^8.4.21",
  prettier: "^2.8.8",
  "prettier-plugin-tailwindcss": "^0.2.8",
  "@types/prettier": "^2.7.2",

  // tRPC
  "@trpc/client": "^10.26.0",
  "@trpc/server": "^10.26.0",
  "@trpc/react-query": "^10.26.0",
  "@trpc/next": "^10.26.0",
  "@tanstack/react-query": "^4.29.7",
  superjson: "1.12.2",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
