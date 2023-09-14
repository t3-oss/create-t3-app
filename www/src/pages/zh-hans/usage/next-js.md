---
title: Next.js
description: Next.js 的用法
layout: ../../../layouts/docs.astro
lang: zh-hans
---

Next.js 是你 React 应用的后端框架。

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js is a backend framework" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

不妨观看 [Theo 在 Next.js Conf 上的演讲](https://www.youtube.com/watch?v=W4UhNo3HAMw) 来更好地理解 Next.js 究竟是什么以及它是如何运作的。</p>

## 为什么我应该使用它？

我们热爱 React。它以一种我们从未想过的方式将 UI 开发变得如此简单。但是它同样也给开发者们带来了一些困难。而 Next.js 就为我们提供了一种轻量 opinionated，却高度优化的方式来使用 React 创建应用。从路由到 API 定义，再到图片渲染，我们相信 Next.js 会帮助开发者做出正确的决定。

而将 Next.js 搭配 [Vercel](https://vercel.com/) 一同使用使得 web 应用的开发体验前所未有的棒。他们慷慨的免费套餐以及非常直观的用户界面让我们可以通过点击几下的方式就可以部署网站（我们 ❤️ Vercel）。

## Get Static / Server Props

Next.js 的一项关键特性就是它支持的几种获取数据的方法。我们强烈推荐先通读 [官方文档](https://nextjs.org/docs/basic-features/data-fetching) 来理解如何使用每一种方法，以及它们之间的区别。一般情况下不推荐使用 `getServerSideProps`，除非有好的理由，因为它是一个阻塞 UI 的方法，会减慢你的网站运行速度。当数据是动态且需要被增量获取时，[Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) 便是 `getServerSideProps` 的一个非常好的备选方案。

如果你仍需要使用这个特性，可以查看这些链接：[Advanced tRPC - Callers, functions, and gSSP](https://www.youtube.com/watch?v=G2ZzmgShHgQ) 和 [SSG-Helpers](https://trpc.io/docs/v9/ssg-helpers)。

## 有用的资源

| 资源                        | 链接                               |
| --------------------------- | ---------------------------------- |
| Next.js 文档                | https://nextjs.org/docs            |
| Next.js GitHub              | https://github.com/vercel/next.js  |
| Next.js 博客                | https://nextjs.org/blog            |
| Next.js Discord             | https://nextjs.org/discord         |
| Next.js 推特                | https://twitter.com/nextjs         |
| Vercel/Next.js YouTube 频道 | https://www.youtube.com/c/VercelHQ |
