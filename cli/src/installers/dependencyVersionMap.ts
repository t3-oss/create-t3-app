/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.21.0",
  "@next-auth/prisma-adapter": "^1.0.5",

  // Prisma
  prisma: "^4.11.0",
  "@prisma/client": "^4.11.0",

  // TailwindCSS
  tailwindcss: "^3.3.0",
  autoprefixer: "^10.4.14",
  postcss: "^8.4.21",

  // tRPC
  "@trpc/client": "^10.18.0",
  "@trpc/server": "^10.18.0",
  "@trpc/react-query": "^10.18.0",
  "@trpc/next": "^10.18.0",
  "@tanstack/react-query": "^4.28.0",
  superjson: "1.12.2",

  // Prettier
  prettier: "^2.8.6",
  "prettier-plugin-tailwindcss": "^0.2.6",
  "@types/prettier": "^2.7.2",
  "@ianvs/prettier-plugin-sort-imports": "^3.7.2",

  // Eslint
  eslint: "^8.36.0",
  "eslint-config-next": "^13.4.1",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
