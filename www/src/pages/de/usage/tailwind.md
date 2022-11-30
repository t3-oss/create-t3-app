---
title: Tailwind CSS
description: Verwendung von TailwindCSS
layout: ../../../layouts/docs.astro
lang: de
---

## Was ist Tailwind CSS?

Tailwind CSS ist ein kleines, [utility first](https://tailwindcss.com/docs/utility-first) CSS-Framework für die Erstellung benutzerdefinierter Designs, ohne dass zwischen verschiedenen Kontexten gewechselt werden muss. Es ist ein reines CSS-Framework und bietet keine vorgefertigten Komponenten oder Logik. Ebenfalls ergibt sich [eine sehr unterschiedliche Reihe von Vorteilen](https://www.youtube.com/watch?v=CQuTF-bkOgc) im Vergleich zu einer Komponentenbibliothek wie Material UI.

Es ermöglicht CSS unglaublich einfach und schnell zu schreiben, wie im folgenden Beispiel gezeigt:

Altes CSS:

1. Schreibe CSS (oft in einer separaten Datei)

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

2. Importiere CSS in deine Komponente

```jsx
import "./my-class.css";
```

3. Füge die Klasse deinem HTML hinzu

```html
<div class="my-class">...</div>
```

Äquivalent in Tailwind:

1. FÜge die Klasse lediglich deinem HTML hinzu

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

In Kombination mit React-Komponenten ist es extrem mächtig, um schnell Benutzeroberflächen zu erstellen.

Tailwind CSS hat ein sehr schönes integriertes Design-System, dass mit einer sorgfältig ausgewählten Farbpalette, Größenvorgaben für Styles wie width/height und padding/margin sowie Media-Breakpoints für responsive Layouts ausgeliefert wird. Dieses Design-System kann angepasst und erweitert werden, um die exakte Toolbox an Styles zu erstellen, die dein Projekt benötigt.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla, besser bekannt als [mewtru](https://twitter.com/trunarla), hat eine großartige Präsentation über [das Erstellen eines Design-Systems mit Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI) gehalten.

## Verwendung

Stell sicher, dass du Editor-Plugins für Tailwind installiert hast, um die Verwendung von Tailwind zu verbessern.

### Erweiterungen und Plugins

- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains Integration](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Formatierung

Tailwind CSS Klassen können schnell unübersichtlich werden, daher ist ein Formatter für die Klassen ein Muss. [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) sortiert die Klassen in der [empfohlenen Reihenfolge](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted), sodass die Klassen mit dem ausgegebenen CSS-Bundle übereinstimmen. Wenn du Tailwind in der CLI auswählst, installieren und konfigurieren wir dies für dich.

### Bedingte Anwendung von Klassen

Das Hinzufügen von Klassen unter Bedingungen mit "ternaries" kann sehr unübersichtlich und schwer zu lesen werden. Diese Pakete helfen bei der Organisation deiner Klassen, wenn du bedingte Logik verwendest.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Nützliche Ressourcen

| Resource                     | Link                                                     |
| ---------------------------- | -------------------------------------------------------- |
| Tailwind Docs                | https://tailwindcss.com/docs/editor-setup/               |
| Tailwind Cheat Sheet         | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss          | https://github.com/aniftyco/awesome-tailwindcss/         |
| Tailwind Community           | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Tailwind Discord Server      | https://tailwindcss.com/discord/                         |
| TailwindLabs Youtube Channel | https://www.youtube.com/tailwindlabs/                    |
| Tailwind Playground          | https://play.tailwindcss.com/                            |
