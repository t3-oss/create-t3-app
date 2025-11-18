/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "5.0.0-beta.25",
  "@auth/prisma-adapter": "^2.7.2",
  "@auth/drizzle-adapter": "^1.7.2",

  // Better-Auth
  "better-auth": "^1.3",

  // Prisma
  prisma: "^6.6.0",
  "@prisma/client": "^6.6.0",
  "@prisma/adapter-planetscale": "^6.6.0",

  // Drizzle
  "drizzle-kit": "^0.30.5",
  "drizzle-orm": "^0.41.0",
  mysql2: "^3.11.0",
  "@planetscale/database": "^1.19.0",
  postgres: "^3.4.4",
  "@libsql/client": "^0.14.0",

  // TailwindCSS
  tailwindcss: "^4.0.15",
  postcss: "^8.5.3",
  "@tailwindcss/postcss": "^4.0.15",

  // tRPC
  "@trpc/client": "^11.0.0",
  "@trpc/server": "^11.0.0",
  "@trpc/react-query": "^11.0.0",
  "@trpc/next": "^11.0.0",
  "@tanstack/react-query": "^5.69.0",
  superjson: "^2.2.1",
  "server-only": "^0.0.1",

  // biome
  "@biomejs/biome": "^2.2.5",

  // eslint / prettier
  prettier: "^3.5.3",
  "@eslint/eslintrc": "^3.3.1",
  "prettier-plugin-tailwindcss": "^0.6.11",
  eslint: "^9.23.0",
  "eslint-config-next": "^15.2.3",
  "eslint-plugin-drizzle": "^0.2.3",
  "typescript-eslint": "^8.27.0",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
