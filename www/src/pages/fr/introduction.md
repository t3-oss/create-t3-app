---
title: Introduction
description: Introduction à la stack T3
layout: ../../layouts/docs.astro
lang: fr
---

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/YkOSUVzOAA4" title="La meilleure stack pour votre prochain projet" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## La stack T3

La _"T3 Stack"_ est une stack de développement Web créée par [Theo](https://twitter.com/t3dotgg) axée sur la simplicité, la modularité et la sécurité de typage complète.

Les éléments principaux sont [**Next.js**](https://nextjs.org/) et [**TypeScript**](https://typescriptlang.org/). [**Tailwind CSS**](https://tailwindcss.com/) est presque toujours inclus. Si vous faites quelque chose qui ressemble a du backend, [**tRPC**](https://trpc.io/), [**Prisma**](https://prisma.io/) et [**NextAuth .js**](https://next-auth.js.org/) sont également d'excellents ajouts.

Vous avez peut-être remarqué qu'il y a beaucoup… beaucoup de pièces. C'est par conception. Échangez les pièces selon vos besoins - cette stack est modulaire à la base :)

## Alors... qu'est-ce que create-t3-app ? Un modèle?

`create-t3-app` est une CLI conçue par des développeurs chevronnés de T3 Stack pour rationaliser la configuration d'une application modulaire T3 Stack. Cela signifie que chaque pièce est facultative et que le "modèle" est généré en fonction de vos besoins spécifiques.

Après d'innombrables projets et de nombreuses années sur cette technologie, nous avons beaucoup d'opinions et d'idées. Nous avons fait de notre mieux pour les encoder dans cette CLI.

Ce n'est **PAS** un modèle tout compris. Nous **attendons** que vous apportiez vos propres librairies qui répondent aux besoins de **VOTRE** application. Bien que nous ne souhaitions pas prescrire de solutions à des problèmes plus spécifiques tels que la gestion de l'état et le déploiement, nous [avons quelques recommandations répertoriées ici](/fr/other-recs).

## T3 Axioms

Nous allons être francs - c'est un _projet opiniâtre_. Nous partageons une poignée de croyances fondamentales autour de la création et nous les traitons comme la base de nos décisions.

### Résoudre des problèmes

Il est facile de tomber dans le piège de "tout ajouter" - nous ne voulons explicitement pas le faire. Tout ce qui est ajouté à "create-t3-app" devrait résoudre un problème spécifique qui existe dans les technologies de base incluses. Cela signifie que nous n'ajouterons pas des choses comme des librairies d'état (`zustand`, `redux`) mais nous ajouterons des choses comme NextAuth.js et intégrerons Prisma et tRPC pour vous.

### Être responsable

Nous aimons notre technologie de pointe. La vitesse et honnêtement le fun qu'apportent de nouvelles choses est vraiment cool. Nous pensons qu'il est important d'être responsable, en utilisant des technologies plus risquées dans les parties les moins risquées. Cela signifie que nous ne parierions pas ⛔️ sur une nouvelle technologie de base de données risquée (SQL est génial !). Mais nous parions volontiers ✅ sur tRPC car ce ne sont que des fonctions triviales à déplacer.

### La sécurité de typage n'est pas facultative

L'objectif déclaré de Create T3 App est de fournir le moyen le plus rapide de démarrer une nouvelle application Web **typesafe** complète. Nous prenons la sécurité des caractères au sérieux dans ces parties, car elle améliore notre productivité et nous aide à expédier moins de bogues. Toute décision qui compromet la nature typesafe de Create T3 App est une décision qui doit être prise dans un projet différent.
