---
title: Prisma
description: Prismaの使用方法
layout: ../../../layouts/docs.astro
lang: ja
---

Prisma は TypeScript のための ORM で、`schema.prisma`ファイルでデータベーススキーマとモデルを定義し、バックエンドからデータベースとやり取りするための型安全なクライアントを生成することができます。

## Prisma Client

`src/server/db.ts`にある Prisma Client は、グローバル変数としてインスタンス化され（Prisma チームが[ベストプラクティス](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem)として推奨）、API ルートで使用するためにエクスポートされます。Prisma クライアントは、デフォルトで [コンテキスト](/ja/usage/trpc#-serverapitrpcts) に含まれており、各ファイルで個別にインポートするのではなく、こちらを使用することを推奨します。

## スキーマ

Prisma のスキーマファイルは、`/prisma/schema.prisma`にあります。このファイルでデータベーススキーマとモデルを定義し、Prisma クライアントを生成する際に使用されます。

### NextAuth.js と組み合わせた場合

NextAuth.js と Prisma を組み合わせて選択すると、`User`, `Session`, `Account`, `VerificationToken`モデルの推奨値が[NextAuth.js ドキュメント](https://next-auth.js.org/adapters/prisma)に従って設定されてスキーマファイルが生成されます。

## デフォルトのデータベース

デフォルトのデータベースは SQLite データベースで、開発や PoC(概念実証) を素早く行うのには適していますが、本番環境での使用はお勧めできません。使用するデータベースを変更するには、`datasource` ブロックの `provider` を `postgresql` または `mysql` に変更し、環境変数内の接続文字列でデータベースを指定します。

## データベースのシーディング

[データーベースのシーディング](https://www.prisma.io/docs/guides/database/seed-database)(訳註: データベース構築時にダミーデータや初期データを投入すること)は、データベースに素早くテストデータを投入して開始するのにとても役立ちます。シーディングを設定するには、`/prisma`ディレクトリに `seed.ts` ファイルを作成し、シードスクリプトを `package.json` ファイルに追加する必要があります。また、シードスクリプトを実行できる TypeScript ランナーも必要です。TypeScript ランナーには、esbuild を使用し、ESM 設定を必要としない非常にパフォーマンスの高い [tsx](https://github.com/esbuild-kit/tsx) をお勧めしますが、`ts-node`やその他のランナーも使えます。

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

その後、`pnpm db-seed` (または `npm`/`yarn`) を実行して、データベースへのシーディングを実行します。

## お役立ち情報

| リソース                                | リンク                                                                                                                                            |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prisma ドキュメント                     | https://www.prisma.io/docs/                                                                                                                       |
| Prisma GitHub                           | https://github.com/prisma/prisma                                                                                                                  |
| Prisma マイグレーションプレイグラウンド | https://playground.prisma.io/guides                                                                                                               |
| NextAuth.JS Prisma アダプタ             | https://next-auth.js.org/adapters/prisma                                                                                                          |
| PlanetScale 接続ガイド                  | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
