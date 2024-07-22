---
title: Prisma
description: Використання Prisma
layout: ../../../layouts/docs.astro
lang: uk
---

Prisma це ORM для TypeScript, який дозволяє визначати схему та моделі бази даних у файлі `schema.prisma`, а потім генерувати клієнт, який забезпечує типобезпеку та може використовуватись для взаємодії з базою даних з вашого бекенда.

## Prisma Client

Розташований в `/server/db/client.ts`, Prisma Client ініціалізується як глобальна змінна (як рекомендовано [кращими практиками](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem) команди Prisma) та експортується для використання у ваших API маршрутах. Ми включаємо Prisma Client у [Context](/uk/usage/trpc#-serverapitrpcts) за замовчуванням і рекомендуємо використовувати його замість окремого імпорту у кожному файлі.

## Схема

Ви знайдете файл схеми Prisma в `/prisma/schema.prisma`. Цей файл використовується для визначення схеми та моделей баз даних, а також для генерації Prisma Client.

### З NextAuth.js

Коли ви вибираєте NextAuth.js у поєднанні з Prisma, файл схеми генерується і налаштовується для вас з рекомендованими значеннями для моделей `User`, `Session`, `Account` та `VerificationToken`, згідно з [документацією NextAuth.js](https://next-auth.js.org/adapters/prisma).

## База даних за замовчуванням

База даних за замовчуванням - це база даних SQLite, яка відмінно підходить для розробки та швидкого створення proof-of-concept, але не рекомендується для використання у продакшені. Ви можете змінити базу даних, використовуючи 'provider' в блоці 'datasource' на 'postgresql' або 'mysql', а потім оновити рядок підключення до змінних середовища, щоб вказати на вашу базу даних.

## Заповнення (seeding) бази даних

[Заповнення (seeding) вашої бази даних](https://www.prisma.io/docs/guides/database/seed-database) - це чудовий спосіб швидко заповнити вашу базу даних тестовими даними, щоб допомогти вам розпочати. Щоб налаштувати заповнення, вам потрібно створити файл `seed.ts` у каталозі `/prisma` і потім додати скрипт `seed` у файл `package.json`. Вам також знадобиться певний TypeScript-раннер, який може виконати скрипт заповнення. Ми рекомендуємо [tsx](https://github.com/esbuild-kit/tsx), який є дуже ефективним TypeScript-раннером, який використовує esbuild і не вимагає будь-якої конфігурації ESM, але `ts-node` або інші раннери також працюватимуть.

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
import { db } from "../src/server/db";

async function main() {
  const id = "cl9ebqhxk00003b600tymydho";
  await db.example.upsert({
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
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
```

Потім, просто запустіть `pnpm db-seed` (або `npm`/`yarn`), щоб заповнити вашу базу даних.

## Корисні ресурси

| Ресурс                         | Посилання                                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Документація Prisma            | https://www.prisma.io/                                                                                                                            |
| Prisma GitHub                  | https://github.com/prisma/                                                                                                                        |
| Prisma Migrate Playground      | https://playground.prisma.io/guides                                                                                                               |
| NextAuth.JS Адаптер для Prisma | https://next-auth.js.org/adapters/                                                                                                                |
| Гайд з підключення PlanetScale | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
