---
title: Next.js
description: Next.jsの使い方
layout: ../../../layouts/docs.astro
lang: ja
---

Next.js は、React アプリケーションのためのバックエンドフレームワークです。

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js is a backend framework" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

[Theo's Next.js Conf talk](https://www.youtube.com/watch?v=W4UhNo3HAMw) をチェックして、Next.js とは何であり、どのように機能するのかをより深く理解しましょう。</p>

## なぜ Next.js を使う必要があるの？

私たちは React が大好きです。これまで想像もしなかったような方法で UI 開発を身近なものにしてくれました。しかし、その反面、開発者を険しい道へ導くこともあります。Next.js は、React を使ったアプリケーションを作成するための、思想に拘りすぎず、かつ強力に最適化されたアプローチを提供します。ルーティングから API 定義、画像レンダリングに至るまで、私たちは Next.js が開発者を正しい判断に導いてくれると信じています。

Next.js と[Vercel](https://vercel.com/)を組み合わせることで、これまで以上に簡単に Web アプリケーションの開発とデプロイができるようになります。非常に寛大な無料利用枠と直感的なインターフェイスが、「ポイント&クリック」でサイト公開を行えるソリューションを提供します（We ❤️ Vercel）。

## Static/Server Props を取得する

Next.js の大きな特徴はデータフェッチ機能です。各メソッドの使い方や違いを理解するために、[公式ドキュメント](https://nextjs.org/docs/basic-features/data-fetching)を一読することを強くお勧めします。`getServerSideProps`は、ブロッキングする同期呼び出しであり、サイトの速度を低下させるため、特別な理由がない限りは基本的には非推奨です。データが動的でインクリメンタルに取得できる場合、[Incremental Static Regeneration(インクリメンタルな静的再生成)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)は`getServerSideProps`に代わる素晴らしい方法です。

## お役立ち情報

| リソース                          | リンク                             |
| --------------------------------- | ---------------------------------- |
| Next.js ドキュメント              | https://nextjs.org/docs            |
| Next.js GitHub                    | https://github.com/vercel/next.js  |
| Next.js ブログ                    | https://nextjs.org/blog            |
| Next.js Discord                   | https://nextjs.org/discord         |
| Next.js Twitter                   | https://twitter.com/nextjs         |
| Vercel/Next.js YouTube チャンネル | https://www.youtube.com/c/VercelHQ |
