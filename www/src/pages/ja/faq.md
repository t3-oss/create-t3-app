---
title: FAQ
description: Frequently asked questions about Create T3 App
layout: ../../layouts/docs.astro
lang: ja
---

Create T3 App についてよくある質問をまとめています。

## 次は何をしたらいいの？アプリを作るには？

あなたが私たちの用意した足場から始めて、後から必要になったものを追加できるよう、私たちはこのプロジェクトがなるべくシンプルであるよう努めています。

このプロジェクトで用いられる様々な技術に馴染みがない場合、それぞれのドキュメントを参照してください。その上でよくわからない場合は、[Discord](https://t3.gg/discord) でご相談ください。

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## 何か学習教材はありますか？

下記のような最高のリソースが T3 Stack 向けに存在していますが、コミュニティ（と[Theo](https://youtu.be/rzwaaWH0ksk?t=1436)）は、とりあえず T3 Stack を使うことから始めて、実装しながら学ぶことを推奨しています。

Create T3 App を検討しているのであれば、既に含まれているライブラリのいくつかを使ったことがある可能性が高いです。であれば、まずは使うところから始めてみて、不慣れなものはアプリケーションを作りながら学びませんか？

とはいえ、この方法が誰にでも通用するものではないことは認識しています。ですので、推奨された方法を試したものの、まだ何かしらのリソースが必要だと感じている場合や、あるいは自分でやってみる自信がない場合、あるいは T3 Stack に圧倒されていると感じている場合は、これらの Create T3 App の素晴らしいチュートリアルをチェックしてみてください。

### 記事

- [Build a full stack app with Create T3 App](https://www.nexxel.dev/blog/ct3a-guestbook)
- [A first look at Create T3 App](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrating your T3 App into a Turborepo](https://www.jumr.dev/blog/t3-turbo)
- [Integrating Stripe into your T3 App](https://blog.nickramkissoon.com/posts/integrate-stripe-t3)

### 動画

- [Build a Twitter Clone with the T3 Stack - tRPC, Next.js, Prisma, Tailwind & Zod](https://www.youtube.com/watch?v=nzJsYJPCc80)
- [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [The T3 Stack - How We Built It](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [An overview of the Create T3 App (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)

## プロジェクトに `.js` ファイルが存在するのは何故ですか？

[T3-Axiom #3](/en/introduction#typesafety-isnt-optional) で説明した通り、我々は型安全であることを最重要としています。しかしながら不幸なことに、フレームワークやプラグインの中には TypeScript をサポートしていないものもあるので、一部の設定ファイルが `.js` ファイルになってしまうことは避けられません。

我々は、各ファイルの拡張子 (`cjs` または `mjs`) を、使用するライブラリでサポートされているものに応じて明示的に宣言することで、これらのファイルが理由があって JavaScript であることを強調するように努めています。また、本プロジェクトに含まれる全ての `js` ファイルは、先頭に `@ts-check` というコメントをつけているので、型チェックの対象となっています。

## アプリの国際化対応に苦労しています。何か参考になるものはありますか？

i18n は非常に意見が分かれる議題であり、複数の実装方法が考えられるため、`create-t3-app` にデフォルトで含めることは辞めました。

しかしながら、もし実装に苦労していて、参考となるプロジェクトを見たい場合は、[こちらのリポジトリ](https://github.com/juliusmarminge/t3-i18n)を参照してください。[next-i18next](https://github.com/i18next/next-i18next)を使って T3 App に i18n を追加する方法を紹介しています。

## なぜ Next.js 13 からの `/app` ではなく `/pages` を使っているのですか？

我々は [T3-Axiom #2](/en/introduction#bleed-responsibly)のように、最先端のものを愛していますが、同時に安定性を重視します。既存アプリの router 全体を移植するのは難しく、 [挑戦的な試みに最適な場所ではありません](https://youtu.be/mnwUbtieOuI?t=1662)。 `/app` は [画期的](https://youtu.be/rnsC-12PVlM?t=818)ですが、実運用レベルには達していません。API はベータ版であり、破壊的変更が予想されます。

`/app` ディレクトリの、サポートされている機能・予定されている機能・開発進行中の機能の一覧については、[beta Next.js docs](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features) を参照してください。
