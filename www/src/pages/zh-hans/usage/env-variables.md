---
title: 环境变量
description: Getting started with create-t3-app
layout: ../../../layouts/docs.astro
lang: zh-hans
---

通过在 `env` 目录下的一些额外配置文件，Create-T3-App 在运行时 _和_ 编译时使用 [Zod](https://github.com/colinhacks/zod) 来验证你的环境变量：

📁 src/env

┣ 📄 client.mjs

┣ 📄 schema.mjs

┣ 📄 server.mjs

这些配置文件的内容乍看之下可能很吓人，但不必惊慌，它并非看起来那般复杂。让我们逐个分析，并展示添加额外环境变量的整个流程。

_简而言之，如果你想要添加一个新的环境变量，你需要在 `.env` 中添加变量的同时，在 `env/schema.mjs` 里定义好对应的验证逻辑。_

## schema.mjs

你会在这个文件编写环境变量的验证逻辑。它包含了两个 schema，一个用于验证服务端的环境变量，一个用于验证客户端的环境变量.

```ts:env/schema.mjs
export const serverSchema = z.object({
  // DATABASE_URL: z.string().url(),
});

export const clientSchema = z.object({
  // NEXT_PUBLIC_WS_KEY: z.string(),
});
```

### 服务端 schema

在这里定义你项目服务端的环境变量。

确保在这里不要给变量添加前缀 `NEXT_PUBLIC`。 如果你添加了，验证会无法通过，这样可以帮你检测到无效的配置。

### 客户端 Schema

在这里定义你项目客户端的环境变量。

为了将它们暴露出来，你需要给他们添加前缀 `NEXT_PUBLIC`。如果你没有这么做，验证会无法通过，这样可以帮助你检测到无效的配置。

```ts
// ❌ 这将不会生效，我们需要手动解构
const schema = z.object({
  NEXT_PUBLIC_WS_KEY: z.string(),
});

const validated = schema.parse(process.env);
```

## server.mjs 和 client.mjs

验证会在这两个文件里进行，它们会将验证过的对象导出。你不应该修改这些文件。

## 使用环境变量

当你想要使用环境变量时，你可以从 `env/client.mjs` 或 `env/server.mjs` 文件中导入它们，这取决于你想在客户端还是服务端使用它们：

```ts:pages/api/hello.ts
import { env } from "../../env/server.mjs";

// `env` 完全类型安全并能提供自动完成
const dbUrl = env.DATABASE_URL;
```

## .env.example

因为默认的 `.env` 文件并不会被提交到版本管理中，所以我们提供了 `.env.example` 文件，你可以将这个文件作为 `.env` 文件的复本，不过务必记得要移除敏感密钥。虽然将 `env` 内容同步到这个文件不是强制性的，但我们还是推荐及时更新这个文件，以便尽可能使贡献者们能快速使用环境变量。

一些框架和构建工具，例如 Next.js，会建议我们将密钥存储在 `.env.local` 文件，然后将 `.env` 文件提交到仓库里。实际上我们并不推荐这么做，因为这样很容易会导致我们不小心将密钥提交到仓库里。相反地，我们推荐你将密钥保存到 `.env` 文件里，然后将它添加到 `.gitignore` 中，然后仅将 `.env.example` 提交到你的仓库。

## 添加环境变量

为了确保你的应用只有在满足必要环境变量的情况才会完成构建，你将需要在**两**个地方添加环境变量：

📄 `.env`: 在这里输入环境变量，就像你之前在常规 `.env` 文件中做的那样，比如添加 `KEY=VALUE`

📄 `schema.mjs`: 在这里通过 Zod 定义验证 schema，例如 `KEY: z.string()`，给新加的环境变量添加适当的验证逻辑

可选地，你也可以修改 `.env.example`：

📄 `.env.example`: 输入你的环境变量，但是确保不要包含密钥信息，例如 `KEY=VALUE`，则把 `VALUE` 去掉只留 `KEY=`

### 示例

_我想将我的推特 API 令牌作为服务端环境变量添加_

1. 在 `.env` 添加环境变量：

```
TWITTER_API_TOKEN=1234567890
```

2. 在 `schema.mjs` 中添加环境变量：

```ts
export const serverSchema = z.object({
  // ...
  TWITTER_API_TOKEN: z.string(),
});
```

_**注意:** 一个空的字符串仍然是一个字符串，所以 `z.string()` 会认为它是一个有效值。如果你想要确保环境变量的值不能为空，你可以使用 `z.string().min(1)`。_

3. 可选的：将环境变量添加到 `.env.example`，但不包含令牌：

```
TWITTER_API_TOKEN=
```
