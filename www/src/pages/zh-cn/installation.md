---
title: 安装
description: 创建 T3 应用程序的安装说明
layout: ../../layouts/docs.astro
---

要使用 `create-t3-app` 创建一个应用程序，请运行以下三个命令中的任意一个，并回答命令提示符的问题：

### npm

```bash
npm create t3-app@latest
```

### yarn

```bash
yarn create t3-app
```

### pnpm

```bash
pnpm create t3-app@latest
```

在你的应用程序被脚手架创建后，请查看 [第一步](/zh-cn/usage/first-steps) 以开始你的新应用。

## 高级用法

| Option/Flag       | Description                                |
| ----------------- | ------------------------------------------ |
| `[dir]`           | 添加一个带有项目名称的目录参数             |
| `--noGit`         | 明确告诉 CLI 不在项目中初始化新的 git 仓库 |
| `-y`, `--default` | 跳过 CLI 并选中所有选项来初始化新的 t3-app |
| `--noInstall`     | 创建项目，但不自动安装依赖                 |

## 实验性用法

对于我们的 CI，我们有一些实验性的标志，允许你在没有任何提示的情况下创建任何应用程序。如果这种用例适用于你， 你可以使用这些标志。请注意，这些标志是实验性的，将来可能会在不遵循 semver 版本的情况下改变。

| Flag         | Description               |
| ------------ | ------------------------- |
| `--CI`       | 让 CLI 知道你在 CI 模式中 |
| `--trpc`     | 添加 tRPC 到项目          |
| `--prisma`   | 添加 Prisma 到项目        |
| `--nextAuth` | 添加 NextAuth.js 到项目   |
| `--tailwind` | 添加 Tailwind CSS 到项目  |

**注意：如果你没有提供 `CI` 标志，那么这些其余的标志将无效。**

你不需要明确地选择不要的包。然而如果你想这样做，你可以传递`false`，例如`--nextAuth false`。

### 示例

下面的命令将使用 tRPC 和 Tailwind CSS 创建一个 T3 应用程序。

```bash
pnpm dlx create-t3-app@latest --CI --trpc --tailwind
```
