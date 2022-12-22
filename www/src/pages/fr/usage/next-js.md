---
title: Next.js
description: Utilisation de Next.js
layout: ../../../layouts/docs.astro
lang: fr
---

Next.js est un framework backend pour vos applications React.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js est un framework backend" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Découvrez [Theo's Next.js Conf talk](https://www.youtube.com/watch?v=W4UhNo3HAMw) pour mieux comprendre ce qu'est Next.js et son fonctionnement.</p>

## Pourquoi devrais-je l'utiliser ?

Nous aimons React. Il a rendu le développement des interfaces utilisateur accessible d'une manière que nous n'aurions jamais imaginée auparavant. Cela peut également conduire les développeurs sur des chemins difficiles. Next.js offre une approche légèrement opiniâtre et fortement optimisée pour créer des applications à l'aide de React. Du routage aux définitions d'API en passant par le rendu d'image, nous faisons confiance à Next.js pour guider les développeurs vers de bonnes décisions.

L'association de Next.js avec [Vercel](https://vercel.com/) facilite plus que jamais le développement et le déploiement d'applications Web. Leur offre gratuite est extrêmement généreuse et leurs interfaces sont super intuitives, fournissant une solution pointer-cliquer pour déployer votre site (Nous ❤️ Vercel)

## Get Static/Server Props

Une des caractéristique clé de Next.js sont ses capacités de récupération de données. Nous vous recommandons vivement de lire la [documentation officielle](https://nextjs.org/docs/basic-features/data-fetching) pour comprendre comment utiliser chaque méthode et en quoi elles diffèrent. `getServerSideProps` est généralement déconseillé à moins qu'il n'y ait une bonne raison, car il s'agit d'un appel bloquant qui ralentira votre site. [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) est une excellente alternative à `getServerSideProps` lorsque les données sont dynamiques et peuvent être récupérées de manière incrémentielle.

## Ressources utiles

| Ressource                      | Lien                               |
| ------------------------------ | ---------------------------------- |
| Next.js Documentation          | https://nextjs.org/docs            |
| Next.js GitHub                 | https://github.com/vercel/next.js  |
| Next.js Blog                   | https://nextjs.org/blog            |
| Next.js Discord                | https://nextjs.org/discord         |
| Next.js Twitter                | https://twitter.com/nextjs         |
| Vercel/Next.js YouTube Channel | https://www.youtube.com/c/VercelHQ |
