---
title: tRPC
description: tRPC 的用法
layout: ../../../layouts/docs.astro
lang: zh-hans
---

tRPC 能够让我们在无需代码自动生成器的帮助或在运行时额外检测的情况下，写出端对端类型安全的 API。它利用了 TypeScript 的强大推断功能来推断出你 API 路由的类型定义，并让你在前端能够调用 API 时充分享受完全类型安全和全自动补全的特性。当使用 tRPC 时，你应用的前端和后端部分会感觉比以前更加紧密，这带来了非常棒的开发体验。

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>我创建 tRPC 的目的是为了通过移除传统的 API 层来帮助人们更快地构建应用，但与此同时依然保证 App 在快速迭代的构建过程中不会出现大问题。<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @alexdotjs"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="https://avatars.githubusercontent.com/u/459267?v=4"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Alex - tRPC 的创建者</span>
      <a
        href="https://twitter.com/alexdotjs"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        @alexdotjs
      </a>
    </div>
  </cite>
</blockquote>

## 我怎么使用 tRPC?

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2LYM8gf184U" title="Making typesafe APIs easy with tRPC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

tRPC 贡献者 [trashh_dev](https://twitter.com/trashh_dev) 在 [Next.js Conf 上关于 tRPC 做了一个非常棒的演讲](https://www.youtube.com/watch?v=2LYM8gf184U)。若还没有看过的话，我们强烈建议你观看一下。

通过 tRPC，你可以在后端编写 TypeScript 函数，然后从你的前端直接调用。一个简单的 tRPC 路由函数 procedure 可能长这样：

```ts:server/api/routers/user.ts
const userRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
```

这是一个 tRPC procedure（等同于传统后端中的路由函数），它将先通过 Zod（我们将同样用它来验证 [环境变量](/zh-hans/usage/env-variables)）来验证输入 —— 在上述的例子里，它将确保输入是合法的字符串。如果输入不是字符串，它会返回一个直观的错误信息。

在输入之后，我们链式地添加了一个 resolver 函数，它可以被用于 [查询](https://trpc.io/docs/v10/react-queries)、[修改](https://trpc.io/docs/v10/react-mutations) 或 [订阅](https://trpc.io/docs/v10/subscriptions)。在我们的例子中，这个 resolver 函数通过 [Prisma](/zh-hans/usage/prisma) 客户端读取了数据库，然后返回一条 `id` 匹配传入参数的用户数据。

你在 `routers` 中定义许多 procedure 路由函数，它表示这些相关路由函数的公共命名空间。你可以有不同的路由，例如 `users`、`posts` 以及 `messages`。然后将这些路由统一集中合并到 `appRouter` 里：

```ts:server/api/root.ts
const appRouter = createTRPCRouter({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

需要注意的是我们只需要将合并后的路由的类型定义导出，这意味着我们将不会在客户端导入任何服务端的代码。

现在让我们在前端调用路由函数。tRPC 为 `@tanstack/react-query` 做了一层封装，这既可以让你充分利用它所提供的各种 hooks 功能，又能在调用 API 时享受类型安全和类型推断带来的好处。我们可以这样调用后端的路由函数：

```tsx:pages/users/[id].tsx
import { useRouter } from "next/router";
import { api } from "../../utils/api";

const UserPage = () => {
  const { query } = useRouter();
  const userQuery = api.users.getById.useQuery(query.id);
  return (
    <div>
      <h1>{userQuery.data?.name}</h1>
    </div>
  );
};
```

你会立即感受到类型安全和自动补全带来的好处。只要当你输入 `api.` 时，你所定义的路由都会显示在自动补全的菜单里，然后当你选择了一个路由，它所包含的路由函数也会显示出来。如果你的输入不符合你在后端定义的验证器的要求，TypeScript 也会将错误显示出来。

## 推断错误

默认情况下，`create-t3-app` 设置了一个 [error formatter](https://trpc.io/docs/error-formatting)，让你在后端出现验证错误时可以推断出你的 Zod 错误。

使用示例：

```tsx
function MyComponent() {
  const { mutate, error } = api.post.create.useMutation();

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      mutate({ title: formData.get('title') });
    }}>
      <input name="title" />
      {error?.data?.zodError?.fieldErrors.title && (
        {/** `mutate` returned with an error on the `title` */}
        <span className="mb-8 text-red-500">
          {error.data.zodError.fieldErrors.title}
        </span>
      )}

      ...
    </form>
  );
}
```

## 文件

tRPC 需要不少样板代码，不过 `create-t3-app` 已经帮你完成。让我们看一下这些被自动创建的文件：

### 📄 `pages/api/trpc/[trpc].ts`

这里是你项目 API 的入口，它暴露了 tRPC 的路由。正常情况下，你不会去修改这个文件，但如果需要的话，例如开启 CORS 中间件或其他类似的情况，知道下面的信息是很有用的：被导出的 `createNextApiHandler` 是一个 [Next.js API 的 handler](https://nextjs.org/docs/api-routes/introduction)，它分别接受一个 [request](https://developer.mozilla.org/en-US/docs/Web/API/Request) 和一个 [response](https://developer.mozilla.org/en-US/docs/Web/API/Response?retiredLocale=sv-SE) 对象作为参数。这意味着 `createNextApiHandler` 可以被任何你想要的中间件包裹。查看下方添加 CORS 的 [示例代码](#enabling-cors)。

### 📄 `server/api/trpc.ts`

这个文件分为两部分，上下文创建和 tRPC 初始化。

1. 我们定义传递给你的 tRPC 路由函数的上下文。上下文就是一个数据对象，你定义的所有 tRPC 路由函数都会访问它来获取数据，它被用来存放了一些例如数据库的连接、认证信息等数据。在 create-t3-app 里，当我们不需要获取整个请求对象时，我们分别使用两个函数来取得上下文的部分数据。

- `createInnerTRPCContext`: 这里你可以定义不依赖请求的上下文，例如数据库的连接。你可以使用这个函数来做 [集成测试](#sample-integration-test) 或 [ssg-helpers](https://trpc.io/docs/v10/ssg-helpers)，这些场景下你都没有一个请求对象。

- `createTRPCContext`: 你可以在这里定义依赖于请求的上下文，例如用户的 session。你通过使用 `opts.req` 来获取 session，然后将它传给 `createInnerTRPCContext` 函数来创建最后完整的上下文。

2. 我们初始化 tRPC，并定义可复用的 [procedure](https://trpc.io/docs/v10/procedures) 路由函数和 [中间件](https://trpc.io/docs/v10/middlewares)。按照惯例，你不应该将整个 `t` 对象导出，而是通过转换创建复用的路由和中间件，并导出它们。

你会注意到我们使用了 `superjson` 作为 [数据解析工具](https://trpc.io/docs/v10/data-transformers)。在数据被发送到客户端时，它会帮你保留数据类型。例如你发送了一个 `Date` 类型的对象，客户端会返回一个相同类型的 `Date`，而不是像其他大多数 API 一样返回一个字符串。

### 📄 `server/api/routers/*.ts`

你可以在这里定义 API 的路由及其函数。按照惯例，你在这里为相关的路由函数 procedure [创建分离的路由](https://trpc.io/docs/v10/router)

### `server/api/root.ts`

在这里我们把所有在 `routers/**` 中定义的子路由 [合并](https://trpc.io/docs/v10/merging-routers) 到一个单一的应用路由里。

### 📄 `utils/api.ts`

这里是 tRPC 的前端入口。你可以在这里导入路由的**类型定义**，创建你的 tRPC 客户端以及 react-query hooks。因为我们已经在后端将 `superjson` 设置为数据序列化工具，我们同样需要在前端开启它。这是因为从后端传入的序列化在前端还未被反序列化。

你将在这里定义 tRPC [links](https://trpc.io/docs/v10/links)，它们被用于决定从客户端到服务器的请求流。我们采用 "default" [`httpBatchLink`](https://trpc.io/docs/v10/links/httpBatchLink)，它会帮我们开启 [批量请求](https://cloud.google.com/compute/docs/api/how-tos/batch) 的功能，以及采用 [`loggerLink`](https://trpc.io/docs/v10/links/loggerLink)，它则帮我们在开发阶段打印出有用的请求日志信息。

最后，我们导出一个 [helper 类型](https://trpc.io/docs/v10/infer-types#additional-dx-helper-type)，你可以通过它在前端来推断类型。

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/x4mu-jOiA0Q" title="How tRPC really works" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Create T3 App 的贡献者 [Christopher Ehrlich](https://twitter.com/ccccjjjjeeee) 制作了 [一个关于 tRPC 数据流的视频](https://www.youtube.com/watch?v=x4mu-jOiA0Q)。如果你已经使用过 tRPC 但仍感到有些不清楚它的工作原理，我们建议你观看这个视频。

## 如何从外部调用我的 API？

对于常规的 API 来说，你可以使用诸如 `curl`、`Postman`、`fetch` 这样的 HTTP 客户端或直接在浏览器里访问你的 API 端点。但对于 tRPC，调用方法有点不同。如果你不想使用 tRPC 客户端来访问路由函数，这边有两种推荐方式来实现：

### 向外暴露单个路由函数

如果你想向外暴露单个路由函数，你可以查阅 [服务端调用](https://trpc.io/docs/v10/server-side-calls)。这允许你使用常规的 Next.js API 端点，但同时让你可以复用 tRPC 路由函数的 resolver 部分。

```ts:pages/api/users/[id].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // 创建上下文和调用者
  const ctx = await createTRPCContext({ req, res });
  const caller = appRouter.createCaller(ctx);
  try {
    const { id } = req.query;
    const user = await caller.user.getById(id);
    res.status(200).json(user);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // 一个 tRPC 错误在此发生
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    // 另一个错误在此发生
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default userByIdHandler;
```

### 将每个路由函数作为 REST API 端点暴露出来

如果你想要将每一个 procedure 对外暴露出来，不妨使用这个社区维护的插件 [trpc-openapi](https://github.com/jlalmes/trpc-openapi/tree/master)。通过给你的路由函数提供一些额外的元数据，你可以用 tRPC 路由来生成兼容 OpenAPI 规范的 REST API。

### 它只是 HTTP 请求

tRPC 通过 HTTP 协议来传输数据，因此使用“常规”的 HTTP 请求来调用你的 tRPC 路由是没有问题的。然而，由于 tRPC 使用的 [RPC 通讯协议](https://trpc.io/docs/v10/rpc) 不同，写起来的语法会十分繁琐。如果你好奇的话，不妨在你的浏览器开发工具下的网络标签里查看一下 tRPC 的请求和响应长什么样，但是我们建议使用常规 HTTP 请求只是出于教学意义，你还是应该坚持使用上述提到的方式之一来调用 tRPC。

## 与 Next.js API 对比

让我们将 Next.js API 和 tRPC 路由做个对比吧。假设我们想要从数据库获取用户的数据，然后在前端显示出来。我们可能会写一段如下方所示的 Next.js API 代码：

```ts:pages/api/users/[id].ts
import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid id" });
  }

  const examples = await prisma.example.findFirst({
    where: {
      id,
    },
  });

  res.status(200).json(examples);
};

export default userByIdHandler;
```

```ts:pages/users/[id].tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`/api/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);
};
```

将这段代码和上面的 tRPC 示例做比较，你可以清楚地看到 tRPC 的优势所在：

- 你无需为每一个路由定义一个 URL，倘若这样做，只要你修改了一些代码就会让调试变得很困难，而现在你的整个路由就只是一个支持自动补全的对象而已。
- 你无需验证使用了哪个 HTTP 方法（比如 POST 还是 GET）。
- 你无需验证请求查询参数或请求体，因为 Zod 已经替你完成了。
- 你无需创建一个响应，而是可以像在任何 TypeScript 函数中一样，直接抛出错误、返回值或对象即可。
- 在前端直接调用 procedure 函数为你带来了自动补全和类型安全的好处。

## 有用的代码片段

这里有一些可能比较有用的代码片段。

### 开启 CORS（跨源资源共享）

如果你需要从不同的域来访问你的 API，例如在一个包含 React Native 应用的 monorepo 的项目里，你可能需要开启 CORS：

```ts:pages/api/trpc/[trpc].ts
import { type NextApiRequest, type NextApiResponse } from "next";

import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import cors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // 开启 cors
  await cors(req, res);

  // Create and call the tRPC handler
  return createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
  })(req, res);
};

export default handler;
```

### 乐观更新

乐观更新是指在 API 调用完成之前更新 UI，达到前端界面快速响应用户交互的效果。这给用户带来了更好的体验，因为他们不需要等待 API 调用完成，然后 UI 来反映操作结果。然而，那些特别着重数据准确性的应用应该避免使用乐观更新，因为它们并不是后端数据状态的真实表达。你可以在 [React Query 文档](https://tanstack.com/query/v4/docs/guides/optimistic-updates) 阅读更多相关内容。

```tsx
const MyComponent = () => {
  const listPostQuery = api.post.list.useQuery();

  const utils = api.useContext();
  const postCreate = api.post.create.useMutation({
    async onMutate(newPost) {
      // 取消发送中的 fetch 请求（所以它们不会覆盖掉我们的乐观更新）
      await utils.post.list.cancel();

      // 从 queryCache 中获取数据
      const prevData = utils.post.list.getData();

      // 用我们的新文章来做乐观更新
      utils.post.list.setData(undefined, (old) => [...old, newPost]);

      // 返回之前的数据，这样做可以让我们在错误发生时回滚
      return { prevData };
    },
    onError(err, newPost, ctx) {
      // 当修改失败后，使用来自 onMutate 中的值
      utils.post.list.setData(undefined, ctx.prevData);
    },
    onSettled() {
      // 当修改完成后，与服务端同步
      utils.post.list.invalidate();
    },
  });
};
```

### 集成测试示例

这个集成测试示例使用了 [Vitest](https://vitest.dev) 来检测 tRPC 路由如预期正常工作，输入解析函数会自行推断出正确的类型，然后返回的数据与预期的结果相匹配。

```ts
import { type inferProcedureInput } from "@trpc/server";
import { expect, test } from "vitest";

import { appRouter, type AppRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

test("example router", async () => {
  const ctx = await createInnerTRPCContext({ session: null });
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["example"]["hello"]>;
  const input: Input = {
    text: "test",
  };

  const example = await caller.example.hello(input);

  expect(example).toMatchObject({ greeting: "Hello test" });
});
```

如果你的 procedure 是受保护的，你可以传入一个模拟的 `session` 对象来创建上下文：

```ts
test("protected example router", async () => {
  const ctx = await createInnerTRPCContext({
    session: {
      user: { id: "123", name: "John Doe" },
      expires: "1",
    },
  });
  const caller = appRouter.createCaller(ctx);

  // ...
});
```

## 有用的资源

| 资源             | 链接                                                    |
| ---------------- | ------------------------------------------------------- |
| tRPC 文档        | https://www.trpc.io                                     |
| 大量的 tRPC 示例 | https://github.com/trpc/trpc/tree/next/examples         |
| React Query 文档 | https://tanstack.com/query/v4/docs/adapters/react-query |
