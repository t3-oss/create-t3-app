---
title: はじめの一歩
description: 新しいT3アプリを使い始める
layout: ../../../layouts/docs.astro
lang: ja
---

新しい T3 アプリのために初期構成を生成し、準備ができたとして、ここではアプリを動作させるために必要な最低限の手順を説明します。

## データベース

アプリケーションに Prisma を含めた場合には、アプリケーションのルートディレクトリから`npx prisma db push`を実行してください。このコマンドは Prisma スキーマをデータベースと同期させ、スキーマに基づいて Prisma クライアントの TypeScript 型を生成します。なお、このコマンドを実行した後、生成された型を検出できるように [TypeScript サーバーを再起動する](https://tinytip.co/tips/vscode-restart-ts/) 必要があることに注意して下さい。

## 認証

アプリケーションに NextAuth.js を含めた場合、まず`DiscordProvider`から始めます。これは NextAuth.js が提供するプロバイダの中で最もシンプルなものの一つですが、初期設定が少し必要です。

もちろん、別の認証プロバイダを使いたい場合は、NextAuth.js が提供する[多数のプロバイダ](https://next-auth.js.org/providers/)から選んで利用することができます。

1. Discord のアカウントが必要になりますので、まだの方は登録してください。
2. https://discord.com/developers/applications に移動し、右上の「New Application」をクリックします。アプリケーションの名前を付け、利用規約に同意してください。
3. アプリケーションの作成が完了したら、「Settings → OAuth2 → General」に移動してください。
4. 「Client ID」をコピーし、`AUTH_DISCORD_ID`として`.env`に追加します。
5. 「Reset Secret」をクリックし、新しいシークレット情報をコピーし、`AUTH_DISCORD_SECRET`として`.env`に追加します。
6. 「Add Redirect」をクリックし、`http://localhost:3000/api/auth/callback/discord`と入力します。
   - 本番環境でのデプロイの場合は、前述の手順で別の Discord アプリケーションを作成しますが、今回は`http://localhost:3000`をデプロイ先の URL で置き換えてください。

7. 変更を保存します。

これでログインできるようになります。

## エディターの設定

開発者体験を最適にするために、以下の拡張機能を推奨します。以下のリンクは、それぞれのエディター用のプラグインサポートを提供します。

- [Prisma Extension](https://www.prisma.io/docs/guides/development-environment/editor-setup)
- [Tailwind CSS IntelliSense Extension](https://tailwindcss.com/docs/editor-setup)
- [Prettier Extension](https://prettier.io/docs/en/editors.html)

## 次のステップへ

- もしあなたのアプリケーションが tRPC を含んでいるならば、`src/pages/index.tsx` と `src/server/api/routers/post.ts` をチェックして、tRPC クエリがどのように動作するかを見てください。
- Create T3 App のドキュメントや、あなたのアプリケーションに含まれるパッケージのドキュメントを見てみてください。
- [Discord](https://t3.gg/discord)に参加し、[GitHub](https://github.com/t3-oss/create-t3-app)でスターを付けてください！:)
