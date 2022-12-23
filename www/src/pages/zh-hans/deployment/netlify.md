---
title: Netlify
description: 部署到 Netlify
layout: ../../../layouts/docs.astro
lang: zh-hans
---

Netlify 是与 Vercel 类似的托管平台服务商。参看基于本文档的示例仓库 [`ajcwebdev/ct3a-netlify`](https://github.com/ajcwebdev/ct3a-netlify)。

## 为什么托管到 Netlify

传统观点认为 Vercel 有着对 Next.js 绝佳的支持，因为他们开发了 Next.js。他们通过对平台的调校，确保搭配 Next.js 的最佳性能和开发体验，从而从中营利。对于大多数使用场景，使用 Vercel 部署 Next.js 无可厚非，偏离标准选择也没有多大意义。

然而也有一种普遍的看法是，很多 Next.js 的功能特性都仅限于 Vercel。虽然说默认情况下，Next.js 的新特性在发布时确实都只会在 Vercel 平台上被测试，然后被其所支持，但对于 [稳定的 Next.js 特性](https://docs.netlify.com/integrations/frameworks/next-js/overview/)，像 Netlify 这样的其他部署平台也会 [迅速为之提供支持](https://www.netlify.com/blog/deploy-nextjs-13/)。

所有的部署平台都有相对的优缺点，因为没有一家供应商能对所有的使用场景都提供最好的支持。举例来说，Netlify 为他们的边缘函数（它们运行在 Deno 环境）自行创建了一个 [定制的 Next.js 运行时](https://github.com/netlify/next-runtime)，[使用了独有的中间件来访问和修改 HTTP 响应](https://github.com/netlify/next-runtime#nextjs-middleware-on-netlify)。

> _注意：要追踪 Next 13 非稳定特性的最新状态，参看 [在 Netlify 上使用 Next.js 13 的 `app` 目录](https://github.com/netlify/next-runtime/discussions/1724)。_

## 项目配置

有很多方法来配置你应用的打包部署流程，包括直接通过 Netlify CLI 命令行工具或 Netlify 管理面板。虽然说并不强求，但我们还是建议创建一个 [`netlify.toml`](https://docs.netlify.com/configure-builds/file-based-configuration/) 文件，并将它放在你的项目中。这么做能使被 fork 和 clone 的项目版本都可以更便利地被重复部署。

```toml
[build]
  command = "next build"
  publish = ".next"
```

## 使用 Netlify 管理面板

1. 将你的代码 push 到 GitHub 仓库，然后注册 [Netlify](https://app.netlify.com/signup)。当你创建完账号后，点击 **Add new site** 然后再点击 **Import an existing project**。

![New project on Netlify](/images/netlify-01-new-project.webp)

2. 连接 Git 服务商。

![Import repository](/images/netlify-02-connect-to-git-provider.webp)

3. 选择你项目的仓库地址。

![Select your project's repository](/images/netlify-03-pick-a-repository-from-github.webp)

4. Netlify 将会检测你的项目是否包含文件 `netlify.toml`，然后会自动为你配置好构建命令和打包目录。

![Nextjs build settings](/images/netlify-04-configure-build-settings.webp)

5. 点击 **Show advanced** 然后点击 **New variable** 来添加你的环境变量。

![Add environment variables](/images/netlify-05-env-vars.webp)

6. 点击 **Deploy site**，等待部署完成，然后就可以访问你的新网站了。

## 使用 Netlify CLI 命令行工具

要使用命令行工具来部署到 Netlify，你必须首先将你的项目部署到 GitHub，并 [安装 Netlify CLI 命令行工具](https://docs.netlify.com/cli/get-started/)。你既可以将 `netlify-cli` 作为项目依赖来安装，也可以通过下方命令全局安装：

```bash
npm i -g netlify-cli
```

为了在本地测试你的项目，运行命令 [`ntl dev`](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment) 然后访问 [`localhost:8888`](http://localhost:8888/) 来查看本地运行的 Netlify 应用：

```bash
ntl dev
```

运行命令 [`ntl init`](https://docs.netlify.com/cli/get-started/#continuous-deployment) 来配置你的项目：

```bash
ntl init
```

使用命令 [`ntl env:import`](https://cli.netlify.com/commands/env#envimport) 从 `.env` 文件中导入环境变量：

```bash
ntl env:import .env
```

通过命令 [`ntl deploy`](https://docs.netlify.com/cli/get-started/#manual-deploys) 来部署你的项目。在部署之前你需要先传入 `--build` 标识来将你的项目打包，然后传入 `--prod` 标识来部署到生产环境：

```bash
ntl deploy --prod --build
```

访问 [ct3a.netlify.app](https://ct3a.netlify.app/) 来查看运行在 Netlify 上的示例项目。
