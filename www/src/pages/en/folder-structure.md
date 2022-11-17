---
title: Folder Structure
description: Folder structure of a newly scaffolded T3 App
layout: ../../layouts/docs.astro
---

The following is the folder structure of a newly scaffolded T3 App, with all options selected.

Further down, the description of each folder indicates its purpose and if it is only included with selected libraries.

```
.
├─ prisma
│  └─ schema.prisma
├─ public
│  └─ favicon.ico
├─ src
│  ├─ env
│  │  ├─ client.mjs
│  │  ├─ schema.mjs
│  │  └─ server.mjs
│  ├─ pages
│  │  ├─ _app.tsx
│  │  └─ index.tsx
│  ├─ styles
│  │  └─ globals.css
│  ├─ types
│  │  └─ next-auth.d.ts
│  ├─ utils
│  │  └─ trpc.ts
│  ├─ pages
│  │  └─ api
│  │     ├─ examples.ts
│  │     └─ restricted.ts
│  ├─ server
│  │  ├─ common
│  │  │  └─ get-server-auth-session.ts
│  │  ├─ db
│  │  │  └─ client.ts
│  │  └─ trpc
│  │     ├─ router
│  │     │  ├─ _app.ts
│  │     │  ├─ auth.ts
│  │     │  └─ example.ts
│  │     ├─ context.ts
│  │     └─ trpc.ts
│  └─ pages
│     └─ api
│        ├─ auth
│        │  └─ [...nextauth].ts
│        └─ trpc
│           └─ [trpc].ts
├─ .env
├─ .env.example
├─ .eslintrc.json
├─ next-env.d.ts
├─ next.config.mjs
├─ postcss.config.cjs
├─ prettier.config.cjs
├─ tailwind.config.cjs
└─ tsconfig.json
```

## `prisma`

The `prisma` folder contains the `schema.prisma` file which is used to configure the database connection and the database schema. It is also the location to store migration files and/or seed scripts, if used. See [Prisma usage](/en/usage/prisma) for more information.

<sub>(With Prisma)</sub>

## `public`

The `public` folder contains static assets that are served by the web server. The `favicon.ico` file is an example of a static asset.

## `src/env`

Used for environment variable validation and type definitions - see [Environment Variables](usage/env-variables).

## `src/pages`

The `pages` folder contains all the pages of the Next.js application. The `index.tsx` file at the root directory of `/pages` is the homepage of the application. The `_app.tsx` file is used to wrap the application with providers. See [Next.js documentation](https://nextjs.org/docs/basic-features/pages) for more information.

### `src/pages/api`

The `api` folder contains all the API routes of the Next.js application. The `examples.ts` file (with Prisma) contains an example of a route that uses the [Next.js API route](https://nextjs.org/docs/api-routes/introduction) feature along with Prisma. The `restricted.ts` file (with Next-Auth) contains an example of a route that uses the [Next.js API route](https://nextjs.org/docs/api-routes/introduction) feature and is protected by [NextAuth.js](https://next-auth.js.org/).

<sub>(With NextAuth.js, tRPC or tRPC + Prisma)</sub>

### `src/pages/api/auth/[...nextauth].ts`

The `[...nextauth].ts` file is the NextAuth.js authentication slug route. It is used to handle authentication requests. See [NextAuth.js usage](usage/next-auth) for more information on NextAuth.js, and [Next.js Dynamic Routes Docs](https://nextjs.org/docs/routing/dynamic-routes) for info on catch-all/slug routes.

<sub>(with NextAuth.js)</sub>

### `src/pages/api/trpc/[trpc].ts`

The `[trpc].ts` file is the tRPC API entrypoint. It is used to handle tRPC requests. See [tRPC usage](usage/trpc#-pagesapitrpctrpcts) for more information on this file, and [Next.js Dynamic Routes Docs](https://nextjs.org/docs/routing/dynamic-routes) for info on catch-all/slug routes.

<sub>(with tRPC)</sub>

## `src/server`

The `server` folder is used to clearly separate server-side code from client-side code.

<sub>(with tRPC and/or Prisma)</sub>

## `src/server/common`

The `common` folder contains commonly re-used server-side code.

<sub>(with NextAuth.js + tRPC)</sub>

### `src/server/common/get-server-auth-session.ts`

The `get-server-auth-session.ts` file is used to get the NextAuth.js session on the server-side. See [NextAuth.js usage](usage/next-auth#usage-with-trpc) for more information.

<sub>(with NextAuth.js + tRPC)</sub>

### `src/server/db/client.ts`

The `client.ts` file is used to instantiate the Prisma client at global scope. See [Prisma usage](usage/prisma#prisma-client) for more information.

<sub>(with Prisma)</sub>

## `src/server/trpc`

The `trpc` folder contains the tRPC server-side code.

<sub>(with tRPC)</sub>

### `src/server/trpc/context.ts`

The `context.ts` file is used to create the context used in tRPC requests. See [tRPC usage](usage/trpc#-servertrpccontextts) for more information.

<sub>(with tRPC)</sub>

### `src/server/trpc/trpc.ts`

The `trpc.ts` file is used to export procedure helpers. See [tRPC usage](usage/trpc#-servertrpctrpcts) for more information.

<sub>(with tRPC)</sub>

## `src/server/trpc/router`

The `router` folder contains the tRPC routers.

<sub>(with tRPC)</sub>

### `src/server/trpc/router/_app.ts`

The `_app.ts` file is used to merge tRPC routers and export them as a single router, as well as the type definitions. See [tRPC usage](usage/trpc#-servertrpcrouterts) for more information.

<sub>(with tRPC)</sub>

### `src/server/trpc/router/auth.ts`

The `auth.ts` file is an example tRPC router utilizing the `protectedProcedure` helper to demonstrate how to protect a tRPC route with NextAuth.js.

<sub>(with NextAuth.js + tRPC)</sub>

### `src/server/trpc/router/example.ts`

The `example.ts` file is an example tRPC router utilizing the `publicProcedure` helper to demonstrate how to create a public tRPC route.

<sub>(with tRPC)</sub>

## `src/styles`

The `styles` folder contains the global styles of the application.

<sub>(with Tailwind CSS)</sub>

## `src/types`

The `types` folder is used to store reused types or type declarations.

<sub>(with NextAuth.js)</sub>

### `src/types/next-auth.d.ts`

The `next-auth.d.ts` file is used to extend the NextAuth default session type to include the user ID. See [NextAuth.js usage](usage/next-auth#inclusion-of-userid-on-the-session) for more information.

<sub>(with NextAuth.js)</sub>

## `src/utils`

The `utils` folder is used to store commonly re-used utility functions.

<sub>(with tRPC)</sub>

### `src/utils/trpc.ts`

The `trpc.ts` file is the front-end entrypoint to tRPC. See [tRPC usage](usage/trpc#-utilstrpcts) for more information.

<sub>(with tRPC)</sub>

## `.env`

The `.env` file is used to store environment variables. See [Environment Variables](usage/env-variables) for more information. This file should **not** be commited to git history.

## `.env.example`

The `.env.example` file shows example environment variables based on the chosen libraries. This file should be commited to git history.

## `.eslintrc.json`

The `.eslintrc.json` file is used to configure ESLint. See [ESLint Docs](https://eslint.org/docs/latest/user-guide/configuring/configuration-files) for more information.

## `next-env.d.ts`

The `next-env.d.ts` file ensures Next.js types are picked up by the TypeScript compiler. **You should not remove it or edit it as it can change at any time.** See [Next.js Docs](https://nextjs.org/docs/basic-features/typescript#existing-projects) for more information.

## `next.config.mjs`

The `next.config.mjs` file is used to configure Next.js. See [Next.js Docs](https://nextjs.org/docs/api-reference/next.config.js/introduction) for more information. Note: The .mjs extension is used to allow for ESM imports.

## `postcss.config.cjs`

The `postcss.config.cjs` file is used for Tailwind PostCSS usage. See [Taiwind PostCSS Docs](https://tailwindcss.com/docs/installation/using-postcss) for more information.

<sub>(with Tailwind CSS)</sub>

## `prettier.config.cjs`

The `prettier.config.cjs` file is used to configure Prettier to include the prettier-plugin-tailwindcss for formatting Tailwind CSS classes. See the [Tailwind CSS blog post](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) for more information.

<sub>(with Tailwind CSS)</sub>

## `tsconfig.json`

The `tsconfig.json` file is used to configure TypeScript. Some non-defaults, such as `strict mode`, have been enabled to ensure the best usage of TypeScript for create-t3-app and its libraries. See [TypeScript Docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) or [TypeScript Usage](usage/typescript) for more information.
