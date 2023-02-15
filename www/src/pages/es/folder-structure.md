---
title: Estructura de Carpetas
description: Estructura de carpetas de una aplicación T3 recién creada
layout: ../../layouts/docs.astro
lang: es
---

La siguiente es la estructura de carpetas de una aplicación T3 recién creada, con todas las opciones seleccionadas.

Más abajo, la descripción de cada carpeta indica su propósito y si solo se incluye con librerías seleccionadas.

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
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  └─ [...nextauth].ts
│  │  │  ├─ trpc
│  │  │  │  └─ [trpc].ts
│  │  │  ├─ examples.ts
│  │  │  └─ restricted.ts
│  │  ├─ _app.tsx
│  │  └─ index.tsx
│  ├─ styles
│  │  └─ globals.css
│  ├─ types
│  │  └─ next-auth.d.ts
│  ├─ utils
│  │  └─ trpc.ts
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

### `prisma`

La carpeta `prisma` contiene el archivo `schema.prisma` que se utiliza para configurar la conexión de la base de datos y su esquema. También es la ubicación para almacenar archivos de migración y/o scripts que inyectan valores iniciales a la base de datos (seed scripts), si se utilizan. Consulta [uso de Prisma](/es/usage/prisma) para obtener más información.

<sub>(Con Prisma)</sub>

### `public`

La carpeta `public` contiene archivos estáticos que son servidos por el servidor web. El archivo `favicon.ico` es un ejemplo de un archivo estático.

### `src/env`

Se utiliza para la validación de variables de entorno y definiciones de tipo; consulta [variables de entorno](usage/env-variables).

### `src/pages`

La carpeta `pages` contiene todas las páginas de la aplicación Next.js. El archivo `index.tsx` en el directorio raíz de `/pages` es la página de inicio de la aplicación. El archivo `_app.tsx` se usa para componer la aplicación con otros proveedores. Consulta la [documentación de Next.js](https://nextjs.org/docs/basic-features/pages) para obtener más información.

#### `src/pages/api`

La carpeta `api` contiene todas las rutas API de la aplicación Next.js. El archivo `examples.ts` (con Prisma) contiene un ejemplo de una ruta que hace uso de [rutas API Next.js](https://nextjs.org/docs/api-routes/introduction) junto con Prisma. El archivo `restricted.ts` (con Next-Auth) contiene un ejemplo de una ruta que hace uso de [rutas API Next.js](https://nextjs.org/docs/api-routes/introduction) y está protegida por [NextAuth.js](https://next-auth.js.org/).

<sub>(Con NextAuth.js, tRPC o tRPC + Prisma)</sub>

#### `src/pages/api/auth/[...nextauth].ts`

El archivo `[...nextauth].ts` es la ruta _slug_ de autenticación NextAuth.js. Se utiliza para manejar solicitudes de autenticación. Consulta [uso de NextAuth.js](usage/next-auth) para obtener más información sobre NextAuth.js y [la documentación de rutas dinámicas de Next.js](https://nextjs.org/docs/routing/dynamic-routes) para obtener información sobre rutas _catch-all/slug_.

<sub>(con NextAuth.js)</sub>

#### `src/pages/api/trpc/[trpc].ts`

El archivo `[trpc].ts` es el punto de entrada de la API de tRPC. Se utiliza para manejar solicitudes tRPC. Consulta [uso de tRPC](usage/trpc#-pagesapitrpctrpcts) para obtener más información sobre este archivo y [la documentación de rutas dinámicas de Next.js](https://nextjs.org/docs/routing/dynamic-routes) para obtener información sobre rutas _catch-all/slug_.

<sub>(con tRPC)</sub>

### `src/server`

La carpeta `server` se usa para separar claramente el código del lado del servidor del código del lado del cliente.

<sub>(con tRPC y/o Prisma)</sub>

### `src/server/common`

La carpeta `common` contiene código del lado del servidor comúnmente reutilizado.

<sub>(con NextAuth.js + tRPC)</sub>

#### `src/server/common/get-server-auth-session.ts`

El archivo `get-server-auth-session.ts` se usa para obtener la sesión NextAuth.js en el lado del servidor. Consulta [uso de NextAuth.js](usage/next-auth#usage-with-trpc) para obtener más información.

<sub>(con NextAuth.js + tRPC)</sub>

#### `src/server/db/client.ts`

El archivo `client.ts` se usa para instanciar el cliente Prisma en el entorno global. Consulta [uso de Prisma](usage/prisma#prisma-client) para obtener más información.

<sub>(con Prisma)</sub>

### `src/server/trpc`

La carpeta `trpc` contiene el código del lado del servidor tRPC.

<sub>(con tRPC)</sub>

#### `src/server/trpc/context.ts`

El archivo `context.ts` se utiliza para crear el contexto utilizado en las solicitudes tRPC. Consulta [uso de tRPC](usage/trpc#-servertrpccontextts) para obtener más información.

<sub>(con tRPC)</sub>

#### `src/server/trpc/trpc.ts`

El archivo `trpc.ts` se usa para exportar funciones de ayuda. Consulta [uso de tRPC](usage/trpc#-serverrpctrpcts) para obtener más información.

<sub>(con tRPC)</sub>

### `src/server/trpc/router`

La carpeta `router` contiene los enrutadores tRPC.

<sub>(con tRPC)</sub>

#### `src/server/trpc/router/_app.ts`

El archivo `_app.ts` se usa para fusionar enrutadores tRPC y exportarlos como un solo enrutador, así como las definiciones de tipo. Consulta [uso de tRPC](usage/trpc#-servertrpcrouterts) para obtener más información.

<sub>(con tRPC)</sub>

#### `src/server/trpc/router/auth.ts`

El archivo `auth.ts` es un enrutador tRPC de ejemplo que utiliza la función de ayuda `protectedProcedure` para demostrar cómo proteger una ruta tRPC con NextAuth.js.

<sub>(con NextAuth.js + tRPC)</sub>

#### `src/server/trpc/router/example.ts`

El archivo `example.ts` es un enrutador tRPC de ejemplo que utiliza la función de ayuda `publicProcedure` para demostrar cómo crear una ruta pública tRPC.

<sub>(con tRPC)</sub>

### `src/styles`

La carpeta `styles` contiene los estilos globales de la aplicación.

<sub>(con Tailwind CSS)</sub>

### `src/types`

La carpeta `types` se usa para almacenar tipos reutilizados o declaraciones de tipos.

<sub>(con NextAuth.js)</sub>

#### `src/types/next-auth.d.ts`

El archivo `next-auth.d.ts` se usa para extender el tipo predeterminado de la sesión de NextAuth para incluir el ID del usuario. Consulta [uso de NextAuth.js](usage/next-auth#inclusion-of-userid-on-the-session) para obtener más información.

<sub>(con NextAuth.js)</sub>

### `src/utils`

La carpeta `utils` se usa para almacenar funciones de utilidad comúnmente reutilizadas.

<sub>(con tRPC)</sub>

#### `src/utils/trpc.ts`

El archivo `trpc.ts` es el punto de entrada a tRPC del lado del front-end. Consulta [uso de tRPC](usage/trpc#-utilstrpcts) para obtener más información.

<sub>(con tRPC)</sub>

### `.env`

El archivo `.env` se utiliza para almacenar variables de entorno. Consulta [variables de entorno](usage/env-variables) para obtener más información. Este archivo **no** debería estar guardado en el historial de git.

### `.env.example`

El archivo `.env.example` muestra variables de entorno de ejemplo basadas en las bibliotecas elegidas. Este archivo debe estar guardado en el historial de git.

### `.eslintrc.json`

El archivo `.eslintrc.json` se usa para configurar ESLint. Consulta [la documentación de ESLint](https://eslint.org/docs/latest/user-guide/configuring/configuration-files) para obtener más información.

### `next-env.d.ts`

El archivo `next-env.d.ts` garantiza que el compilador de TypeScript recolecte los tipos de Next.js. **No debes eliminarlo ni editarlo, ya que puede cambiar en cualquier momento.** Consulta [la documentación de Next.js](https://nextjs.org/docs/basic-features/typescript#existing-projects) para obtener más información.

### `next.config.mjs`

El archivo `next.config.mjs` se usa para configurar Next.js. Consulta [la documentación de Next.js](https://nextjs.org/docs/api-reference/next.config.js/introduction) para obtener más información. Nota: La extensión .mjs se usa para permitir las importaciones de tipo ESM.

### `postcss.config.cjs`

El archivo `postcss.config.cjs` se usa para el uso de Tailwind PostCSS. Consulta [la documentación PostCSS de Taiwind](https://tailwindcss.com/docs/installation/using-postcss) para obtener más información.

<sub>(con Tailwind CSS)</sub>

### `prettier.config.cjs`

El archivo `prettier.config.cjs` se usa para configurar Prettier para incluir el complemento prettier-plugin-tailwindcss para formatear las clases CSS de Tailwind. Consulta la [publicación en el blog de Tailwind CSS](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) para obtener más información.

<sub>(con Tailwind CSS)</sub>

### `tsconfig.json`

El archivo `tsconfig.json` se usa para configurar TypeScript. Se han habilitado algunos valores no predeterminados, como el "modo estricto", para garantizar el mejor uso de TypeScript para create-t3-app y sus librerías. Consulta [la documentación de TypeScript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) o [uso de TypeScript](usage/typescript) para obtener más información.
