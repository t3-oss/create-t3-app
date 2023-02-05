---
title: FAQ
description: Foire aux questions sur Create T3 App
layout: ../../layouts/docs.astro
lang: fr
---

Voici quelques questions fréquemment posées sur Create T3 App.

## Et après? Comment faire une application avec ça ?

Nous essayons de garder ce projet aussi simple que possible, afin que vous puissiez commencer uniquement avec la configuration que nous avons fait pour vous, et ajouter des éléments supplémentaires plus tard, lorsqu'ils deviennent nécessaires.aaa

Si vous n'êtes pas familier avec les différentes technologies utilisées dans ce projet, veuillez vous référer aux docs respectives. Si vous êtes toujours dans le brouillard, veuillez rejoindre notre [Discord](https://t3.gg/discord) et demander de l'aide.

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Quelles ressources d'apprentissage sont actuellement disponibles?

Bien que les ressources répertoriées ci-dessous soient parmi les meilleures qui existent pour la stack T3, la communauté (et [Theo](https://youtu.be/rzwaaWH0ksk?t=1436)) vous recommandent de commencer à utiliser la stack et d'apprendre en cours de route en codant avec elle.

Si vous envisagez Create T3 App, il y a de fortes chances que vous ayez déjà utilisé certaines parties de la stack. Alors pourquoi ne pas simplement plonger la tête la première et apprendre les autres parties pendant que vous créez quelque chose ?

Maintenant, nous comprenons que cette voie ne fonctionne pas pour tout le monde. Donc, si vous avez l'impression d'avoir suivi les recommandations et que vous êtes toujours en manque de ressources, ou si vous n'êtes tout simplement pas sûr de le faire vous-même et/ou si vous vous sentez dépassé par la stack, consultez ces tutoriels géniaux sur Create T3 App :

### Articles

- [Créez une application complète avec Create T3 App](https://www.nexxel.dev/blog/ct3a-guestbook)
- [Un premier aperçu de Create T3 App](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrer votre application T3 vers un Turborepo](https://www.jumr.dev/blog/t3-turbo)
- [Intégrer Stripe dans votre application T3](https://blog.nickramkissoon.com/posts/integrate-stripe-t3)

### Vidéos

- [Créez un clone Twitter avec la stack T3 - tRPC, Next.js, Prisma, Tailwind et Zod](https://www.youtube.com/watch?v=nzJsYJPCc80)
- [Créez un blog avec la stack T3 - tRPC, TypeScript, Next.js, Prisma et Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Créer une application de chat en direct avec la stack T3 - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [La stack T3 - Comment nous l'avons créez](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [Un aperçu de Create T3 App (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)

## Pourquoi y a-t-il des fichiers `.js` dans le projet ?

Conformément à [T3-Axiom #3](/fr/introduction#la-sécurité-de-typage-nest-pas-facultative), nous considérons la sécurité de typage comme un citoyen de première classe. Malheureusement, tous les frameworks et plugins ne prennent pas en charge TypeScript, ce qui signifie que certains des fichiers de configuration doivent être des fichiers `.js`.

Nous essayons de souligner que ces fichiers sont JavaScript pour une raison, en déclarant explicitement le type de chaque fichier (`cjs` ou `mjs`) en fonction de ce qui est pris en charge par la librairie par laquelle il est utilisé. De plus, tous les fichiers `js` de ce projet sont vérifiés systématiquement à l'aide d'un commentaire `@ts-check` en début de fichier.

## J'ai du mal à ajouter i18n à mon application. Y a-t-il une référence que je peux utiliser?

Nous avons décidé de ne pas inclure i18n par défaut dans `create-t3-app` car c'est un sujet très opiniâtre et il existe de nombreuses façons de l'implémenter.

Cependant, si vous avez du mal à l'implémenter et que vous souhaitez voir un projet de référence, nous avons un [repo de référence](https://github.com/juliusmarminge/t3-i18n) qui montre comment vous pouvez ajouter i18n à une application T3 en utilisant [next-i18next](https://github.com/i18next/next-i18next).

## Pourquoi utilisons-nous `/pages` et non `/app` de Next.js 13 ?

Selon [T3-Axiom #2](/fr/introduction#etre-responsable), nous aimons les trucs à la pointe de la technologie, mais nous apprécions la stabilité, l'entièreté de votre routeur est difficile à porter, [pas le meilleur lieu pour les technologies de pointes](https://youtu.be/mnwUbtieOuI?t=1662). Bien que `/app` soit [un aperçu du futur](https://youtu.be/rnsC-12PVlM?t=818), il n'est pas prêt pour la production ; L'API est en version bêta et devrait subir des modifications avec changements majeurs pouvant casser le code.

Pour obtenir une liste des fonctionnalités prises en charge, planifiées et en cours de développement dans le répertoire `/app`, consultez la [documentation de la beta de Next.js](https://beta.nextjs.org/docs/app-directory-roadmap#supported-et-fonctionnalités-prévues).
