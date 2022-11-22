---
title: 为什么选择 CT3A？
description: 为什么你应该选择 Create T3 App 来创建你的下一个项目
layout: ../../layouts/docs.astro
---

我们开始创建 create-t3-app，因为 [Theo](https://twitter.com/t3dotgg) 拒绝将他最喜欢的几种技术做成模板。受到 create-next-app、[Astro 的 CLI](https://astro.build) 和对类型安全的普遍热爱的启发，create-t3-app 团队努力地为创建新的 T3 Stack 项目建立了最好的起点。

如果你对以类型安全的方式使用 Next.js 感兴趣，这就是开始的地方。如果你对我们的具体技术选择感到好奇，请继续阅读 :)

## 为什么使用 TypeScript？

JavaScript 已经很难了。为什么还要增加更多的规则？

我们坚信 TypeScript 提供的体验将帮助你成为更好的开发者。它通过定义预期的数据类型来在你写代码时提供实时反馈，并且如果你尝试访问不存在的属性或尝试传递错误类型的值，它将在编辑器中提供有用的自动完成功能，或者用红色的波浪线来警告你，让你不得不进行进一步调试。无论你是 web 开发的新手还是老手，TypeScript 的“严格性”都将提供比原生 JS 更少的挫败感，更一致的体验。

类型安全让你更快。如果你不相信，你可能[用错了 TypeScript...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)

## 为什么使用 Next.js？

我们热爱 React。它使 UI 开发以我们以前从未想象过的方式进行。但它也可以将开发者引向一些艰难的道路。

Next.js 为使用 React 创建应用程序提供了一种轻度武断、高度优化的方法。从路由到 API 定义再到图片渲染，我们都相信 Next.js 能引导开发者做出正确的决定。

## 为什么使用 tRPC/Prisma/Tailwind 等？

虽然我们相信要尽可能保持简单，但我们发现我们创建的每一个类似 "应用程序 "的项目中都会用到这些技术。`create-t3-app` 很好地让你能够采用你需要的部分。

### tRPC

tRPC 实现了 GraphQL 的承诺，即针对类型安全服务端的无缝客户端开发，且不需要任何样板文件。这是对 TypeScript 的巧妙滥用，它提供了令人难以置信的开发体验。

### Prisma

Prisma 之于 SQL 就像 TypeScript 之于 JS。它创造了从未有过的开发者体验。通过从与[几种数据库](https://www.prisma.io/docs/concepts/database-connectors)兼容的用户定义的 schema 中生成类型，Prisma 保证了从数据库到应用程序的端到端类型安全。

prisma 提供了[一整套工具](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows)，使与数据库的日常交互更加容易。值得注意的是，Prisma Client 负责查询和生成 SQL，使得 SQL 如此简单，以至于你几乎不会注意到你在使用它，而 Prisma Studio 是一个方便的数据库 GUI，可以让你快速读取和操作数据，而无需编写代码。

### Tailwind CSS

Tailwind 给人的感觉就像 "禅模式的 CSS"。

通过以良好的默认颜色、间距和其他原语的形式提供构建块，Tailwind 使创建漂亮的应用程序变得容易。与组件库不同，当你想将应用程序提升到一个新的水平并创造一些美丽而独特的东西时，它不会阻碍你。

此外，由于其类似于内联的方法，Tailwind 鼓励你进行样式设计，而不必担心命名 class、组织文件或任何其他与你试图解决的问题没有直接联系的问题。

### NextAuth.js

当你想在 NextJS 应用程序中添加身份验证系统时，NextAuth.js 是一个很好的解决方案，可以引入足够复杂的安全措施，而无需自己构建它。它带有一个广泛的供应商列表，可以快速添加 OAuth 认证，并为许多数据库和 ORM 提供适配器。
