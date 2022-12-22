---
title: Prisma
description: Prisma 的用法
layout: ../../../layouts/docs.astro
lang: zh-hans
---

Prisma 是一个 TypeScript 的 ORM (Object-relational mapping) 工具，它允许你在文件 `schema.prisma` 中为你的数据库定义数据结构和模型，然后借此生成一个类型安全的客户端，从而在后端和你的数据库进行交互。

## Prisma 客户端

Prisma 客户端位于文件 `/server/db/client.ts`， 以全局变量被初始化（这被推荐为 [最佳实践](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem)），然后被导出用于你的各个 API 路由函数中。我们默认将 Prisma 客户端放置在 [上下文](/en/usage/trpc#-servertrpccontextts)，鼓励通过访问上下文来使用它，这样就无需在每个文件里导入了。

## Schema

你可以在 `/prisma/schema.prisma` 找到 Prisma 的 schema。在这个文件中你可以定义数据库的数据结构和模型，同时它也会被用于生成 Prisma 客户端。

### 搭配 NextAuth.js

当你选择 NextAuth.js 搭配 Prisma 使用时，根据 [NextAuth.js 文档](https://next-auth.js.org/adapters/prisma)，schema 文件会被自动生成，其中默认包含了 `User`、`Sessiong`、`Acount` 和 `VerificationToken` 模型，并已经自动添加了推荐的字段。

## 默认数据库

默认数据库是一个 SQLite 数据库，这对开发阶段来说很棒，因为它能够快速启动概念验证，但不推荐用于生产环境。你可以将 `datasource` 中的 `provider` 修改为 `postgresql` 或 `mysql`，然后在环境变量里修改一下对应数据库的连接地址，来更换数据库。

## 给数据库填充初始数据

[给数据库填充初始数据](https://www.prisma.io/docs/guides/database/seed-database) 是一种很好的方法，它能快速给你的数据库填充测试数据以帮助你开始。为了设置填充，你将需要在目录 `/prisma` 下创建一个 `seed.ts` 脚本文件，然后在 `package.json` 文件中添加 `seed` 命令。你也会需要一个 TypeScript 执行环境来运行该数据填充脚本。我们推荐 [tsx](https://github.com/esbuild-kit/tsx)，它采用 esbuild，是一个性能很好的 TypeScript 执行环境，无需额外的 ESM 配置，不过也可以使用 `ts-node` 或其他执行环境。

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

然后，运行命令 `pnpm db-seed`（或 `npm` / `yarn`）来给数据库填充初始数据。

## 有用的资源

| 资源                      | 链接                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prisma 文档               | https://www.prisma.io/docs/                                                                                                                       |
| Prisma GitHub             | https://github.com/prisma/prisma                                                                                                                  |
| NextAuth.JS Prisma 适配器 | https://next-auth.js.org/adapters/prisma                                                                                                          |
| Planetscale 连接指引      | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
