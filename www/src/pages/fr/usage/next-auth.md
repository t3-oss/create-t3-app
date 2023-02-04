---
title: NextAuth.js
description: Utilisation de NextAuth.js
layout: ../../../layouts/docs.astro
lang: fr
---

Lorsque vous souhaitez un système d'authentification dans votre application Next.js, NextAuth.js est une excellente solution pour apporter la sécurité sans avoir à le construire vous-même. Il vient avec une longue liste de fournisseurs pour ajouter rapidement de l'authentification OAuth et fournit des adaptateurs pour de nombreuses bases de données et ORM.

## Context Provider

Dans le point d'entrée de votre application, vous verrez que votre application est encapsulée dans un [SessionProvider](https://next-auth.js.org/getting-started/client#sessionprovider) :

```tsx:pages/_app.tsx
<SessionProvider session={session}>
  <Component {...pageProps} />
</SessionProvider>
```

Ce fournisseur de contexte permet à votre application d'accéder aux données de session de n'importe où dans votre application, sans avoir à les transmettre en tant que props :

```tsx:pages/users/[id].tsx
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  if (!session) {
    // Gérer l'état non authentifié, ex: le rendu d'un composant SignIn
    return <SignIn />;
  }

  return <p>Welcome {session.user.name}!</p>;
};
```

## Récupérer la session côté serveur

Parfois, vous souhaiterez demander la session côté serveur. Pour ce faire, prérécupérez la session à l'aide du helper `getServerAuthSession` fournie par `create-t3-app` et transmettez-le au client à l'aide de `getServerSideProps` :

```tsx:pages/users/[id].tsx
import { getServerAuthSession } from "../server/auth";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

const User = () => {
  const { data: session } = useSession();
  // NOTE: `session` n'aura pas de chargement puisqu'il est déjà prélecturer sur le serveur

  ...
}
```

## Inclusion de `user.id` dans la Session

Create T3 App est configuré pour utiliser le [session callback](https://next-auth.js.org/configuration/callbacks#session-callback) dans la configuration NextAuth.js pour inclure l'ID de l'utilisateur dans le objet "session".

```ts:pages/api/auth/[...nextauth].ts
callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
```

Ceci est couplé avec un fichier de déclaration de type pour s'assurer que `user.id` est typé lors de l'accès à l'objet `session`. En savoir plus sur [`Module Augmentation`](https://next-auth.js.org/getting-started/typescript#module-augmentation) sur la documentation de NextAuth.js.

```ts:types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
```

Le même modèle peut être utilisé pour ajouter toute autre donnée à l'objet `session`, comme un champ `role`, mais **ne doit pas être utilisé à mauvais escient pour stocker des données sensibles** sur le client.

## Utilisation avec tRPC

Lorsque vous utilisez NextAuth.js avec tRPC, vous pouvez créer des procédures réutilisables et protégées à l'aide de [middleware](https://trpc.io/docs/v10/middlewares). Cela vous permet de créer des procédures accessibles uniquement aux utilisateurs authentifiés. `create-t3-app` configure tout cela pour vous, vous permettant d'accéder facilement à l'objet de session dans des procédures authentifiées.

Cela se fait en deux étapes :

1. Récupérez la session à partir des en-têtes de requête à l'aide de la fonction [`getServerSession`](https://next-auth.js.org/configuration/nextjs#getServerSession). Ne vous inquiétez pas, cette fonction est sûre à utiliser - le nom inclut "unstable" uniquement parce que l'implémentation de l'API peut changer à l'avenir. L'avantage d'utiliser `getServerSession` au lieu de `getSession` est qu'il s'agit d'une fonction côté serveur uniquement et qu'elle ne déclenche pas d'appels de récupération inutiles. `create-t3-app` crée une fonction d'assistance qui résume cette API particulière.

```ts:server/auth.ts
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await getServerSession(ctx.req, ctx.res, nextAuthOptions);
};
```

En utilisant cette fonction d'assistance, nous pouvons récupérer la session et la transmettre au contexte tRPC :

```ts:server/api/trpc.ts
import { getServerAuthSession } from "../auth";

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });
  return await createContextInner({
    session,
  });
};
```

2. Créez un middleware tRPC qui vérifie si l'utilisateur est authentifié. Nous utilisons ensuite le middleware dans une `protectedProcedure`. Tout appelant à ces procédures doit être authentifié, sinon une erreur sera générée qui pourra être gérée de manière appropriée par le client.

```ts:server/api/trpc.ts
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // ajouter `session` comme non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
```

L'objet de session est une représentation légère et minimale de l'utilisateur et ne contient que quelques champs. Lorsque vous utilisez les `protectedProcedures`, vous avez accès à l'identifiant de l'utilisateur qui peut être utilisé pour extraire plus de données de la base de données.

```ts:server/api/routers/user.ts
const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),
});
```

## Utilisation avec Prisma

Faire fonctionner NextAuth.js avec Prisma nécessite beaucoup de [configuration initiale](https://next-auth.js.org/adapters/models/). `create-t3-app` gère tout cela pour vous, et si vous sélectionnez à la fois Prisma et NextAuth.js, vous obtiendrez un système d'authentification entièrement fonctionnel avec tous les modèles requis préconfigurés. Nous démarrons votre application avec un fournisseur Discord OAuth préconfiguré, que nous avons choisi car c'est l'un des plus faciles à démarrer - fournissez simplement vos jetons dans le `.env` et vous êtes prêt à partir. Cependant, vous pouvez facilement ajouter d'autres fournisseurs en suivant la [documentation NextAuth.js](https://next-auth.js.org/providers/). Notez que certains fournisseurs exigent que des champs supplémentaires soient ajoutés à certains modèles. Nous vous recommandons de lire la documentation du fournisseur que vous souhaitez utiliser pour vous assurer que vous disposez de tous les champs obligatoires.

### Ajout de nouveaux champs à vos modèles

Lors de l'ajout de nouveaux champs à l'un des modèles `User`, `Account`, `Session` ou `VerificationToken` (il vous suffira très probablement de modifier le modèle `User` seulement), vous devez garder à l'esprit que l'[Adaptateur Prisma](https://next-auth.js.org/adapters/prisma) crée automatiquement des champs sur ces modèles lorsque de nouveaux utilisateurs s'inscrivent et se connectent. Par conséquent, lors de l'ajout de nouveaux champs à ces modèles, vous devez leur fournir des valeurs par défaut, car l'adaptateur n'a pas connaissance de ces champs.

Si, par exemple, vous souhaitez ajouter un `role` au modèle `User`, vous devrez fournir une valeur par défaut au champ `role`. Cela se fait en ajoutant une valeur `@default` au champ `role` dans le modèle `User` :

```diff:prisma/schema.prisma
+ enum Role {
+   USER
+   ADMIN
+ }

  model User {
    ...
+   role Role @default(USER)
  }
```

## Utilisation avec le middleware Next.js

Utilisation de NextAuth.js avec le middleware Next.js [nécessite l'utilisation de la stratégie de session JWT](https://next-auth.js.org/configuration/nextjs#caveats) pour l'authentification. En effet, le middleware ne peut accéder au cookie de session que s'il s'agit d'un JWT. Par défaut, Create T3 App est configuré pour utiliser la stratégie de base de données **default**, en combinaison avec Prisma comme adaptateur de base de données.

## Configuration du DiscordProvider par défaut

1. Rendez-vous dans [la section Applications du portail des développeurs Discord](https://discord.com/developers/applications), et cliquez sur "New Application"
1. Dans le menu des paramètres, allez dans "OAuth2 => General"

- Copiez l'ID client et collez-le dans `DISCORD_CLIENT_ID` dans `.env`.
- Sous Client Secret, cliquez sur "Reset Secret" et copiez cette chaîne de caractères dans `DISCORD CLIENT_SECRET` dans `.env`. Soyez prudent car vous ne pourrez plus voir ce secret et le réinitialiser entraînera l'expiration du secret existant.
- Cliquez sur "Add Redirect" et collez `<app url>/api/auth/callback/discord` (exemple pour le développement local : <code class="break-all">http://localhost:3000/api/auth/rappel/discord</code>)
- Enregistrez vos modifications
- Il est possible, mais non recommandé, d'utiliser la même application Discord pour le développement et la production. Vous pouvez également envisager [moquer le fournisseur](https://github.com/trpc/trpc/blob/main/examples/next-prisma-websockets-starter/src/pages/api/auth/%5B...nextauth%5D.ts) pendant le développement.

## Ressources utiles

| Ressource                         | Lien                                    |
| --------------------------------- | --------------------------------------- |
| Documentation NextAuth.js         | https://next-auth.js.org/               |
| NextAuth.js GitHub                | https://github.com/nextauthjs/next-auth |
| tRPC Kitchen Sink - with NextAuth | https://kitchen-sink.trpc.io/next-auth  |
