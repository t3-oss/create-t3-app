---
title: NextAuth.js
description: NextAuth.jsの使い方
layout: ../../../layouts/docs.astro
lang: ja
---

When you want an authentication system in your Next.js application, NextAuth.js is an excellent solution to bring in the complexity of security without the hassle of having to build it yourself. It comes with an extensive list of providers to quickly add OAuth authentication and provides adapters for many databases and ORMs.

Next.js アプリケーションが認証システムを必要とするとき、NextAuth.js は、自分で構築する手間をかけずに、複雑なセキュリティを取り入れることができる優れたソリューションです。NextAuth.js には OAuth 認証をすばやく追加するための豊富なプロバイダーリストが付属しており、多くのデータベースや ORM のためのアダプターを提供しています。

## Context Provider

In your app's entrypoint, you'll see that your application is wrapped in a [SessionProvider](https://next-auth.js.org/getting-started/client#sessionprovider):

## コンテクストプロバイダー

アプリのエントリーポイントでは、アプリケーションが[SessionProvider](https://next-auth.js.org/getting-started/client#sessionprovider)でラップされていることがわかります：

```tsx:pages/_app.tsx
<SessionProvider session={session}>
  <Component {...pageProps} />
</SessionProvider>
```

This context provider allows your application to access the session data from anywhere in your application, without having to pass it down as props:

このコンテキストプロバイダーによって、アプリケーションはセッションデータを props として渡すことなく、アプリケーションのどこからでもアクセスできるようになります：

```tsx:pages/users/[id].tsx
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  if (!session) {
    // Handle unauthenticated state, e.g. render a SignIn component
    return <SignIn />;
  }

  return <p>Welcome {session.user.name}!</p>;
};
```

## Retrieving session server-side

Sometimes you might want to request the session on the server. To do so, prefetch the session using the `getServerAuthSession` helper function that `create-t3-app` provides, and pass it down to the client using `getServerSideProps`:

## サーバーサイドでセッションを取得する

時には、サーバー上でセッションを要求したいこともあるかもしれません。そのためには、`create-t3-app`が提供するヘルパー関数 `getServerAuthSession` を使ってセッションをプリフェッチし、`getServerSideProps` を使ってクライアントに渡します：

```tsx:pages/users/[id].tsx
import { getServerAuthSession } from "../server/auth";
import { type GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

const User = () => {
  const { data: session } = useSession();
  // NOTE: `session` wont have a loading state since it's already prefetched on the server

  ...
}
```

## Inclusion of `user.id` on the Session

Create T3 App is configured to utilise the [session callback](https://next-auth.js.org/configuration/callbacks#session-callback) in the NextAuth.js config to include the user's ID within the `session` object.

## セッションに `user.id` を含める

Create T3 App は、NextAuth.js の設定にある[session callback](https://next-auth.js.org/configuration/callbacks#session-callback)を利用して、ユーザーの ID を`session`オブジェクトに含めるように設定されています。

```ts:server/auth.ts
callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
```

This is coupled with a type declaration file to make sure the `user.id` is typed when accessed on the `session` object. Read more about [`Module Augmentation`](https://next-auth.js.org/getting-started/typescript#module-augmentation) on NextAuth.js's docs.

これは、`session`オブジェクトにアクセスしたときに `user.id` が型付きであることを確認するための型宣言ファイルと結合しています。さらなる情報については NextAuth.js のドキュメントにある [`Module Augmentation`](https://next-auth.js.org/getting-started/typescript#module-augmentation) を参照ください。

```ts:server/auth.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
```

The same pattern can be used to add any other data to the `session` object, such as a `role` field, but **should not be misused to store sensitive data** on the client.

同じパターンを使って、`role`フィールドのような他のデータを`session`オブジェクトに追加することができますが、**機密データをクライアントに保存するために使用してはなりません**。

## Usage with tRPC

When using NextAuth.js with tRPC, you can create reusable, protected procedures using [middleware](https://trpc.io/docs/v10/middlewares). This allows you to create procedures that can only be accessed by authenticated users. `create-t3-app` sets all of this up for you, allowing you to easily access the session object within authenticated procedures.

This is done in a two step process:

1. Grab the session from the request headers using the [`getServerSession`](https://next-auth.js.org/configuration/nextjs#getServerSession) function. The advantage of using `getServerSession` instead of the regular `getSession` is that it's a server-side only function and doesn't trigger unnecessary fetch calls. `create-t3-app` creates a helper function that abstracts this peculiar API away so that you don't need to import both your NextAuth.js options as well as the `getServerSession` function every time you need to access the session.

## tRPC との併用

NextAuth.js を tRPC で利用する場合、[middleware](https://trpc.io/docs/v10/middlewares)を使って、再利用可能で、保護されたプロシージャを作成することができます。これにより、認証されたユーザーのみがアクセスできるプロシージャを作成することができます。`create-t3-app`は、認証されたプロシージャの中でセッションオブジェクトに簡単にアクセスできるように、すべてセットアップしてくれます。

これは、2 段階のプロセスで行われます：

1. [`getServerSession`](https://next-auth.js.org/configuration/nextjs#getServerSession) 関数を使用して、リクエストヘッダーからセッションを取得する。通常の `getSession`の代わりに`getServerSession` を使用する利点は、サーバーサイドのみの関数であるため、不要なフェッチコールが発生しないことです。`create-t3-app`は、この特殊な API を抽象化するヘルパー関数を作成するので、セッションにアクセスするたびに、NextAuth.js のオプションと`getServerSession` 関数の両方をインポートする必要がありません。

```ts:server/auth.ts
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
```

Using this helper function, we can grab the session and pass it through to the tRPC context:

このヘルパー関数を使って、セッションを取得し、tRPC コンテキストに渡すことができます：

```ts:server/api/trpc.ts
import { getServerAuthSession } from "../auth";

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });
  return await createContextInner({
    session,
  });
};
```

2. Create a tRPC middleware that checks if the user is authenticated. We then use the middleware in a `protectedProcedure`. Any caller to these procedures must be authenticated, or else an error will be thrown which can be appropriately handled by the client.

3. ユーザーが認証されているかどうかをチェックする tRPC ミドルウェアを作成します。そして、そのミドルウェアを `protectedProcedure` で使用します。これらのプロシージャの呼び出し元はすべて認証されていなければなりません。さもなければ、クライアントが適切に処理できるようにエラーが投げられます。

```ts:server/api/trpc.ts
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
```

The session object is a light, minimal representation of the user and only contains a few fields. When using the `protectedProcedures`, you have access to the user's id which can be used to fetch more data from the database.

セッションオブジェクトは、ユーザーの軽くて最小限の表現であり、いくつかのフィールドを含むだけです。protectedProcedures`を使用すると、データベースからより多くのデータを取得するために使用できるユーザーの id にアクセスできます。

```ts:server/api/routers/user.ts
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

## Usage with Prisma

Getting NextAuth.js to work with Prisma requires a lot of [initial setup](https://authjs.dev/reference/adapter/prisma/). `create-t3-app` handles all of this for you, and if you select both Prisma and NextAuth.js, you'll get a fully working authentication system with all the required models preconfigured. We ship your scaffolded app with a preconfigured Discord OAuth provider, which we chose because it is one of the easiest to get started with - just provide your tokens in the `.env` and you're good to go. However, you can easily add more providers by following the [NextAuth.js docs](https://next-auth.js.org/providers/). Note that certain providers require extra fields to be added to certain models. We recommend you read the documentation for the provider you would like to use to make sure you have all the required fields.

## Prisma での使用方法

NextAuth.js を Prisma で動作させるためには、多くの[初期設定](https://authjs.dev/reference/adapter/prisma/)が必要です。Prisma と NextAuth.js の両方を選択すると、必要なモデルがすべて設定された、完全に動作する認証システムを手に入れることができるのです！ `create-t3-app` はこのすべてを処理します。Prisma と NextAuth.js の両方を選択した場合、必要なモデルがあらかじめ設定された、完全に動作する認証システムが得られます。雛形アプリには、Discord OAuth プロバイダがあらかじめ設定されています。しかし、[NextAuth.js ドキュメント](https://next-auth.js.org/providers/) に従えば、簡単に他のプロバイダを追加することができます。なお、プロバイダによっては、特定のモデルに余分なフィールドを追加する必要がある場合があります。利用したいプロバイダのドキュメントを読んで、必要なフィールドがすべて揃っていることを確認することをお勧めします。

### Adding new fields to your models

When adding new fields to any of the `User`, `Account`, `Session`, or `VerificationToken` models (most likely you'd only need to modify the `User` model), you need to keep in mind that the [Prisma adapter](https://next-auth.js.org/adapters/prisma) automatically creates fields on these models when new users sign up and log in. Therefore, when adding new fields to these models, you must provide default values for them, since the adapter is not aware of these fields.

If for example, you'd like to add a `role` to the `User` model, you would need to provide a default value to the `role` field. This is done by adding a `@default` value to the `role` field in the `User` model:

### モデルに新しいフィールドを追加する

`User`、`Account`、`Session`、`VerificationToken`のいずれかのモデルに新しいフィールドを追加する場合（ほとんどの場合、`User`モデルのみを変更する必要があります）、[Prisma adapter](https://next-auth.js.org/adapters/prisma) が新しいユーザーのサインアップやログイン時に自動的にこれらのモデル上にフィールドを作成することを念頭に置いておく必要があります。したがって、これらのモデルに新しいフィールドを追加する場合は、デフォルト値を指定する必要があります。

例えば、`User`モデルに `role` を追加したい場合、`role` フィールドにデフォルト値を指定する必要があります。これは `User` モデルの `role` フィールドに `@default` 値を追加することで実現できる：

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

## Usage with Next.js middleware

Usage of NextAuth.js with Next.js middleware [requires the use of the JWT session strategy](https://next-auth.js.org/configuration/nextjs#caveats) for authentication. This is because the middleware is only able to access the session cookie if it is a JWT. By default, Create T3 App is configured to use the **default** database strategy, in combination with Prisma as the database adapter.

## Next.js ミドルウェアを使った利用法

NextAuth.js を Next.js ミドルウェアで利用する場合、認証に JWT セッション戦略](https://next-auth.js.org/configuration/nextjs#caveats)を利用する必要があります。これは、ミドルウェアがJWTである場合にのみ、セッションクッキーにアクセスすることができるためです。デフォルトでは、Create T3 App は、データベースアダプターとして Prisma と組み合わせて、**default**データベースストラテジーを使用するように構成されています。

## Setting up the default DiscordProvider

1. Head to [the Applications section in the Discord Developer Portal](https://discord.com/developers/applications), and click on "New Application"
2. In the settings menu, go to "OAuth2 => General"

- Copy the Client ID and paste it in `DISCORD_CLIENT_ID` in `.env`.
- Under Client Secret, click "Reset Secret" and copy that string to `DISCORD_CLIENT_SECRET` in `.env`. Be careful as you won't be able to see this secret again, and resetting it will cause the existing one to expire.
- Click "Add Redirect" and paste in `<app url>/api/auth/callback/discord` (example for local development: <code class="break-all">http://localhost:3000/api/auth/callback/discord</code>)
- Save your changes
- It is possible, but not recommended, to use the same Discord Application for both development and production. You could also consider [Mocking the Provider](https://github.com/trpc/trpc/blob/main/examples/next-prisma-websockets-starter/src/pages/api/auth/%5B...nextauth%5D.ts) during development.

## デフォルトの DiscordProvider を設定する

1. [Discord Developer Portal のアプリケーションセクション](https://discord.com/developers/applications)に向かい、「New Application」をクリックします。
2. 設定メニューの 「OAuth2⇒ 一般」

- Client ID をコピーして、`.env`の`DISCORD_CLIENT_ID`に貼り付けます。
- Client Secret の下にある 「Reset Secret」をクリックし、その文字列を`.env`の`DISCORD_CLIENT_SECRET`にコピーしてください。この秘密情報は二度と表示されないので、リセットすると既存の秘密情報はが失効してしまうので注意してください。
- Add Redirect」をクリックし、`<app url>/api/auth/callback/discord` を貼り付ける(ローカル開発サーバの場合の例：<code class="break-all">http://localhost:3000/api/auth/callback/discord</code>)
- 変更を保存する
- 開発用と本番用で同じ Discord Application を使用できますが、推奨はしません。また、開発時に[Mocking the Provider](https://github.com/trpc/trpc/blob/main/examples/next-prisma-websockets-starter/src/pages/api/auth/%5B...nextauth%5D.ts)を検討するのもよいでしょう。

## お役立ち情報

| リソース                                  | リンク                                  |
| ----------------------------------------- | --------------------------------------- |
| NextAuth.js ドキュメント                  | https://next-auth.js.org/               |
| NextAuth.js GitHub                        | https://github.com/nextauthjs/next-auth |
| tRPC キッチンシンク - NextAuth と併用して | https://kitchen-sink.trpc.io/next-auth  |
