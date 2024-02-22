/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.24.5",
  "@auth/prisma-adapter": "^1.0.16",
  "@auth/drizzle-adapter": "^0.3.16",

  // Prisma
  prisma: "^5.6.0",
  "@prisma/client": "^5.6.0",
  "@prisma/adapter-planetscale": "^5.6.0",

  // Drizzle
  "drizzle-orm": "^0.29.4",
  "drizzle-kit": "^0.20.14",
  mysql2: "^3.6.1",
  "@planetscale/database": "^1.16.0",
  postgres: "^3.4.3",
  pg: "^8.11.3",
  "@types/better-sqlite3": "^7.6.6",
  "better-sqlite3": "^9.0.0",

  // TailwindCSS
  tailwindcss: "^3.4.1",
  autoprefixer: "^10.4.14",
  postcss: "^8.4.31",
  prettier: "^3.1.0",
  "prettier-plugin-tailwindcss": "^0.5.11",

  // tRPC
  "@trpc/client": "next",
  "@trpc/server": "next",
  "@trpc/react-query": "next",
  "@trpc/next": "next",
  "@tanstack/react-query": "^5.17.19",
  superjson: "^2.2.1",
  "server-only": "^0.0.1",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
