/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.24.7",
  "@auth/prisma-adapter": "^1.6.0",
  "@auth/drizzle-adapter": "^1.1.0",

  // Prisma
  prisma: "^5.14.0",
  "@prisma/client": "^5.14.0",
  "@prisma/adapter-planetscale": "^5.14.0",

  // Drizzle
  "drizzle-orm": "^0.30.10",
  "drizzle-kit": "^0.21.4",
  "eslint-plugin-drizzle": "^0.2.3",
  mysql2: "^3.9.7",
  "@planetscale/database": "^1.18.0",
  postgres: "^3.4.4",
  pg: "^8.11.3",
  "@libsql/client": "^0.6.0",

  // TailwindCSS
  tailwindcss: "^3.4.3",
  postcss: "^8.4.34",
  prettier: "^3.2.5",
  "prettier-plugin-tailwindcss": "^0.5.14",

  // tRPC
  "@trpc/client": "next",
  "@trpc/server": "next",
  "@trpc/react-query": "next",
  "@trpc/next": "next",
  "@tanstack/react-query": "^5.39.0",
  superjson: "^2.2.1",
  "server-only": "^0.0.1",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
