---
title: بنية المجلد
description: بنية مجلد T3 App
layout: ../../layouts/docs.astro
lang: ar
dir: rtl
---

المٌخطط التالي هو مثال لمجلد T3 مع كل الخيارات الممكنة

علاوة على ذلك، يشير وصف كل مجلد وملف الى الغرض منه وما إذا كان متضمنًا علي شئ مع المكتبات المذكورة.

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

مجلد prisma يحتوي على `prisma.schema` والذي بدوره يحتوي ملف تكوين الاتصال مع قاعدة البيانات كما يحتوي ايضا علي schema التي تحدد شكل الـ tables هذا إلى جانب ملفات الـ migrations، إقراَ [كيفية إستخدام Prisma](/en/usage/prisma)

<sub>(في حالة Prisma)</sub>

### ملف `public`

مُجلد Public يحتوي على الـ assets التي يقوم الخادم بتقديمها، ملف `favicon.ico` هو مثال على ذلك.

### ملف `src/env`

يتم إستخدامة لـ environment variable إقرأ المزيد [Environment Variables](usage/env-variables)

### ملف `src/pages`

مجلد pages يحتوي علي كل الصفحات التي يحتوي عليها تطبيق Next.js، ملف `index.tsx`هو الـ root او بمعني أخر (الصفحة الرئيسية)
ملف `__app.tsx` يعمل كـ Global لتضع فية الـ Scripts التي ستحتاجها في كل أجزاء التطبيق [Next.js documentation](https://nextjs.org/docs/basic-features/pages)

#### ملف `src/pages/api`

مجلد `api` يحتوي علي كل الـ Api Endpoints التي يحتويها تطبيقك، مثال على ذلك هو `example.ts` إقرأ [Next.js API route](https://nextjs.org/docs/api-routes/introduction)
ملف `restricted.ts`يحتوي علي مثال لـ Endpoint مع (Next-Auth)، إقرأ [Next.js API route](https://nextjs.org/docs/api-routes/introduction) و [NextAuth.js](https://next-auth.js.org/).

<sub>(في حالة NextAuth.js, tRPC or tRPC + Prisma)</sub>

#### ملف `src/pages/api/auth/[...nextauth].ts`

ملف `[...nextauth].ts` هو ملف تابع لمكتبة NextAuth.js، ويتم إستخدامه في طلبات التوثيق authentication، إقرأ [NextAuth.js usage](usage/next-auth) و [Next.js Dynamic Routes Docs](https://nextjs.org/docs/routing/dynamic-routes) لمزيد من المعلومات.

<sub>(في حالة NextAuth.js)</sub>

#### ملف `src/pages/api/trpc/[trpc].ts`

ملف `[trpc].ts` يُعتبر المدخلي الـ tRPC، ,وتُستخدم لتنفيذ طلبات tRPC.
إقرأ [Next.js Dynamic Routes Docs](https://nextjs.org/docs/routing/dynamic-routes) و
[tRPC usage](usage/trpc#-pagesapitrpctrpcts)

<sub>(في حالة tRPC)</sub>

### ملف `src/server`

يُستخدم مجلد `server` للفصل بوضوح بين التعليمات البرمجية من جانب الخادم(Server Side) والتعليمات البرمجية من جانب العميل (Client Side)

<sub>(في حالة tRPC and/or Prisma)</sub>

### ملف `src/server/common`

مجلد `common` يستخدم للـ Functions التي يكثر إستخدامها.

<sub>(في حالة NextAuth.js + tRPC)</sub>

#### ملف `src/server/common/get-server-auth-session.ts`

ملف `get-server-auth-session.ts` يتم استخدامه لجلب الـ Session Object من جانب الـ Server. إقرأ [NextAuth.js usage](usage/next-auth#usage-with-trpc)

<sub>(في حالة NextAuth.js + tRPC)</sub>

#### ملف `src/server/db/client.ts`

ملف `client.ts` يستخدم لإنشاء نُسخة لـ Prisma Client علي مستوي التطبيق كلة، إقرأ المزيد [Prisma usage](usage/prisma#prisma-client)

<sub>(في حالة Prisma)</sub>

### ملف `src/server/trpc`

مجلد tRPC يحتوي على كود tRPC للسيرفر

<sub>(في حالة tRPC)</sub>

#### ملف `src/server/trpc/context.ts`

ملف `context.ts` يُستخدم لإنشاء context في كل طلب tRPC، إقرأ [tRPC usage](usage/trpc#-servertrpccontextts)

<sub>(في حالة tRPC)</sub>

#### ملف `src/server/trpc/trpc.ts`

إقرأ [tRPC usage](usage/trpc#-servertrpctrpcts)

<sub>(في حالة tRPC)</sub>

### ملف `src/server/trpc/router`

يحتوي على `tRPC routers`

<sub>(في حالة tRPC)</sub>

#### ملف `src/server/trpc/router/_app.ts`

ملف `_app.ts` يُستخدم لدمج tRPC routers في router واحد كما هو الحل في الـ types، إقرأ المزيد هنا [tRPC usage](usage/trpc#-servertrpcrouterts)

<sub>(في حالة tRPC)</sub>

#### ملف `src/server/trpc/router/auth.ts`

ملف `auth.ts` هو مثال لاستخدام `protectedProcedure helper` في حماية route معين.
<sub>(في حالة NextAuth.js + tRPC)</sub>

#### ملف `src/server/trpc/router/example.ts`

ملف `example.ts` هو مثال لإستخدام `publicProcedure` لإنشاء public tRPC route

<sub>(في حالة tRPC)</sub>

### ملف `src/styles`

مجلد `styles` يحتوي على الـ stylesheets

<sub>(في حالة Tailwind CSS)</sub>

### ملف `src/types`

مجلد `types` يحتوي على الـ Types

<sub>(في حالة NextAuth.js)</sub>

#### ملف `src/types/next-auth.d.ts`

ملف `next-auth.d.ts` يُسنخدم للتعديل على إعدادات NextAuth الافتراضية، لمزيد من المعلومات [NextAuth.js usage](usage/next-auth#inclusion-of-userid-on-the-session).

<sub>(في حالة NextAuth.js)</sub>

### ملف `src/utils`

مجلد `utils` يُستخدم للـ functions التي يكثر إستخدامها.

<sub>(في حالة tRPC)</sub>

#### ملف `src/utils/trpc.ts`

ملف `trpc.ts` يُسخدم كـ entrypoint لـ tRPC، إقرأ المزيد هنا [tRPC usage](usage/trpc#-utilstrpcts)

<sub>(في حالة tRPC)</sub>

### ملف `.env`

ملف `.env` يُستخدم لتخزين `environment variables`، إقرأ المزيد [Environment Variables](usage/env-variables)

### ملف `.env.example`

ملف `.env.example` هو مثال لإستخدام `example environment`.

### ملف `.eslintrc.json`

ملف `.eslintrc.json` يٌستخدم لإعداد ESLint، إقرأ المزيد هنا [ESLint Docs](https://eslint.org/docs/latest/user-guide/configuring/configuration-files)

### ملف `next-env.d.ts`

وظيفة `next-env.d.ts` هي التأكد من أن Typescript تأخذ Next.js Types في الحسبان. **لا تُعدل عليها ولا تحذفها**، لمزيد من المعلومات [Next.js Docs](https://nextjs.org/docs/basic-features/typescript#existing-projects)

### ملف `next.config.mjs`

وظيفة `next.config.mjs` هي إعداد Next.js، لمزيد من المعلومات [Next.js Docs](https://nextjs.org/docs/api-reference/next.config.js/introduction)

### ملف `postcss.config.cjs`

ملف `postcss.config.cjs` هو ضروري لـ TailwindCSS لمزيد من المعلومات [Taiwind PostCSS Docs](https://tailwindcss.com/docs/installation/using-postcss).

<sub>(في حالة Tailwind CSS)</sub>

### ملف `prettier.config.cjs`

ملف `prettier.config.cjs` يُسخدم لإعداد Prettier ولإضافة prettier-plugin-tailwindcss لعمل `formatting` لـ Tailwind CSS classes، لمزيد من المعلومات [Tailwind CSS blog post](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)

<sub>(في حالة Tailwind CSS)</sub>

### ملف `tsconfig.json`

وظيفة `tsconfig.json` هي إعداد TypeScript، لمزيد من المعلومات إقرأ [TypeScript Docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) أو [TypeScript Usage](usage/typescript)
