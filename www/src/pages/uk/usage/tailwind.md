---
title: Tailwind CSS
description: Використання Tailwind CSS
layout: ../../../layouts/docs.astro
lang: uk
---

## Що таке Tailwind CSS?

Tailwind CSS - це невеликий [utility first](https://tailwindcss.com/docs/utility-first) CSS фреймворк для створення власного дизайну, без перемикання контексту, який потрібний для звичайного CSS. Це чисто CSS фреймворк і він не надає ніяких попередньо зібраних компонентів або логіки, і надає [принципово інший набір переваг](https://www.youtube.com/watch?v=CQuTF-bkOgc) у порівнянні з бібліотекою компонентів, такою як наприклад Material UI.

Він робить CSS неймовірно легким і швидким для написання, як показано в наступному прикладі:

Старий CSS:

1. Напишіть CSS, часто в окремому файлі

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

2. Імпортуйте CSS у ваш компонент

```jsx
import "./my-class.css";
```

3. Додайте клас у ваш HTML

```html
<div class="my-class">...</div>
```

Еквівалент у Tailwind:

1. Просто напишіть класи у вашому HTML

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

Використовуючи разом із React компонентами, він є надзвичайно потужним для швидкого створення UI.

Tailwind CSS містить вбудовану красиву систему дизайну, яка поставляється від початку з ретельно вибраною палітрою кольорів, розмірами для стилів, таких як ширина/висота і відступи для єдиного дизайну, а також точками переривання для створення адаптивних макетів. Ця система дизайну може бути налаштована та розширена для створення точного набору стилів, які потрібні вашому проекту.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla краще відома як [mewtru](https://twitter.com/trunarla) дала приголомшливу лекцію про [створення системи дизайну з використанням Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## Використання

Переконайтеся, що у вас є плагіни редактора для Tailwind, щоб поліпшити ваш досвід написання Tailwind.

### Розширення та плагіни

- [Розширення для VSCode](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains Integration](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Форматування

Класи Tailwind CSS можуть легко стати трохи безладними, тому форматтер для класів є необхідним. [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) сортує класи у [рекомендованому порядку](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted), щоб класи відповідали зібраному css-пакету. При виборі Tailwind у CLI ми встановимо та налаштуємо це для вас.

### Додавання класів в залежності від умов

Додавання класів в залежності від умов з використанням тернарних операторів може стати дуже безладним і важким для читання. Ці пакети допомагають організувати ваші класи, використовуючи деяку логіку з умовами.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Корисні ресурси

| Ресурс                        | Посилання                                                |
| ----------------------------- | -------------------------------------------------------- |
| Документація Tailwind         | https://tailwindcss.com/docs/editor-setup/               |
| Шпаргалка по Tailwind         | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss           | https://github.com/aniftyco/awesome-tailwindcss/         |
| Tailwind Community            | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Сервер Tailwind в Discord     | https://tailwindcss.com/discord/                         |
| Канал TailwindLabs на Youtube | https://www.youtube.com/tailwindlabs/                    |
| Tailwind Playground           | https://play.tailwindcss.com/                            |
