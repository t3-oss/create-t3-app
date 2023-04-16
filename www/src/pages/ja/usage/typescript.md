---
title: TypeScript
description: TypeScriptの使用方法
layout: ../../../layouts/docs.astro
lang: ja
---

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>ガードレールではなく、セーフティネットを作る<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @t3dotgg"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="/images/theo_300x300.webp"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Theo - creator of the T3 Stack</span>
      <a
        href="https://twitter.com/t3dotgg"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        @t3dotgg
      </a>
    </div>
  </cite>
</blockquote>

Whether you're a new or seasoned developer, we think that TypeScript is a must have. It can look intimidating at first, but much like a lot of tools, is something that many never look back from after starting to use it.

It provides live feedback as you write your code by defining expected data types, and either provides helpful autocomplete in your code editor, or yells at you with red squiggly lines if you're trying to access a property that doesn't exist or trying to pass a value of the wrong type, which you would otherwise have to debug further down the line.

It is, perhaps, the tool that provides the most productivity to developers; providing documentation of the code you're writing or consuming directly in your editor, and having instant feedback as you inevitably make mistakes is absolutely priceless.

新人開発者であれ、熟練した開発者であれ、TypeScript は必須の要素だと考えています。最初はとっつきにくいかもしれませんが、多くのツールがそうであるように、使い始めたら元に戻ることはないでしょう。

また、存在しないプロパティにアクセスしようとしたり、間違った型の値を渡そうとしたりすると、赤い波線で警告され、デバッグが必要になります。

エディターで直接書いているコードや消費しているコードのドキュメントを提供し、不可避な間違いを犯したときにすぐにフィードバックが得られるというのは、おそらく開発者に最も生産性をもたらすツールだと思います。

## Type Inference

While many new TypeScript developers are concerned with _writing_ TypeScript, many of its benefits don't actually require you to change your code at all, in particular inference. Inference means that if something is typed, that type will follow it throughout the flow of the application without having to be re-declared in other places. This means that for example once you have defined the types of the arguments that a function takes, the remainder of the function will usually be typesafe without requiring any further TypeScript-specific code. Library developers put a ton of work into maintaining the types for their libraries, which means that we as application developers can benefit from both the inference and the built-in documentation in your code editor that these types provide.

## 型推論

TypeScript を初めて開発する人の多くは、TypeScript を「_書く_」ことを気にしてしまいますが、そのメリットの多くは、実はコードを一切変更しなくても、特に型推論おいて得られるのです。型推論とは、何かが型付けされた場合、その型はアプリケーションのフロー全体を通じて、他の場所で再宣言することなく、その型に従っていることを意味します。例えばある関数が受け取る引数の型を定義してしまえば、その関数の本体では通常、TypeScript 特有のコードを必要とせずに型安全になります。また、ライブラリの開発者は、ライブラリの型を維持するために多大な労力を費やしています。つまり、アプリケーション開発者は、これらの型が提供する推論とコードエディタでの組み込みドキュメントの両方から恩恵を受けることができるのです。

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Check out Theo's video on how [you might be using TypeScript wrong](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

[TypeScript の使い方が間違っているかもしれない](https://www.youtube.com/watch?v=RmGHnYUqQ4k)という Theo のビデオをチェックしてみてください。

## Powerful uses of type inference

## 型推論の強力な活用法

### Zod

[Zod](https://github.com/colinhacks/zod) is a schema validation library that is built on top of TypeScript. Write a schema that represents a single source of truth for your data, and Zod will ensure that your data is valid throughout your application, even across network boundaries and external APIs.

### Zod

[Zod](https://github.com/colinhacks/zod)は、TypeScript の上に構築されたスキーマ検証ライブラリです。データの「唯一の真実の情報源」を表すスキーマを書くと、Zod は、ネットワーク境界や外部 API を越えても、アプリケーション全体でデータが有効であることを保証します。

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) gives you declarative, always-up-to-date auto-managed queries and mutations that directly improve both your developer and user experiences.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) は、宣言的で常に最新の自動管理されたクエリとミューテーションを提供し、開発者とユーザーの両方の体験を直接改善します。

## Useful Resources

| Resource                                                  | Link                                                              |
| --------------------------------------------------------- | ----------------------------------------------------------------- |
| TypeScript Handbook                                       | https://www.typescriptlang.org/docs/handbook/                     |
| Beginners TypeScript Tutorial                             | https://github.com/total-typescript/beginners-typescript-tutorial |
| Type Challenges                                           | https://github.com/type-challenges/type-challenges                |
| Rodney Mullen of TypeScript (Matt Pocock) Youtube Channel | https://www.youtube.com/c/MattPocockUk/videos                     |

## 役に立つ情報源

| リソース                                                                 | リンク                                                            |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| TypeScript ハンドブック                                                  | https://www.typescriptlang.org/docs/handbook/                     |
| TypeScript 初心者向けチュートリアル                                      | https://github.com/total-typescript/beginners-typescript-tutorial |
| Type Challenges                                                          | https://github.com/type-challenges/type-challenges                |
| TypeScript のロドニー・ミューレン(マット・ポコック)の Youtube チャンネル | https://www.youtube.com/c/MattPocockUk/videos                     |
