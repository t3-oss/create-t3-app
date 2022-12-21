---
title: Tailwind CSS
description: Bruk av TailwindCSS
layout: ../../../layouts/docs.astro
lang: no
---

## Hva er Tailwind CSS?

Tailwind CSS er et lite, [utility first](https://tailwindcss.com/docs/utility-first) CSS-rammeverk for å lage tilpassede temaer uten å måtte bytte mellom ulike kontekster. Det er et rent CSS-rammeverk og tilbyr ingen forhåndsbygde komponenter eller logikk. Det tilbyr også [et helt annet sett med fordeler](https://www.youtube.com/watch?v=CQuTF-bkOgc) sammenlignet med et komponentbibliotek som Material UI.

Det gjør det utrolig enkelt og raskt å skrive CSS, som vist i eksemplet nedenfor:

Gammel CSS:

1. Skriv CSS (ofte i en egen fil)

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

2. Importer CSS til komponenten din

```jsx
import "./my-class.css";
```

3. Legg til klassen i HTML-koden din

```html
<div class="my-class">...</div>
```

Tilsvarende i Tailwind:

1. Bare skriv klassen i HTML-koden din

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

React-komponenter er en sterk kombinasjon for å raskt lage brukergrensesnitt.

Tailwind CSS har et veldig fint innebygd temasystem som kommer med en nøye utvalgt fargepalett, dimensjonsstiler for bredde/høyde og padding/margin, og mediabrytepunkter for responsive layouter. Dette designsystemet kan tilpasses og utvides for å lage nøyaktig det settet med stiler som prosjektet ditt trenger.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla, bedre kjent som [mewtru](https://twitter.com/trunarla), har en flott presentasjon om hvordan å [bygge et temasystem med Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## Bruk

Sørg for at du har installert editor-plugins for Tailwind for å forbedre utvikleropplevelsen.

### Utvidelser og plugins

- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains-integrasjon](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Formatering

Tailwind CSS-klasser kan fort bli forvirrende, så en klasseformaterer er et must. [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) sorterer klassene i [anbefalt rekkefølge](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted) slik at klassene samsvarer med utdata-CSS-bundlen. Hvis du velger Tailwind i CLI, vil vi installere og konfigurere det for deg.

### Betinget Bruk av Klasser

Å legge til klasser under forhold med "ternærer" kan bli veldig rotete og vanskelig å lese. Disse pakkene hjelper deg med å organisere klassene dine når du bruker betinget logikk.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Nyttige Ressurser

| Ressurser                  | Link                                                     |
| -------------------------- | -------------------------------------------------------- |
| Tailwind Dokumentasjon     | https://tailwindcss.com/docs/editor-setup/               |
| Tailwind Cheat Sheet       | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss        | https://github.com/aniftyco/awesome-tailwindcss/         |
| Tailwind Community         | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Tailwind Discord-server    | https://tailwindcss.com/discord/                         |
| TailwindLabs Youtube-kanal | https://www.youtube.com/tailwindlabs/                    |
| Tailwind Playground        | https://play.tailwindcss.com/                            |
