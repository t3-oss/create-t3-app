---
title: その他のオススメポイント
description: 多くのプロジェクトに推奨しているライブラリ・サービス
layout: ../../layouts/docs.astro
lang: ja
---

We recognize that the libraries included in `create-t3-app` don't solve every problem. While we encourage you to begin your project with the things that we provide, there will come a time when you need to bring in other packages. Only you can know what your project needs, but here are some things that we find ourselves recommending frequently.

These are recommendations by individual Create T3 App contributors and should not be seen as "official" endorsements by the Create T3 App team or T3-OSS. _**Please do your own research, especially before committing to paid services**_.

我々は、`create-t3-app`に含まれるライブラリがすべての問題を解決するわけではないことを認識しています。私たちが提供するものでプロジェクトを始めることをお勧めしますが、他パッケージ導入が必要となる時も来るでしょう。あなたのプロジェクトに何が必要かを知っているのはあなただけです。ここでは、私たちが頻繁に推奨しているものをいくつか紹介します。

これらは、個々の Create T3 App の貢献者による推奨であり、Create T3 App チームまたは T3-OSS による「公式」推奨とみなされるものではありません。 _**特に有料サービスを利用する前にはご自身で調査してください**_。

## State Management

_**Editor's Note**_: State management libraries can be great, but often aren't necessary. tRPC's React Query hooks should be able to take care of your server state. For client state, start with React's `useState`, and reach for one of these options when you need more.

## 状態管理

_**編集部注**_：tRPC の React Query フックでサーバー状態を管理することができるでしょう。クライアントの状態については、React の`useState`から始め、もっと必要になったときにこれら選択肢のどれかを使用すれば良いでしょう。

### Zustand

**For never using Redux again**

The "modern, simple Redux" you didn't know you needed. [Poimandres](https://github.com/pmndrs) can always be trusted. You can build everything from video call apps to games to servers with this little library.

- [Zustand Homepage](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Zustand

**もう二度と Redux を使わないために**

あなたが知らない「モダンでシンプルな Redux」。[Poimandres](https://github.com/pmndrs)はいつも信頼できます。この小さなライブラリで、ビデオ通話アプリからゲーム、サーバーまで、あらゆるものを作ることができます。

- [Zustand ホームページ](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Jotai

**For never using Context again**

For a more atomic approach, Jotai is hard to beat. Also by [Poimandres](https://github.com/pmndrs), Jotai lets you define singletons that feel like global useState. A great option for stateful behaviors that don't need a state machine just yet.

- [Jotai Homepage](https://jotai.org/)
- [Jotai GitHub](https://github.com/pmndrs/jotai)

### Jotai

**Context を二度と利用しないために**

よりアトミックなアプローチでは、Jotai が勝るとも劣らりません。同じく[Poimandres](https://github.com/pmndrs)による Jotai では、グローバルな useState のような感覚でシングルトンを定義することができます。ステートマシンまでは必要としないステートフルな振舞いに最適なオプションです。

- [Jotai ホームページ](https://jotai.org/)
- [Jotai GitHub](https://github.com/pmndrs/jotai)

## Component Libraries

Most apps need the same handful of components - toggle buttons, dropdown menus, modals, and so on. These libraries provide great, accessible components that you can use and customize to your liking.

## コンポーネントライブラリ

ほとんどのアプリは、トグルボタン、ドロップダウンメニュー、モーダルなど、同じ一握りのコンポーネントを必要とします。これらのライブラリは、あなたの好みに合わせてカスタマイズできる、アクセスしやすい優れたコンポーネントを提供しています。

### Unstyled Component Libraries

Also known as headless libraries, they provide great unstyled, and accessible components that you can customize to your liking. Here are a few recommendations.

- [Radix UI](https://www.radix-ui.com/) gives you a powerful set of convenient and accessible primitives that you can style with vanilla or Tailwind CSS.

- [Headless UI](https://headlessui.com/) made by the Tailwind CSS team also provides unstyled, accessible components that integrate seamlessly with Tailwind CSS.

- [React Aria](https://react-spectrum.adobe.com/react-aria/) provides accessible UI primitives for your design system. Their Date Picker component is top tier.

### スタイルのないコンポーネント・ライブラリ

ヘッドレスライブラリとも呼ばれ、スタイルにとらわれず、自分好みにカスタマイズできるアクセス性の高い素晴らしいコンポーネントを提供しています。ここでは、おすすめのものをいくつか紹介します。

- [Radix UI](https://www.radix-ui.com/) は、バニラまたは Tailwind CSS でスタイルを設定できる便利でアクセスしやすいプリミティブの強力なセットを提供します。

- Tailwind CSS チームによって作られた[Headless UI](https://headlessui.com/)も、Tailwind CSS とシームレスに統合された、スタイルのないアクセシビリティを考慮したコンポーネント群を提供しています。

- [React Aria](https://react-spectrum.adobe.com/react-aria/)は、デザインシステムのためのアクセシビリティを考慮した UI プリミティブを提供します。彼らの Date Picker コンポーネントはトップクラスです。

### Styled Component Libraries

**For when you just want your app to look OK**

Sometimes you're building a project where you just want the UI to look decent out of the box. For Admin Dashboards and other similar projects, any of these component libraries will get the job done.

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)
- [@shadcn/ui](https://ui.shadcn.com/)

### スタイルド・コンポーネント・ライブラリ

**アプリの外観を整えたいときに**。

プロジェクトでは、UI がすぐにきちんと見えるようにしたい場合があります。管理者用ダッシュボードやその他の類似のプロジェクトでは、これらのコンポーネント・ライブラリのいずれかを使用すれば、仕事を完了することができます。

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)
- [@shadcn/ui](https://ui.shadcn.com/)

### Class Variance Authority

**For building UI Libraries**

Declaratively build a UI Library with different color, size, etc. variants. When your project reaches a scale where you want a standardized set of UI components with multiple variants using Tailwind CSS, CVA is a great tool.

### Class Variance Authority

**UI ライブラリ構築用**

色やサイズなどのバリエーションを持った UI ライブラリを宣言的に構築します。プロジェクトが大規模になり、複数のバリエーションがある 標準化した Tailwind CSS ベースの UI コンポーネントのセットが必要になったとき、CVA は素晴らしいツールになります。

- [Class Variance Authority GitHub](https://github.com/joe-bell/cva)

## Animations

For when you need animations in your app, here are our recommendations.

## アニメーション

アプリにアニメーションが必要になったときのための、おすすめのアプリを紹介します。

### AutoAnimate

**For animations with a single line of code**

Most animation libraries try to satisfy every possible use case, and become clunky as a result. AutoAnimate is a zero-configuration tool that will give you a significant improvement in UX with no additional developer effort.

- [AutoAnimate Homepage](https://auto-animate.formkit.com/)
- [AutoAnimate GitHub](https://github.com/formkit/auto-animate)
- [AutoAnimate Component Snippet](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### オートアニメーション

**1 行のコードでアニメーションを作成する場合**

ほとんどのアニメーションライブラリは、ありとあらゆるユースケースを満たそうとするため、結果的に不格好になってしまいます。AutoAnimate は、設定不要のツールで、開発者の労力を増やすことなく、UX を大幅に向上させることができます。

- [AutoAnimate のホームページ](https://auto-animate.formkit.com/)
- [AutoAnimate GitHub](https://github.com/formkit/auto-animate)
- [AutoAnimate Component Snippet](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Framer Motion

**For complex animations with declarative code**

Framer Motion provides a simple, declarative syntax and allows you to write less code to craft everything from complex animations to even gestures.

- [Framer Motion Homepage](https://framer.com/motion)
- [Framer Motion Documentation](https://www.framer.com/docs/)

### Framer Motion

**宣言的なコードで複雑なアニメーションを実現する**。

Framer Motion は、シンプルで宣言的なシンタックスを提供し、複雑なアニメーションからジェスチャーまで、より少ないコードで作成できるようにします。

- [Framer Motion ホームページ](https://framer.com/motion)
- [Framer Motion ドキュメント](https://www.framer.com/docs/)

## Deployments, Infrastructure, Databases and CI

## デプロイメント、インフラ、データベース、CI

### Vercel

**For hosting your app**

Vercel took the hell of web deployments and made it a set-and-forget GitHub integration. We've scaled to hundreds of thousands of users without issue. AWS-powered, just a way better interface :)

- [Vercel Homepage](https://vercel.com/)
- [Create T3 App Vercel deployment guide](/en/deployment/vercel)

### Vercel

**アプリのホスティング用**

Vercel は、Web デプロイメントの地獄を、セット＆フォゲットの GitHub 統合にしました。私たちは問題なく数十万人のユーザーにスケールしています。AWS の力を借りて、より良いインターフェイスを実現しました。:）

- [Vercel のホームページ](https://vercel.com/)
- [Create T3 App Vercel デプロイメントガイド](/ja/deployment/vercel)

### PlanetScale

**For databases without the worry**

PlanetScale is the best "serverless database platform" we've used by far. Insane scale, great developer experience, and fantastic pricing. If you're using SQL (and hopefully Prisma), this is hard to beat.

- [PlanetScale Homepage](https://planetscale.com/)

### PlanetScale

**心配のないデータベースのために**

PlanetScale は、これまで使ってきた「サーバーレスデータベースプラットフォーム」の中で最も優れています。非常識なスケール、素晴らしい開発者体験、そして素晴らしい価格設定。SQL（できれば Prisma も）を使っているのであれば、これに勝るものはないでしょう。

- [PlanetScale ホームページ](https://planetscale.com/)

### Railway

**For hosting your infra**

"Modern Heroku". The easiest way to get a real server up and running. If Vercel and PlanetScale aren't enough, Railway probably is. Point it at a GitHub repo and go.

- [Railway Homepage](https://railway.app/)

### Railway

**インフラのホスティングに最適**

"モダン Heroku"。本物のサーバーを立ち上げるための最も簡単な方法です。Vercel と PlanetScale が十分でなくても、Railway なら充足するでしょう。GitHub のリポジトリを指定して、実行してみてください。

- [Railway ホームページ](https://railway.app/)

### Upstash

**For serverless Redis**

We love Prisma and PlanetScale, but some projects require a more performant solution. Upstash allows you to get the in-memory performance of Redis in your serverless project, without having to manage the infrastructure and scaling yourself.

- [Upstash Homepage](https://upstash.com/)

### Upstash

**サーバーレス Redis のために**

私たちは Prisma と PlanetScale を愛していますが、プロジェクトによってはよりパフォーマンスの高いソリューションが必要です。Upstash を使えば、インフラやスケーリングを自分で管理することなく、サーバーレスプロジェクトで Redis のインメモリ実行の性能を手に入れることができます。

- [Upstash ホームページ](https://upstash.com/)

### Pusher

**For serverless WebSockets**

If WebSockets are the primary focus of your project, you may want to consider a more traditional backend such as [Fastify](https://www.fastify.io/) (which [also works with tRPC!](https://trpc.io/docs/v10/fastify)). But for quickly adding WebSockets to a T3 App, Pusher is an excellent choice.

- [Pusher Homepage](https://pusher.com/)

### Pusher

**サーバーレス WebSocket のために**

WebSocket がプロジェクトの主な焦点である場合、[Fastify](https://www.fastify.io/) (これは[tRPC でも動作する!](https://trpc.io/docs/v10/fastify))などのより伝統的なバックエンドを検討するのがよいでしょう。しかし、T3 アプリに WebSocket を素早く追加するためには、Pusher は素晴らしい選択です。

- [Pusher ホームページ](https://pusher.com/)

### Soketi

Soketi is a self-hostable, simple, and fast alternative to Pusher. It's fully compatible with the Pusher SDK which you can use to connect to the server. Soketi serverless is also in beta.

- [Soketi Homepage](https://soketi.app)
- [Soketi GitHub](https://github.com/soketi/soketi)

### Soketi

Soketi は Pusher の代替となる、セルフホスティング可能でシンプルで、高速なソフトウェアです。サーバーに接続するために使用できる Pusher SDK と完全に互換性があります。Soketi のサーバーレスもベータ版です。

- [Soketi ホームページ](https://soketi.app)
- [Soketi GitHub](https://github.com/soketi/soketi)

## Analytics

User data is very valuable when you're building an app. Here are some analytics providers we recommend.

## アナリティクス

アプリを作る上で、ユーザーデータはとても貴重です。ここでは、私たちがおすすめする分析プロバイダーをご紹介します。

### Plausible

Need analytics? Plausible is one of the quickest ways to get them. Super minimal. It even has a [simple plugin for Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Plausible Homepage](https://plausible.io/)

### Plausible

アナリティクスが必要ですか？Plausible は、それらを得るための最も迅速な方法の 1 つです。超ミニマム。[Next.js 用のシンプルなプラグイン](https://plausible.io/docs/proxy/guides/nextjs)もあります。

- [Plausible ホームページ](https://plausible.io/)

### Umami

Umami is an open-sourced, self-hostable, simple, fast, privacy-focused alternative to Google Analytics. You can deploy it really easily to Vercel, Railway, etc. with PlanetScale as your database.

- [Umami ホームページ](https://umami.is/)
- [Umami GitHub](https://github.com/umami-software/umami)

### Umami

Umami は、Google Analytics に代わる、オープンソースでセルフホスティング可能な、シンプルで高速な、プライバシーに重点を置いたソフトウェアです。PlanetScale をデータベースとして、Vercel や Railway などに実に簡単にデプロイすることができます。

- [Umami ホームページ](https://umami.is/)
- [Umami GitHub](https://github.com/umami-software/umami)

## Other

### Next Bundle Analyzer

It can sometimes be difficult to determine what will be included in the build output for your app. Next Bundle Analyzer is an easy way to visualize and analyze the JavaScript bundles that are generated.

- [@next/bundle-analyzer on npm](https://www.npmjs.com/package/@next/bundle-analyzer)

# その他

### Next Bundle Analyzer

アプリのビルド出力に何が含まれるかを判断するのは、時として難しい場合があります。Next Bundle Analyzer は、生成される JavaScript バンドルを簡単に視覚化し、分析する方法です。

- [@next/bundle-analyzer on npm](https://www.npmjs.com/package/@next/bundle-analyzer)
