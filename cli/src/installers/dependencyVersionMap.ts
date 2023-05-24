/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.22.1",
  "@next-auth/prisma-adapter": "^1.0.5",

  // Prisma
  prisma: "^4.14.1",
  "@prisma/client": "^4.14.1",

  // TailwindCSS
  tailwindcss: "^3.3.0",
  "tailwind-merge": "^1.12.0",
  autoprefixer: "^10.4.14",
  postcss: "^8.4.21",
  prettier: "^2.8.8",
  "prettier-plugin-tailwindcss": "^0.2.8",
  "@types/prettier": "^2.7.2",

  // tRPC
  "@trpc/client": "^10.27.1",
  "@trpc/server": "^10.27.1",
  "@trpc/react-query": "^10.27.1",
  "@trpc/next": "^10.27.1",
  "@tanstack/react-query": "^4.29.7",
  superjson: "1.12.2",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
