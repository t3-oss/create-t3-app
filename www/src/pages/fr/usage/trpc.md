---
title: tRPC
description: utilisation de tRPC
layout: ../../../layouts/docs.astro
lang: fr
---

tRPC nous permet d'écrire des API fortement typées de bout en bout sans aucune génération de code ni surcharge d'exécution. Il utilise l'inférence de TypeScript pour déduire les définitions de type de votre routeur d'API et vous permet d'appeler vos procédures d'API à partir de votre client avec une sécurité de type complète et une saisie semi-automatique dans votre éditeur de code. Lorsque vous utilisez tRPC, vous sentirez votre frontend et votre backend plus proches que jamais, ce qui permet une expérience de développement exceptionnelle.

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>J'ai écrit tRPC pour permettre aux gens de coder plus rapidement en supprimant le besoin d'une couche API traditionnelle, tout en ayant la certitude que nos applications ne se briseront pas lorsque nous itérerons rapidement.<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @alexdotjs"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="https://avatars.githubusercontent.com/u/459267?v=4"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Alex - créateur de tRPC</span>
      <a
        href="https://twitter.com/alexdotjs"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        @alexdotjs
      </a>
    </div>
  </cite>
</blockquote>

## Comment utiliser tRPC ?

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2LYM8gf184U" title="Créer des APIs typesafe facilement avec tRPC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Le contributeur de tRPC [trashh_dev](https://twitter.com/trashh_dev) a fait [une présentation de malade à la Next.js Conf](https://www.youtube.com/watch?v=2LYM8gf184U) à propos de tRPC. Nous vous recommandons fortement de la regarder si vous ne l'avez pas déjà fait.

Avec tRPC, vous écrivez des fonctions TypeScript sur votre backend, puis vous les appelez depuis votre frontend. Une procédure tRPC simple pourrait ressembler à ceci :

```ts:server/api/routers/user.ts
const userRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
```

Il s'agit d'une procédure tRPC (équivalente à un gestionnaire de route dans un backend traditionnel) qui valide d'abord l'entrée à l'aide de Zod (qui est la même bibliothèque de validation que nous utilisons pour les [variables d'environnement] (./env-variables)) - dans ce cas , il s'assure que l'entrée est une chaîne de caractères. Si l'entrée n'en est pas une, elle renverra une erreur informative à la place.

Après l'entrée, nous enchaînons une fonction de résolveur qui peut être soit une [query](https://trpc.io/docs/v10/react-queries), [mutation](https://trpc.io/docs/v10/react-mutations), ou une [subscription](https://trpc.io/docs/v10/subscriptions). Dans notre exemple, le résolveur appelle notre base de données à l'aide de notre client [prisma](./prisma) et renvoie l'utilisateur dont l'`id` correspond à celui que nous avons transmis.

Vous définissez vos procédures dans des "routeurs" qui représentent une collection de procédures liées avec un espace de noms partagé. Vous pouvez avoir un routeur pour les `utilisateurs`, un pour les `posts` et un autre pour les `messages`. Ces routeurs peuvent ensuite être fusionnés en un seul `appRouter` centralisé :

```ts:server/api/root.ts
const appRouter = createTRPCRouter({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

Notez que nous n'avons besoin d'exporter que les définitions de type de notre routeur, ce qui signifie que nous n'importons jamais de code serveur sur notre client.

Maintenant appelons la procédure sur notre frontend. tRPC fournit un wrapper pour `@tanstack/react-query` qui vous permet d'utiliser toute la puissance des hooks qu'il fournit, avec l'avantage supplémentaire d'avoir vos appels d'API typés. Nous pouvons appeler nos procédures depuis notre frontend comme ceci :

```tsx:pages/users/[id].tsx
import { useRouter } from "next/router";
import { api } from "../../utils/api";

const UserPage = () => {
  const { query } = useRouter();
  const userQuery = api.users.getById.useQuery(query.id);

  return (
    <div>
      <h1>{userQuery.data?.name}</h1>
    </div>
  );
};
```

Vous remarquerez immédiatement à quel point la saisie semi-automatique et la sécurité de typage sont bonnes. Dès que vous écrivez `trpc.`, vos routeurs s'affichent en saisie semi-automatique et lorsque vous sélectionnez un routeur, ses procédures s'affichent également. Vous obtiendrez également une erreur TypeScript si votre entrée ne correspond pas au validateur que vous avez défini du côté backend.

## Fichiers

tRPC nécessite beaucoup de configuration que `create-t3-app` fait pour vous. Passons en revue les fichiers générés :

### 📄 `pages/api/trpc/[trpc].ts`

Il s'agit du point d'entrée de votre API et expose le routeur tRPC. Normalement, vous ne toucherez pas beaucoup à ce fichier, mais si vous devez, par exemple, activer le middleware CORS ou similaire, il est utile de savoir que le `createNextApiHandler` exporté est un [gestionnaire d'API Next.js](https://nextjs.org/docs/api-routes/introduction) qui prend une [requête](https://developer.mozilla.org/en-US/docs/Web/API/Request) et [réponse](https://developer.mozilla.org/en-US/docs/Web/API/Response). Cela signifie que vous pouvez envelopper le `createNextApiHandler` dans n'importe quel middleware de votre choix. Voir ci-dessous pour un [exemple] (#enabling-cors) d'ajout de CORS.

### 📄 `server/api/trpc.ts`

Ce fichier est divisé en deux parties, la création du contexte et l'initialisation de tRPC :

1. Nous définissons le contexte qui est passé à vos procédures tRPC. Le contexte sont des données auxquelles toutes vos procédures tRPC auront accès, et c'est un endroit idéal pour mettre des choses comme les connexions à la base de données, les informations d'authentification, etc. Dans create-t3-app, nous utilisons deux fonctions, pour activer l'utilisation d'un sous-ensemble du contexte lorsque nous n'avons pas accès à l'objet de requête.

- `createInnerTRPCContext` : c'est ici que vous définissez le contexte qui ne dépend pas de la requête, par ex. votre connexion à la base de données. Vous pouvez utiliser cette fonction pour les [tests d'intégration](#exemple-de-test-dintégration) ou [ssg-helpers](https://trpc.io/docs/v10/ssg-helpers) où vous n'avez pas d'objet de requête .

- `createTRPCContext` : c'est ici que vous définissez le contexte qui dépend de la requête, par ex. la session de l'utilisateur. Vous demandez la session à l'aide de l'objet `opts.req`, puis transmettez la session à la fonction `createInnerTRPCContext` pour créer le contexte final.

1. Nous initialisons tRPC et définissons des [procédures](https://trpc.io/docs/v10/procedures) et des [middlewares](https://trpc.io/docs/v10/middlewares) réutilisables. Par convention, vous ne devriez pas exporter l'intégralité de l'objet `t`, mais plutôt de créer des procédures et des middlewares réutilisables et de les exporter.

Vous remarquerez que nous utilisons `superjson` comme [transformateur de données](https://trpc.io/docs/v10/data-transformers). Cela fait en sorte que vos types de données sont préservés lorsqu'ils atteignent le client, donc si vous envoyez par exemple un objet `Date`, le client renverra une `Date` et non une chaîne, ce qui est le cas pour la plupart des API.

### 📄 `server/api/routers/*.ts`

C'est ici que vous définissez les routes et les procédures de votre API. Par convention, vous [créez des routeurs séparés](https://trpc.io/docs/v10/router) pour les procédures associées.

### 📄 `server/api/root.ts`

Ici, nous [fusionnons](https://trpc.io/docs/v10/merging-routers) tous les sous-routeurs définis dans `routers/**` en un seul routeur d'application.

### 📄 `utils/api.ts`

Il s'agit du point d'entrée frontend pour tRPC. C'est ici que vous allez importer la **définition de type** du routeur et créer votre client tRPC avec les hooks de react-query. Depuis que nous avons activé `superjson` comme transformateur de données sur le backend, nous devons également l'activer sur le frontend. En effet, les données sérialisées du backend sont désérialisées sur le frontend.

Vous définirez ici vos [liens](https://trpc.io/docs/v10/links) tRPC, qui détermine le flux de requêtes du client vers le serveur. Nous utilisons le [`httpBatchLink`](https://trpc.io/docs/v10/links/httpBatchLink) "par défaut" qui active [le traitement par lot des requêtes](https://cloud.google.com/compute/docs/api/how-tos/batch), ainsi qu'un [`loggerLink`](https://trpc.io/docs/v10/links/loggerLink) qui génère des journaux de requêtes utiles pendant le développement.

Enfin, nous exportons un [helper de type](https://trpc.io/docs/v10/infer-types#additional-dx-helper-type) que vous pouvez utiliser pour déduire vos types sur le frontend.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/x4mu-jOiA0Q" title="How tRPC really works" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Le contributeur de Create T3 App [Christopher Ehrlich](https://twitter.com/ccccjjjjeeee) a réalisé [une vidéo sur les flux de données dans tRPC](https://www.youtube.com/watch?v=x4mu-jOiA0Q). Cette vidéo est recommandée si vous avez utilisé tRPC mais que vous ne savez toujours pas comment cela fonctionne.

## Comment puis-je appeler mon API en externe ?

Avec les API classiques, vous pouvez appeler vos points de terminaison à l'aide de n'importe quel client HTTP tel que `curl`, `Postman`, `fetch` ou directement depuis votre navigateur. Avec tRPC, c'est un peu différent. Si vous souhaitez appeler vos procédures sans le client tRPC, il existe deux méthodes recommandées :

### Exposez une seule procédure vers l'extérieur

Si vous souhaitez exposer une seule procédure vers l'extérieur, vous cherchez des [appels côté serveur](https://trpc.io/docs/v10/server-side-calls). Cela vous permettrait de créer un point de terminaison API Next.js normal, et de réutiliser la partie résolveur de votre procédure tRPC.

```ts:pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create context and caller
  const ctx = await createTRPCContext({ req, res });
  const caller = appRouter.createCaller(ctx);
  try {
    const { id } = req.query;
    const user = await caller.user.getById(id);
    res.status(200).json(user);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // An error from tRPC occured
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    // Another error occured
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default userByIdHandler;
```

### Exposer chaque procédure en tant que point de terminaison REST

Si vous souhaitez exposer chaque procédure vers l'extérieur, consultez le plugin créer par la communauté [trpc-openapi](https://github.com/jlalmes/trpc-openapi/tree/master). En fournissant des métadonnées supplémentaires à vos procédures, vous pouvez générer une API REST compatible OpenAPI à partir de votre routeur tRPC.

### Ce ne sont que des requêtes HTTP

tRPC communique via HTTP, il est donc également possible d'appeler vos procédures tRPC à l'aide de requêtes HTTP "régulières". Cependant, la syntaxe peut être fastidieuse en raison du [protocole RPC](https://trpc.io/docs/v10/rpc) utilisé par tRPC. Si vous êtes curieux, vous pouvez regarder à quoi ressemblent les demandes et les réponses tRPC dans l'onglet réseau de votre navigateur, mais nous vous suggérons de le faire uniquement à titre d'exercice pédagogique et de vous en tenir à l'une des solutions décrites ci-dessus.

## Comparaison avec un endpoint d'API Next.js

Comparons un endpoint d'API Next.js à une procédure tRPC. Disons que nous voulons récupérer un objet utilisateur de notre base de données et le renvoyer au frontend. Nous pourrions écrire un endpoint d'API Next.js comme ceci :

```ts:pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid id" });
  }

  const examples = await prisma.example.findFirst({
    where: {
      id,
    },
  });

  res.status(200).json(examples);
};

export default userByIdHandler;
```

```ts:pages/users/[id].tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`/api/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);
};
```

Comparez cela à l'exemple tRPC ci-dessus et vous pouvez voir certains des avantages de tRPC :

- Au lieu de spécifier une url pour chaque route, ce qui peut devenir fastidieux à déboguer si vous déplacez quelque chose, votre routeur entier est un objet avec saisie semi-automatique.
- Vous n'avez pas besoin de valider la méthode HTTP utilisée.
- Vous n'avez pas besoin de valider que la requête ou le corps de la requête contient les données correctes dans la procédure, car Zod s'en charge.
- Au lieu de créer une réponse, vous pouvez générer des erreurs et renvoyer une valeur ou un objet comme vous le feriez dans n'importe quelle autre fonction TypeScript.
- L'appel de la procédure sur le frontend fournit l'auto-complétion et la sécurité de typage.

## Extraits de code utiles

Voici quelques extraits de code qui pourraient être utiles.

### Activation de CORS

Si vous avez besoin de consommer votre API à partir d'un domaine différent, par exemple dans un monorepo qui inclut une application React Native, vous devrez peut-être activer CORS :

```ts:pages/api/trpc/[trpc].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import cors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Enable cors
  await cors(req, res);

  // Create and call the tRPC handler
  return createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
  })(req, res);
};

export default handler;
```

### Mises à jour optimistes

Les mises à jour optimistes se produisent lorsque nous mettons à jour l'interface utilisateur avant la fin de l'appel d'API. Cela donne à l'utilisateur une meilleure expérience car il n'a pas à attendre la fin de l'appel d'API pour que l'interface utilisateur reflète le résultat de son action. Cependant, les applications qui accordent une grande importance à l'exactitude des données doivent éviter les mises à jour optimistes car elles ne sont pas une "véritable" représentation de l'état du backend. Vous pouvez en savoir plus sur la [documentation de React Query](https://tanstack.com/query/v4/docs/guides/optimistic-updates).

```tsx
const MyComponent = () => {
  const listPostQuery = api.post.list.useQuery();

  const utils = api.useContext();
  const postCreate = api.post.create.useMutation({
    async onMutate(newPost) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.post.list.cancel();

      // Get the data from the queryCache
      const prevData = utils.post.list.getData();

      // Optimistically update the data with our new post
      utils.post.list.setData(undefined, (old) => [...old, newPost]);

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onError(err, newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.post.list.setData(undefined, ctx.prevData);
    },
    onSettled() {
      // Sync with server once mutation has settled
      utils.post.list.invalidate();
    },
  });
};
```

### Exemple de test d'intégration

Voici un exemple de test d'intégration qui utilise [Vitest](https://vitest.dev) pour vérifier que votre routeur tRPC fonctionne comme prévu, que l'analyseur d'entrée déduit le type correct et que les données renvoyées correspondent à la sortie attendue.

```ts
import { type inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { appRouter, type AppRouter } from "~/server/api/root";
import { expect, test } from "vitest";

test("example router", async () => {
  const ctx = await createInnerTRPCContext({ session: null });
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["example"]["hello"]>;
  const input: Input = {
    text: "test",
  };

  const example = await caller.example.hello(input);

  expect(example).toMatchObject({ greeting: "Hello test" });
});
```

## Ressources utiles

| Ressource                 | Lien                                                    |
| ------------------------- | ------------------------------------------------------- |
| Documentation tRPC        | https://www.trpc.io                                     |
| Un tas d'exemples de tRPC | https://github.com/trpc/trpc/tree/next/examples         |
| Documentation React Query | https://tanstack.com/query/v4/docs/adapters/react-query |
