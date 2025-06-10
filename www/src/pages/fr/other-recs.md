---
title: Autres recommandations
description: Librairies et services que nous recommandons pour de nombreux projets
layout: ../../layouts/docs.astro
lang: fr
---

Nous reconnaissons que les librairies incluses dans `create-t3-app` ne résolvent pas tous les problèmes. Bien que nous vous encourageons à commencer votre projet avec les éléments que nous fournissons, il viendra un moment où vous devrez ajouter d'autres librairies. Vous seul pouvez savoir ce dont votre projet a besoin, mais voici certaines choses que nous recommandons fréquemment.

Ce sont des recommandations de contributeurs individuels de Create T3 App et ne doivent pas être considérées comme des approbations "officielles" par l'équipe de Create T3 App ou T3-OSS. _**Veuillez faire vos propres recherches, surtout avant de vous engager dans des services payants**_.

## State Management

_**Note de l'éditeur**_: Les librairies de state management peuvent être excellentes, mais ne sont pas souvent nécessaires. Les hooks de React Query-tRPC devraient pouvoir prendre en charge le state de votre serveur. Pour le state du client, commencez par `useState` de React et utilisez l'une de ces options lorsque vous en avez besoin de plus.

### Zustand

**Pour ne plus jamais utiliser Redux**

Le "Redux moderne et simple" dont vous ne saviez pas avoir besoin. On peut toujours faire confiance à [Poimandres](https://github.com/pmndrs). Vous pouvez tout créer, des applications d'appel vidéo aux jeux en passant par les serveurs avec cette petite librairie.

- [Page d'accueil Zustand](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Jotai

**Pour ne plus jamais utiliser Context**

Pour une approche plus atomique, Jotai est difficile à battre. Toujours par [Poimandres](https://github.com/pmndrs), Jotai vous permet de définir des singletons qui ressemblent à un useState global. Une excellente option pour les comportements avec état qui n'ont pas encore besoin d'une machine d'état.

- [Page d'accueil Jotai](https://jotai.org/)
- [Jotai GitHub](https://github.com/pmndrs/jotai)

## Librairies de composants

La plupart des applications ont besoin de la même poignée de composants - boutons, menus déroulants, modaux, etc. Ces librairies fournissent d'excellents composants accessibles que vous pouvez utiliser et personnaliser à votre guise.

### Librairies de composants sans style

Aussi connues sous le nom de librairies headless, elles fournissent d'excellents composants sans style et accessibles que vous pouvez personnaliser à votre guise. Voici quelques recommandations.

- [Radix UI](https://www.radix-ui.com/) vous offre un ensemble puissant de primitives pratiques et accessibles que vous pouvez styliser avec du CSS vanilla ou Tailwind.

- [Headless UI](https://headlessui.com/) créé par l'équipe Tailwind CSS fournit également des composants accessibles sans style qui s'intègrent de manière transparente avec Tailwind CSS.

- [React Aria](https://react-spectrum.adobe.com/react-aria/) fournit des primitives d'interface utilisateur accessibles pour votre design. Leur composant Date Picker est de premier plan.

### Librairies de composants stylisés

**Pour quand vous voulez juste que votre application ait l'air OK**

Parfois, vous créez un projet où vous voulez juste que l'interface utilisateur ait l'air décente. Pour les tableaux de bord d'administration et d'autres projets similaires, n'importe laquelle de ces librairies de composants fera le travail.

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)
- [@shadcn/ui](https://ui.shadcn.com/)

### Class Variance Authority

**Pour créer des librairies d'interface utilisateur**

Créez de manière déclarative une librairie d'interface utilisateur avec différentes variantes de couleur, de taille, etc. Lorsque votre projet atteint une échelle où vous souhaitez un ensemble normé de composants d'interface utilisateur avec plusieurs variantes utilisant Tailwind CSS, CVA est un excellent outil.

- [Class Variance Authority GitHub](https://github.com/joe-bell/cva)

## Animations

Lorsque vous avez besoin d'animations dans votre application, voici nos recommandations.

### AutoAnimate

**Pour les animations avec une seule ligne de code**

La plupart des librairies d'animation essaient de satisfaire tous les cas d'utilisation possibles et deviennent lourdes. AutoAnimate est un outil sans configuration qui vous apportera une amélioration significative de l'expérience utilisateur sans effort supplémentaire du développeur.

- [Page d'accueil AutoAnimate](https://auto-animate.formkit.com/)
- [AutoAnimate GitHub](https://github.com/formkit/auto-animate)
- [Extrait de composant AutoAnimate](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Framer Motion

**Pour les animations complexes avec du code déclaratif**

Framer Motion fournit une syntaxe déclarative simple et vous permet d'écrire moins de code pour tout créer, des animations complexes aux gestes uniformes.

- [Page d'accueil Framer Motion](https://framer.com/motion)
- [Documentation Framer Motion](https://www.framer.com/docs/)

## Déploiements, Infrastructure, Bases de données et CI

### Vercel

**Pour héberger votre application**

Vercel a pris l'enfer des déploiements Web et en a fait une intégration GitHub prête à l'emploi. Nous sommes passés à des centaines de milliers d'utilisateurs sans problème. Alimenté par AWS, juste une meilleure interface :)

- [Page d'accueil Vercel](https://vercel.com/)
- [Guide de déploiement de Create T3 App sur Vercel](/fr/deployment/vercel)

### PlanetScale

**Pour des bases de données sans souci**

PlanetScale est de loin la meilleure "plate-forme de base de données serverless" que nous ayons utilisée. À une échelle folle, excellente expérience de développeur et prix fantastiques. Si vous utilisez SQL (et, espérons-le, Prisma), c'est difficile à battre.

- [Page d'accueil PlanetScale](https://planetscale.com/)

### Railway

**Pour héberger votre infrastructure**

"Heroku moderne". Le moyen le plus simple de faire fonctionner un vrai serveur. Si Vercel et PlanetScale ne suffisent pas, Railway le sera probablement. Faites le pointer sur un dépôt GitHub et c'est parti.

- [Page d'accueil Railway](https://railway.app/)

### Upstash

**Pour du Redis serverless**

Nous aimons Prisma et PlanetScale, mais certains projets nécessitent une solution plus performante. Upstash vous permet d'obtenir les performances en mémoire de Redis dans votre projet serverless, sans avoir à gérer l'infrastructure et à faire évoluer vous-même.

- [Page d'accueil Upstash](https://upstash.com/)

### Pusher

**Pour les WebSockets serverless**

Si WebSockets est l'objectif principal de votre projet, vous pouvez envisager un backend plus traditionnel tel que [Fastify](https://www.fastify.io/) (qui [fonctionne également avec tRPC !](https:// trpc.io/docs/v10/fastify)). Mais pour ajouter rapidement des WebSockets à une application T3, Pusher est un excellent choix.

- [Page d'accueil Pusher](https://pusher.com/)

### Soketi

Soketi est une alternative à Pusher, auto-hébergée, simple et rapide. Il est entièrement compatible avec le SDK de Pusher que vous pouvez utiliser pour vous connecter au serveur. Soketi serverless est également en version bêta.

- [Page d'accueil Soketi](https://soketi.app)
- [Soketi GitHub](https://github.com/soketi/soketi)

## Analytics

Les données utilisateur sont très précieuses lorsque vous créez une application. Voici quelques fournisseurs d'analyse que nous recommandons.

### Plausible

Besoin d'analyses ? Plausible est l'un des moyens les plus rapides de les obtenir. Super minime. Il a même un [plugin, simple, pour Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Page d'accueil Plausible](https://plausible.io/)

### Umami

Umami est une alternative open source à Google Analytics, auto-hébergée, simple, rapide et axée sur la confidentialité. Vous pouvez le déployer très facilement sur Vercel, Railway, etc. Avec PlanetScale comme base de données.

- [Page d'accueil Umami](https://umami.is/)
- [Umami GitHub](https://github.com/umami-software/umami)
- [Umami Cloud](https://cloud.umami.is/)

## Autre

### Next Bundle Analyzer

Il peut parfois être difficile de déterminer ce qui sera inclus dans la sortie de votre application générée. Next Bundle Analyzer est un moyen simple de visualiser et d'analyser les bundles JavaScript générés.

- [@next/bundle-analyzer sur npm](https://www.npmjs.com/package/@next/bundle-analyzer)
