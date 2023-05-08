---
title: tRPC
description: tRPCの使い方
layout: ../../../layouts/docs.astro
lang: ja
---

tRPC では、コード生成やランタイムの肥大化なしで、エンドツーエンドの型安全な API を書くことができます。TypeScript の優れた型推論機能を利用して API ルーターの型定義を推論し、フロントエンドから 完全に型安全かつ自動補完で API プロシージャを呼び出すことができます。tRPC を使用すると、フロントエンドとバックエンドがより近しいものに感じられ、極上の開発者体験を得ることができます。

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>私は、従来の API レイヤーの必要性を排除することによって、迅速なイテレーションを回してもアプリケーションが壊れないという自信を持ちつつ、人々がより速く動けるようにするために tRPC を開発しました。"
<span aria-hidden="true"></span>

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

## tRPC の使い方

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2LYM8gf184U" title="Making typesafe APIs easy with tRPC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

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

これは tRPC プロシージャ（従来のバックエンドのルートハンドラに相当）で、まず Zod を使って入力の検証を行います（これは[環境変数の検証](./env-variables)に使っているのと同じ検証ライブラリです）。この場合、入力が文字列であることを確認しています。入力が文字列でない場合は、代わりに情報提供のためのエラー情報をレスポンスとして送信します。

入力の後、[query](https://trpc.io/docs/v10/react-queries)、[mutation](https://trpc.io/docs/v10/react-mutations)、[subscription](https://trpc.io/docs/v10/subscriptions)のいずれかであるリゾルバー関数を連鎖させます。この例では、リゾルバは[prisma](./prisma)クライアントを使用してデータベースを呼び出し、渡された`id`と一致するユーザを返します。

名前空間を共有する一連のプロシージャをまとめた`routers`を定義できます。例えば、`users`のルータ、`posts`のルータ、`messages`のルータがあるとして、これらのルータは、単一の集約された `appRouter` にマージすることができます：

```ts:server/api/root.ts
const appRouter = createTRPCRouter({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

ルーターの型定義だけをエクスポートすれば良く、クライアントでサーバーサイドのコードをインポートすることは決してないことに注意してください。

さて、フロントエンドからプロシージャを呼び出してみましょう、tRPC は `@tanstack/react-query` のラッパーを提供しており、API 呼び出しが型付けされ推論されるという利点のもとで、TanStack Query が提供する Hooks のフルパワーを活用することができます。以下のように、フロントエンドからプロシージャを呼び出すことができます：

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

自動補完と型安全の優秀さがすぐに分かるはずです。`api.`と入力するや否や自動補完でルータ一覧が表示され、選択するとそのルータのプロシージャ一覧も表示されます。また、入力したものがバックエンドで定義したバリデータと一致しない場合は、TypeScript のエラーが表示されます。

## エラーを推論する

デフォルトで、`create-t3-app`はバックエンドで検証エラーが発生した場合に、Zod エラーを推論できるようにする[エラーフォーマッタ](https://trpc.io/docs/error-formatting)を設定します。

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

## ファイル

tRPC は、`create-t3-app`が設定するかなり多くのボイラープレートを必要とします。生成されるファイルを見ていきましょう：

### 📄 `pages/api/trpc/[trpc].ts`.

これは API のエントリポイントであり、tRPC ルータを公開しています。通常、このファイルに触れることはあまりありませんが、たとえば CORS ミドルウェアなどを有効にする必要がある場合、エクスポートされた `createNextApiHandler` は [Next.js API ハンドラ](https://nextjs.org/docs/api-routes/introduction) であり、 [request](https://developer.mozilla.org/en-US/docs/Web/API/Request) と [response](https://developer.mozilla.org/en-US/docs/Web/API/Response) オブジェクトを受け取ることを知っていれば便利です。つまり、`createNextApiHandler`を任意のミドルウェアでラッピングすることができます。CORS を追加する[コードスニペットの例はこちら](#cors-の有効化)です。

### 📄 `server/api/trpc.ts`

このファイルは、コンテキスト作成と tRPC 初期化の 2 つに分かれています：

1. tRPC プロシージャに渡されるコンテキストを定義しています。コンテキストは、すべての tRPC プロシージャがアクセスできるデータであり、データベース接続、認証情報などが置かれるのに最適な場所です。create-t3-app では、リクエストオブジェクトにアクセスできない場合にコンテキストの一部を使用できるようにするために、2 つの関数を使用しています。

- `createInnerTRPCContext`：これは、リクエストに依存しないコンテキストを定義している場所です。例えば、データベース接続などです。この関数は、リクエストオブジェクトがない [統合テスト](#統合テストの例) や [ssg-helpers](https://trpc.io/docs/v10/ssg-helpers) で使用できます。

- `createTRPCContext`：これは、リクエストに依存するコンテキストを定義している場所です。例えば、ユーザのセッションです。`opts.req`オブジェクトを使ってセッションをリクエストし、そのセッションを `createInnerTRPCContext` 関数に渡して最終的なコンテキストを作成します。

2. tRPC を初期化し、再利用可能な[手続き](https://trpc.io/docs/v10/procedures)と[ミドルウェア](https://trpc.io/docs/v10/middlewares)を定義しています。慣例として、`t`オブジェクト全体をエクスポートするのではなく、再利用可能な手続きとミドルウェアを作成し、それらをエクスポートするようにしてください。

[データトランスフォーマー](https://trpc.io/docs/v10/data-transformers)として `superjson` を使用していることにお気づきでしょう。これにより、データがクライアントに到達したときにもデータ型が保持されるため、例えば`Date`オブジェクトを送信すると、クライアントは文字列ではなく`Date`を返します。他の API のほとんどではこうならないでしょう。

### 📄 `server/api/routers/*.ts`.

ここでは、API のルート群とプロシージャ群を定義します。慣例として、関連する一連のプロシージャごとに[個別のルータ](https://trpc.io/docs/v10/router)を作成します。

### 📄 `server/api/root.ts`.

ここでは、`routers/**`で定義されたすべてのサブルータを 1 つの app ルータに[マージ](https://trpc.io/docs/v10/merging-routers)しています。

### 📄 `utils/api.ts`

これは tRPC のフロントエンドのエントリポイントです。ここでルーターの**型定義**をインポートし、tRPC クライアントと react-query フックを作成します。バックエンドでデータトランスフォーマーとして `superjson` を有効にしたので、フロントエンドでも有効にする必要があります。これは、バックエンドからのシリアライズされたデータが、フロントエンドでデシリアライズされるようにするためです。

ここでは tRPC の[リンク](https://trpc.io/docs/v10/links)を定義し、クライアントからサーバーへのリクエストフローを決定します。ここでは、デフォルトとして [`httpBatchLink`](https://trpc.io/docs/v10/links/httpBatchLink) が指定されており、[リクエストバッチ](https://cloud.google.com/compute/docs/api/how-tos/batch) が有効になっています。また、開発中に役立つリクエストログを出力する [`loggerLink`](https://trpc.io/docs/v10/links/loggerLink) も使用しています。

最後に、フロントエンドで型を推論するために使える[ヘルパー型](https://trpc.io/docs/v10/infer-types#additional-dx-helper-type)をエクスポートします。

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/x4mu-jOiA0Q" title="How tRPC really works" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Create T3 App のコントリビューターである[Christopher Ehrlich](https://twitter.com/ccccjjjjeeee)が[tRPC のデータフローに関するビデオ](https://www.youtube.com/watch?v=x4mu-jOiA0Q)を作成しました。このビデオは、tRPC を使ったことがあるけれども、まだ仕組みがよくわからないと感じる方におすすめです。

## API を外部から呼び出せるようにするには

通常の API では、`curl`、`Postman`、`fetch`などの HTTP クライアントを使用してエンドポイントを呼び出したり、ブラウザから直接呼び出すことができます。しかし、tRPC の場合は少し違います。tRPC クライアントを使わずにプロシージャを呼び出したい場合、2 つの方法が推奨されます：

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

### すべてのプロシージャを REST エンドポイントとして公開する

もし、すべてのプロシージャを外部に公開したい場合は、コミュニティが作ったプラグイン [trpc-openapi](https://github.com/jlalmes/trpc-openapi/tree/master) をチェックアウトしてください。プロシージャにいくつかの特別なメタデータを追加することで、tRPC ルータから OpenAPI 準拠の REST API を生成することができます。

### 単なる HTTP Requests として

tRPC は HTTP で通信するため、通常の HTTP リクエストとして tRPC プロシージャを呼び出すこともできます。ただし、tRPC が使用している[RPC プロトコル](https://trpc.io/docs/v10/rpc)のため、構文が煩雑になる可能性があります。もし興味があれば、ブラウザのネットワークタブで tRPC のリクエストとレスポンスがどのように見えるかを確認することができます。ただ、これはあくまで教育的な練習として行い、上記の解決策のいずれかを採用することをお勧めします。

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

これを前掲した tRPC の例と比較すると、tRPC の利点がわかると思います：

- 各ルートに url を指定する代わりに、ルーター全体が自動補完を持つオブジェクトになります。
- どの HTTP メソッドが使われたかを検証する必要はありません。
- リクエストのクエリやボディがプロシージャの中で正しいデータを含んでいるかどうかを検証する必要はありません、Zod がそれを行なっているからです。
- レスポンスを作成する代わりに、他の TypeScript 関数と同じように、エラーを投げたり、値やオブジェクトを返したりすることができます。
- フロントエンドでプロシージャを呼び出すと、自動補完と型安全性が提供されます。

## 便利なスニペット

以下、便利そうなスニペットを紹介していきます。

### CORS の有効化

React Native アプリを含むモノレポなどで、異なるドメインから API を呼び出す必要がある場合、CORS の有効化が必要かもしれません：

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

### 楽観的な更新

楽観的な更新とは、API コールが終了する前に UI を更新することです。API コールの終了を待たずに UI に反映されるため、ユーザーにとってより良い体験になります。しかし、データの正確性を重視するアプリケーションでは、バックエンドの状態を「真に」反映していないため、楽観的な更新は避けるべきでしょう。詳しくは、[React Query ドキュメント](https://tanstack.com/query/v4/docs/guides/optimistic-updates)をご覧ください。

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

### 統合テストの例

ここでは、[Vitest](https://vitest.dev)を使用して、tRPC ルーターが期待通りに動作しているか、入力パーサーが正しい型を推論しているか、返されたデータが期待通りの出力と一致しているかをチェックする統合テストのサンプルを紹介します。

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

protected なプロシージャを呼び出す場合は、コンテキストを作成するときにモックした `session` オブジェクトを渡すことができます：

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

## お役立ち情報

| リソース                 | リンク                                                  |
| ------------------------ | ------------------------------------------------------- |
| tRPC ドキュメント        | https://www.trpc.io                                     |
| tRPC のサンプル集        | https://github.com/trpc/trpc/tree/next/examples         |
| React Query ドキュメント | https://tanstack.com/query/v4/docs/adapters/react-query |
