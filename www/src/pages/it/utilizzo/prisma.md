---
title: Prisma
description: Usage of Prisma
layout: ../../../layouts/docs.astro
---

Prisma è un ORM per TypeScript, che ti consente di definire lo schema e i modelli del tuo database in un file `schema.prisma` e quindi generare un client indipendente dai tipi che può essere utilizzato per interagire con il tuo database dal tuo back-end.

## Client Prisma

Situato in `/server/db/client.ts`, Prisma Client viene istanziato come variabile globale (come raccomandato come [best practice](https://www.prisma.io/docs/guides/database/troubleshooting-orm /help-articles/nextjs-prisma-client-dev-practices#problem) dal team di Prisma) ed esportato per essere utilizzato nei percorsi API. Includiamo Prisma Client in [Context](/it/usage/trpc#-servertrpccontextts) per impostazione predefinita e consigliamo di utilizzarlo invece di importarlo separatamente in ciascun file.

## Schema

Troverai il file dello schema Prisma in `/prisma/schema.prisma`. Questo file è il punto in cui definisci lo schema e i modelli del database e viene utilizzato durante la generazione del client Prisma.

### Con NextAuth.js

Quando selezioni NextAuth.js in combinazione con Prisma, il file dello schema viene generato e configurato per te con i valori consigliati per i modelli `User`, `Session`, `Account` e `VerificationToken`, come da [documentazione NextAuth .js](https://next-auth.js.org/adapters/prisma).

## Database predefinito

Il database predefinito è un database SQLite, ottimo per lo sviluppo e per creare rapidamente una prova di concetto, ma non è consigliato per la produzione. Puoi modificare il database da utilizzare modificando il `provider` nel blocco `datasource` in `postgresql` o `mysql` e quindi aggiornando la stringa di connessione all'interno delle variabili di ambiente in modo che punti al tuo database.

## Seeding del database

[Seminare il tuo database](https://www.prisma.io/docs/guides/database/seed-database) è un ottimo modo per popolare rapidamente il tuo database con dati di test per aiutarti a iniziare. Per configurare il seeding, dovrai creare un file `seed.ts` nella directory `/prisma`, quindi aggiungere uno script `seed` al tuo file `package.json`. Avrai anche bisogno di un runner TypeScript in grado di eseguire lo script seed. Consigliamo [tsx](https://github.com/esbuild-kit/tsx), che è un corridore TypeScript molto performante che usa esbuild e non richiede alcuna configurazione ESM, ma `ts-node` o altri giratori andranno bene.

```jsonc:pacchetto.json
{
  "scripts": {
    "db-seed": "NODE_ENV=development prisma db seed"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

```ts:prisma/seme.ts
import { prisma } from "../src/server/db/client";

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

Quindi, basta eseguire `pnpm db-seed` (o `npm`/`yarn`) per eseguire il seeding del database.

## Risorse utili

| Risorsa | Collegamento |
| ---------------------------- | -------------------------------------------------- -------------------------------------------------- --------------------------------------------- |
| Prisma Documentazione | https://www.prisma.io/docs/ |
| Prisma GitHub | https://github.com/prisma/prisma |
| Adattatore Prisma NextAuth.JS | https://next-auth.js.org/adapters/prisma |
| Guida alla connessione su scala planetaria | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |