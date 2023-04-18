---
title: イントロダクション
description: T3 Stackの紹介
layout: ../../layouts/docs.astro
lang: ja
---

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/YkOSUVzOAA4" title="The best stack for your next project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## The T3 Stack

The _"T3 Stack"_ is a web development stack made by [Theo](https://twitter.com/t3dotgg) focused on simplicity, modularity, and full-stack typesafety.

The core pieces are [**Next.js**](https://nextjs.org/) and [**TypeScript**](https://typescriptlang.org/). [**Tailwind CSS**](https://tailwindcss.com/) is almost always included. If you're doing anything resembling backend, [**tRPC**](https://trpc.io/), [**Prisma**](https://prisma.io/), and [**NextAuth.js**](https://next-auth.js.org/) are great additions too.

You may have noticed that there are a… lot of pieces. That's by design. Swap pieces in and out as you need - this stack is modular at its core :)

## T3 Stack

「T3 Stack」は、[Theo](https://twitter.com/t3dotgg)が作った Web 開発スタックで、シンプルさ、モジュール性、フルスタックに渡っての型安全性に焦点を当てています。

核となるのは[**Next.js**](https://nextjs.org/)と[**TypeScript**](https://typescriptlang.org/)です。また、[**Tailwind CSS**](https://tailwindcss.com/)は、ほぼ必ず含まれています。バックエンドに近いことをするのであれば、[**tRPC**](https://trpc.io/), [**Prisma**](https://prisma.io/), [**NextAuth.js**](https://next-auth.js.org/) も素晴らしい追加要素になるでしょう。

お気づきかもしれませんが、構成要素の数が多いのですが、意図的にそうしており、必要に応じて構成要素を入れ替えることができます。このスタックはモジュール式です。:）

## So... what is create-t3-app? A template?

Kind of? `create-t3-app` is a CLI built by seasoned T3 Stack devs to streamline the setup of a modular T3 Stack app. This means each piece is optional, and the "template" is generated based on your specific needs.

## さて、create-t3-app とは何でしょう？テンプレート？

一種そのようなものです。`create-t3-app`は、モジュール式の T3 Stack アプリケーションのセットアップを効率化するために、経験豊富な T3 Stack 開発者によって作られた CLI です。つまり、各パーツはオプションであり、「テンプレート」があなたの特定のニーズに基づいて生成されることを意味します。

After countless projects and many years on this tech, we have lots of opinions and insights. We've done our best to encode them into this CLI.

長年の間、数え切れないほどのプロジェクトにおいてこの技術に携わってきた私たちには、たくさんの意見や洞察があります。私たちは、それらをこの CLI に反映させるために最善を尽くしました。

This is **NOT** an all-inclusive template. We **expect** you to bring your own libraries that solve the needs of **YOUR** application. While we don't want to prescribe solutions to more specific problems like state management and deployment, we [do have some recommendations listed here](/en/other-recs).

ただしこれは、すべてを網羅したテンプレートでは**ありません**。私たちは、あなたが **あなたの**アプリケーションのニーズを解決する独自のライブラリを持ってくることを**期待しています**。状態管理やデプロイメントなど、より具体的な問題に対する解決策を規定するつもりはありませんが、私たちは[ここにいくつかの推奨事項を挙げています](/en/other-recs).

## T3 Axioms

We'll be frank - this is an _opinionated project_. We share a handful of core beliefs around building and we treat them as the basis for our decisions.

## T3 原則

率直に言って、T3 Stack は「_主張の強い_」プロジェクトです。私たちは、開発に関する一握りの核となる信念を共有し、私たちの判断基準としています。

### Solve Problems

It's easy to fall into the trap of "adding everything" - we explicitly don't want to do that. Everything added to `create-t3-app` should solve a specific problem that exists within the core technologies included. This means we won't add things like state libraries (`zustand`, `redux`) but we will add things like NextAuth.js and integrate Prisma and tRPC for you.

### 問題を解決せよ

「何でもかんでも追加してしまう」という罠に容易に陥りがちですが、わたしたちは明示的にそれを避けます。`create-t3-app` に追加するものはすべて、その領域における固有の問題を解決している必要があります。したがって状態管理ライブラリ(Zustand、Redux 等)は含めませんが、NextAuth.js などは追加し、Prisma や tRPC などを統合します。

### Bleed Responsibly

We love our bleeding edge tech. The amount of speed and, honestly, fun that comes out of new shit is really cool. We think it’s important to bleed responsibly, using riskier tech in the less risky parts. This means we wouldn’t ⛔️ bet on risky new database tech (SQL is great!). But we happily ✅ bet on tRPC since it’s just functions that are trivial to move off.

### 責任を負って血を流す

私たちは、最先端の技術を愛しています。正直なところ、新しい技術から生まれる開発速度と楽しさは本当に素晴しいものです。ただし、責任を持って血を流すことが重要です。リスクが低い領域では高リスク技術を採用しつつ、冒険的な新しいデータベース技術は採用しません(SQL は偉大なり！)。しかし、tRPC は単なる関数であり、問題があれば簡単に交換できるので、私たちは喜んでそれに賭けるのです。

### Typesafety Isn't Optional

The stated goal of Create T3 App is to provide the quickest way to start a new full-stack, **typesafe** web application. We take typesafety seriously in these parts as it improves our productivity and helps us ship fewer bugs. Any decision that compromises the typesafe nature of Create T3 App is a decision that should be made in a different project.

### 型安全は必須

Create T3 App の目標は、**型安全な**フルスタック Web アプリケーションを新規開発するための最も迅速な方法を提供することです。生産性を高め、バグの少ない製品を提供するのに役立つので、型安全性を真剣に考えています。Create T3 App の型安全性を損なうような妥協は他のプロジェクトで行うべき決定です。
