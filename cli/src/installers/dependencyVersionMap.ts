/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.24.4",
  "@next-auth/prisma-adapter": "^1.0.7",
  "@auth/drizzle-adapter": "^0.3.5",

  // Prisma
  prisma: "^5.1.1",
  "@prisma/client": "^5.1.1",
  "@prisma/adapter-planetscale": "^5.6.0",

  // Drizzle
  "drizzle-orm": "^0.28.5",
  "drizzle-kit": "^0.19.13",
  "dotenv-cli": "^7.3.0",
  mysql2: "^3.6.1",
  "@planetscale/database": "^1.11.0",
  postgres: "^3.4.3",
  "@types/better-sqlite3": "^7.6.6",
  "better-sqlite3": "^9.0.0",

  // TailwindCSS
  tailwindcss: "^3.3.3",
  autoprefixer: "^10.4.14",
  postcss: "^8.4.27",
  prettier: "^3.0.0",
  "prettier-plugin-tailwindcss": "^0.5.1",

  // tRPC
  "@trpc/client": "^10.37.1",
  "@trpc/server": "^10.37.1",
  "@trpc/react-query": "^10.37.1",
  "@trpc/next": "^10.37.1",
  "@tanstack/react-query": "^4.32.6",
  superjson: "^1.13.1",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
