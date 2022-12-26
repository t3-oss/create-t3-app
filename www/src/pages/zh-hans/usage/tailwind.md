---
title: Tailwind CSS
description: Tailwind CSS 的用法
layout: ../../../layouts/docs.astro
lang: zh-hans
---

## 什么是 Tailwind CSS？

Tailwind CSS 是一个[功能优先](https://tailwindcss.com/docs/utility-first) 的微型 CSS 框架，它可被用于创建自定义设计，而无需常规 CSS 要求的上下文切换。Tailwind CSS 纯粹是一个 CSS 框架，并不提供预设的组件或逻辑，相比如 Material UI 的组件库，它带来了非常 [不同的好处](https://www.youtube.com/watch?v=CQuTF-bkOgc)。

它使得写 CSS 变得格外简单快速，如下面的例子所示：

以往的 CSS：

1. 通常在单独的文件里写 CSS

```css
.my-class {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  padding: 1rem;
}
```

2. 在组件里导入 CSS 文件

```jsx
import "./my-class.css";
```

3. 将类名添加到 HTML 元素

```html
<div class="my-class">...</div>
```

在 Tailwind CSS 中，这等同于：

1. 直接在 HTML 元素里写类名

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

当搭配 React 组件一同使用时，它强大的功能能够帮助我们快速搭建 UI。

Tailwind CSS 有一套内置的精美设计系统，它包含了精心挑选的色彩方案、为统一设计的尺寸模式（例如宽度 / 高度和填充 / 边距），以及为创建响应式布局所需的断点功能，这一切都开箱即用。这套设计系统可以完全按照你项目的需求来进行自定义配置和扩展。

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla 也即 [mewtru](https://twitter.com/trunarla) 之前发表过关于 [使用 Tailwind CSS 构建设计系统](https://www.youtube.com/watch?v=T-Zv73yZ_QI) 的精彩演讲。

## 用法

务必为你的代码编辑器添加对应的 Tailwind 插件，以提升开发体验。

### 扩展与插件

- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains Integration](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### 格式化

Tailwind CSS 的类名很容易变得混乱，所以一个类名格式化工具非常有必要。[Tailwind CSS Prettier 插件](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) 会按照 [推荐的顺序](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted) 给不同的类排序，这样代码里的类名顺序就和最终打包文件中的类名顺序保持一致。当你用命令行工具创建 T3 应用时选择了 Tailwind，我们会默认帮你安装并配置好该插件。

### 条件性地添加类

使用三元操作符来条件性地添加类会变得混乱，且难以阅读。以下两个包可以在需要条件性逻辑时帮你组织好类名。

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## 有用的资源

| 资源                      | 链接                                                     |
| ------------------------- | -------------------------------------------------------- |
| Tailwind 文档             | https://tailwindcss.com/docs/editor-setup/               |
| Tailwind 备忘录           | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss       | https://github.com/aniftyco/awesome-tailwindcss/         |
| Tailwind 社区             | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Tailwind Discord 服务器   | https://tailwindcss.com/discord/                         |
| TailwindLabs Youtube 频道 | https://www.youtube.com/tailwindlabs/                    |
| Tailwind Playground       | https://play.tailwindcss.com/                            |
