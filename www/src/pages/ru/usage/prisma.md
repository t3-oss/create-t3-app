---
title: Prisma
description: Использование Prisma
layout: ../../../layouts/docs.astro
lang: ru
---

Prisma это ORM для TypeScript, который позволяет определять схему и модели базы данных в файле `schema.prisma`, а затем генерировать клиент, который обеспечивает типобезопасность и может использоваться для взаимодействия с базой данных из вашего бэкенда.

## Prisma Client

Расположенный в `/server/db/client.ts`, Prisma Client инициализируется как глобальная переменная (как рекомендовано [лучшими практиками](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem) команды Prisma) и экспортируется для использования в ваших API маршрутах. Мы включаем Prisma Client в [Context](/ru/usage/trpc#-serverapitrpcts) по умолчанию и рекомендуем использовать его вместо отдельного импорта в каждом файле.

## Схема

Вы найдете файл схемы Prisma в `/prisma/schema.prisma`. Этот файл используется для определения схемы и моделей базы данных, а также для генерации Prisma Client.

### С NextAuth.js

Когда вы выбираете NextAuth.js в сочетании с Prisma, файл схемы генерируется и настраевается для вас с рекомендуемыми значениями для моделей `User`, `Session`, `Account` и `VerificationToken`, согласно [документации NextAuth.js](https://next-auth.js.org/adapters/prisma).

## База данных по умолчанию

База данных по умолчанию - это база данных SQLite, которая отлично подходит для разработки и быстрого создания proof-of-concept, но не рекомендуется для использования в продакшене. Вы можете изменить базу данных, используя `provider` в блоке `datasource` на `postgresql` или `mysql`, а затем обновить строку подключения в переменных окружения, чтобы указать на вашу базу данных.

## Заполнение (seeding) базы данных

[Заполнение (seeding) вашей базы данных](https://www.prisma.io/docs/guides/database/seed-database) - это отличный способ быстро заполнить вашу базу данных тестовыми данными, чтобы помочь вам начать. Чтобы настроить заполнение, вам нужно создать файл `seed.ts` в каталоге `/prisma` и затем добавить скрипт `seed` в файл `package.json`. Вам также понадобится некоторый TypeScript-раннер, который может выполнить скрипт заполнения. Мы рекомендуем [tsx](https://github.com/esbuild-kit/tsx), который является очень эффективным TypeScript-раннером, который использует esbuild и не требует какой-либо конфигурации ESM, но `ts-node` или другие раннеры также будут работать.

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

Затем, просто запустите `bun db-seed` (или `npm`/`yarn`), чтобы заполнить вашу базу данных.

## Полезные ресурсы

| Ресурс                          | Ссылка                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Документация Prisma             | https://www.prisma.io/docs/                                                                                                                       |
| Prisma GitHub                   | https://github.com/prisma/prisma                                                                                                                  |
| NextAuth.JS Адаптер для Prisma  | https://next-auth.js.org/adapters/prisma                                                                                                          |
| Гайд по подключению PlanetScale | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
