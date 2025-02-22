/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "5.0.0-beta.25",
  "@auth/prisma-adapter": "^2.7.2",
  "@auth/drizzle-adapter": "^1.7.2",

  // Prisma
  prisma: "^5.14.0",
  "@prisma/client": "^5.14.0",
  "@prisma/adapter-planetscale": "^5.14.0",

  // Drizzle
  "drizzle-kit": "^0.28.1",
  "drizzle-orm": "^0.36.4",
  "eslint-plugin-drizzle": "^0.2.3",
  mysql2: "^3.12.0",
  "@planetscale/database": "^1.19.0",
  postgres: "^3.4.4",
  "@libsql/client": "^0.9.0",

  // TailwindCSS
  tailwindcss: "^3.4.17",
  postcss: "^8.5.3",
  prettier: "^3.5.2",
  "prettier-plugin-tailwindcss": "^0.6.11",

  // tRPC
  "@trpc/client": "^11.0.0-rc.802",
  "@trpc/server": "^11.0.0-rc.802",
  "@trpc/react-query": "^11.0.0-rc.802",
  "@trpc/next": "^11.0.0-rc.802",
  "@tanstack/react-query": "^5.66.9",
  superjson: "^2.2.2",
  "server-only": "^0.0.1",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
