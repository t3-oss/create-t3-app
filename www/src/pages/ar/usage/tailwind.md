---
title: Tailwind CSS
description: Usage of Tailwind CSS
layout: ../../../layouts/docs.astro
---

## ما هو Tailwind CSS?

يكون Tailwind CSS صغير الحجم, [الأداة لمساعدة أولا](https://tailwindcss.com/docs/utility-first) ل CSS تسمح ببناء تصميم حسب المطلوب, دون تبديل المحتوى الذي يطلبه نظام CSS العادي. تكون أداة CSS خالصة ولا توفير مركبات أو منطق منشئاً مسبقاً, وتوفير [مجموعة من الميزية المختلفة](https://www.youtube.com/watch?v=CQuTF-bkOgc) مختلفة عن أدوات لأنشاء المركب مثل Material UI.

تسهل من كتابة CSS وتجعل سريعاً, مثل ما يوضح في المثال القادم:

القديم CSS:

1. كتابة CSS في ملف منفصل:

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

2. أشمال CSS في مركبك

```jsx
import "./my-class.css";
```

3. أضافة فئة في HTML الخاص بك

```html
<div class="my-class">...</div>
```

ما يساويه في Tailwind:

1. أكتب فئاتك في HTML الخاص بك

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

يكون من القوي جداً لبناء UI, عندما تستخدم مع مركبات React

يملك Tailwind CSS نظام لتصميم منشئ فعلاً, الذي يأتي مع نظام لأختيار اللون للوحة مختار بعناية, وأنماط للحجم مثل width/height و padding/margin لتصميم متساوي, ومقياسات لحجم الشاشة لأنشاء تخطيط متجاوب. يمكن تعديل هذا النظام لتصميم حسب الطلب والأضافة أليه, لأنشاء الأدوات لقضاء حاجة مشروعك من التصميمات.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

أعطت Tru Narla المعروفة باسم [mewtru](https://twitter.com/trunarla) محادثة ممتازة عن [أنشاء نظام لتصميم باستعمال Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## استخدام

تأكد من وجود plugins في editor خاص بيك, لقضاء وقت أفضل في كتابة Tailwind.

### Extensions and Plugins

- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains Integration](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### تشكيل

يمكن أن تصبح فيئات Tailwind CSS فوضوية, لذلك تشكيل تلك الفئات واجب. يحل [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) ذلك, فأنه يرتب الفيئات في [الترتيب المنصح بيه](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted) لتتساوة الفيئات مع حزمة CSS المنتجة. عند أختيار Tailwind في CLI, سوف نركب ونحدد طريقة ترتيبه من أجلك.

### أضافة فئات بشروط

يمكن أن يصبح الأمر فوضاوي عند أضافة فيئات باستعمال شروط Ternaries ويكون من الصعب قرأته. ستساعدك تلك ال packages في ترتيب فئاتك عند أستخدام المنطق المشروط.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## مفيدة مصادر

| مصدر                     | رابط                                                     |
| ------------------------ | -------------------------------------------------------- |
| مستندات Tailwind         | https://tailwindcss.com/docs/editor-setup/               |
| ورقة الغيش Tailwind      | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss      | https://github.com/aniftyco/awesome-tailwindcss/         |
| منتدي Tailwind           | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| ديسكورد سيرفر Tailwind   | https://tailwindcss.com/discord/                         |
| صفحة TailwindLabs ليتيوب | https://www.youtube.com/tailwindlabs/                    |
| ملعب Tailwind            | https://play.tailwindcss.com/                            |
