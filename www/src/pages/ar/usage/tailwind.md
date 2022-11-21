---
title: Tailwind CSS
description: Usage of Tailwind CSS
layout: ../../../layouts/docs.astro
lang: ar
dir:rtl
---

## What is Tailwind CSS?

مكتبة Tailwind CSS هي مكتبة صغيرة، تعتمد على فلسفة[utility first](https://tailwindcss.com/docs/utility-first)، وتُستخدم في تصميم وبناء دون الحاجة إلي إستخدام Pure CSS، فهي مكتبة نقية لا تقدم أي Components مُسية التصميم، غير أنها توفر مزايا عديدة بالمقارنة بباقي المكتبات، لمزيد من المعلومات شاهد a very different set of benefits](https://www.youtube.com/watch?v=CQuTF-bkOgc)
فهي تجعل عملية التصميم سريعة بشكل لا يُصدق.

1. في الماضي كنا نكتب css في ملفات منفصلة

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

2. ثم نقوم استدعائها في مكان آخر

```jsx
import "./my-class.css";
```

3. ثم نُضيف الـ class الي HTML

```html
<div class="my-class">...</div>
```

المقابل لكل الخطوات السابقة في Tailwind CSS

1. فقط اكتب الـ Class في HTML وانتهى الموضوع

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

إستخدام هذة الخصائص جنبا إلى جنب مع React Components يعطيك قوة هائلة لا مثيل لها.

Tailwind CSS has a beautiful built-in design system, that comes out of the box with a carefully chosen color palette, sizing patterns for styles such as width/height and padding/margin for a uniform design, as well as media breakpoints for creating responsive layouts. This design system can be customized and extended to create the exact toolbox of styles that your project needs.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla better known as [mewtru](https://twitter.com/trunarla) gave an amazing talk on [building a design system using Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## Usage

Make sure you have editor plugins for Tailwind installed to improve your experience writing Tailwind.

### Extensions and Plugins

- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains Integration](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Formatting

Tailwind CSS classes can easily get a bit messy, so a formatter for the classes is a must have. [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) sorts the classes in the [recommended order](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted) so that the classes match the outputted css bundle. When selecting Tailwind in the CLI, we will install and configure this for you.

### Conditionally Applying Classes

Conditionally adding classes using ternaries can get very messy and hard to read. These packages help in organizing your classes when using some conditional logic.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Useful Resources

| Resource                     | Link                                                     |
| ---------------------------- | -------------------------------------------------------- |
| Tailwind Docs                | https://tailwindcss.com/docs/editor-setup/               |
| Tailwind Cheat Sheet         | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss          | https://github.com/aniftyco/awesome-tailwindcss/         |
| Tailwind Community           | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Tailwind Discord Server      | https://tailwindcss.com/discord/                         |
| TailwindLabs Youtube Channel | https://www.youtube.com/tailwindlabs/                    |
| Tailwind Playground          | https://play.tailwindcss.com/                            |



