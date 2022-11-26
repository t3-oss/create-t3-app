---
title: Prisma
description: Verwendung von Prisma
layout: ../../../layouts/docs.astro
lang: de
---

Prisma ist ein ORM für TypeScript, welches dir erlaubt, dein Datenbankschema und Modelle in einer `schema.prisma` Datei zu definieren und dann einen typisierten Client zu generieren, welcher verwendet werden kann, um mit deiner Datenbank von deinem Backend aus zu interagieren.

## Prisma Client

Der Prisma Client wird in `/server/db/client.ts` instanziiert und als globale Variable exportiert (wie vom Prisma-Team als [best practice](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem) empfohlen). Wir stellen den Prisma Client über den [Context](/de/usage/trpc#-servertrpccontextts) bereit und empfehlen den Client aus dem Context zu verwenden anstatt diesen in jeder Datei zu importieren.

## Schema

Du findest die Prisma Schema Datei in `/prisma/schema.prisma`. In dieser Datei definierst du dein Datenbankschema und deine Modelle. Diese Datei wird dafür verwendet den Prisma Client zu generieren.

### Mit NextAuth.js

Wenn du NextAuth.js zusammen mit Prisma auswählst, wird die Schema Datei für dich generiert und mit den empfohlenen Werten für die `User`, `Session`, `Account` und `VerificationToken` Modelle vorbereitet, wie in der [NextAuth.js Dokumentation](https://next-auth.js.org/adapters/prisma) beschrieben.

## Standard Datenbank

Die Standard Datenbank ist eine SQLite Datenbank, welche für die Entwicklung und das schnelle Erstellen eines Proof-of-Concepts sehr gut geeignet ist. Für den Produktivbetrieb wird dies jedoch nicht empfohlen. Du kannst die Datenbank ändern, indem du den `provider` im `datasource` Block auf `postgresql` oder `mysql` änderst und dann die Verbindungs-URL in den Umgebungsvariablen anpasst, um auf deine Datenbank zu zeigen.

## Datenbank befüllen ("Seeding")

["Seeding"](https://www.prisma.io/docs/guides/database/seed-database) ist eine gute Möglichkeit, um deine Datenbank mit Testdaten zu befüllen. Um das Befüllen zu konfigurieren, musst du eine `seed.ts` Datei im `/prisma` Verzeichnis erstellen und dann ein `seed` Script in deine `package.json` Datei einfügen. Du benötigst ebenfalls einen TypeScript Runner, der das Seed-Script ausführen kann. Wir empfehlen [tsx](https://github.com/esbuild-kit/tsx), welcher ein sehr performanter TypeScript Runner ist, der esbuild verwendet und keine ESM-Konfiguration benötigt. `ts-node` oder andere Runner funktionieren ebenfalls.

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

Anschließend kannst du einfach `pnpm db-seed` (oder `npm`/`yarn`) ausführen, um deine Datenbank zu befüllen.

## Nützliche Ressourcen

| Resource                     | Link                                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prisma Docs                  | https://www.prisma.io/docs/                                                                                                                       |
| Prisma GitHub                | https://github.com/prisma/prisma                                                                                                                  |
| NextAuth.JS Prisma Adapter   | https://next-auth.js.org/adapters/prisma                                                                                                          |
| Planetscale Connection Guide | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
