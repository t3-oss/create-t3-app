---
title: Tailwind CSS
description: Gebruik van Tailwind CSS
layout: ../../../layouts/docs.astro
lang: nl
---

## Wat is Tailwind CSS?

Tailwind is een klein, [utility first](https://tailwindcss.com/docs/utility-first) CSS framework om designs op maat te bouwen zonder heen en weer te gaan tussen verschillende bestanden. Het is puur een CSS framework en het heeft geen ingebouwde componenten of logica. Ook bied het [compleet andere voordelen](https://www.youtube.com/watch?v=CQuTF-bkOgc) tenopzichte van een componenten library zoals Material UI.

Het maakt CSS ongeloofelijk makkelijk om te schrijven, zoals je in het volgende voorbeeld kan zien:

Oude CSS:

1. Schrijf CSS (vaak in een ander bestand)

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

2. Importeer CSS in je component

```jsx
import "./my-class.css";
```

3. Voeg de class toe in je HTML

```html
<div class="my-class">...</div>
```

Hetzelfde in tailwind:

1. Voeg de classes toe in je html

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

In combinatie met React Componenten is het extreem krachtig om snel UIs te bouwen.

Tailwind CSS heeft een geweldig ingebouwd design systeem. Out of the box komt het met een met voorzichtig gekozen kleurenpallet, maat specificaties voor width/height en padding/margin voor een samenhangend design, en media breakpoints om responsive layouts te bouwen. Dit design systeem kan veranderd of uitgebreid worden om de perfecte gereedschapskist te maken voor jouw project.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla, beter bekent als [mewtru](https://twitter.com/trunarla) heeft een geweldige presentatie gedaan over [een design systeem maken met Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## Gebruik

Zorg ervoor dat je de IDE plugins voor Tailwind hebt geinstalleerd om je ervaring met Tailwind te verbeteren.

### Extensies en Plugins

- [VSCode Extensie](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains Intergratie](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Opmaak

Tailwind CSS classes kunnen een beetje rommelig worden, dus een opmaaker voor de classes is een must have. [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) sorteert de classes in de [aanbevolen volgorde](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted) zodat de classes gelijk zijn met de output css bundel. Als je Tailwind in de CLI kiest installeren en configueren we dit voor je.

### Voorwaardelijk Classes Toepassen

Voorwaardelijk classes toevoegen met ternaries kan snel rommelig worden en moeilijk zijn om te lezen. Deze packages helpen je om je classes te organizeren wanneer je voorwaardelijk classes toepast.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Nuttige Bronnen

| Bron                         | Link                                                     |
| ---------------------------- | -------------------------------------------------------- |
| Tailwind Documentatie        | https://tailwindcss.com/docs/editor-setup/               |
| Tailwind Spiekbriefje        | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss          | https://github.com/aniftyco/awesome-tailwindcss/         |
| Tailwind Community           | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Tailwind Discord Server      | https://tailwindcss.com/discord/                         |
| TailwindLabs Youtube Kanaal  | https://www.youtube.com/tailwindlabs/                    |
| Tailwind Playground          | https://play.tailwindcss.com/                            |
