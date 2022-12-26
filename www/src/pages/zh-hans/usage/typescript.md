---
title: TypeScript
description: TypeScript 的用法
layout: ../../../layouts/docs.astro
lang: zh-hans
---

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>搭建安全的防护网，而不是护栏。<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @t3dotgg"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="/images/theo_300x300.webp"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Theo - T3 Stack 的创建者</span>
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

无论你是菜鸟还是老手，我们认为 TypeScript 是一个必选项。初看起来这像是恐吓，但就像很多其他工具一样，你用过 TypeScript 之后就很难再回头了。

在你写代码时，它通过预设的数据类型来提供实时反馈；而如果你在代码中尝试访问不存在的属性或尝试传递错误类型的值时，它要么会在编辑器中提供有用的自动补全功能，要么会用红色的波浪线来提醒你错误代码，让你不得不进行进一步调试。

它很可能是一款给程序员带来最高生产力的工具；给你写的或引用的代码添加文档说明，并在你不可避免犯错的情况下提供即时反馈，这绝对是无价的。

## 类型推断

当许多 TypeScript 开发者担心需要额外 _编写_ TypeScript 代码，但实际上你不需要修改任何代码就获得了很多它带来的好处，特别是类型推断。类型推断意味着，如果某个数据被加了类型，无论你在应用的任何地方使用这个数据，都能得到它所携带的类型，而无需额外在使用它的地方重新声明它的类型。这也就意味着，比方说一旦你定义了一个函数的参数类型，函数的剩余部分一般会被保证类型安全，无需再写更多 TypeScript 的代码。开源库项目的开发者们投入了大量工作来为他们的库维护类型定义，这意味着我们作为应用程序的开发者在编写代码过程中，借助编辑器可以从这些库的类型推断和内置文档中获益。

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

点击观看 Theo 的视频，了解为什么说 [你可能用错了 TypeScript](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## 类型推断的强大用途

### Zod

[Zod](https://github.com/colinhacks/zod) 是一个基于 TypeScript 的 schema 验证库。写一个 schema，它代表了你项目中数据的唯一真实来源，而 Zod 则会保证应用中所有的数据都是有效合法的，甚至是来自跨网络和外部 API 的数据。

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) 提供了声明式的、永远最新的、自动管理的数据查询和修改方法，这直接改进了开发体验和用户体验。

## 有用的资源

| 资源                                                   | 链接                                                              |
| ------------------------------------------------------ | ----------------------------------------------------------------- |
| TypeScript 手册                                        | https://www.typescriptlang.org/docs/handbook/                     |
| TypeScript 入门教程                                    | https://github.com/total-typescript/beginners-typescript-tutorial |
| 类型挑战                                               | https://github.com/type-challenges/type-challenges                |
| Rodney Mullen of TypeScript (Matt Pocock) Youtube 频道 | https://www.youtube.com/c/MattPocockUk/videos                     |
