---
title: Pourquoi CT3A?
description: Pourquoi devriez-vous choisir Create T3 App pour votre prochain projet
layout: ../../layouts/docs.astro
lang: fr
---

Nous avons lancé create-t3-app parce que [Theo](https://twitter.com/t3dotgg) a refusé de créer un modèle de ses technologies préférées. Inspirée par create-next-app, [Astro's CLI](https://astro.build) avec un amour pour la sécurité des types, l'équipe create-t3-app a travaillé dur pour créer le meilleur point de départ possible pour les nouveaux projets T3 Stack.

Si vous souhaitez utiliser Next.js de manière sécurisée, c'est ici qu'il faut commencer. Si vous êtes curieux de connaître l'un des choix technologiques spécifiques que nous avons faits, lisez la suite :)

## Pourquoi TypeScript ?

JavaScript est difficile. Pourquoi ajouter plus de règles ?

Nous croyons fermement que l'expérience fournie par TypeScript vous aidera à devenir un meilleur développeur. Il fournit des commentaires en direct lorsque vous écrivez votre code en définissant les types de données attendus, et fournit soit une saisie semi-automatique utile dans votre éditeur, soit vous crie dessus avec des lignes ondulées rouges si vous essayez d'accéder à une propriété qui n'existe pas ou essayez de passer une valeur du mauvais type, que vous auriez sinon à déboguer plus loin. Que vous soyez nouveau dans le développement Web ou un professionnel chevronné, la "strictité" de TypeScript fournira une expérience moins frustrante et plus cohérente que Vanilla JS.

La sécurité de type vous rend plus rapide. Si vous n'êtes pas convaincu, vous [utilisez peut-être mal TypeScript...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)

## Pourquoi Next.js ?

Nous aimons React. Il a rendu le développement d'interface utilisateur accessible d'une manière que nous n'avions jamais imaginé auparavant. Cela peut également conduire les développeurs sur des chemins difficiles.

Next.js offre une approche légèrement opiniâtre et fortement optimisée pour créer des applications à l'aide de React. Du routage aux définitions d'API en passant par le rendu d'image, nous faisons confiance à Next.js pour guider les développeurs vers de bonnes décisions.

## Pourquoi tRPC/Prisma/Tailwind/etc?

Bien que nous croyions qu'il faut garder les choses aussi simples que possible, nous constatons que ces éléments sont utilisés dans chaque "application" comme projet que nous créons. `create-t3-app` fait un excellent travail en vous permettant d'adopter les éléments dont vous avez besoin.

### tRPC

tRPC tient la promesse de GraphQL d'un développement client transparent par rapport à un serveur typesafe sans tout le passe-partout. C'est un abus intelligent de TypeScript qui offre une expérience de développement incroyable.

### Prisma

Prisma est à SQL ce que TypeScript est à JS. Il a créé une expérience de développement qui n'existait pas auparavant. En générant des types à partir d'un schéma défini par l'utilisateur compatible avec [plusieurs bases de données](https://www.prisma.io/docs/concepts/database-connectors), Prisma garantit la sécurité des types de bout en bout, de votre base de données à votre application.

Prisma fournit toute une [suite d'outils](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows) facilitant les interactions quotidiennes avec votre base de données. Notamment, Prisma Client est chargé d'interroger et de rendre SQL si simple que vous remarquerez à peine que vous l'utilisez, et Prisma Studio est une interface graphique pratique pour votre base de données qui vous permet de lire et de manipuler vos données rapidement sans avoir à écrire de code.

### Tailwind CSS

Tailwind ressemble à un "CSS en mode zen".

En fournissant des blocs de construction sous la forme de bonnes couleurs par défaut, d'un espacement et d'autres primitives, Tailwind facilite la création d'une belle application. Et contrairement aux librairies de composants, cela ne vous retient pas lorsque vous souhaitez faire passer votre application au niveau supérieur et créer quelque chose de beau et d'unique.

De plus, avec son approche en ligne, Tailwind vous encourage à styliser sans vous soucier de nommer les classes, d'organiser les fichiers ou de tout autre problème non directement lié au problème que vous essayez de résoudre.

### NextAuth.js

Lorsque vous souhaitez un système d'authentification dans votre application NextJS, NextAuth.js est une excellente solution pour apporter la complexité de la sécurité sans avoir à le coder vous-même. Il est livré avec une longue liste de fournisseurs pour ajouter rapidement l'authentification OAuth et fournit des adaptateurs pour de nombreuses bases de données et ORM.
