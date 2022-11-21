---
title: بنية المشروع
description: بنية مشروع T3 App
layout: ../../layouts/docs.astro
lang: ar
dir: rtl
---
المٌخطط التالي هو مثال لمشروع T3 مع كل الخيارات


علاوة على ذلك ، يشير وصف كل مجلد إلى الغرض منه وما إذا كان متضمنًا فقط مع المكتبات المحددة.
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

### مجلد `prisma`
مجلد prisma يحتوي علي `prisma.schema` والذي بدور يحتوي ملف تكوين الاتصال الي قاعدة البيانات كما يحتوي ايضا علي schema التي تحدد شكل الـ tables هذا الي جانب  ملفات الـ migrations، إقراَ [كيفية إستخدام Prisma](/en/usage/prisma) 


<sub>(في حالة Prisma)</sub>

### ملف `public`
مجلد Public يحتوي علي الـ assets التي يقوم الخادمبتقديمها، ملف `favicon.ico` هو مثال علي ذلك.

### ملف `src/env`
يتم إستخدامة لـ environment variable إقرأ المزيد [Environment Variables](usage/env-variables)

### ملف `src/pages`

مجلد pages يحتوي علي كل الصفحات التي سيحتوي عليها تطبيق Next.js، ملف `index.tsx`هو الـ root او بمعني أخر (الصفحة الرئيسية)
ملف `__app.tsx` بعمل كـ Global لتضع فية الـ Scripts التي ستحتاجها في كل أجزاء التطبيق [Next.js documentation](https://nextjs.org/docs/basic-features/pages) 

#### ملف `src/pages/api`
مجلد `api` يحتوي علي كل الـ Api Endpoints التي سيحتويها تطبيقك، مثال علي ذلك هو `example.ts` إقرأ [Next.js API route](https://nextjs.org/docs/api-routes/introduction)
ملف `restricted.ts`يحتوي علي مثال لـ Endpoint مع (Next-Auth)، إقرأ [Next.js API route](https://nextjs.org/docs/api-routes/introduction) و [NextAuth.js](https://next-auth.js.org/). 


<sub>(في حالة NextAuth.js, tRPC or tRPC + Prisma)</sub>

#### ملف `src/pages/api/auth/[...nextauth].ts`
ملف `[...nextauth].ts` هو ملف تابع لمكتبة NextAuth.js، ويتم إستخدامة في طلبات التوثيق authentication، إقرأ [NextAuth.js usage](usage/next-auth) و [Next.js Dynamic Routes Docs](https://nextjs.org/docs/routing/dynamic-routes) لمزيد من المعلومات.


<sub>(في حالة NextAuth.js)</sub>

#### ملف `src/pages/api/trpc/[trpc].ts`

The `[trpc].ts` file is the tRPC API entrypoint. It is used to handle tRPC requests. See [tRPC usage](usage/trpc#-pagesapitrpctrpcts) for more information on this file, and [Next.js Dynamic Routes Docs](https://nextjs.org/docs/routing/dynamic-routes) for info on catch-all/slug routes.

<sub>(في حالة tRPC)</sub>

### ملف `src/server`

يُستخدم مجلد `server` للفصل بوضوح بين التعليمات البرمجية من جانب الخادم(Server Side) والتعليمات البرمجية من جانب العميل (Client Side),>

<sub>(في حالة tRPC and/or Prisma)</sub>

### ملف `src/server/common`

مجلد `common` يستخم للـ Functions التي يكثر إستخدامها.

<sub>(في حالة NextAuth.js + tRPC)</sub>

#### ملف `src/server/common/get-server-auth-session.ts`
ملف `get-server-auth-session.ts` يتم إستحدامة لجلب الـ Session Object من جانب الـ Server. إقرأ [NextAuth.js usage](usage/next-auth#usage-with-trpc)

<sub>(في حالة NextAuth.js + tRPC)</sub>

#### ملف `src/server/db/client.ts`
ملف `client.ts` يستخدم لإنشاء مثيل لـ Prisma Client علي مستوي التطبيق كلة، إقرأ المزيد [Prisma usage](usage/prisma#prisma-client) 


<sub>(في حالة Prisma)</sub>

### ملف `src/server/trpc`
مجلد tRPC يحتوي علي كود tRPC الخاص بالخادم

<sub>(في حالة tRPC)</sub>

#### ملف `src/server/trpc/context.ts`

ملف `context.ts` يُستخدم لإنشاء context في كل طلب tRPC، إقرأ [tRPC usage](usage/trpc#-servertrpccontextts)****


<sub>(في حالة tRPC)</sub>

#### ملف `src/server/trpc/trpc.ts`
إقرأ [tRPC usage](usage/trpc#-servertrpctrpcts)



<sub>(في حالة tRPC)</sub>

### ملف `src/server/trpc/router`
يحتوي علي `tRPC routers` 


<sub>(في حالة tRPC)</sub>

#### ملف `src/server/trpc/router/_app.ts`
ملف `_app.ts` يُستخدم لدمج tRPC routers في router واحد كما هو الحل في الـ types، إقرأ المزيد هنا [tRPC usage](usage/trpc#-servertrpcrouterts)

<sub>(في حالة tRPC)</sub>

#### ملف `src/server/trpc/router/auth.ts`
ملف `auth.ts` هو مثال لاستخدام `protectedProcedure helper` في حماية route معين.
<sub>(في حالة NextAuth.js + tRPC)</sub>
#### ملف `src/server/trpc/router/example.ts`

The `example.ts` file is an example tRPC router utilizing the `publicProcedure` helper to demonstrate how to create a public tRPC route.

<sub>(في حالة tRPC)</sub>

###  ملف `src/styles`

مجلد `styles` يحتوي علي الـ stylesheets

<sub>(في حالة Tailwind CSS)</sub>

###  ملف `src/types`

مجلد `types` يحتوي علي الـ Types

<sub>(في حالة NextAuth.js)</sub>

#### ملف  `src/types/next-auth.d.ts`
ملف  `next-auth.d.ts` يُسنخدم للتعديل علي إعدادات NextAuth الافتراضية، لمزيد من المعلومات [NextAuth.js usage](usage/next-auth#inclusion-of-userid-on-the-session).

<sub>(في حالة NextAuth.js)</sub>

###  ملف `src/utils`
مجلد `utils` يُستخدم للـ functions التي يكثر إستخدامها.

<sub>(في حالة tRPC)</sub>

#### ملف  `src/utils/trpc.ts`
ملف `trpc.ts` يُسخدم كـ entrypoint لـ tRPC، إقرأ المزيد هنا [tRPC usage](usage/trpc#-utilstrpcts)

<sub>(في حالة tRPC)</sub>

### ملف `.env`

The `.env` file is used to store environment variables. See [Environment Variables](usage/env-variables) for more information. This file should **not** be commited to git history.

### ملف `.env.example`

The `.env.example` file shows example environment variables based on the chosen libraries. This file should be commited to git history.

### ملف `.eslintrc.json`

The `.eslintrc.json` file is used to configure ESLint. See [ESLint Docs](https://eslint.org/docs/latest/user-guide/configuring/configuration-files) for more information.

### ملف `next-env.d.ts`

The `next-env.d.ts` file ensures Next.js types are picked up by the TypeScript compiler. **You should not remove it or edit it as it can change at any time.** See [Next.js Docs](https://nextjs.org/docs/basic-features/typescript#existing-projects) for more information.

### ملف `next.config.mjs`

The `next.config.mjs` file is used to configure Next.js. See [Next.js Docs](https://nextjs.org/docs/api-reference/next.config.js/introduction) for more information. Note: The .mjs extension is used to allow for ESM imports.

### ملف `postcss.config.cjs`

The `postcss.config.cjs` file is used for Tailwind PostCSS usage. See [Taiwind PostCSS Docs](https://tailwindcss.com/docs/installation/using-postcss) for more information.

<sub>(في حالة Tailwind CSS)</sub>

### ملف `prettier.config.cjs`

The `prettier.config.cjs` file is used to configure Prettier to include the prettier-plugin-tailwindcss for formatting Tailwind CSS classes. See the [Tailwind CSS blog post](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) for more information.

<sub>(في حالة Tailwind CSS)</sub>

### ملف `tsconfig.json`

The `tsconfig.json` file is used to configure TypeScript. Some non-defaults, such as `strict mode`, have been enabled to ensure the best usage of TypeScript for create-t3-app and its libraries. See [TypeScript Docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) or [TypeScript Usage](usage/typescript) for more information.
