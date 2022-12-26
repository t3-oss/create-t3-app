---
title: TypeScript
description: Utilisation de TypeScript
layout: ../../../layouts/docs.astro
lang: fr
---

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>Construisez des filets de sécurité, pas des garde-fous<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @t3dotgg"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="/images/theo_300x300.webp"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Theo - auteur de la T3 Stack</span>
      <a
        href="https://twitter.com/t3dotgg"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        @t3dotgg
      </a>
    </div>
  </cite>
</blockquote>

Que vous soyez un développeur débutant ou chevronné, nous pensons que TypeScript est indispensable. Cela peut sembler intimidant au début, mais tout comme beaucoup d'outils, c'est quelque chose dont beaucoup ne garderont de mauvais souvenirs après avoir commencé à l'utiliser.

Il fournit des commentaires en direct lorsque vous écrivez votre code en définissant les types de données attendus, et fournit soit une saisie semi-automatique dans votre éditeur de code, soit vous crie dessus avec des lignes ondulées rouges si vous essayez d'accéder à une propriété qui n'existe pas ou essayez de passez une valeur du mauvais type, que vous auriez sinon à déboguer plus tard, en ligne.

C'est peut-être l'outil qui offre le plus de productivité aux développeurs. Il fournit la documentation de votre code lorsque vous l'écrivez ou le consommez dans votre éditeur en vous donnant une information directe car vous pouvez faire des erreurs et ceci est absolument inestimable.

## Inférence de type

Alors que de nombreux nouveaux développeurs TypeScript sont concernés par _écrire_ du TypeScript, bon nombre de ses avantages ne vous obligent pas à modifier votre code, en particulier l'inférence. L'inférence signifie que si quelque chose est typé, ce type le suivra tout au long du flux de l'application sans avoir à être redéclaré à d'autres endroits. Cela signifie que, par exemple, une fois que vous avez défini les types d'arguments qu'une fonction prend, le reste de la fonction sera généralement typesafe sans nécessiter d'autre code spécifique à TypeScript. Les développeurs de librairies consacrent une tonne de travail à la maintenance des types de celles-ci, ce qui signifie que nous, en tant que développeurs d'applications, pouvons bénéficier à la fois de l'inférence et de la documentation intégrée dans notre éditeur de code grâce aux types que fournissent ces librairies.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="Vous utilisez peut-être mal TypeScript" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Regardez la vidéo de Theo sur la façon dont [vous utilisez peut-être mal TypeScript](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## Utilisations puissantes de l'inférence de type

### Zod

[Zod](https://github.com/colinhacks/zod) est une librairie de validation de schéma construite avec TypeScript. Écrivez un schéma qui représente une source unique de vérité pour vos données, et Zod s'assurera que vos données sont valides dans toute votre application, même au-delà des limites du réseau et des API externes.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) vous propose des requêtes et des mutations déclaratives, toujours à jour et autogérées, qui améliorent directement votre expériences de développeur et d'utilisateur.

## Ressources utiles

| Ressource                                                 | Lien                                                              |
| --------------------------------------------------------- | ----------------------------------------------------------------- |
| Manuel TypeScript                                         | https://www.typescriptlang.org/docs/handbook/                     |
| Tutoriel TypeScript pour débutants                        | https://github.com/total-typescript/beginners-typescript-tutorial |
| Défis de Type                                             | https://github.com/type-challenges/type-challenges                |
| Rodney Mullen of TypeScript (Matt Pocock) Youtube Channel | https://www.youtube.com/c/MattPocockUk/videos                     |
