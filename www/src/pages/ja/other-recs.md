---
title: その他のオススメ
description: 多くのプロジェクトに推奨しているライブラリ・サービス
layout: ../../layouts/docs.astro
lang: ja
---

私たちは、`create-t3-app`に含まれるライブラリがすべての問題を解決するわけではないことを認識しています。私たちの提供物でプロジェクトを始めることをお勧めしますが、他パッケージの導入が必要となる時も来るでしょう。あなたのプロジェクトに必要なものを知っているのはあなただけです。ここでは、私たちが頻繁に推奨しているものをいくつか紹介します。

これらは、個々の Create T3 App の貢献者による推奨であり、Create T3 App チームまたは T3-OSS による「公式」推奨とみなされるものではありません。 _**特に有料サービスを利用する前にはご自身で調査してください**_。

## 状態管理

_**編集部注**_：tRPC の React Query フックでサーバー状態を管理することができるでしょう。クライアントの状態管理については、React の`useState`から始め、不足を感じた時になってからこれらの選択肢のいずれかを使用すれば良いでしょう。

### Zustand

**もう二度と Redux を使わないために**

あなたが知らない「モダンでシンプルな Redux」。[Poimandres](https://github.com/pmndrs)はいつも信頼できます。この小さなライブラリで、ビデオ通話アプリからゲーム、サーバーまで、あらゆるものを作れます。

- [Zustand ホームページ](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Jotai

**もう二度と Context を使わないために**

よりアトミックなアプローチでは、Jotai が勝るとも劣りません。Zustand と同じく、[Poimandres](https://github.com/pmndrs)から提供される Jotai は、グローバルな useState のような感覚でシングルトンを定義することができます。ステートマシンまでは必要としないステートフルな振舞いに最適なオプションです。

- [Jotai ホームページ](https://jotai.org/)
- [Jotai GitHub](https://github.com/pmndrs/jotai)

## コンポーネントライブラリ

ほとんどのアプリケーションは、トグルボタン、ドロップダウンメニュー、モーダルなど、同じ一握りのコンポーネントを必要とします。これらのライブラリは、あなたの好みに合わせてカスタマイズできる、アクセスしやすい優れたコンポーネントを提供しています。

### スタイルのない(Unstyled)コンポーネントライブラリ

「ヘッドレスライブラリ」とも呼ばれ、スタイルにとらわれず、自分好みにカスタマイズできるアクセス性の高い素晴らしいコンポーネントが提供されています。ここでは、おすすめのものをいくつか紹介します。

- [Radix UI](https://www.radix-ui.com/) は、バニラまたは Tailwind CSS でスタイルを設定できる、便利でアクセスしやすいプリミティブの強力なセットを提供します。

- Tailwind CSS チームによって作られた[Headless UI](https://headlessui.com/)も、Tailwind CSS とシームレスに統合された、スタイルのないアクセシビリティを考慮したコンポーネント群を提供しています。

- [React Aria](https://react-spectrum.adobe.com/react-aria/)は、アクセシビリティを考慮した UI プリミティブをあなたのデザインシステムに提供します。彼らの Date Picker コンポーネントはトップクラスです。

### スタイル付けされた(Styled)コンポーネントライブラリ

**アプリケーションを見た目良くしたいだけの場合**

プロジェクトでは、UI がすぐに格好良く見えるようにしたい場合があります。管理者用ダッシュボードや、他の類似のプロジェクトでは、以下のコンポーネントライブラリのいずれかを使用すれば、目的を達成できます。

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)
- [@shadcn/ui](https://ui.shadcn.com/)

### Class Variance Authority

**UI ライブラリ構築用**

色やサイズなどのバリエーションを持った UI ライブラリを宣言的に構築します。プロジェクトが大規模になり、複数のバリエーションがある 標準化した Tailwind CSS ベースの UI コンポーネントのセットが必要になったとき、CVA は素晴らしいツールになります。

- [Class Variance Authority GitHub](https://github.com/joe-bell/cva)

## アニメーション

アニメーションが必要なときのおすすめを紹介します。

### AutoAnimate

**1 行のコードでアニメーションを作成する場合**

多くのアニメーションライブラリはありとあらゆるユースケースを満たそうとするため、結果的に不格好になっています。AutoAnimate は設定不要のツールであり、開発者の労力を増やすことなく UX を大幅に向上させることができます。

- [AutoAnimate のホームページ](https://auto-animate.formkit.com/)
- [AutoAnimate GitHub](https://github.com/formkit/auto-animate)
- [AutoAnimate コンポーネントスニペット](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Framer Motion

**宣言的なコードで複雑なアニメーションを実現する**。

Framer Motion は、シンプルで宣言的なシンタックスを提供し、複雑なアニメーションからジェスチャーまで、より少ないコードで作成できるようにします。

- [Framer Motion ホームページ](https://framer.com/motion)
- [Framer Motion ドキュメント](https://www.framer.com/docs/)

## デプロイメント、インフラ、データベース、CI

### Vercel

**アプリケーションのホスティング用**

Vercel は、デプロイ作業のひどいつらみを巻き取ってくれ、GitHub 連携を設定すれば放っておいてもよしなにやってくれます。また、数十万人もいる利用者に何の問題もなくプロダクトを展開できました。AWS の力も得て、インターフェイスもはるかに優れています :)

- [Vercel のホームページ](https://vercel.com/)
- [Create T3 App Vercel デプロイメントガイド](/ja/deployment/vercel)

### PlanetScale

**心配いらずのデータベースのために**

PlanetScale は、これまで使った中で最も優れた「サーバーレスデータベースプラットフォーム」です。驚異的なスケーラビリティ、優れた開発者体験、そして素晴しい価格設定が魅力です。SQL（できれば Prisma）を使っているのであれば、これに勝るものはありません。

- [PlanetScale ホームページ](https://planetscale.com/)

### Railway

**インフラのホスティングに最適**

一言で言えば「モダンな Heroku」。本格的なサーバーを立ち上げる最も簡単な方法です。Vercel と PlanetScale だけでは十分でない場合、Railway がおそらくそれに対応します。GitHub のリポジトリを指定して実行してみてください。

- [Railway ホームページ](https://railway.app/)

### Upstash

**サーバーレス Redis 用**

私たちは Prisma と PlanetScale が大好きですが、より高性能なソリューションが必要なプロジェクトもあります。Upstash を使うと、インフラとスケーリングを自分で管理することなく、サーバーレスプロジェクトで Redis のインメモリ性能を得ることができます。

- [Upstash ホームページ](https://upstash.com/)

### Pusher

**サーバーレス WebSockets 用**

WebSocket がプロジェクトの主な焦点である場合、[Fastify](https://www.fastify.io/) (これは[tRPC でも動作する!](https://trpc.io/docs/v10/fastify))のようなもっと伝統的なバックエンドを検討することをお勧めします。しかし、T3 アプリに WebSocket を素早く追加するには、Pusher は優れた選択です。

- [Pusher ホームページ](https://pusher.com/)

### Soketi

Soketi は Pusher の代替となる、セルフホスティング可能でシンプルかつ高速なソフトウェアです。サーバーに接続するために使用できる Pusher SDK と完全に互換性があります。Soketi のサーバーレスもベータ版です。

- [Soketi ホームページ](https://soketi.app)
- [Soketi GitHub](https://github.com/soketi/soketi)

## アナリティクス(分析)

アプリケーションを開発していく上で、ユーザーデータはとても貴重です。ここでは、私たちがおすすめするアナリティクスプロバイダーをご紹介します。

### Plausible

アナリティクスが必要ですか？Plausible は、それを得るための最も迅速な方法の 1 つです。非常にミニマムで、[Next.js 用のシンプルなプラグイン](https://plausible.io/docs/proxy/guides/nextjs)もあります。

- [Plausible ホームページ](https://plausible.io/)

### Umami

Umami は、Google アナリティクスの代替であり、オープンソースでセルフホスティング可能、シンプルで高速、プライバシーに重点を置いたソフトウェアです。PlanetScale をデータベースとして、Vercel や Railway などに実に簡単にデプロイすることができます。

- [Umami ホームページ](https://umami.is/)
- [Umami GitHub](https://github.com/umami-software/umami)

# その他

### Next Bundle Analyzer

アプリケーションのビルド出力に何が含まれるかを判断するのが難しい場合があります。Next Bundle Analyzer は、生成される JavaScript バンドルを視覚化し分析する簡単な方法です。

- [@next/bundle-analyzer on npm](https://www.npmjs.com/package/@next/bundle-analyzer)
