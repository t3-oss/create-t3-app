---
title: はじめの一歩
description: 新しいT3アプリを使い始める
layout: ../../../layouts/docs.astro
lang: jp
---

You just scaffolded a new T3 App and are ready to go. Here is the bare minimum to get your app working.

あなたは、新しい T3 アプリを足場にして、準備万端です。ここでは、アプリを動作させるために必要な最低限のことを説明します。

## Database

If your app includes Prisma, make sure to run `npx prisma db push` from the root directory of your app. This command will sync your Prisma schema with your database and will generate the TypeScript types for the Prisma Client based on your schema. Note that you need to [restart the TypeScript server](https://tinytip.co/tips/vscode-restart-ts/) after doing this so that it can detect the generated types.

## データベース

アプリケーションに Prisma が含まれている場合は、アプリのルートディレクトリから`npx prisma db push`を実行することを確認してください。このコマンドを実行すると、Prisma スキーマがデータベースと同期され、スキーマに基づいて Prisma クライアント用の TypeScript 型が生成されます。なお、生成された型を検出できるようにするため、このコマンドを実行した後に [TypeScript サーバーを再起動する](https://tinytip.co/tips/vscode-restart-ts/) 必要があります。

## Authentication

If your app includes NextAuth.js, we get you started with the `DiscordProvider`. This is one of the simplest providers that NextAuth.js offers, but it still requires a bit of initial setup on your part.

Of course, if you prefer to use a different auth provider, you can also use one of the [many providers](https://next-auth.js.org/providers/) that NextAuth.js offers.

1. You will need a Discord account, so register one if you haven't already.
2. Navigate to https://discord.com/developers/applications and click "New Application" in the top right corner. Give your application a name and agree to the Terms of Service.
3. Once your application has been created, navigate to "Settings → OAuth2 → General".
4. Copy the "Client ID" and add it to your `.env` as `DISCORD_CLIENT_ID`.
5. Click "Reset Secret", copy the new secret, and add it to your `.env` as `DISCORD_CLIENT_SECRET`.
6. Click "Add Redirect" and type in `http://localhost:3000/api/auth/callback/discord`.
   - For production deployment, follow the previous steps to create another Discord Application, but this time replace `http://localhost:3000` with the URL that you are deploying to.
7. Save Changes.
8. Set the `NEXTAUTH_SECRET` in `.env`. In development any string will work, for production see the note in `.env` on generating a secure secret.

You should now be able to log in.

## 認証

アプリケーションに NextAuth.js が含まれている場合、まず`DiscordProvider`から始めます。これは NextAuth.js が提供するプロバイダの中で最もシンプルなものの一つですが、初期設定が少し必要です。

もちろん、別の認証プロバイダを使いたい場合は、NextAuth.js が提供する[多数のプロバイダ](https://next-auth.js.org/providers/)を利用することができます。

1. Discord のアカウントが必要になりますので、まだの方は登録してください。
2. https://discord.com/developers/applications に移動し、右上の「New Application」をクリックします。アプリケーションの名前を付け、利用規約に同意してください。
3. アプリケーションの作成が完了したら、「設定 → OAuth2 → 一般」に移動してください。
4. クライアント ID」をコピーし、`DISCORD_CLIENT_ID`として`.env`に追加します。
5. Reset Secret」をクリックし、新しい秘密情報をコピーし、`DISCORD_CLIENT_SECRET`として`.env`に追加します。
6. Add Redirect "をクリックし、`http://localhost:3000/api/auth/callback/discord`と入力します。

   - 本番環境でのデプロイの場合は、前述の手順で別の Discord アプリケーションを作成しますが、今回は`http://localhost:3000`をデプロイ先の URL で置き換えてください。

7. 変更を保存します。
8. `.env`に`NEXTAUTH_SECRET`を設定します。開発環境ではどのような文字列でも構いませんが、本番環境では`.env`にある安全な秘密の生成に関する注意事項を参照してください。

これで、ログインできるようになります。

## Editor Setup

The following extensions are recommended for an optimal developer experience. The links below provide editor specific plugin support.

- [Prisma Extension](https://www.prisma.io/docs/guides/development-environment/editor-setup)
- [Tailwind CSS IntelliSense Extension](https://tailwindcss.com/docs/editor-setup)
- [Prettier Extension](https://prettier.io/docs/en/editors.html)

## エディターの設定

最適な開発者体験のために、以下の VSCode 拡張機能(Extension)を推奨します。以下のリンクは、エディター固有のプラグインサポートを提供します。

- [Prisma Extension](https://www.prisma.io/docs/guides/development-environment/editor-setup)
- [Tailwind CSS IntelliSense Extension](https://tailwindcss.com/docs/editor-setup)
- [Prettier Extension](https://prettier.io/docs/en/editors.html)

## Next Steps

- If your app includes tRPC, check out `src/pages/index.tsx` and `src/server/api/routers/example.ts` to see how tRPC queries work.
- Have a look around the Create T3 App docs, as well as the docs of the packages that your app includes.
- Join our [Discord](https://t3.gg/discord) and give us a star on [GitHub](https://github.com/t3-oss/create-t3-app)! :)

## 次のステップへ

- もしあなたのアプリケーションが tRPC を含んでいるならば、`src/pages/index.tsx` と `src/server/api/routers/example.ts` をチェックして、tRPC クエリがどのように動作するかを見てください。
- Create T3 App のドキュメントや、あなたのアプリケーションに含まれるパッケージのドキュメントを見てみてください。
- [Discord](https://t3.gg/discord)に参加し、[GitHub](https://github.com/t3-oss/create-t3-app)でスターを付けてください！:)
