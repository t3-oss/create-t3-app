---
title: 简介
description: T3 Stack 简介
layout: ../../layouts/docs.astro
lang: zh-hans
---

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/YkOSUVzOAA4" title="The best stack for your next project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## T3 Stack

_"T3 Stack"_ 是由 [Theo](https://twitter.com/t3dotgg) 创建的一个 web 开发技术栈，专注于简单性、模块化和全栈类型安全。

核心部分是 [**Next.js**](https://nextjs.org/) 和 [**TypeScript**](https://typescriptlang.org/)。[**Tailwind CSS**](https://tailwindcss.com/) 几乎总是被包含在内。如果你正在做任何类似后端的事情，[**tRPC**](https://trpc.io/)、[**Prisma**](https://prisma.io/) 和 [**NextAuth.js**](https://next-auth.js.org/) 都是很好的补充。

你可能已经注意到它有很多组成部分，这是设计如此。按需调换——本技术栈的核心是模块化的 :)

## 所以 ... create-t3-app 是什么？一个模板吗？

算是吧？`create-t3-app` 是由经验丰富的 T3 Stack 开发者构建的 CLI 命令行工具，用于简化一个模块化的 T3 Stack 应用程序的配置过程。这意味着每个部分都是可选的，而“模板”则是根据你的具体需求生成的。

经过无数项目和多年的技术积累，我们沉淀了很多的观点和见解。我们尽力将它们融入到了这个 CLI 中。

这**不是**一个包罗万象的模板。我们**期望**你能带来自己的库，以解决**你自己的**应用程序需求。虽然我们不想为更具体的问题（如状态管理和项目部署）指定解决方案，但我们 [在这里列出了一些推荐选项](/zh-hans/other-recs)。

## T3 原则

坦白地说——这是一个非常 _opinionated 的项目_。我们在构建方面有不少共同的核心信念，并把它们作为我们做出决策的基础。

### 解决问题

很容易陷入“添加一切”的陷阱 —— 我们明确不想这样做。被添入到 `create-t3-app` 中的每个部分都应该解决存在于核心技术中的特定问题。这意味着我们不会添加诸如状态库（`zustand`、`redux`）之类的东西，但我们会添加像 NextAuth.js 之类的库，并为你集成 Prisma 和 tRPC。

### 负责任地“尝鲜”

我们热爱前沿技术。诚然，新技术带来的速度和乐趣真的很酷。我们认为，负责任地尝试新技术很重要，可以在风险较小的部分使用风险较大的技术。这意味着我们不会 ⛔️ 把赌注押在有风险的新数据库技术上（SQL 很棒！）。但我们很乐意 ✅ 押注于 tRPC，因为它只是一些很容易被移除的函数而已。

### 类型安全不是可选的

Create T3 App 宣称的目标是提供最快捷的方式来创建一个新的全栈**类型安全**的 web 应用。我们在这方面十分认真对待类型安全，因为它确实提高了我们的生产力，并帮助我们减少了错误的产生。倘若你想在类型安全上做出妥协，你应该另外创建一个项目，而不是使用 Create T3 App。
