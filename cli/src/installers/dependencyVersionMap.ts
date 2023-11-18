/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.24.5",
  "@next-auth/prisma-adapter": "^1.0.7",
  "@auth/drizzle-adapter": "^0.3.6",

  // Prisma
  prisma: "^5.6.0",
  "@prisma/client": "^5.6.0",

  // Drizzle
  "drizzle-orm": "^0.28.5",
  "drizzle-kit": "^0.29.0",
  "dotenv-cli": "^7.3.0",
  mysql2: "^3.6.1",
  "@planetscale/database": "^1.11.0",

  // TailwindCSS
  tailwindcss: "^3.3.5",
  autoprefixer: "^10.4.14",
  postcss: "^8.4.31",
  prettier: "^3.1.0",
  "prettier-plugin-tailwindcss": "^0.5.7",

  // tRPC
  "@trpc/client": "^10.43.6",
  "@trpc/server": "^10.43.6",
  "@trpc/react-query": "^10.43.6",
  "@trpc/next": "^10.43.6",
  "@tanstack/react-query": "^4.36.1",
  superjson: "^2.2.1",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
