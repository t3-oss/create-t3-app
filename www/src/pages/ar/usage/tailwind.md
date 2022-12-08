---
title: Tailwind CSS
description: إستخدام Tailwind CSS
layout: ../../../layouts/docs.astro
lang: ar
dir: rtl
---

## ما هي Tailwind CSS ؟

مكتبة Tailwind CSS هي مكتبة صغيرة، بُنيت على فلسفة [utility first](https://tailwindcss.com/docs/utility-first)، وتُستخدم في التصميم والبناء دون الحاجة إلي إستخدام Pure CSS، فهي مكتبة نقية لا تُقدم أي Components مُسبقة التصميم، غير أنها توفر مزايا عديدة بالمقارنة بباقي المكتبات، لمزيد من المعلومات شاهد a very different set of benefits](https://www.youtube.com/watch?v=CQuTF-bkOgc)
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

إستخدام هذة الخصائص جَنبا إلى جَنب مع React Components يُعطيك قُوة هائلة لا مَثيل لها.
تأتي Tailwind CSS بنظام مُدمج وجميل مُزود بمجموعة الوان واحجام و styles مُختارة بعناية كالطول والعرض والحواف، كما أيضا تاني مع breakpoints لإنشاء تصميم متوافق.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

أعطي [mewtru](https://twitter.com/trunarla) خطابا رائعا عن [building a design system using Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## الاستخدام

تأكد من تثبيت إضافة Tailwind CSS لمحرر اكوادك لتُحسن جودة العمل.

### الاضافات

- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains Integration](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### الـ Formatting

الـ Classes في TailwindCSS يمكن أن تصبح فوضوية بسهولة، لذلك الـ Formating هو أمر لابد منه، إضافة [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) تحمل عنك هَم تنظيمها، لمزيد من المعلومات إقرأ [recommended order](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted)

### إضافة الـ classes إختبارياَ

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## مصادر مفيدة

| المصدر                       | الرابط                                                   |
| ---------------------------- | -------------------------------------------------------- |
| Tailwind Docs                | https://tailwindcss.com/docs/editor-setup/               |
| Tailwind Cheat Sheet         | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss          | https://github.com/aniftyco/awesome-tailwindcss/         |
| Tailwind Community           | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Tailwind Discord Server      | https://tailwindcss.com/discord/                         |
| TailwindLabs Youtube Channel | https://www.youtube.com/tailwindlabs/                    |
| Tailwind Playground          | https://play.tailwindcss.com/                            |
