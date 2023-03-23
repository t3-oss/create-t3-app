---
title: 其他推荐
description: 我们推荐的一些库和服务
layout: ../../layouts/docs.astro
lang: zh-hans
---

我们意识到 `create-t3-app` 所包含的库或工具并不能解决每一个问题。虽然我们鼓励你用我们提供的这些工具来创建项目，但有的时候你还是会需要用到其他库。只有你自己才能了解你的项目真正需要什么，不过这里有一份我们自己经常推荐的库或工具的清单，你大可参考一下。

这些推荐来自于 Create T3 App 的个人贡献者们，不应该被视为 Create T3 App 团队或这个开源软件的“官方”认可。_**请自行搜索，尤其是在使用付费服务之前**_。

## 状态管理

_**编者注词**_: 状态管理库本身很棒，但经常没有必要使用。tRPC 集成的 React Query hooks 应该能够胜任处理服务端的状态。对于客户端的状态，先用 React 自带的 `useState`，倘若还有需求再从这些库里挑一个使用。

### Zustand

**没有必要再使用 Redux 了**

你不知道你是否需要这个现代版的精简 Redux。但 [Poimandres](https://github.com/pmndrs) 这个团队永远值得你的信任。无论你想构建什么，从视频通话应用到游戏，乃至服务器端，你都可以通过这个轻量库来处理状态。

- [Zustand 官网](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Jotai

**没有必要再使用 Context 了**

没有比 Jotai 更能以原子化的方式处理状态的了。同样由 [Poimandres](https://github.com/pmndrs) 出品，Jotai 可以让你定义一些状态原子，它们像是全局的 useState。对于一些状态，用状态机来解决似乎“大材小用”，这时候用 Jotai 来处理是非常不错的选择。

- [Jotai 官网](https://jotai.org/)
- [Jotai GitHub](https://github.com/pmndrs/jotai)

## 组件库

大部分应用都需要不少组件 —— 开关按钮、下拉菜单、对话框等等。以下这些库都提供了非常不错的支持无障碍访问的组件，并且能够让你根据喜好自定义修改。

### 无样式的组件库

也常以无头组件库为人所知，它们提供了无样式、支持无障碍访问的组件，支持根据个人喜好自定义样式。这里罗列了一些推荐。

- [Radix UI](https://www.radix-ui.com/) 给你提供了一系列方便的无障碍底层组件，能够让你搭配原生 CSS 或 Tailwind CSS 使用。

- [Headless UI](https://headlessui.com/) 由 Tailwind CSS 官方团队出品，同样也提供了无样式、支持无障碍访问的组件，你可以无缝将它们与 Tailwind CSS 搭配使用。

- [React Aria](https://react-spectrum.adobe.com/react-aria/) 来自于 Adobe，同样也提供了支持无障碍访问的底层组件，你可以拿来搭建设计系统。他们的日期选择组件绝对是数一数二的。

### 包含样式的组件库

**适用于当你想要你的应用看起来还不错时**

有时候在创建应用时，你只想要你的应用 UI 一开始就看起来还不错，不想自行逐一设计每个组件。那对于管理面板或其他类似的项目，以下任何一个组件库都能帮你达到目标。

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)
- [@shadcn/ui](https://ui.shadcn.com/)

### Class Variance Authority

**适用于拿来构建 UI 库**

CVA 能让你声明式地通过不同的颜色、尺寸等组成不同变体，从而构建一个 UI 库。当你的项目达到一定规模后，你可能想要通过使用 Tailwind CSS 来实现多个组件变体，进而来实现 UI 组件标准化，这时候就是 CVA 派上用场的时候了。

- [Class Variance Authority GitHub](https://github.com/joe-bell/cva)

## 动画

当你需要在应用中使用动画，这里是我们的推荐。

### AutoAnimate

**适用于用一行代码完成动画**

大部分动画库都试着满足每种使用场景，这会导致它们变得很笨重。AutoAnimate 是一款零配置的工具，它能够显著地为你带来 UX 的提升，而不需要额外的代码。

- [AutoAnimate 官网](https://auto-animate.formkit.com/)
- [AutoAnimate GitHub](https://github.com/formkit/auto-animate)
- [AutoAnimate 组件代码片段](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Framer Motion

**适用于用声明式代码来完成复杂动画**

Framer Motion 提供了一种简单、声明式的语法，从复杂的动画，甚至到手势操作，它都能让你可以通过少量代码来实现。

- [Framer Motion 官网](https://framer.com/motion)
- [Framer Motion 文档](https://www.framer.com/docs/)

## 部署、基础设施、数据库和持续集成

### Vercel

**适用于部署你的 App**

Vercel 帮你解决了 web 应用部署的痛点，可以让你轻松通过 GitHub 仓库部署你的应用。我们部署在 Vercel 的服务已经扩展达到数十万用户，目前还没有任何问题。Vercel 基于 AWS，不过有更好的交互界面 :)

- [Vercel 官网](https://vercel.com/)
- [Create T3 App Vercel 部署指引](/zh-hans/deployment/vercel)

### PlanetScale

**适用于免操心地使用数据库**

PlanetScale 是我们目前用过的最好的“无服务数据库平台”。它有着令人惊叹的规模、出色的开发者体验，以及超值的价格。如果你正在使用 SQL（希望是 Prisma），PlanetScale 是你的不二之选。

- [PlanetScale 官网](https://planetscale.com/)

### Railway

**适用于托管你的基建**

“现代版的 Heroku”。最快速简单的方式来启用一个服务器。如果 Vercel 和 PlanetScale 都无法满足你的需求，Railway 很可能是唯一的选择了。将它对接到 GitHub 仓库就行了。

- [Railway 官网](https://railway.app/)

### Upstash

**适用于需要无服务的 Redis**

我们很喜欢 Prisma 和 PlanetScale，但是有一些项目要求更高的性能。Upstash 允许你的应用能获得 Redis 提供的内存高性能，而无需自己去管理和扩容服务器。

- [Upstash 官网](https://upstash.com/)

### Pusher

**适用于需要无服务的 WebSockets**

如果 WebSockets 是你项目的主要聚焦点，你可能需要考虑使用一个更传统的后端服务，例如 [Fastify](https://www.fastify.io/) （它同样也可以 [搭配 tRPC 使用！](https://trpc.io/docs/v10/fastify)）。但是要快速将 Webstockets 添加到 T3 项目中， Pusher 是一个很好的选择。

- [Pusher 官网](https://pusher.com/)

### Soketi

Soketi 是一个支持自行部署的、简单快速的 Pusher 替代方案。它完全与 Pusher SDK 兼容。无服务的 Soketi 也正处于 beta 阶段。

- [Soketi 官网](https://soketi.app)
- [Soketi GitHub](https://github.com/soketi/soketi)

## 数据统计分析

当你创建一个应用的时候，用户统计数据是十分宝贵的。这里罗列了一些我们推荐的数据统计分析工具。

### Plausible

需要数据统计和分析？使用 Plausible 是最快的方法之一。它超级轻量，甚至还有一个针对 [Next.js 的简单插件](https://plausible.io/docs/proxy/guides/nextjs)。

- [Plausible 官网](https://plausible.io/)

### Umami

Umami 是一个开源的、支持自行部署、简单快速、注重隐私的 Google Analytics 备选方案。你可以非常轻松地将它部署到 Vercel、 Railway 等，并选用 PlanetScale 作为其数据库。

- [Umami 官网](https://umami.is/)
- [Umami GitHub](https://github.com/umami-software/umami)

## 其他

### Next Bundle Analyzer

有时候想要确定 App 中哪部分被纳入打包文件中是很困难的。Next Bundle Analyzer 这个工具可以为你可视化并分析自动生成的 JavaScript 打包文件。

- [@next/bundle-analyzer on npm](https://www.npmjs.com/package/@next/bundle-analyzer)
