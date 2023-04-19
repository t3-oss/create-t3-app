---
title: CT3A を選ぶ理由
description: なぜあなたは次のプロジェクトで Create T3 App を選ぶべきなのか
layout: ../../layouts/docs.astro
lang: ja
---

We started Create T3 App because [Theo](https://twitter.com/t3dotgg) refused to make a template of his favorite technologies. Inspired by create-next-app, [Astro's CLI](https://astro.build) and a general love for typesafety, the Create T3 App team worked hard to build the best possible starting point for new T3 Stack projects.

If you're interested in using Next.js in a typesafe way, this is the place to start. If you're curious about any of the specific technology choices we made, read on :)

私たちが Create T3 App の開発を始めたのは、[Theo](https://twitter.com/t3dotgg)が自分の好みの技術のテンプレートを作ることを拒んだからです。create-next-app や[Astro's CLI](https://astro.build)、そして型安全性への全面的な愛に触発されて、Create T3 App チームは新しく T3 Stack プロジェクトを始めるための最高の出発点を作るために懸命に働きました。

Next.js を型安全な方法で使うことに興味があるなら、こここそが始めるべき場所です。私たちが選択した技術的選択について興味がある方は、引き続きお読みください :)

## Why TypeScript?

JavaScript is hard. Why add more rules?

We firmly believe the experience TypeScript provides will help you be a better developer. It provides live feedback as you write your code by defining expected data types, and either provides helpful autocomplete in your editor or yells at you with red squiggly lines if you're trying to access a property that doesn't exist or trying to pass a value of the wrong type, which you would otherwise have to debug further down the line. Whether you're new to web development or a seasoned pro, the "strictness" of TypeScript will provide a less frustrating, more consistent experience than vanilla JS.

Typesafety makes you faster. If you're not convinced, you [might be using TypeScript wrong...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)

## なぜ TypeScript なのか？

JavaScript は難しいですよね。なんだってこれ以上ルールを増やすのでしょうか？

私たちは、TypeScript が提供する体験が、より優れた開発者になるのに役立つと確信しています。TypeScript は、期待されるデータ型を定義することで、コードを書きながらのリアルタイムのフィードバックを提供し、存在しないプロパティにアクセスを試みたり、間違った型の値を渡そうとすると、エディタで役立つ自動補完を提供したり、赤い波線で警告を発してくれます。Web 開発の初心者であれ、熟練したプロであれ、TypeScript の「厳密さ」は、「バニラ JS」よりもフラストレーションが少なく、一貫した体験を提供してくれるでしょう。

型安全性はあなたをより速くします。もし納得できないなら、あなたは[TypeScript の使い方を間違っているかもしれません...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)。

## Why Next.js?

We love React. It has made UI development accessible in ways we never imagined before. It also can lead developers down some rough paths.

Next.js offers a lightly opinionated, heavily optimized approach to creating applications using React. From routing to API definitions to image rendering, we trust Next.js to lead developers toward good decisions.

## なぜ Next.js なのか？

私たちは React を愛しています。React はこれまで想像もしなかったような方法で UI 開発を身近なものにしてくれました。しかし、その反面、開発者を険しい道へ導くこともあります。

Next.js は、React を使ったアプリケーションを作成するための、思想に拘りすぎず、かつ強く最適化したアプローチを提供します。Next.js は、ルーティングから API 定義、画像レンダリングに至るまで、開発者が良い判断ができるように導いてくれると私たちは信じています。

## Why tRPC/Prisma/Tailwind/etc?

While we believe in keeping things as simple as possible, we find these pieces being used in every "app" like project we build. `create-t3-app` does a great job of letting you adopt the pieces you need.

## なぜ tRPC/Prisma/Tailwind/etc なのか？

私たちは物事をできるだけシンプルに保つべきだと信じてやってきましたが、これらの構成要素は私たちが作ってきた、「アプリ」っぽいすべてのプロジェクトで使ってきたことがわかりました。`create-t3-app`は、必要とする構成要素を導入できるように、すばらしく良い仕事をしてくれます。

### tRPC

tRPC delivers on GraphQL's promise of seamless client development against a typesafe server without all of the boilerplate. It's a clever abuse of TypeScript that provides an incredible dev experience.

### tRPC

tRPC は GraphQL が実現してくれるはずのもの、「サーバーに対するシームレスで型安全なクライアント開発」を、定型文を一切使わずに実現するものです。これは TypeScript を巧みに利用したもので、極上の開発体験が得られます。

### Prisma

Prisma is to SQL what TypeScript is to JS. It created a developer experience that didn't exist before. By generating types from a user-defined schema compatible with [several databases](https://www.prisma.io/docs/concepts/database-connectors), Prisma guarantees end-to-end typesafety from your database to your app.

Prisma provides a whole [suite of tools](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows) making daily interactions with your database easier. Notably, the Prisma Client is responsible for querying and making SQL so easy you'll barely notice you're using it, and Prisma Studio is a convenient GUI for your database that lets you read and manipulate your data quickly without having to write code.

### Prisma

SQL に対する Prisma は 「JS に対する TypeScript」のようなものです。Prisma はこれまでにない開発者体験を作り出しました。[複数のデータベース](https://www.prisma.io/docs/concepts/database-connectors)と互換性のあるユーザー定義スキーマから型を生成することで、Prisma はデータベースからアプリケーションまでのエンドツーエンドの型安全性を保証します。

Prisma は、データベースの日常的な操作をより簡単にするための[ツール群](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows)を提供しています。特に Prisma Client は、クエリの実行と SQL の使用をほとんど意識しないで済むぐらい簡単にします。Prisma Studio は、データベースの便利な GUI で、コードを書くことなくデータを素早く表示したり操作したりすることができます。

### Tailwind CSS

Tailwind feels like "zen-mode CSS".

By providing building blocks in the form of good default colors, spacing, and other primitives, Tailwind makes it easy to create a good-looking app. And unlike component libraries, it does not hold you back when you want to take your app to the next level and create something beautiful and unique.

Additionally, with its inline-like approach, Tailwind encourages you to style without worrying about naming classes, organizing files, or any other issue not directly tied to the problem you're trying to solve.

### Tailwind CSS

Tailwind は「禅モードの CSS」みたいなものです。

Tailwind は、優れたデフォルトの色、間隔(spacing)、その他のプリミティブという形でビルディングブロックを提供することで、見栄えの良いアプリケーションを簡単に作成することができます。また、コンポーネントライブラリとは異なり、アプリケーションを次のレベルまで引き上げようとしたり、美しくユニークなものを作ろうとしたときに、足かせとなってにっちもさっちもいかなくなったりするようなことは Tailwind では起きません。

また、Tailwind ではインラインスタイルのような書きっぷりをするのですが、クラス名やファイルの編成など、「解決しようとしている問題には直接関係しないことがら」を気にせずにスタイリングできます。

### NextAuth.js

When you want an authentication system in your NextJS application, NextAuth.js is an excellent solution to bring in the complexity of security without the hassle of having to build it yourself. It comes with an extensive list of providers to quickly add OAuth authentication and provides adapters for many databases and ORMs.

### NextAuth.js

NextJS アプリケーションに認証システムを導入したいとき、NextAuth.js は、がんばって自分で構築する手間をかけずに、複雑なセキュリティ条件下に導入できる優れたソリューションです。NextAuth.js は、OAuth 認証をすばやく追加するための豊富なプロバイダーリストと、多くのデータベースや ORM のためのアダプターを提供しています。
