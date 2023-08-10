/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.22.5",
  "@next-auth/prisma-adapter": "^1.0.7",
  "@auth/drizzle-adapter": "^0.2.1",

  // Prisma
  prisma: "^5.1.1",
  "@prisma/client": "^5.1.1",

  // Drizzle
  "drizzle-orm": "^0.28.2",
  "drizzle-kit": "^0.19.12",
  dotenv: "^16.1.4",
  "@planetscale/database": "^1.10.0",

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
