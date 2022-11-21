---
title: Tailwind CSS
description: Использование Tailwind CSS
layout: ../../../layouts/docs.astro
lang: ru
---

## Что такое Tailwind CSS?

Tailwind CSS - это небольшой, [utility first](https://tailwindcss.com/docs/utility-first) CSS фреймворк для создания собственного дизайна, без переключения контекста, которое требуется для обычного CSS. Это чисто CSS фреймворк и не предоставляет никаких предварительно собранных компонентов или логики, и предоставляет [принципиально иной набор преимуществ](https://www.youtube.com/watch?v=CQuTF-bkOgc) по сравнению с библиотекой компонентов, такой как Material UI.

Он делает CSS невероятно легким и быстрым для написания, как показано в следующем примере:

Старый CSS:

1. Напишите CSS, часто в отдельном файле

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

2. Импортируйте CSS в ваш компонент

```jsx
import "./my-class.css";
```

3. Добавьте класс в ваш HTML

```html
<div class="my-class">...</div>
```

Эквивалент в Tailwind:

1. Просто напишите классы в вашем HTML

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

Используя вместе с React компонентами, он является чрезвычайно мощным для быстрого создания UI.

Tailwind CSS содержит встроенную красивую систему дизайна, которая поставляется из коробки с тщательно выбранной цветовой палитрой, размерами для стилей, таких как ширина/высота и отступы для единого дизайна, а также точками прерывания для создания адаптивных макетов. Эта система дизайна может быть настроена и расширена для создания точного набора стилей, которые необходимы вашему проекту.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla лучше известна как [mewtru](https://twitter.com/trunarla) дала потрясающую лекцию о [создании системы дизайна с использованием Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## Использование

Убедитесь, что у вас установлены плагины редактора для Tailwind, чтобы улучшить ваш опыт написания Tailwind.

### Расширения и плагины

- [Расширение для VSCode](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains Integration](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Форматирование

Классы Tailwind Css могут легко стать немного беспорядочными, поэтому форматтер для классов является необходимым. [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) сортирует классы в [рекомендуемом порядке](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted), чтобы классы соответствовали собранному css-пакету. При выборе Tailwind в CLI мы установим и настроим это для вас.

### Добавление классов в зависимости от условий

Добавление классов в зависимости от условий с использованием тернарных операторов может стать очень беспорядочным и трудночитаемым. Эти пакеты помогают организовать ваши классы при использовании некоторой логики с условиями.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Полезные ресурсы

| Ресурс                        | Ссылка                                                   |
| ----------------------------- | -------------------------------------------------------- |
| Документация Tailwind         | https://tailwindcss.com/docs/editor-setup/               |
| Шпаргалка по Tailwind         | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss           | https://github.com/aniftyco/awesome-tailwindcss/         |
| Tailwind Community            | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Сервер Tailwind в Discord     | https://tailwindcss.com/discord/                         |
| Канал TailwindLabs на Youtube | https://www.youtube.com/tailwindlabs/                    |
| Tailwind Playground           | https://play.tailwindcss.com/                            |
