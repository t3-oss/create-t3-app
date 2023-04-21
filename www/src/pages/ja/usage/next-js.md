---
title: Next.js
description: Next.jsの使い方
layout: ../../../layouts/docs.astro
lang: ja
---

Next.js is a backend framework for your React applications.

Next.js は、React アプリケーションのためのバックエンドフレームワークです。

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js is a backend framework" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Check out [Theo's Next.js Conf talk](https://www.youtube.com/watch?v=W4UhNo3HAMw) to get a better understanding of what Next.js is and how it works.</p>

Next.js とは何であり、どのように機能するのかをより深く理解するために、[Theo's Next.js Conf talk](https://www.youtube.com/watch?v=W4UhNo3HAMw) をチェックしてみてください。</p>

## Why should I use it?

We love React. It has made UI development accessible in ways we never imagined before. It also can lead developers down some rough paths. Next.js offers a lightly opinionated, heavily optimized approach to creating applications using React. From routing to API definitions to image rendering, we trust Next.js to lead developers towards good decisions.

Pairing Next.js with [Vercel](https://vercel.com/) makes developing and deploying web apps easier than ever before. Their extremely generous free-tier and super intuitive interface provides a point and click solution to deploy your site (We ❤️ Vercel)

## なぜ使う必要があるのか？

私たちは React を愛しています。これまで想像もしなかったような方法で UI 開発を身近なものにしてくれました。しかし、その反面、開発者を険しい道へ導くこともあります。Next.js は、React を使ったアプリケーションを作成するための、思想に拘りすぎず、かつ強く最適化したアプローチを提供します。ルーティングから API 定義、画像レンダリングまで、私たちは Next.js が開発者を正しい判断に導くと信じています。

Next.js と[Vercel](https://vercel.com/)を組み合わせることで、Web アプリケーションの開発とデプロイがかつてないほど簡単になります。非常に寛大な無料利用枠と超直感的なインターフェイスのもとで、サイト公開をワンクリックで行えるソリューションを提供します（We ❤️ Vercel）。

## Get Static/Server Props

A key feature of Next.js is its data fetching capabilities. We highly recommend reading through the [official documentation](https://nextjs.org/docs/basic-features/data-fetching) to understand how to use each method and how they differ. `getServerSideProps` is generally discouraged unless there is a good reason for it, due to the fact that it is a blocking call and will slow down your site. [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) is a great alternative to `getServerSideProps` when the data is dynamic and can be fetched incrementally.

## Static/Server Props を取得する

Next.js の大きな特徴は、データフェッチ機能です。各メソッドの使い方や違いを理解するために、[公式ドキュメント](https://nextjs.org/docs/basic-features/data-fetching)を一読することを強くお勧めします。`getServerSideProps`は、ブロッキングする同期呼び出しであり、サイトの表示速度を遅くするため、よほどの理由がない限り、一般に推奨されません。[Incremental Static Regeneration(インクリメンタルな静的再生成)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)は、データが動的でインクリメンタルに取得できる場合、`getServerSideProps`に代わる素晴らしい方法です。

## Useful Resources

| Resource                       | Link                               |
| ------------------------------ | ---------------------------------- |
| Next.js Documentation          | https://nextjs.org/docs            |
| Next.js GitHub                 | https://github.com/vercel/next.js  |
| Next.js Blog                   | https://nextjs.org/blog            |
| Next.js Discord                | https://nextjs.org/discord         |
| Next.js Twitter                | https://twitter.com/nextjs         |
| Vercel/Next.js YouTube Channel | https://www.youtube.com/c/VercelHQ |

## 役に立つ情報源

| リソース                          | リンク                             |
| --------------------------------- | ---------------------------------- |
| Next.js ドキュメント              | https://nextjs.org/docs            |
| Next.js GitHub                    | https://github.com/vercel/next.js  |
| Next.js ブログ                    | https://nextjs.org/blog            |
| Next.js Discord                   | https://nextjs.org/discord         |
| Next.js Twitter                   | https://twitter.com/nextjs         |
| Vercel/Next.js YouTube チャンネル | https://www.youtube.com/c/VercelHQ |
