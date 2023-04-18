---
title: tRPC
description: tRPCの使い方
layout: ../../../layouts/docs.astro
lang: ja
---

tRPC allows us to write end-to-end typesafe APIs without any code generation or runtime bloat. It uses TypeScript's great inference to infer your API router's type definitions and lets you call your API procedures from your frontend with full typesafety and autocompletion. When using tRPC, your frontend and backend feel closer together than ever before, allowing for an outstanding developer experience.

tRPC では、コード生成やランタイムの肥大化なしに、エンドツーエンドの型安全な API を書くことができます。TypeScript の優れた推論機能を利用して API ルーターの型定義を推論し、完全な型安全性の元で自動補完を効かせながら、フロントエンドから API プロシージャを呼び出すことができます。tRPC を使用すると、フロントエンドとバックエンドがこれまで以上に身近に感じられ、優れた開発者体験を得ることができるのです。

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>I built tRPC to allow people to move faster by removing the need of a traditional API-layer, while still having confidence that our apps won't break as we rapidly iterate.
      私は、従来のAPIレイヤーの必要性を排除することによって、迅速なイテレーションを回してもアプリケーションが壊れないという自信を持ちつつ、人々がより速く移動できるようにするためにtRPCを構築しました。<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @alexdotjs"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="https://avatars.githubusercontent.com/u/459267?v=4"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Alex - tRPCの開発者</span>
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

## How do I use tRPC?

## tRPC の使い方

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2LYM8gf184U" title="Making typesafe APIs easy with tRPC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

tRPC contributor [trashh_dev](https://twitter.com/trashh_dev) made [a killer talk at Next.js Conf](https://www.youtube.com/watch?v=2LYM8gf184U) about tRPC. We highly recommend you watch it if you haven't already.

With tRPC, you write TypeScript functions on your backend, and then call them from your frontend. A simple tRPC procedure could look like this:

tRPC のコントリビューターである[trash_dev](https://twitter.com/trashh_dev)が tRPC について[Next.js Conf での決定的な講演](https://www.youtube.com/watch?v=2LYM8gf184U)を作成しました。未見の方はぜひご覧ください。

tRPC では、バックエンドで TypeScript の関数を書き、それをフロントエンドから呼び出します。単純な tRPC プロシージャは次のようなものです：

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

This is a tRPC procedure (equivalent to a route handler in a traditional backend) that first validates the input using Zod (which is the same validation library that we use for [environment variables](./env-variables)) - in this case, it's making sure that the input is a string. If the input is not a string it will send an informative error instead.

After the input, we chain a resolver function which can be either a [query](https://trpc.io/docs/v10/react-queries), [mutation](https://trpc.io/docs/v10/react-mutations), or a [subscription](https://trpc.io/docs/v10/subscriptions). In our example, the resolver calls our database using our [prisma](./prisma) client and returns the user whose `id` matches the one we passed in.

You define your procedures in `routers` which represent a collection of related procedures with a shared namespace. You may have one router for `users`, one for `posts`, and another one for `messages`. These routers can then be merged into a single, centralized `appRouter`:

これは tRPC プロシージャ（従来のバックエンドのルートハンドラに相当）で、まず Zod（[環境変数の検証](./env-variables)に使っているのと同じ検証ライブラリ）を使って入力の検証を行います（この場合、入力が文字列であることを確認します）。入力が文字列でない場合は、代わりに情報提供のためのエラーを送信します。

入力の後、[query](https://trpc.io/docs/v10/react-queries)、[mutation](https://trpc.io/docs/v10/react-mutations)、[subscription](https://trpc.io/docs/v10/subscriptions)のいずれかになるリゾルバー関数をチェーンします。この例では、リゾルバは[prisma](./prisma)クライアントを使用してデータベースを呼び出し、`id`が渡したものと一致するユーザを返します。

プロシージャは `routers` という名前空間を共有する関連するプロシージャの集合体として定義します。例えば、`users`用のルータ、`posts`用のルータ、`messages`用のルータをそれぞれ 1 つずつ用意することができます。これらのルータは、1 つの集中管理された `appRouter` に統合することができます：

```ts:server/api/root.ts
const appRouter = createTRPCRouter({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

Notice that we only need to export our router's type definitions, which means we are never importing any server code on our client.

Now let's call the procedure on our frontend. tRPC provides a wrapper for `@tanstack/react-query` which lets you utilize the full power of the hooks they provide, but with the added benefit of having your API calls typed and inferred. We can call our procedures from our frontend like this:

ルーターの型定義だけをエクスポートすれば良く、クライアントでサーバーサイドのコードをインポートすることはないことに注意してください。

tRPC は `@tanstack/react-query` のラッパーで、API コールが型付けされ推論されるという利点もあり、彼らが提供するフックのフルパワーを利用することができます。以下ように、フロントエンドからプロシージャを呼び出すことができます：

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

You'll immediately notice how good the autocompletion and typesafety is. As soon as you write `api.`, your routers will show up in autocomplete, and when you select a router, its procedures will show up as well. You'll also get a TypeScript error if your input doesn't match the validator that you defined on the backend.

自動補完と型安全がいかに優れているか、すぐにお分かりいただけると思います。`api.`と入力すると即座に自動補完でルータ一覧が表示され、ルータを選択するとそのプロシージャ一覧も表示されます。また、入力がバックエンドで定義したバリデータと一致しない場合は、TypeScript のエラーが表示されます。

## Inferring errors

By default, `create-t3-app` sets up an [error formatter](https://trpc.io/docs/error-formatting) that lets you infer your Zod Errors if you get validation errors on the backend.

## エラーを推論する

デフォルトでは、`create-t3-app`は[エラーフォーマッタ](https://trpc.io/docs/error-formatting)を設定し、バックエンドでバリデーションエラーが発生した場合に Zod Errors を推論することができるようにします。

Example usage:

使用例：

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

## Files

tRPC requires quite a lot of boilerplate that `create-t3-app` sets up for you. Let's go over the files that are generated:

## ファイル

tRPC は、`create-t3-app`がセットアップしてくれる、かなり多くのボイラープレートを必要とします。それでは、生成されるファイルについて説明します：

### 📄 `pages/api/trpc/[trpc].ts`

This is the entry point for your API and exposes the tRPC router. Normally, you won't touch this file very much, but if you need to, for example, enable CORS middleware or similar, it's useful to know that the exported `createNextApiHandler` is a [Next.js API handler](https://nextjs.org/docs/api-routes/introduction) which takes a [request](https://developer.mozilla.org/en-US/docs/Web/API/Request) and [response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object. This means that you can wrap the `createNextApiHandler` in any middleware you want. See below for an [example snippet](#cors-の有効化) of adding CORS.

### 📄 `pages/api/trpc/[trpc].ts`.

これは API のエントリポイントであり、tRPC ルータを公開します。通常、このファイルに触れることはあまりありませんが、たとえば CORS ミドルウェアなどを有効にする必要がある場合、エクスポートされた `createNextApiHandler` は [Next.js API handler](https://nextjs.org/docs/api-routes/introduction) であり、 [request](https://developer.mozilla.org/en-US/docs/Web/API/Request) と [response](https://developer.mozilla.org/en-US/docs/Web/API/Response) オブジェクトを受け取ることを知っていれば便利です。つまり、`createNextApiHandler`を任意のミドルウェアでラッピングすることができます。CORS を追加する[サンプルのコード断片](#cors-の有効化)は以下を参照してください。

### 📄 `server/api/trpc.ts`

This file is split up in two parts, context creation and tRPC initialization:

1. We define the context that is passed to your tRPC procedures. Context is data that all of your tRPC procedures will have access to, and is a great place to put things like database connections, authentication information, etc. In create-t3-app we use two functions, to enable using a subset of the context when we do not have access to the request object.

- `createInnerTRPCContext`: This is where you define context which doesn't depend on the request, e.g. your database connection. You can use this function for [integration testing](#統合テストの例) or [ssg-helpers](https://trpc.io/docs/v10/ssg-helpers) where you don't have a request object.

- `createTRPCContext`: This is where you define context which depends on the request, e.g. the user's session. You request the session using the `opts.req` object, and then pass the session down to the `createInnerTRPCContext` function to create the final context.

2. We initialize tRPC and define reusable [procedures](https://trpc.io/docs/v10/procedures) and [middlewares](https://trpc.io/docs/v10/middlewares). By convention, you shouldn't export the entire `t`-object but instead, create reusable procedures and middlewares and export those.

You'll notice we use `superjson` as [data transformer](https://trpc.io/docs/v10/data-transformers). This makes it so that your data types are preserved when they reach the client, so if you for example send a `Date` object, the client will return a `Date` and not a string which is the case for most APIs.

### 📄 `server/api/trpc.ts`

このファイルは、コンテキスト作成と tRPC 初期化の 2 つに分かれています：

1. tRPC プロシージャに渡されるコンテキストを定義します。コンテキストは、すべての tRPC プロシージャがアクセスできるデータであり、データベース接続、認証情報などのようなものを置くのに最適な場所です。create-t3-app では、リクエストオブジェクトにアクセスできないときに、コンテキストのサブセットを使用できるようにするために、2 つの関数を使用しています。

- `createInnerTRPCContext`：ここでは、リクエストに依存しないコンテキスト (例: データベース接続) を定義します。この関数は、リクエストオブジェクトを持たない [統合テスト](#統合テストの例) や [ssg-helpers](https://trpc.io/docs/v10/ssg-helpers) で使用することができます。

- `createTRPCContext`：ここでは、リクエストに依存するコンテキスト (例えば、ユーザのセッション) を定義します。`opts.req`オブジェクトを使ってセッションをリクエストし、そのセッションを `createInnerTRPCContext` 関数に渡して最終的なコンテキストを作成します。

2. tRPC を初期化し、再利用可能な[手続き](https://trpc.io/docs/v10/procedures)と[ミドルウェア](https://trpc.io/docs/v10/middlewares)を定義しています。慣例として、`t`オブジェクト全体をエクスポートするのではなく、再利用可能な手続きとミドルウェアを作成し、それらをエクスポートする必要があります。

[データトランスフォーマー](https://trpc.io/docs/v10/data-transformers)として `superjson` を使用していることにお気づきでしょう。これにより、データ型がクライアントに届くときに保持されます。例えば `Date` オブジェクトを送信すると、クライアントは `Date` を返し、ほとんどの API でそうなってしまうような文字列は返しません。

### 📄 `server/api/routers/*.ts`

This is where you define the routes and procedures of your API. By convention, you [create separate routers](https://trpc.io/docs/v10/router) for related procedures.

### 📄 `server/api/routers/*.ts`.

ここでは、API のルータ群とプロシージャを定義します。慣例として、関連する一連のプロシージャごとに[別のルータ](https://trpc.io/docs/v10/router)を作成します。

### 📄 `server/api/root.ts`

Here we [merge](https://trpc.io/docs/v10/merging-routers) all the sub-routers defined in `routers/**` into a single app router.

### 📄 `server/api/root.ts`.

ここでは、`routers/**`で定義されたすべてのサブルータを 1 つの app ルータに[マージ](https://trpc.io/docs/v10/merging-routers)しています。

### 📄 `utils/api.ts`

This is the frontend entry point for tRPC. This is where you'll import the router's **type definition** and create your tRPC client along with the react-query hooks. Since we enabled `superjson` as our data transformer on the backend, we need to enable it on the frontend as well. This is because the serialized data from the backend is deserialized on the frontend.

You'll define your tRPC [links](https://trpc.io/docs/v10/links) here, which determines the request flow from the client to the server. We use the "default" [`httpBatchLink`](https://trpc.io/docs/v10/links/httpBatchLink) which enables [request batching](https://cloud.google.com/compute/docs/api/how-tos/batch), as well as a [`loggerLink`](https://trpc.io/docs/v10/links/loggerLink) which outputs useful request logs during development.

Lastly, we export a [helper type](https://trpc.io/docs/v10/infer-types#additional-dx-helper-type) which you can use to infer your types on the frontend.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/x4mu-jOiA0Q" title="How tRPC really works" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Create T3 App contributor [Christopher Ehrlich](https://twitter.com/ccccjjjjeeee) made [a video about data flows in tRPC](https://www.youtube.com/watch?v=x4mu-jOiA0Q). This video is recommended if you have used tRPC but still feel a bit unclear about how it works.

### 📄 `utils/api.ts`

これは、tRPC のフロントエンドのエントリポイントです。ここでルーターの**型定義**をインポートし、react-query フックと一緒に tRPC クライアントを作成することになります。バックエンドでデータ変換器として `superjson` を有効にしたため、フロントエンドでも有効にする必要があります。これは、バックエンドでシリアライズされたデータが、フロントエンドでデシリアライズされるためです。

ここでは tRPC の[リンク](https://trpc.io/docs/v10/links)を定義し、クライアントからサーバーへのリクエストフローを決定します。ここでは、デフォルトとしての [`httpBatchLink`](https://trpc.io/docs/v10/links/httpBatchLink) を使用し、[リクエストバッチ](https://cloud.google.com/compute/docs/api/how-tos/batch) を有効にします。また、開発中に役立つリクエストログを出力する [`loggerLink`](https://trpc.io/docs/v10/links/loggerLink) を使用します。

最後に、フロントエンドで型を推論するために使える[ヘルパー型](https://trpc.io/docs/v10/infer-types#additional-dx-helper-type)をエクスポートしておきます。

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/x4mu-jOiA0Q" title="How tRPC really works" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Create T3 App のコントリビューターである[Christopher Ehrlich](https://twitter.com/ccccjjjjeeee)が[tRPC のデータフローに関するビデオ](https://www.youtube.com/watch?v=x4mu-jOiA0Q)を作成しました。このビデオは、tRPC を使ったことがあるけれども、まだ仕組みがよくわからないと感じる方におすすめです。

## How do I call my API externally?

With regular APIs, you can call your endpoints using any HTTP client such as `curl`, `Postman`, `fetch` or straight from your browser. With tRPC, it's a bit different. If you want to call your procedures without the tRPC client, there are two recommended ways to do it:

## 自分の API を外部から呼び出せるようにするには

通常の API では、`curl`、`Postman`、`fetch`などの HTTP クライアントを使用してエンドポイントを呼び出したり、ブラウザから直接呼び出すことができます。しかし、tRPC の場合は少し違います。tRPC クライアントを使わずにプロシージャを呼び出したい場合、2 つの方法が推奨されます：

### Expose a single procedure externally

If you want to expose a single procedure externally, you're looking for [server side calls](https://trpc.io/docs/v10/server-side-calls). That would allow you to create a normal Next.js API endpoint, but reuse the resolver part of your tRPC procedure.

### 単一のプロシージャを外部に公開する

単一のプロシージャを外部に公開したい場合は、[サーバーサイドコール](https://trpc.io/docs/v10/server-side-calls)を探すことになります。これなら、通常の Next.js の API エンドポイントを作成しつつ、tRPC プロシージャのリゾルバ部分を再利用することができます。

```ts:pages/api/users/[id].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create context and caller
  const ctx = await createTRPCContext({ req, res });
  const caller = appRouter.createCaller(ctx);
  try {
    const { id } = req.query;
    const user = await caller.user.getById(id);
    res.status(200).json(user);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // An error from tRPC occured
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    // Another error occured
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default userByIdHandler;
```

### Exposing every procedure as a REST endpoint

If you want to expose every single procedure externally, checkout the community built plugin [trpc-openapi](https://github.com/jlalmes/trpc-openapi/tree/master). By providing some extra meta-data to your procedures, you can generate an OpenAPI compliant REST API from your tRPC router.

### すべてのプロシージャを REST エンドポイントとして公開する

もし、すべてのプロシージャを外部に公開したい場合は、コミュニティが作ったプラグイン [trpc-openapi](https://github.com/jlalmes/trpc-openapi/tree/master) をチェックアウトしてください。プロシージャにいくつかの特別なメタデータを提供することで、tRPC ルータから OpenAPI 準拠の REST API を生成することができます。

### It's just HTTP Requests

tRPC communicates over HTTP, so it is also possible to call your tRPC procedures using "regular" HTTP requests. However, the syntax can be cumbersome due to the [RPC protocol](https://trpc.io/docs/v10/rpc) that tRPC uses. If you're curious, you can check what tRPC requests and responses look like in your browser's network tab, but we suggest doing this only as an educational exercise and sticking to one of the solutions outlined above.

### HTTP Requests だけです

tRPC は HTTP で通信するため、「通常の」HTTP リクエストを使って tRPC プロシージャを呼び出すこともできます。ただし、tRPC が使用している[RPC プロトコル](https://trpc.io/docs/v10/rpc)のため、構文が煩雑になる可能性があります。もし興味があれば、ブラウザのネットワーク・タブで tRPC のリクエストとレスポンスがどのように見えるかを確認することができますが、これはあくまで教育的な練習として行い、上記のソリューションのいずれかを採用することをお勧めします。

## Comparison to a Next.js API endpoint

Let's compare a Next.js API endpoint to a tRPC procedure. Let's say we want to fetch a user object from our database and return it to the frontend. We could write a Next.js API endpoint like this:

## Next.js API エンドポイントとの比較

Next.js API エンドポイントと tRPC プロシージャを比較してみましょう。たとえば、データベースからユーザーオブジェクトを取得して、フロントエンドに返したいとします。Next.js API のエンドポイントは、次のように書きます：

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

Compare this to the tRPC example above and you can see some of the advantages of tRPC:

- Instead of specifying a url for each route, which can become annoying to debug if you move something, your entire router is an object with autocomplete.
- You don’t need to validate which HTTP method was used.
- You don’t need to validate that the request query or body contains the correct data in the procedure, because Zod takes care of this.
- Instead of creating a response, you can throw errors and return a value or object as you would in any other TypeScript function.
- Calling the procedure on the frontend provides autocompletion and type safety.

これを上記の tRPC の例と比較すると、tRPC の利点がわかると思います：

- 各ルートに url を指定する代わりに、ルーター全体が自動補完を持つオブジェクトになります。
- どの HTTP メソッドが使われたかを検証する必要はありません。
- リクエストのクエリやボディがプロシージャの中で正しいデータを含んでいるかどうかを検証する必要はありません、Zod がこれを処理してくれるからです。
- レスポンスを作成する代わりに、他の TypeScript 関数と同じように、エラーを投げたり、値やオブジェクトを返したりすることができます。
- フロントエンドでプロシージャを呼び出すと、自動補完と型安全性が提供されます。

## Useful snippets

Here are some snippets that might come in handy.

## 便利なスニペット

以下に、便利そうなスニペットをご紹介します。

### Enabling CORS

If you need to consume your API from a different domain, for example in a monorepo that includes a React Native app, you might need to enable CORS:

### CORS の有効化

React Native アプリを含む monorepo など、異なるドメインから API を消費する必要がある場合、CORS を有効にする必要がある場合があります：

```ts:pages/api/trpc/[trpc].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import cors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Enable cors
  await cors(req, res);

  // Create and call the tRPC handler
  return createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
  })(req, res);
};

export default handler;
```

### Optimistic updates

Optimistic updates are when we update the UI before the API call has finished. This gives the user a better experience because they don't have to wait for the API call to finish before the UI reflects the result of their action. However, apps that value data correctness highly should avoid optimistic updates as they are not a "true" representation of backend state. You can read more on the [React Query docs](https://tanstack.com/query/v4/docs/guides/optimistic-updates).

### 楽観的な更新

楽観的な更新とは、API コールが終了する前に UI を更新することです。API コールの終了を待たずに UI に反映されるため、ユーザーにとってより良い体験になります。しかし、データの正しさを重視するアプリケーションでは、楽観的な更新はバックエンドの状態を「正しく」表現できないため、避けるべきでしょう。詳しくは、[React Query docs](https://tanstack.com/query/v4/docs/guides/optimistic-updates)をご覧ください。

```tsx
const MyComponent = () => {
  const listPostQuery = api.post.list.useQuery();

  const utils = api.useContext();
  const postCreate = api.post.create.useMutation({
    async onMutate(newPost) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.post.list.cancel();

      // Get the data from the queryCache
      const prevData = utils.post.list.getData();

      // Optimistically update the data with our new post
      utils.post.list.setData(undefined, (old) => [...old, newPost]);

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onError(err, newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.post.list.setData(undefined, ctx.prevData);
    },
    onSettled() {
      // Sync with server once mutation has settled
      utils.post.list.invalidate();
    },
  });
};
```

### Sample Integration Test

Here is a sample integration test that uses [Vitest](https://vitest.dev) to check that your tRPC router is working as expected, the input parser infers the correct type, and that the returned data matches the expected output.

### 統合テストの例

ここでは、[Vitest](https://vitest.dev)を使用して、tRPC ルーターが期待通りに動作しているか、入力パーサーが正しい型を推論しているか、返されたデータが期待通りの出力と一致しているかをチェックする統合テストのサンプルを紹介します。

```ts
import { type inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { appRouter, type AppRouter } from "~/server/api/root";
import { expect, test } from "vitest";

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

If your procedure is protected, you can pass in a mocked `session` object when you create the context:

プロシージャが保護されている場合は、コンテキストを作成するときにモックした `session` オブジェクトを渡すことができます：

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

## Useful Resources

| Resource               | Link                                                    |
| ---------------------- | ------------------------------------------------------- |
| tRPC Docs              | https://www.trpc.io                                     |
| Bunch of tRPC Examples | https://github.com/trpc/trpc/tree/next/examples         |
| React Query Docs       | https://tanstack.com/query/v4/docs/adapters/react-query |

## 役に立つ情報源

| リソース                 | Link                                                    |
| ------------------------ | ------------------------------------------------------- |
| tRPC ドキュメント        | https://www.trpc.io                                     |
| tRPC の事例集            | https://github.com/trpc/trpc/tree/next/examples         |
| React Query ドキュメント | https://tanstack.com/query/v4/docs/adapters/react-query |
