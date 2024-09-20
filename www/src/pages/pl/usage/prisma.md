---
title: Prisma
description: Korzystanie z Prismy
layout: ../../../layouts/docs.astro
lang: pl
---

Prisma to ORM dla TypeScripta, który pozwala na definiowanie schematu bazy danych i modeli w pliku `schema.prisma`, a następnie generuje klikenta będącego typesafe, którego wykorzystasz w interakcjach z bazą danych ze swojego backendu.

## Prisma Client

Zlokalizowany w pliku `src/server/db.ts`, Prisma Client to globalna zmienna (tak jak rekomendowane na stronie z [najlepszymi sposobami](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem) przez zespół Prismy) wyeksportowana i gotowa do użycia w twoich route'ach API. Prisma Client dołączany jest przez nas w [kontekście tRPC](/en/usage/trpc#-serverapitrpcts). Polecamy tą metodę, zamiast importowania go osobno w każdym pliku.

## Schema (Schemat)

Znajdziesz schemat Prismy w pliku `/prisma/schema.prisma`. Plik ten to miejsce, gdzie definiuje się schemat bazy danych i modele. Jest on także wykorzystywany podczas generowania Prisma Clienta.

### Z NextAuth.js

Jeżeli wybierzesz NextAuth.js w połączeniu z Prismą, plik shcematu generowany jest wraz z rekomendowanymi wartościami dla modeli `User`, `Session`, `Account`, czy też `VerificationToken` - tak jak opisano to w [dokumentacji NextAuth.js](https://next-auth.js.org/adapters/prisma).

## Domyślna Baza Danych

Domyślna baza danych to baza SQLite, która jest znakomita do szybkiego pisania aplikacji, takich jak "weryfikacja konceptu" ("proof-of-concept"), lecz nie jest ona polecana do pisania produkcyjnych wersji projektów. Typ bazy danych zmienić możesz poprzez edycję pola `provider` w bloku `database`, na `postgresql` lub `mysql`. Następnie, aktualizując string połączenia z bazą w pliku `.env` na taki, który skieruje Prismę do twojej bazy danych.

## Seedowanie Bazy Danych

[Seedowanie bazy danych](https://www.prisma.io/docs/guides/database/seed-database) to dobry sposób na szybkie uzupełnienie bazy danych testową zawartością. Aby rozpocząć seedowanie, będziesz musiał stworzyć plik `seed.ts` w folderze `/prisma`, a następnie dodać skrypt `seed` do pliku `package.json`. Będziesz musiał także skorzystać z jakiegoś środowiska uruchomieniowego dla TypeScripta. Polecamy [tsx](https://github.com/esbuild-kit/tsx), który jest bardzo szybkim środowiskiem korzystającym z esbuilda i niewymagającym żadnej konfiguracji ESM. Runnery, takie jak `ts-node`, także zadziałają.

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
import { db } from "../src/server/db/client";

async function main() {
  const id = "cl9ebqhxk00003b600tymydho";
  await db.example.upsert({
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
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
```

Następnie uruchom po prostu `bun db-seed` (lub `npm`/`yarn`) aby wykonać seedowanie bazy danych.

## Przydatne Zasoby

| Zasób                             | Link                                                                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dokumentacja Prismy               | https://www.prisma.io/docs/                                                                                                                       |
| GitHub Prismy                     | https://github.com/prisma/prisma                                                                                                                  |
| Prisma Migrate Playground         | https://playground.prisma.io/guides                                                                                                               |
| Adapter NextAuth.JS dla Prismy    | https://next-auth.js.org/adapters/prisma                                                                                                          |
| Poradnik Połączenia z PlanetScale | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
