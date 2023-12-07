---
title: Drizzle
description: Usage of Drizzle
layout: ../../../layouts/docs.astro
lang: en
---

Drizzle ORM is dialect specific, slim, performant and serverless ready by design.

## Drizzle Client

Located at `src/server/db/index.ts`, the Drizzle Client exported to be used in your API routes. Unlike prisma, the Drizzle client is not included in the [Context](/en/usage/trpc#-serverapitrpcts).

## Schema

You will find the Drizzle schema file at `src/server/db/schema.ts`. This file is where you define your database schema and models, but you can separate it into multiple files if you want, see how to do it at the [Drizzle schema documentation](https://orm.drizzle.team/docs/sql-schema-declaration). Drizzle is dialect specific and currently supports MySQL, PostgreSQL and SQLite.

### With NextAuth.js

When you select NextAuth.js in combination with Drizzle, the schema file is generated and set up for you with the recommended values for the `User`, `Session`, `Account`, and `VerificationToken` models, as per the [NextAuth.js documentation](https://authjs.dev/reference/adapter/drizzle).

## Default Database

The default database is a MySql database, using the PlanetScale serverless client, so it is edge ready out of the box! All you need to do is spin up a database at PlanetScale (up to one instance in free-tier BTW) and copy and paste the connection string in the `.env` file. Don't forget to add `ssl={"rejectUnauthorized":true}` to the end of the string.

## Seeding your Database

Seeding your database is a great way to quickly populate your database with test data to help you get started. In order to setup seeding, you will need to create a `seed.ts` file in the `src/server/db/` directory, and then add a `seed` script to your `package.json` file. You'll also need some TypeScript runner that can execute the seed-script. We recommend [tsx](https://github.com/esbuild-kit/tsx), which is a very performant TypeScript runner that uses esbuild and doesn't require any ESM configuration, but `ts-node` or other runners will work as well.

```jsonc:package.json
{
  "scripts": {
    "db:seed": "tsx src/server/db/seed.ts",
  },
}
```

```ts:src/server/db/seed.ts
import { db } from ".";
import { posts, users } from "./schema";

async function seed() {
  console.log("Seeding...");

  const usersToCreate: (typeof users.$inferInsert)[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@doe.com",
    },
  ];

  const postsToCreate: (typeof posts.$inferInsert)[] = [
    {
      id: 1,
      name: "My first post",
      createdById: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await db.transaction(async (trx) => {
    await trx.insert(users).values(usersToCreate);
    await trx.insert(posts).values(postsToCreate);
  });

  console.log("Seeded!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

Then, just run `pnpm db:seed` (or `npm`/`yarn`) to seed your database.

## Useful Resources

| Resource                     | Link                                                      |
| ---------------------------- | --------------------------------------------------------- |
| Drizzle Docs                 | https://orm.drizzle.team/docs/overview                    |
| Drizzle GitHub               | https://github.com/drizzle-team/drizzle-orm               |
| NextAuth.JS Drizzle Adapter  | https://authjs.dev/reference/adapter/drizzle              |
| Planetscale Connection Guide | https://planetscale.com/docs/tutorials/connect-nextjs-app |
