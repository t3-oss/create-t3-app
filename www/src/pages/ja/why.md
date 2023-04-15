---
title: Why CT3A?
description: Why you should pick Create T3 App for your next project
layout: ../../layouts/docs.astro
lang: ja
---

We started Create T3 App because [Theo](https://twitter.com/t3dotgg) refused to make a template of his favorite technologies. Inspired by create-next-app, [Astro's CLI](https://astro.build) and a general love for typesafety, the Create T3 App team worked hard to build the best possible starting point for new T3 Stack projects.

If you're interested in using Next.js in a typesafe way, this is the place to start. If you're curious about any of the specific technology choices we made, read on :)

私たちが Create T3 App の開発を始めたのは、[Theo](https://twitter.com/t3dotgg)が自分の好みの技術のテンプレートを作ることを拒んだからです。create-next-app や[Astro's CLI](https://astro.build)、そして一般的なタイプセーフティへの愛に触発されて、Create T3 App チームは新しく T3 Stack プロジェクトを始めるための最高の出発点を作るために懸命に働きました。

Next.js を型安全な方法で使うことに興味があるなら、ここから始めましょう。私たちが選択した具体的な技術について興味がある方は、この続きをぜひお読みください :)

## Why TypeScript?

JavaScript is hard. Why add more rules?

We firmly believe the experience TypeScript provides will help you be a better developer. It provides live feedback as you write your code by defining expected data types, and either provides helpful autocomplete in your editor or yells at you with red squiggly lines if you're trying to access a property that doesn't exist or trying to pass a value of the wrong type, which you would otherwise have to debug further down the line. Whether you're new to web development or a seasoned pro, the "strictness" of TypeScript will provide a less frustrating, more consistent experience than vanilla JS.

Typesafety makes you faster. If you're not convinced, you [might be using TypeScript wrong...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)

## なぜ TypeScript なのか？

JavaScript は難しいですね。なぜこれ以上ルールを増やすのでしょうか？

私たちは、TypeScript が提供する体験が、より優れた開発者になるのに役立つと確信しています。TypeScript は、期待されるデータ型を定義することで、コードを書く際にリアルタイムのフィードバックを提供し、存在しないプロパティにアクセスを試みたり、間違った型の値を渡そうとすると、エディタで役立つオートコンプリートを提供したり、赤い波線で警告を発してくれます。ウェブ開発の初心者であれ、熟練したプロであれ、TypeScript の「厳密さ」は、「バニラ JS」よりもフラストレーションが少なく、一貫した体験を提供してくれるでしょう。

Typesafety はあなたをより速くします。もし納得できないなら、あなたは[TypeScript の使い方が間違っているかもしれません...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)。

## Why Next.js?

We love React. It has made UI development accessible in ways we never imagined before. It also can lead developers down some rough paths.

Next.js offers a lightly opinionated, heavily optimized approach to creating applications using React. From routing to API definitions to image rendering, we trust Next.js to lead developers toward good decisions.

## なぜ Next.js なのか？

私たちは React を愛しています。React はこれまで想像もしなかったような方法で UI 開発を身近なものにしてくれました。しかし、その反面、開発者を険しい道へ導くこともあります。

Next.js は、React を使ったアプリケーションを作成するための、思想に拘りすぎず、かつ強く最適化したアプローチを提供します。ルーティングから API 定義、画像レンダリングまで、私たちは Next.js は開発者を良い判断ができるように導いてくれることを信じています。

## Why tRPC/Prisma/Tailwind/etc?

While we believe in keeping things as simple as possible, we find these pieces being used in every "app" like project we build. `create-t3-app` does a great job of letting you adopt the pieces you need.

## なぜ tRPC/Prisma/Tailwind/etc なのか？

私たちは物事をできるだけシンプルに保つべきだと信じているのですが、私たちが作ってきたすべての「アプリ」などのプロジェクトにおいてこれらの構成要素が使っていたことを発見したのです。`create-t3-app`は、必要なピースを適用できるように良くやってくれます。

### tRPC

tRPC delivers on GraphQL's promise of seamless client development against a typesafe server without all of the boilerplate. It's a clever abuse of TypeScript that provides an incredible dev experience.

### tRPC

tRPC は GraphQL が実現してくれるはずのもの、「サーバーに対するシームレスでタイプセーフなクライアント開発」を、定型文を一切使わずに実現するものです。これは TypeScript を巧みに利用したもので、素晴らしい開発体験を提供するものです。

### Prisma

Prisma is to SQL what TypeScript is to JS. It created a developer experience that didn't exist before. By generating types from a user-defined schema compatible with [several databases](https://www.prisma.io/docs/concepts/database-connectors), Prisma guarantees end-to-end typesafety from your database to your app.

Prisma provides a whole [suite of tools](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows) making daily interactions with your database easier. Notably, the Prisma Client is responsible for querying and making SQL so easy you'll barely notice you're using it, and Prisma Studio is a convenient GUI for your database that lets you read and manipulate your data quickly without having to write code.

### Prisma

SQL に対する Prisma は 「JS に対する TypeScript」のようなものです。Prisma はそれまで存在しなかった開発者体験を作り出しました。[複数のデータベース](https://www.prisma.io/docs/concepts/database-connectors)と互換性のあるユーザー定義スキーマから型を生成することで、Prisma はデータベースからアプリまでのエンドツーエンドの型安全性を保証しています。

Prisma は、データベースとの日々のやりとりをより簡単にするための[ツール群](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows)を提供しています。特に Prisma Client は、クエリ実行と SQL 使用をほとんど気づかないほど簡単にします。Prisma Studio は、データベースの便利な GUI で、コードを書くことなくデータを素早く表示したり操作したりすることができます。

### Tailwind CSS

Tailwind feels like "zen-mode CSS".

By providing building blocks in the form of good default colors, spacing, and other primitives, Tailwind makes it easy to create a good-looking app. And unlike component libraries, it does not hold you back when you want to take your app to the next level and create something beautiful and unique.

Additionally, with its inline-like approach, Tailwind encourages you to style without worrying about naming classes, organizing files, or any other issue not directly tied to the problem you're trying to solve.

### Tailwind CSS

Tailwind は「zen-mode CSS」のような感覚です。

Tailwind は、優れたデフォルトの色、間隔、その他のプリミティブという形でビルディングブロックを提供することで、見栄えの良いアプリを簡単に作成することができます。また、コンポーネントライブラリとは異なり、アプリを次のレベルに引き上げたいとき、美しくユニークなものを作りたいときにも、Tailwind はあなたを拘束することはありません。

また、Tailwind はインラインのようなアプローチで、クラス名やファイルの整理など、解決しようとする問題に直接関係しない問題を気にせずにスタイリングすることを促進します。

### NextAuth.js

When you want an authentication system in your NextJS application, NextAuth.js is an excellent solution to bring in the complexity of security without the hassle of having to build it yourself. It comes with an extensive list of providers to quickly add OAuth authentication and provides adapters for many databases and ORMs.

### NextAuth.js

NextJS アプリケーションに認証システムを導入したいとき、NextAuth.js は、自分で構築する手間をかけずに、複雑なセキュリティを導入できる優れたソリューションです。NextAuth.js には、OAuth 認証をすばやく追加するための豊富なプロバイダーリストが付属しており、多くのデータベースや ORM のためのアダプターを提供しています。
