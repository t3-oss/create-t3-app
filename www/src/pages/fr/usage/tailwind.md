---
title: Tailwind CSS
description: Utilisation de Tailwind CSS
layout: ../../../layouts/docs.astro
lang: fr
---

## Qu'est-ce que Tailwind CSS ?

Tailwind CSS est une toute petite librairie CSS, [utilitaire d'abord](https://tailwindcss.com/docs/utility-first), permettant de créer des designs personnalisées, sans le changement de contexte requis par le CSS classique. Il s'agit purement d'une librairie CSS et ne fournit aucun composant ou logique prédéfini, elle offre [un ensemble d'avantages très différent](https://www.youtube.com/watch?v=CQuTF-bkOgc) par rapport à une librairie de composants comme Material UI.

Cela rend le CSS incroyablement facile et rapide à écrire, comme le montre l'exemple suivant :

Ancien CSS :

1. Écrire du CSS, souvent dans un fichier séparé

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

2. Importer le CSS dans votre composant

```jsx
import "./my-class.css";
```

3. Ajouter la classe à votre code HTML

```html
<div class="my-class">...</div>
```

Équivalent dans Tailwind :

1. Écrivez simplement des classes dans votre HTML

```jsx
<div class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4">
  ...
</div>
```

Lorsqu'elle est utilisé avec des composantes React, cela permet de créer des interfaces utilisateur de façon extrêmement puissant et rapidement.

Tailwind CSS dispose d'un magnifique système de conception intégré, qui sort de l'oeuf avec une palette de couleurs soigneusement choisie, des modèles de dimensionnement pour des styles tels que la width/height et le padding/margin pour une conception uniforme, ainsi que des points d'arrêt (breaking points) pour créer des mises en page. Ce système de conception peut être personnalisé et étendu pour créer la boîte à outils exacte de styles dont votre projet a besoin.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla mieux connu sous le nom de [mewtru](https://twitter.com/trunarla) a donné une conférence étonnante sur [la construction d'un système de conception à l'aide de Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## Utilisation

Assurez-vous d'avoir installé des plugins pour Tailwind dans votre éditeur de code afin d'améliorer votre expérience d'écriture avec Tailwind.

### Extensions et plugins

- [Extension VSCode](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Integration avec JetBrains](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Formatage

Les classes CSS Tailwind peuvent facilement devenir un peu désordonnées, donc un formateur pour les classes est indispensable. [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) trie les classes dans [l'ordre recommandé](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted) afin que les classes correspondent au bundle CSS généré. Lorsque vous sélectionnez Tailwind dans la ligne de commande, nous l'installons et le configurons pour vous.

### Appliquez les classes de façon conditionnelle

L'ajout conditionnel de classes à l'aide de ternaires peut devenir très compliqué et difficile à lire. Ces packages vous aident à organiser vos classes lorsque vous utilisez une logique conditionnelle.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Ressources utiles

| Ressource                       | Lien                                                     |
| ------------------------------- | -------------------------------------------------------- |
| Documentation Tailwind          | https://tailwindcss.com/docs/editor-setup/               |
| Feuille de triche pour Tailwind | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss             | https://github.com/aniftyco/awesome-tailwindcss/         |
| Communauté Tailwind             | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Tailwind Discord Server         | https://tailwindcss.com/discord/                         |
| TailwindLabs Youtube Channel    | https://www.youtube.com/tailwindlabs/                    |
| Tailwind Playground             | https://play.tailwindcss.com/                            |
