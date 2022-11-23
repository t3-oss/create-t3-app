---
title: Файловая структура
description: Файловая структура нового T3 приложения
layout: ../../layouts/docs.astro
lang: ru
---

Так выглядит файловая структура нового T3 приложения со всеми выбранными опциями.

Ниже - описание каждой папки, указывающее на её назначение и когда она добавляется.

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

Папка `prisma` содержит файл `schema.prisma`, который используется для настройки соединения с базой данных и схемы базы данных. Также это место для хранения файлов миграции и/или сценариев заполнения, если они используются. Смотрите [Использование Prisma](/ru/usage/prisma) для получения дополнительной информации.

<sub>(с Prisma)</sub>

### `public`

Папка `public` содержит статические файлы, которые обслуживаются веб-сервером. Файл `favicon.ico` - это пример статического файла.

### `src/env`

Используется для проверки переменных окружения и определения типов - смотрите [Переменные окружения](/ru/usage/env-variables).

### `src/pages`

Папка `pages` содержит все страницы приложения Next.js. Файл `index.tsx` в корневой папке `/pages` является домашней страницей приложения. Файл `_app.tsx` используется для оборачивания приложения провайдерами. Смотрите [документацию Next.js](https://nextjs.org/docs/basic-features/pages) для получения дополнительной информации.

#### `src/pages/api`

Папка `api` содержит все маршруты API приложения Next.js. Файл `examples.ts` (с Prisma) содержит пример маршрута, который использует функцию [Next.js API route](https://nextjs.org/docs/api-routes/introduction) вместе с Prisma. Файл `restricted.ts` (с Next-Auth) содержит пример маршрута, который использует функцию [Next.js API route](https://nextjs.org/docs/api-routes/introduction) и защищен с помошью [NextAuth.js](https://next-auth.js.org/).

<sub>(с NextAuth.js, tRPC или tRPC + Prisma)</sub>

#### `src/pages/api/auth/[...nextauth].ts`

Файл `[...nextauth].ts` - это слаг-маршрут NextAuth.js для аутентификации. Он используется для обработки запросов аутентификации. Смотрите [Использование NextAuth.js](/ru/usage/next-auth) для получения дополнительной информации о NextAuth.js и [документацию Next.js о динамических маршрутах](https://nextjs.org/docs/routing/dynamic-routes) для получения информации о маршрутах catch-all/slug.

<sub>(с NextAuth.js)</sub>

#### `src/pages/api/trpc/[trpc].ts`

Файл `[trpc].ts` - это точка входа tRPC API. Он используется для обработки запросов tRPC. Смотрите [Использование tRPC](/ru/usage/trpc#-pagesapitrpctrpcts) для получения дополнительной информации об этом файле и [документацию Next.js о динамических маршрутах](https://nextjs.org/docs/routing/dynamic-routes) для получения информации о маршрутах catch-all/slug.

<sub>(c tRPC)</sub>

### `src/server`

Папка `server` используется для четкого разделения серверного кода от клиентского кода.

<sub>(с tRPC и/или Prisma)</sub>

### `src/server/common`

Папка `common` содержит общий код, используемый на стороне сервера.

<sub>(с NextAuth.js + tRPC)</sub>

#### `src/server/common/get-server-auth-session.ts`

Файл `get-server-auth-session.ts` используется для получения сеанса NextAuth.js на стороне сервера. Смотрите [Использование NextAuth.js](/ru/usage/next-auth#usage-with-trpc) для получения дополнительной информации.

<sub>(с NextAuth.js + tRPC)</sub>

#### `src/server/db/client.ts`

Файл `client.ts` используется для создания экземпляра клиента Prisma в глобальной области видимости. Смотрите [Использование Prisma](/ru/usage/prisma#prisma-client) для получения дополнительной информации.

<sub>(с Prisma)</sub>

### `src/server/trpc`

Папка `trpc` содержит серверный код tRPC.

<sub>(с tRPC)</sub>

#### `src/server/trpc/context.ts`

Файл `context.ts` используется для создания контекста, используемого в запросах tRPC. Смотрите [Использование tRPC](/ru/usage/trpc#-servertrpccontextts) для получения дополнительной информации.

<sub>(с tRPC)</sub>

#### `src/server/trpc/trpc.ts`

Файл `trpc.ts` используется для экспорта помощников процедур. Смотрите [Использование tRPC](/ru/usage/trpc#-servertrpctrpcts) для получения дополнительной информации.

<sub>(с tRPC)</sub>

### `src/server/trpc/router`

Папка `router` содержит маршрутизаторы tRPC.

<sub>(с tRPC)</sub>

#### `src/server/trpc/router/_app.ts`

Файл `_app.ts` используется для объединения маршрутизаторов tRPC и экспорта их в виде единого маршрутизатора, а также определений типов. Смотрите [Использование tRPC](/ru/usage/trpc#-servertrpcrouterts) для получения дополнительной информации.

<sub>(с tRPC)</sub>

#### `src/server/trpc/router/auth.ts`

Файл `auth.ts` является примером маршрутизатора tRPC, использующего вспомогательную функцию `protectedProcedure` для демонстрации защиты маршрута tRPC с помощью NextAuth.js.

<sub>(с NextAuth.js + tRPC)</sub>

#### `src/server/trpc/router/example.ts`

Файл `example.ts` является примером маршрутизатора tRPC, использующего вспомогательую функцию `publicProcedure` для демонстрации создания публичного маршрута tRPC.

<sub>(с tRPC)</sub>

### `src/styles`

Папка `styles` содержит глобальные стили приложения.

<sub>(с Tailwind CSS)</sub>

### `src/types`

Папка `types` используется для хранения повторно используемых типов или объявлений типов.

<sub>(с NextAuth.js)</sub>

#### `src/types/next-auth.d.ts`

Файл `next-auth.d.ts` используется для расширения типа сеанса по умолчанию NextAuth на включение идентификатора пользователя. Смотрите [Использование NextAuth.js](/ru/usage/next-auth#включение-userid-в-сеанс) для получения дополнительной информации.

<sub>(с NextAuth.js)</sub>

### `src/utils`

Папка `utils` используется для хранения повторно используемых функций утилит.

<sub>(с tRPC)</sub>

#### `src/utils/trpc.ts`

Файл `trpc.ts` является точкой входа для tRPC на стороне клиента. Смотрите [Использование tRPC](/ru/usage/trpc#-utilstrpcts) для получения дополнительной информации.

<sub>(с tRPC)</sub>

### `.env`

Файл `.env` используется для хранения переменных среды. Смотрите [Переменные среды](/ru/usage/env-variables) для получения дополнительной информации. Этот файл **не** должен быть добавлен в историю git.

### `.env.example`

Файл `.env.example` показывает пример переменных среды на основе выбранных библиотек. Этот файл должен быть добавлен в историю git.

### `.eslintrc.json`

Файл `.eslintrc.json` используется для настройки ESLint. Смотрите [документацию ESLint](https://eslint.org/docs/latest/user-guide/configuring/configuration-files) для получения дополнительной информации.

### `next-env.d.ts`

Файл `next-env.d.ts` гарантирует, что типы Next.js будут обнаружены компилятором TypeScript. **Вы не должны удалять его или редактировать, поскольку он может измениться в любое время.** Смотрите [документацию Next.js](https://nextjs.org/docs/basic-features/typescript#existing-projects) для получения дополнительной информации.

### `next.config.mjs`

Файл `next.config.mjs` используется для настройки Next.js. Смотрите [Документацию Next.js](https://nextjs.org/docs/api-reference/next.config.js/introduction) для получения дополнительной информации. Примечание: Расширение .mjs используется для разрешения импортов ESM.

### `postcss.config.cjs`

Файл `postcss.config.cjs` используется для использования Tailwind PostCSS. Смотрите [документацию Taiwind PostCSS](https://tailwindcss.com/docs/installation/using-postcss) для получения дополнительной информации.

<sub>(с Tailwind CSS)</sub>

### `prettier.config.cjs`

Файл `prettier.config.cjs` используется для настройки Prettier для включения prettier-plugin-tailwindcss для форматирования классов Tailwind CSS. Смотрите [пост блога Tailwind CSS](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) для получения дополнительной информации.

<sub>(с Tailwind CSS)</sub>

### `tsconfig.json`

Файл `tsconfig.json` используется для настройки TypeScript. Некоторые значения по умолчанию, такие как `strict mode`, были включены для обеспечения лучшего использования TypeScript для create-t3-app и его библиотек. Смотрите [документацию TypeScript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) или [Использование TypeScript](usage/typescript) для получения дополнительной информации.
