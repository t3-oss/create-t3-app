---
title: Prisma
description: Bruk av Prisma
layout: ../../../layouts/docs.astro
lang: no
---

Prisma er en ORM (Object Relational Mapper) for TypeScript, som gir deg muligheten til å definere databasens skjema og modeller i en schema.prisma-fil. Deretter genereres en typesikker klient som kan brukes til å kommunisere med databasen din fra backend. Dette gir en enklere og mer sikker måte å utvikle databaserelaterte applikasjoner med TypeScript på.

## Prisma Client

Prisma-klienten blir instansiert i `/server/db.ts` og eksporteres som en global variabel. Som anbefalt av Prisma-teamet som [beste praksis](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem). Vi angir, som standard, Prisma-klienten i [context](/no/usage/trpc#-serverapitrpcts). Vi anbefaler å bruke klienten via konteksten i stedet for å importere klienten i hver fil.

## Skjema

Prisma-skjemafilen finner du i `/prisma/schema.prisma`. I denne filen definerer du databasens skjema og modeller. Denne filen brukes til å generere Prisma-klienten.

### Med NextAuth.js

Hvis du velger å bruke NextAuth.js sammen med Prisma, vil skjemafilen bli generert for deg og satt opp med de anbefalte verdiene for modellene `User`, `Session`, `Account` og `VerificationToken` i henhold til [NextAuth. js-dokumentasjonen](https://next-auth.js.org/adapters/prisma).

## Standard Database

Standarddatabasen er en SQLite-database, som er meget godt egnet for utvikling og rask oppretting av et proof-of-concept. Imidlertid anbefaler vi ikke å bruke SQLite i produksjonsmiljøer. Du kan endre databasen ved å endre `provider` i `datasource`-blokken til `postgresql` eller `mysql` og deretter justere URL for database i miljøvariablene slik at den peker på databasen din.

## Fyll Databasen ("Seeding")

["Seeding"](https://www.prisma.io/docs/guides/database/seed-database) er en god måte å fylle databasen med testdata. For å konfigurere fyllingen må du lage en `seed.ts`-fil i `/prisma`-katalogen og deretter legge inn et `seed`-skript i `package.json`-filen. Du trenger også en TypeScript runner som kan kjøre startskriptet. Vi anbefaler [tsx](https://github.com/esbuild-kit/tsx) som er en meget effektiv TypeScript-runner som bruker esbuild og ikke trenger noen ESM-konfigurasjon. `ts-node` eller andre runners vil også fungere.

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

Deretter kan du kjøre `pnpm db-seed` (eller `npm`/`yarn`) for å fylle inn databasen.

## Nyttige Ressurser

| Ressurser                         | Link                                                                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prisma Dokumentasjon              | https://www.prisma.io/docs/                                                                                                                       |
| Prisma GitHub                     | https://github.com/prisma/prisma                                                                                                                  |
| Prisma Migrate Playground         | https://playground.prisma.io/guides                                                                                                               |
| NextAuth.JS Prisma Adapter        | https://next-auth.js.org/adapters/prisma                                                                                                          |
| Planetscale Tilkoblingsveiledning | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
