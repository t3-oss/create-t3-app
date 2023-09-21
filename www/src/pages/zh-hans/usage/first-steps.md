---
title: 第一步
description: 从你的全新 T3 App 开始吧
layout: ../../../layouts/docs.astro
lang: zh-hans
---

你刚刚创建了一个全新的 T3 App，并准备好继续。下面是一些最简化的必要准备，来让你的 App 运行起来。

## 数据库

如果你的 App 包括了 Prisma，务必记得从项目根目录运行命令 `npx prisma db push`。 这行命令将同步 Prisma schema 和你的数据库，并且会根据 schema 为 Prisma 客户端生成对应的类型声明。注意你在完成这一步之后，需要 [重启 TypeScript 服务器](https://tinytip.co/tips/vscode-restart-ts/)，以便它能够检测到那些生成的类型。

### Drizzle

如果你的 App 包含了 Drizzle，请查看 `.env` 文件，了解如何构建你的 `DATABASE_URL` 环境变量。当 env 文件准备就绪后，运行 `pnpm db:push`（或其他软件包管理器的类似方法）来推送你的 schema。

## 认证

如果你的 App 包含了 NextAuth.js，那我们可以先从 `DiscordProvider` 开始。这是 NextAuth.js 提供的最简单的第三方服务之一，但是它仍然需要你做一些初始化的操作。

当然，如果你倾向于使用另一个第三方认证服务，你可以在 NextAuth.js 支持的 [服务列表](https://next-auth.js.org/providers/) 中找到你想要的服务。

1. 你将需要一个 Discord 账号，所以如果你没有，请先注册一个。
2. 前往 <https://discord.com/developers/applications> 然后在右上角点击 "New Application"。给你的应用创建一个名称，并同意相关的服务条款。
3. 当你的应用被创建后，前往 "Settings → OAuth2 → General"。
4. 复制 "Client ID" 然后作为 `DISCORD_CLIENT_ID` 添加到 `.env`。
5. 点击 "Reset Secret"，复制新的密钥，然后作为 `DISCORD_CLIENT_SECRET` 添加到 `.env`。
6. 点击 "Add Redirect"，然后输入 `http://localhost:3000/api/auth/callback/discord`。
   - 对于生产环境的部署，按照之前的步骤来创建另一个 Discord 应用，但是这一次将链接 `http://localhost:3000` 替换为实际生产环境的链接。
7. 保存你的更改。
8. 在 `.env` 中设置 `NEXTAUTH_SECRET`。在开发过程中，任何字符串都能起效，但对于生产环境，记得查看 `.env` 文件中关于生成安全密钥的注释。

你现在应该可以登入到你的应用中了。

## 编辑器设置

为了获得最佳的开发者体验，建议安装以下扩展。下面的链接提供了针对特定编辑器的插件支持。

- [Prisma 扩展](https://www.prisma.io/docs/guides/development-environment/editor-setup)
- [Tailwind CSS IntelliSense 扩展](https://tailwindcss.com/docs/editor-setup)
- [Prettier 扩展](https://prettier.io/docs/en/editors.html)

## 下一步

- 如果你的应用包含了 tRPC，参看 `src/pages/index.tsx` 和 `src/server/api/routers/example.ts` 来了解 tRPC 查询是如何工作的。
- 浏览 Create T3 App 的文档，以及你应用中所用到包的文档。
- 加入到我们的 [Discord](https://t3.gg/discord) 中，并记得在 [GitHub](https://github.com/t3-oss/create-t3-app) 上给我们的项目点颗星！ :)
