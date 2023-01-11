---
title: Prisma
description: Utilisation de Prisma
layout: ../../../layouts/docs.astro
lang: fr
---

Prisma est un ORM pour TypeScript, qui vous permet de définir votre schéma et vos modèles de base de données dans un fichier `schema.prisma`, puis de générer un client de type sécurisé qui peut être utilisé pour interagir avec votre base de données à partir de votre backend.

## Prisma Client

Situé dans `/server/db.ts`, le client Prisma est instancié en tant que variable globale (cette façon est recommandé comme [meilleure pratique](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem) par l'équipe de Prisma) et exporté pour être utilisé dans vos routes API. Nous incluons le client Prisma dans le [Context](/fr/usage/trpc#-servertrpccontextts) par défaut et recommandons de l'utiliser au lieu de l'importer séparément dans chaque fichier.

## Schéma

Vous trouverez le fichier de schéma Prisma dans `/prisma/schema.prisma`. Ce fichier est l'endroit où vous définissez votre schéma et vos modèles de base de données, et est utilisé lors de la génération du client Prisma.

### Avec NextAuth.js

Lorsque vous sélectionnez NextAuth.js en combinaison avec Prisma, le fichier de schéma est généré et configuré pour vous avec les valeurs recommandées pour les modèles `User`, `Session`, `Account` et `VerificationToken`, conformément à la [documentation de NextAuth .js](https://next-auth.js.org/adapters/prisma).

## Base de données par défaut

La base de données par défaut est une base de données SQLite, idéale pour le développement et la mise en place rapide d'une preuve de concept, mais n'est pas recommandée pour la production. Vous pouvez changer de type de base de données à utiliser en changeant le `provider` dans le bloc `datasource` en `postgresql` ou `mysql`, puis en mettant à jour la chaîne de connexion dans les variables d'environnement pour pointer vers votre base de données.

## Amorçage de votre base de données

[L'amorçage de votre base de données](https://www.prisma.io/docs/guides/database/seed-database) est un excellent moyen de remplir rapidement votre base de données avec des données de test pour vous aider à démarrer. Afin de configurer l'amorçage, vous devrez créer un fichier `seed.ts` dans le répertoire `/prisma`, puis ajouter un script `seed` à votre fichier `package.json`. Vous aurez également besoin d'un exécuteur TypeScript capable d'exécuter le script de départ. Nous recommandons [tsx](https://github.com/esbuild-kit/tsx), qui est un exécuteur TypeScript très performant qui utilise esbuild et ne nécessite aucune configuration ESM, mais `ts-node` ou d'autres exécuteurs le feront fonctionner aussi parfaitement.

```jsonc:package.json
{
  "scripts": {
    "db-seed": "NODE_ENV=development prisma db seed"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

```ts:prisma/seed.ts
import { prisma } from "../src/server/db";

async function main() {
  const id = "cl9ebqhxk00003b600tymydho";
  await prisma.example.upsert({
    where: {
      id,
    },
    create: {
      id,
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

Ensuite, exécutez simplement `pnpm db-seed` (ou `npm`/`yarn`) pour amorcer votre base de données.

## Ressources utiles

| Ressource                          | Lien                                                                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Documentation Prisma               | https://www.prisma.io/docs/                                                                                                                       |
| Prisma GitHub                      | https://github.com/prisma/prisma                                                                                                                  |
| Adaptateur Prisma pour NextAuth.JS | https://next-auth.js.org/adapters/prisma                                                                                                          |
| Guide de connexion à Planetscale   | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
