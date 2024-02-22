/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.24.5",
  "@auth/prisma-adapter": "^1.4.0",
  "@auth/drizzle-adapter": "^0.7.0",

  // Prisma
  prisma: "^5.10.2",
  "@prisma/client": "^5.10.2",
  "@prisma/adapter-planetscale": "^5.10.2",

  // Drizzle
  "drizzle-orm": "^0.29.4",
  "drizzle-kit": "^0.20.14",
  mysql2: "^3.9.1",
  "@planetscale/database": "^1.16.0",
  postgres: "^3.4.3",
  pg: "^8.11.3",
  "@types/better-sqlite3": "^7.6.9",
  "better-sqlite3": "^9.4.3",

  // TailwindCSS
  tailwindcss: "^3.4.1",
  postcss: "^8.4.34",
  prettier: "^3.2.5",
  "prettier-plugin-tailwindcss": "^0.5.11",

  // tRPC
  "@trpc/client": "^10.45.1",
  "@trpc/server": "^10.45.1",
  "@trpc/react-query": "^10.45.1",
  "@trpc/next": "^10.45.1",
  "@tanstack/react-query": "^4.36.1",
  superjson: "^2.2.1",
  "server-only": "^0.0.1",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
