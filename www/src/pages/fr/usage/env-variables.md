---
title: Variables d'environnement
description: Débuter avec Create T3 App
layout: ../../../layouts/docs.astro
lang: fr
---

Create T3 App utilise [Zod](https://github.com/colinhacks/zod) pour valider votre variables d'environnement a l'exécution _et_ a la génération de l'application en fournissant des fichiers supplémentaires dans le répertoire `env`:

📁 src/env

┣ 📄 client.mjs

┣ 📄 schema.mjs

┣ 📄 server.mjs

Le contenu de ses fichiers peut sembler terrifiant de prime abord, mais ne vous inquiétez pas, ce n'est pas aussi compliqué qu'il y paraît.
Examinons-les un par un et parcourons le processus d'ajout de variables d'environnement.

_TLDR; Si vous désirez ajouter une nouvelle variable d’environnement, vous devez l’ajouter autant dans votre fichier `.env` et la définir dans le validateur: `env/schema.mjs`._

## schema.mjs

C'est le fichier que vous allez modifier. Il contient deux schémas, l'un est pour les variables d'environnement côté serveur et le second est pour le côté client connu sous l'objet `clientEnv`.

```ts:env/schema.mjs
export const serverSchema = z.object({
  // DATABASE_URL: z.string().url(),
});

export const serverEnv = {
  // DATABASE_URL: process.env.DATABASE_URL,
};

export const clientSchema = z.object({
  // NEXT_PUBLIC_WS_KEY: z.string(),
});

export const clientEnv = {
  // NEXT_PUBLIC_WS_KEY: process.env.NEXT_PUBLIC_WS_KEY,
};
```

### Schéma Serveur

Définissez votre schéma de variables d'environnement du côté serveur ici.

Faites attention à ne pas préfixer vos clefs avec `NEXT_PUBLIC`. La validation échouera si vous le faites, afin de vous aider à détecter une configuration non valide.

### Schéma Client

Définissez votre schéma de variables d'environnement du côté client ici.

Pour les exposer au client, vous devez les préfixer avec `NEXT_PUBLIC`. La validation échouera si vous ne le faites pas, afin de vous aider à détecter une configuration non valide.

### Objet clientEnv

Déstructurez `process.env` ici.

Nous avons besoin d'un objet JavaScript avec lequel nous pouvons analyser nos schémas Zod et en raison de la façon dont Next.js gère les variables d'environnement, vous ne pouvez pas déstructurez `process.env` comme un objet régulier. Du coup nous devons le faire manuellement.

TypeScript vous aidera à vous assurer que vous avez entré les clés dans `clientEnv` ainsi que `clientSchema`.

```ts
// ❌ Cela ne fonctionne pas, nous devons le déstructurer manuellement
const schema = z.object({
  NEXT_PUBLIC_WS_KEY: z.string(),
});

const validated = schema.parse(process.env);
```

## server.mjs & client.mjs

C'est ici que la validation se fait et l'export des objets valider. Vous ne devriez pas avoir besoin de modifier ces fichiers.

## Utilisation de variables d'environnement

Lorsque vous souhaitez utiliser vos variables d'environnement, vous pouvez les importer depuis `env/client.mjs` ou `env/server.mjs` selon l'endroit où vous souhaitez les utiliser :

```ts:pages/api/hello.ts
import { env } from "../../env.mjs";

// `env` est totalement typesafe et fournit une autocomplétion
const dbUrl = env.DATABASE_URL;
```

## .env.example

Vu que par défaut le fichier `.env` n’est pas commiter dans votre dépôt de version, nous avons inclus le fichier `.env.example`, dans lequel vous pouvez ajouter une copie du contenu de votre `.env` avec les informations secrètes retirées. Ce n’est pas obligatoire, mais nous recommandons de garder le fichier example a jour, et ce, afin de rendre le démarrage des contributeurs à votre projet, facile.

Certains frameworks et outils de conception, comme Next.js, suggère que vous gardez vos secret dans un fichier `.env.local` et de commiter votre fichier `.env` dans votre projet. Ce n’est pas recommandé, car vous pourriez accidentellement commiter les secret de votre projet. A la place, nous recommandons que vous gardiez vos secret dans le fichier `.env`, et surtout d’etre sur que le fichier `.env` se retrouve dans votre `.gitignore` et de seulement commiter le `.env.example` de votre projet.

## Ajout des variables d’environnement

Pour être sur que la génération de l’application ne puisse jamais finir sans les variables d’environnements nécessaire à votre projet, vous devez les ajouter dans **deux** fichiers :

📄 `.env`: Entrez votre variable d'environnement comme vous le feriez normalement dans un fichier `.env`, c'est-à-dire `CLEF=VALEUR`

📄 `schema.mjs`Ajoutez la logique de validation appropriée pour la variable d'environnement en définissant un schéma Zod, par ex. `CLEF: z.string()`

Facultativement, vous pouvez également garder `.env.example` à jour :

📄 `.env.example`: Entrez votre variable d'environnement,assurez-vous de ne pas inclure la valeur si elle est secrète, par ex. `CLEF=VALEUR` ou `CLEF=`

### Exemple

_Je veux ajouter le jeton de l’API Twitter en tant que variable d’environnement côté serveur_

1. Ajouter la variable d'environnement dans `.env`:

```
TWITTER_API_TOKEN=1234567890
```

2. Ajouter la variable d'environnement dans `schema.mjs`:

```ts
export const serverSchema = z.object({
  // ...
  TWITTER_API_TOKEN: z.string(),
});

export const serverEnv = {
  // ...
  TWITTER_API_TOKEN: process.env.TWITTER_API_TOKEN,
};
```

_**NOTE:** Une chaîne vide est toujours une chaîne, donc `z.string()` acceptera une chaîne vide comme valeur valide. Si vous voulez vous assurer que la variable d'environnement n'est pas vide, vous pouvez utiliser `z.string().min(1)`._

3. facultatif : ajoutez la variable d'environnement à `.env.example`, mais n'incluez pas le jeton

```
TWITTER_API_TOKEN=
```
