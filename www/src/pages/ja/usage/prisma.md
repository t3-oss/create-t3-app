---
title: Prisma
description: Prismaの使用方法
layout: ../../../layouts/docs.astro
lang: ja
---

Prisma is an ORM for TypeScript, that allows you to define your database schema and models in a `schema.prisma` file, and then generate a type-safe client that can be used to interact with your database from your backend.

Prisma は TypeScript 用の ORM で、`schema.prisma`ファイルでデータベーススキーマとモデルを定義し、バックエンドからデータベースと対話するために使用できるタイプセーフクライアントを生成することができます。

## Prisma Client

Located at `src/server/db.ts`, the Prisma Client is instantiated as a global variable (as recommended as [best practice](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem) by the team at Prisma) and exported to be used in your API routes. We include the Prisma Client in [Context](/en/usage/trpc#-serverapitrpcts) by default and recommend using this instead of importing it separately in each file.

## Prisma Client

`src/server/db.ts`にある Prisma Client は、グローバル変数としてインスタンス化され（Prisma のチームが[best practice](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem)として推奨）、API ルートで使用するためにエクスポートされます。Prisma クライアントは、デフォルトで[Context](/ja/usage/trpc#-serverapitrpcts)に含まれており、各ファイルで個別にインポートするのではなく、こちらを使用することを推奨します。

## Schema

You will find the Prisma schema file at `/prisma/schema.prisma`. This file is where you define your database schema and models, and is used when generating the Prisma Client.

## スキーマ

Prisma のスキーマファイルは、`/prisma/schema.prisma`にあります。このファイルでデータベーススキーマとモデルを定義し、Prisma クライアントを生成するときに使用します。

### With NextAuth.js

When you select NextAuth.js in combination with Prisma, the schema file is generated and set up for you with the recommended values for the `User`, `Session`, `Account`, and `VerificationToken` models, as per the [NextAuth.js documentation](https://next-auth.js.org/adapters/prisma).

### NextAuth.js との併用

NextAuth.js と Prisma の組み合わせを選択すると、[NextAuth.js ドキュメント](https://next-auth.js.org/adapters/prisma)にあるように、`User`, `Session`, `Account`, `VerificationToken`モデルの推奨値でスキーマファイルを生成してセットアップします。

## Default Database

The default database is an SQLite database, which is great for development and quickly spinning up a proof-of-concept but is not recommended for production. You can change the database to use by changing the `provider` in the `datasource` block to either `postgresql` or `mysql`, and then updating the connection string within environment variables to point to your database.

## デフォルトのデータベース

デフォルトのデータベースは SQLite データベースで、開発や概念実証を素早く行うには適していますが、本番環境ではお勧めできません。使用するデータベースを変更するには、`datasource` ブロックの `provider` を `postgresql` または `mysql` に変更し、環境変数内の接続文字列をあなたのデータベースを指すように更新する必要があります。

## Seeding your Database

[Seeding your database](https://www.prisma.io/docs/guides/database/seed-database) is a great way to quickly populate your database with test data to help you get started. In order to setup seeding, you will need to create a `seed.ts` file in the `/prisma` directory, and then add a `seed` script to your `package.json` file. You'll also need some TypeScript runner that can execute the seed-script. We recommend [tsx](https://github.com/esbuild-kit/tsx), which is a very performant TypeScript runner that uses esbuild and doesn't require any ESM configuration, but `ts-node` or other runners will work as well.

## データベースのシーディング

[データーベースのシーディング](https://www.prisma.io/docs/guides/database/seed-database)は、データベースにテストデータを素早く投入し、使い始めるのに役立つ素晴らしい方法です。シーディングを設定するには、`/prisma`ディレクトリに `seed.ts` ファイルを作成し、`seed` スクリプトを `package.json` ファイルに追加する必要があります。また、seed スクリプトを実行できる TypeScript ランナーも必要です。esbuild を使用し、ESM の設定を必要としない非常にパフォーマンスの高い TypeScript ランナーである[tsx](https://github.com/esbuild-kit/tsx)をお勧めしますが、`ts-node`やその他のランナーでも動作します。

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
import { prisma } from "../src/server/db";

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

Then, just run `pnpm db-seed` (or `npm`/`yarn`) to seed your database.

その後、`pnpm db-seed` (または `npm`/`yarn`) を実行して、データベースをシードします。

## Useful Resources

| Resource                     | Link                                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prisma Docs                  | https://www.prisma.io/docs/                                                                                                                       |
| Prisma GitHub                | https://github.com/prisma/prisma                                                                                                                  |
| Prisma Migrate Playground    | https://playground.prisma.io/guides                                                                                                               |
| NextAuth.JS Prisma Adapter   | https://next-auth.js.org/adapters/prisma                                                                                                          |
| Planetscale Connection Guide | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |

## お役立ち情報

| リソース                                | リンク                                                                                                                                            |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prisma ドキュメント                     | https://www.prisma.io/docs/                                                                                                                       |
| Prisma GitHub                           | https://github.com/prisma/prisma                                                                                                                  |
| Prisma マイグレーションプレイグラウンド | https://playground.prisma.io/guides                                                                                                               |
| NextAuth.JS Prisma アダプタ             | https://next-auth.js.org/adapters/prisma                                                                                                          |
| Planetscale 接続ガイド                  | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
