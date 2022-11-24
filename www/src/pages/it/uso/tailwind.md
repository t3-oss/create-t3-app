---
title: Tailwind CSS
description: Usare Tailwind CSS
layout: ../../../layouts/docs.astro
---

## Che cos'è Tailwind CSS?

Tailwind CSS è un minuscolo framework CSS [che è utility first](https://tailwindcss.com/docs/utility-first) per la creazione di progetti personalizzati, senza il cambio di contesto richiesto dai normali CSS. È puramente un framework CSS e non fornisce componenti o logica predefiniti e fornisce [una serie di vantaggi molto diversi](https://www.youtube.com/watch?v=CQuTF-bkOgc) rispetto a un libreria di componenti come l'interfaccia utente materiale.

Rende CSS incredibilmente facile e veloce da scrivere, come mostrato dal seguente esempio:

Vecchio CSS:

1. Scrivi CSS, spesso in un file separato

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

2. Importa CSS nel tuo componente

```jsx
import "./my-class.css";
```

3. Aggiungi la classe al tuo codice HTML

```html
<div class="my-class">...</div>
```

Equivalente in Tailwind:

1. Basta scrivere le classi nel codice HTML

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

Se utilizzato insieme ai Componenti React, è estremamente potente per creare rapidamente interfacce utente.

Tailwind CSS ha un bellissimo sistema di progettazione integrato, che ti da una tavolozza di colori scelta con cura, modelli di dimensionamento per stili come larghezza/altezza e imbottitura/margine per un design uniforme, nonché punti di interruzione dei media per la creazione di layout responsivi. Questo sistema di progettazione può essere personalizzato ed esteso per creare l'esatta cassetta degli attrezzi di stili di cui ha bisogno il tuo progetto.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="Video player di YouTube" frameborder="0" allow="accelerometro; riproduzione automatica; scrittura negli appunti; supporto crittografato; giroscopio; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla meglio conosciuta come [mewtru](https://twitter.com/trunarla) ha tenuto un fantastico discorso sulla [costruzione di un sistema di progettazione utilizzando Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## Utilizzo

Assicurati di aver installato i plug-in dell'editor per Tailwind per migliorare la tua esperienza di scrittura di Tailwind.

### Estensioni e plugin

- [Estensione VSCode](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Integrazione JetBrains](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Formattazione

Le classi CSS Tailwind possono facilmente diventare un po' disordinate, quindi un formattatore per le classi è necessario. [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) ordina le classi nell'[ordine consigliato](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted) in modo che le classi corrispondano al bundle css generato. Quando selezioni Tailwind nella CLI, lo installeremo e configureremo per te.

### Classi ad applicazione condizionale

L'aggiunta condizionale di classi utilizzando ternari può diventare molto disordinata e difficile da leggere. Questi pacchetti aiutano a organizzare le tue classi quando usi una logica condizionale.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Risorse utili

| Risorsa | Collegamento |
| ---------------------------- | -------------------------------------------------- ------ |
| Documentazione Tailwind | https://tailwindcss.com/docs/editor-setup/ |
| Foglio di trucchi per Tailwind | https://nerdcave.com/tailwind-cheat-sheet/ |
| Awasome Tailwind | https://github.com/aniftyco/awesome-tailwindcss/ |
| Comunità di Tailwind | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Server Discord Tailwind | https://tailwindcss.com/discord/ |
| Canale Youtube di TailwindLabs | https://www.youtube.com/tailwindlabs/ |
| Prova Tailwind | https://play.tailwindcss.com/ |