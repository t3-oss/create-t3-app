---
title: Tailwind CSS
description: Usage of Tailwind CSS
layout: ../../../layouts/docs.astro
---

## What is Tailwind CSS?

Tailwind CSS is a tiny, [utility first](https://tailwindcss.com/docs/utility-first) CSS framework for building custom designs, while being able to switch your brain off.

It makes CSS incredibly easy and quick to write, as shown by the following example:

Old CSS:

1. Write CSS, often in a seperate file

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

2. Import CSS into your component

```jsx
import "./my-class.css";
```

3. Add the class to your HTML

```html
<div class="my-class">...</div>
```

Equivelent in Tailwind:

1. Just write classes in your HTML

```html
<div
  class="flex flex-col justify-center items-center bg-white border border-gray-200 rounded p-4"
>
  ...
</div>
```

Its usage along with React components is extremely powerful for quickly building UIs, however it is purely a CSS framework and does not provide any pre-built components or logic and shouldn't be compared to a component library like Material UI.

Tailwind CSS has a beautiful built-in design system, that comes out of the box with a carefully chosen color palette, sizing patterns for styles such as width/height and padding/margin for a uniform design, as well as media breakpoints for an encouraged mobile-first layout. This can be extended and customised to be as restrictive or broad as you like.

## Usage

Make sure you have editor plugins for Tailwind installed to improve your experience writing Tailwind.

- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains Integration](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

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
