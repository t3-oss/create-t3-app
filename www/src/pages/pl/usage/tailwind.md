---
title: Tailwind CSS
description: Korzystanie z Tailwind CSS
layout: ../../../layouts/docs.astro
lang: pl
---

## Co to Tailwind CSS?

TailwindCSS to mały, ["utility first"](https://tailwindcss.com/docs/utility-first) framework CSS służący do budowania własnych designów, nie wymagając przy tym zmiany kontekstu, tak jak to robi zwykły CSS. Jest to tylko i wyłącznie framework CSS, który nie oferuje gotowych komponentów czy też logiki. Zawiera on natomiast [wiele różnych benefitów](https://www.youtube.com/watch?v=CQuTF-bkOgc) w porównaniu do biblioteki komponentów, takiej jak Material UI.

Sprawia on, iż pisanie CSSa staje się wyjątkowo łatwe i szybkie, jak widać z resztą na poniższym przykładzie:

Stary CSS:

1. Napisz kod CSSa, często w osobnym pliku

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

2. Zaimportuj CSSa do swojego komponentu

```jsx
import "./my-class.css";
```

3. Dodaj klasę do swojego kodu HTMLa

```html
<div class="my-class">...</div>
```

Odpowiednik z Tailwindem:

1. Po prostu dodaj klasy do HTMLa

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

Kiedy korzystasz z Tailwinda w połączeniu z komponentami Reacta, staje się on niezwykle silnym sposobem na szybkie pisanie interfejsów użytkownika (UI).

Tailwind CSS posiada piękny, wbudowany design system, który zawiera uważnie dobraną paletę kolorów, wzorce rozmiarów dla stylów, takich jak wysokość i szerokość czy też padding i margines. Zawiera też breakpointy pomocne przy tworzeniu responsywnego layoutu. Design system może być dostosowywany i poszerzany, aby stworzyć dokładnie ten zestaw narzędzi i stylów, którego twój projekt potrzebuje.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla, lepiej znana jako [mewtru](https://twitter.com/trunarla), wygłosiła niezwykłą rozmowę na temat [budowania design systemu korzystając z Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## Korzystanie z Tailwinda

Upewnij się, że zainstalowałeś pluginy dla Tailwinda. Zwięszą one komfort pisania kodu korzystając z tego narzędzia.

### Rozszerzenia i Pluginy

- [Rozszerzenie dla VSCode](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains Integration](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Formatowanie

Klasy Tailwinda mogą łatwo stać się nieczytelne, więc formater to "must-have". [Prettier Plugin dla Tailwind CSS](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) sortuje klasy używając [rekomendowanej kolejności](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted) tak, że kolejność klas jest zgodna z ich kolejnością w zbudowanej aplikacji. Wybierając Tailwind w naszym CLI, automatycznie zainstalujemy i skonfigurujemy plugin za Ciebie.

### Warunkowe Dodawanie Klas

Warunkowe dodawanie klas korzystając z "ternary operators" może stać się nieczytelne i niechlujne. Paczki te pomogą w organizowaniu twoich klas korzystając z logiki warunkowej.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Przydatne Zasoby

| Zasób                      | Link                                                     |
| -------------------------- | -------------------------------------------------------- |
| Dokumentacja Tailwinda     | https://tailwindcss.com/docs/editor-setup/               |
| Tailwind Cheat Sheet       | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss        | https://github.com/aniftyco/awesome-tailwindcss/         |
| Tailwind Community         | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Serwer Discrod Tailwinda   | https://tailwindcss.com/discord/                         |
| Kanał Youtube TailwindLabs | https://www.youtube.com/tailwindlabs/                    |
| Tailwind Playground        | https://play.tailwindcss.com/                            |
