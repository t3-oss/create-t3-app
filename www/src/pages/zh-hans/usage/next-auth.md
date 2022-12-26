---
title: NextAuth.js
description: NextAuth.js 的用法
layout: ../../../layouts/docs.astro
lang: zh-hans
---

当你想在你的 Next.js 应用中集成认证系统时，NextAuth.js 是一个很好的解决方案，它为我们引入了足够复杂的安全措施，而无需我们自己去构建。它广泛支持不同的服务，能够快速将 OAuth 认证集成进来，并为许多数据库和 ORM 提供了适配器。

## Context Provider

在你应用的入口处，你会看到整个应用被 [SessionProvider](https://next-auth.js.org/getting-started/client#sessionprovider) 包裹：

```tsx:pages/_app.tsx
<SessionProvider session={session}>
  <Component {...pageProps} />
</SessionProvider>
```

这个上下文 provider 能使你在应用的任何地方访问到 session 数据，而不需要一层一层地将它作为参数传递：

```tsx:pages/users/[id].tsx
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  if (!session) {
    // 处理未认证的情况，例如渲染一个登入组件
    return <SignIn />;
  }

  return <p>Welcome {session.user.name}!</p>;
};
```

## 在 session 中添加 `user.id`

默认设置下， `create-t3-app` 利用了 NextAuth.js 配置里的 [session 回调函数](https://next-auth.js.org/configuration/callbacks#session-callback) 来帮你将用户的 ID 添加到 `session` 对象里。

```ts:pages/api/auth/[...nextauth].ts
callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
```

这耦合了类型声明文件，来保证从 `session` 对象里获取 `user.id` 时，它是类型安全的。 参看 NextAuth.js 的文档，阅读更多关于 [`模块扩充`](https://next-auth.js.org/getting-started/typescript#module-augmentation)。

```ts:types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
```

你也可以用同样的方法将其他数据，例如 `role` 字段加入到 `session` 对象里，**但不应该被滥用于在客户端存储敏感数据**。

## 搭配 tRPC 的用法

当你搭配 NextAuth.js 和 tRPC 一同使用时，你可以通过 [中间件](https://trpc.io/docs/v10/middlewares) 来创建可复用的、受保护的 procedure 路由函数。只有登入后的用户才能访问这些受保护的路由。`create-t3-app` 已经为你铺好了路，使你能够在认证路由里轻松访问到 session 里的数据。

这个过程可以被分为两步完成：

1. 先通过函数 [`unstable_getServerSession`](https://next-auth.js.org/configuration/nextjs#unstable_getserversession) 从请求头里获得 session。无需担心，这个函数可以被安全地使用 —— 它的名字包含 `unstable` 是因为这个 API 未来很可能会被修改而已。使用 `unstable_getServerSession` 而不是普通的 `getSession` 函数的优势是，它是一个服务端的函数，不会触发无必要的数据请求调用。 `create-t3-app` 创建了一个 `getServerAuthSession` 函数，将这个特殊的 API 抽象了出来。

```ts:server/common/get-server-auth-session.ts
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await unstable_getServerSession(ctx.req, ctx.res, authOptions);
};
```

通过使用这个函数，我们可以获取 session，并将它传给 tRPC 的上下文：

```ts:server/trpc/context.ts
import { getServerAuthSession } from "../common/get-server-auth-session";

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });
  return await createContextInner({
    session,
  });
};
```

2. 创建一个 tRPC 中间件，来检测用户是否已通过认证。然后我们可以在一个 `protectedProcedure` 里调用该中间件。任何对该路由的调用都会被要求认证，否则会抛出一个错误，由客户端妥善处理。

```ts:server/trpc/trpc.ts
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // 推断出 `session` 为非空类型
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
```

这个 session 对象是对用户数据的一个轻量、最小化表示，仅包含了少量字段。当使用 `protectedProcedures` 时，你可以借助访问用户 ID 来从数据库里读取该用户的更多数据。

```ts:server/trpc/router/user.ts
const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),
});
```

## 搭配 Prisma 使用

要将 NextAuth.js 搭配 Prisma 一起使用需要非常多的 [初始化步骤](https://next-auth.js.org/adapters/models/)。`create-t3-app` 可以帮你完成这些工作，如果你在用 CLI 创建应用时同时选择了 Prisma 和 NextAuth.js，那你的应用已经集成了一个完全正常运行的认证系统，所有的数据库模型都已经预先配置好了。我们为你的应用预先配置了 Discord OAuth 认证服务，因为它是最方便实现的服务之一 —— 只需要在 `.env` 文件里提供令牌即可。然而，你也可以根据 [NextAuth.js 文档](https://next-auth.js.org/providers/) 来轻松添加更多其他第三方认证服务。要注意的是有部分特定的第三方服务需要你在数据模型上添加额外的字段。我们推荐你去阅读你想要添加的第三方验证服务的文档，以便确保你已经提供所有要求的字段了。

### 给你的模型添加新的字段

当你给 `User`、`Account`、`Session` 或 `VerificationToken` 中任何一个模型添加字段时（大部分情况你只需要修改 `User` 模型），你要注意的是 [Prisma 适配器](https://next-auth.js.org/adapters/prisma) 会在用户注册和登入时自动给这些模型添加额外的字段，因此你必须给这些字段提供初始值，因为这个适配器并不能知道这些字段是否已经存在。

如果你想要，例如给 `User` 模型添加一个 `role` 字段，你需要为它提供一个默认初始值。你可以通过给 `role` 字段添加一个 `@default` 属性来完成：

```diff:prisma/schema.prisma
+ enum Role {
+   USER
+   ADMIN
+ }

  model User {
    ...
+   role Role @default(USER)
  }
```

## 搭配 Next.js 中间件使用

将 NextAuth.js 搭配 Next.js 中间件一同使用[需要采用 JWT session 策略](https://next-auth.js.org/configuration/nextjs#caveats) 来进行认证。这是因为只有当会话 cookie 为 JWT 时，中间件才能够获取到它。默认情况下，`create-t3-app` 会用 Prisma 作为数据库适配器，并采取**默认**的数据库策略。

## 配置默认的 DiscordProvider

1. 前往 [Discord 开发者页面的应用部分](https://discord.com/developers/applications)，然后点击 "New Application"
2. 在设置菜单中，依次前往 "OAuth2 => General"

- 复制 Client ID，然后粘贴到 `.env` 文件中的 `DISCORD_CLIENT_ID`。
- 在 Client Secret 下方，点击 "Reset Secret"，然后复制该字符串到 `env` 中的 `DISCORD_CLIENT_SECRET`。务必要细心，因为你无法再次查看该密钥了，而将它重置会让现存的密钥失效。
- 点击 "Add Redirect"，然后将你应用的网址替换 `<app url>/api/auth/callback/discord` 里的 `<app url>`（例如，一个开发阶段的完整链接像这样：<code class="break-all">http://localhost:3000/api/auth/callback/discord</code>)
- 保存你的更改
- 在开发和生产环境使用同一个 Discord 应用是可行的，但不鼓励这么做。你应该也考虑在开发阶段 [模拟认证服务](https://github.com/trpc/trpc/blob/main/examples/next-prisma-websockets-starter/src/pages/api/auth/%5B...nextauth%5D.ts)。

## 有用的资源

| 资源                              | 链接                                    |
| --------------------------------- | --------------------------------------- |
| NextAuth.js 文档                  | https://next-auth.js.org/               |
| NextAuth.js GitHub                | https://github.com/nextauthjs/next-auth |
| tRPC Kitchen Sink - with NextAuth | https://kitchen-sink.trpc.io/next-auth  |
