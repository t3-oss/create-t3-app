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

新人開発者であれ、熟練した開発者であれ、TypeScript は必須の要素だと考えています。最初はとっつきにくいかもしれませんが、多くのツールがそうであるように、使い始めたら元に戻りたいと思うことはないでしょう。

また、存在しないプロパティにアクセスしようとしたり、間違った型の値を渡そうとしたりすると、デバッグが必要になる箇所が赤い波線で警告されます。

あなたが今まさに書いているコードや、のめり込んで集中しているコードに対して、ドキュメントをエディター中で直接表示し、避けられないミスを犯したときに即座にフィードバックが得られるのですから、TypeScript はおそらく、開発者に最も生産性をもたらすツールです。

## 型推論

多くの新しい TypeScript 開発者は、TypeScript の「_記述_」に関心がありますが、そのメリットの多くは実はコードを一切変更せずとも、型推論で得られるのです。型推論とは、何かが型付けされた場合、その型はアプリケーションのフロー全体を通じ、他の場所で再度型宣言することなしで、その型への適合が追従することを意味します。例えばある関数が受け取る引数の型を定義してしまえば、その関数の本体では通常、さらなる TypeScript 特有のコードを必要とせずに型安全になることを意味します。また、ライブラリの開発者は、ライブラリの型を維持するために多大な労力を費やしています。つまり、アプリケーション開発者は、型推論が提供する型と、ビルトインのドキュメントが提供する型の両方からエディタ上で恩恵を受けることができるのです。

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

[TypeScript の使い方が間違っているかもしれない](https://www.youtube.com/watch?v=RmGHnYUqQ4k)という Theo のビデオをチェックしてみてください。

## 型推論の強力な活用法

### Zod

[Zod](https://github.com/colinhacks/zod)は、TypeScript の上に構築されたスキーマ検証ライブラリです。データの「唯一の真実の情報源」を表すスキーマを書くと、Zod は、ネットワーク境界や外部 API を越えても、アプリケーション全体でデータが有効であることを保証します。

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) は、宣言的で、常にデータが最新化される自動管理されたクエリとミューテーションを提供し、開発者体験と利用者体験の両方を直接改善します。

## お役立ち情報

| リソース                                                       | リンク                                                            |
| -------------------------------------------------------------- | ----------------------------------------------------------------- |
| TypeScript ハンドブック                                        | https://www.typescriptlang.org/docs/handbook/                     |
| TypeScript 初心者向けチュートリアル                            | https://github.com/total-typescript/beginners-typescript-tutorial |
| タイプチャレンジ                                               | https://github.com/type-challenges/type-challenges                |
| TypeScript の Rodney Mullen (Matt Pocock)の Youtube チャンネル | https://www.youtube.com/c/MattPocockUk/videos                     |
