---
title: Prisma
description: إستخدام Prisma
layout: ../../../layouts/docs.astro
lang: ar
dir: rtl
---

مكتبة Prisma هي ORM مكتوب لغة TypeScript والتي تسمح للمطور أن يُخصص Schema لقاعدة البيانات في ملف `schema.prisma` من ثَم يقوم بتوليد type-safe client والذي بدوره يتفاعل مع قاعدة البيانات.

## ما هو Prisma Client

يقع في `/server/db/client.ts` ويعمل كـ global variable كما تنصح الـ docs الرسمية [best practice](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem) ,وننصحك باستخدامها كذلك بدلا من ندائها في ملف بشكل منفرد [Context](usage/trpc#-serverapitrpcts)

## الـ Schema

سوف تجد الـ Schema في `/prisma/schema.prisma` حيث تقوم بتخصيص الـ schema الخاص بقاعدة البيانات والتي يتم استخدامها لتوليد Prisma Client.

### مع NextAuth.js

عندما تستخدم Prisma مع NextAuth فان الـ Adapter يتحمل عنك عناء توليد الـ `User`, `Session`, `Account`, and `VerificationToken` mo، إقرأ المزيد هنا [NextAuth.js documentation](https://next-auth.js.org/adapters/prisma).

## Default Database

قاعدة البيانات الافتراضية هي قاعدة بيانات SQLite ، وهي رائعة لتطوير وتسريع عملية proof-of-concept ولكن لا يوصى بها للإنتاج. يمكنك تغيير قاعدة البيانات لاستخدامها عن طريق تغيير `provider` في الـ DataSource Object إلى `postgresql` أو `mysql` ، ثم تحديث URL داخل `.env` إلى قاعدة البيانات الخاصة بك.

## Seeding your Database

[يُعد زرع قاعدة البيانات](https://www.prisma.io/docs/guides/database/seed-database)
طريقة رائعة لملء قاعدة البيانات بسرعة ببيانات الاختبار لمساعدتك على البدء. من أجل إعداد البذور
من أجل إعداد البذر ، ستحتاج إلى إنشاء `seed.ts` في مُجلد `prisma/` ، ثم قم بإضافة `seed` script إلى ملف package.json الخاص بك. ستحتاج أيضًا إلى مُشغل TypeScript يمكنه تنفيذ الـ script. نحن نُوصي بـ tsx ، وهو عِبارة عَن مُشغل TypeScript عالي الأداء يَستخدم esbuild ولا يتطلب أي تكوين ESM ، ولكن ts-node أو أي من المُشغلين الاخرين سيفي بالغرض.

```jsonc:package.json
{
  "scripts": {
    "db-seed": "NODE_ENV=development prisma db seed"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

```ts:prisma/seed.ts
import { prisma } from "../src/server/db/client";

async function main() {
  const id = "cl9ebqhxk00003b600tymydho";
  await prisma.example.upsert({
    where: {
      id,
    },
    create: {
      id,
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

ثُم قُم بتشغيل `pnpm db-seed` او `npm` او `yarn`

## مصادر مُفيدة

| المَصدر                      | الرابط                                                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prisma Docs                  | https://www.prisma.io/docs/                                                                                                                       |
| Prisma GitHub                | https://github.com/prisma/prisma                                                                                                                  |
| NextAuth.JS Prisma Adapter   | https://next-auth.js.org/adapters/prisma                                                                                                          |
| Planetscale Connection Guide | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
