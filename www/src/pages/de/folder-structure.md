---
title: Ordnerstruktur
description: Ordnerstruktur einer neu erstellten T3 App
layout: ../../layouts/docs.astro
lang: de
---

Nachfolgend ist die Ordnerstruktur einer neu erstellten T3 App zu sehen, bei der alle Optionen ausgewählt wurden.

Die Beschreibung jedes Ordners gibt an, welchen Zweck dieser erfüllt und ob dieser nur bei ausgewählten Bibliotheken enthalten ist.

```
.
├─ prisma
│  └─ schema.prisma
├─ public
│  └─ favicon.ico
├─ src
│  ├─ env
│  │  ├─ client.mjs
│  │  ├─ schema.mjs
│  │  └─ server.mjs
│  ├─ pages
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  └─ [...nextauth].ts
│  │  │  ├─ trpc
│  │  │  │  └─ [trpc].ts
│  │  │  ├─ examples.ts
│  │  │  └─ restricted.ts
│  │  ├─ _app.tsx
│  │  └─ index.tsx
│  ├─ styles
│  │  └─ globals.css
│  ├─ types
│  │  └─ next-auth.d.ts
│  ├─ utils
│  │  └─ trpc.ts
│  ├─ server
│  │  ├─ common
│  │  │  └─ get-server-auth-session.ts
│  │  ├─ db
│  │  │  └─ client.ts
│  │  └─ trpc
│  │     ├─ router
│  │     │  ├─ _app.ts
│  │     │  ├─ auth.ts
│  │     │  └─ example.ts
│  │     ├─ context.ts
│  │     └─ trpc.ts
├─ .env
├─ .env.example
├─ .eslintrc.json
├─ next-env.d.ts
├─ next.config.mjs
├─ postcss.config.cjs
├─ prettier.config.cjs
├─ tailwind.config.cjs
└─ tsconfig.json
```

### `prisma`

Der `prisma` Ordner enthält die `schema.prisma` Datei, die zur Konfiguration der Datenbankverbindung und des Datenbankschemas verwendet wird. Es ist auch der Ort, um Migrationsdateien und / oder Seed-Skripte zu speichern, wenn sie verwendet werden. Weitere Informationen findest du unter [Verwendung von Prisma](/de/usage/prisma).

<sub>(mit Prisma)</sub>

### `public`

Der `public` Ordner enthält statische Assets, die vom Webserver bereitgestellt werden. Die `favicon.ico` Datei ist ein Beispiel für ein statisches Asset.

### `src/env`

Wird benutzt für die Validierung von Umgebungsvariablen und Typdefinitionen - siehe [Umgebungsvariablen](/de/usage/env-variables).

### `src/pages`

Der `pages` Ordner enthält alle Seiten der Next.js Anwendung. Die `index.tsx` Datei im Root-Verzeichnis von `/pages` ist die Startseite der Anwendung. Die `_app.tsx` Datei wird verwendet, um die Anwendung mit Providern zu umschließen. Weitere Informationen findest du in der [Next.js Dokumentation](https://nextjs.org/docs/basic-features/pages).

#### `src/pages/api`

Der `api` Ordner enthält alle API-Routen der Next.js Anwendung. Die `examples.ts` Datei (mit Prisma) enthält ein Beispiel für eine Route, die das [Next.js API route](https://nextjs.org/docs/api-routes/introduction)-Feature mit Prisma verwendet. Die `restricted.ts` Datei (mit Next-Auth) enthält ein Beispiel für eine Route, die das [Next.js API route](https://nextjs.org/docs/api-routes/introduction)-Feature verwendet und durch [NextAuth.js](https://next-auth.js.org/) geschützt ist.

<sub>(Mit NextAuth.js, tRPC oder tRPC + Prisma)</sub>

#### `src/pages/api/auth/[...nextauth].ts`

Die `[...nextauth].ts` Datei ist die NextAuth.js Authentifizierung Slug Route. Sie wird verwendet, um Authentifizierungsanfragen zu verarbeiten. Weitere Informationen zu NextAuth.js findest du unter [Verwendung von NextAuth.js](/de/usage/next-auth) und [Next.js Dynamic Routes Docs](https://nextjs.org/docs/routing/dynamic-routes) für Informationen zu Catch-All/Slug Routen.

<sub>(mit NextAuth.js)</sub>

#### `src/pages/api/trpc/[trpc].ts`

Die `[trpc].ts` Datei ist der tRPC API-Einstiegspunkt. Sie wird verwendet, um tRPC-Anfragen zu verarbeiten. Weitere Informationen zu dieser Datei findest du unter [tRPC Verwendung](/de/usage/trpc#-pagesapitrpctrpcts) und [Next.js Dynamic Routes Docs](https://nextjs.org/docs/routing/dynamic-routes) für Informationen zu Catch-All/Slug Routen.

<sub>(mit tRPC)</sub>

### `src/server`

Der `server` Ordner wird verwendet um den serverseitigen Code eindeutig von dem clientseitigen Code zu trennen.

<sub>(mit tRPC und/oder Prisma)</sub>

### `src/server/common`

Der `common` Ordner enthält häufig wiederverwendeten serverseitigen Code.

<sub>(mit NextAuth.js + tRPC)</sub>

#### `src/server/common/get-server-auth-session.ts`

Die `get-server-auth-session.ts` Datei wird verwendet, um die NextAuth.js Sitzung serverseitig zu erhalten. Weitere Informationen findest du unter [Verwendung von NextAuth.js](/de/usage/next-auth#verwendung-mit-trpc).

<sub>(mit NextAuth.js + tRPC)</sub>

#### `src/server/db/client.ts`

Die `client.ts` Datei wird verwendet, um den Prisma-Client auf globaler Ebene zu initialisieren. Weitere Informationen findest du unter [Verwendung von Prisma](/de/usage/prisma#prisma-client).

<sub>(mit Prisma)</sub>

### `src/server/trpc`

Der `trpc` Ordner enthält den serverseitigen tRPC-Code.

<sub>(with tRPC)</sub>

#### `src/server/trpc/context.ts`

Die `content.ts` Datei wird verwendet, um den Kontext zu erstellen, der in tRPC-Anfragen verwendet wird. Weitere Informationen findest du unter [Verwendung von tRPC](/de/usage/trpc#-servertrpccontextts).

<sub>(mit tRPC)</sub>

#### `src/server/trpc/trpc.ts`

Die `trpc.ts` Datei wird verwendet, um die Helferfunktionen für die Prozeduren zu exportieren. Weitere Informationen findest du unter [Verwendung von tRPC](/de/usage/trpc#-servertrpctrpcts).

<sub>(mit tRPC)</sub>

### `src/server/trpc/router`

Der `router` Ordner enthält die tRPC-Routen.

<sub>(mit tRPC)</sub>

#### `src/server/trpc/router/_app.ts`

Die `_app.ts` Datei wird verwendet, um tRPC-Routen zusammenzuführen und diese als einzelnen Router sowie die Typdefinitionen zu exportieren. Weitere Informationen findest du unter [Verwendung von tRPC](/de/usage/trpc#-servertrpcrouterts).

<sub>(mit tRPC)</sub>

#### `src/server/trpc/router/auth.ts`

Die `auth.ts´ Datei ist ein Beispiel für eine tRPC-Route, die die `protectedProcedure`-Hilfsfunktion verwendet, um zu demonstrieren, wie eine tRPC-Routen mit NextAuth.js geschützt werden kann.

<sub>(mit NextAuth.js + tRPC)</sub>

#### `src/server/trpc/router/example.ts`

Die `example.ts` Datei ist ein Beispiel für einen tRPC-Router, der die `publicProcedure`-Hilfsfunktion verwendet, um zu demonstrieren, wie eine tRPC-Routen ohne Authentifizierung erstellt werden kann.

<sub>(mit tRPC)</sub>

### `src/styles`

Der `styles` Ordner enthält die globalen Styles der Anwendung.

<sub>(mit Tailwind CSS)</sub>

### `src/types`

Der `types` Ordner wird verwendet, um wiederverwendete Typen oder Typdeklarationen zu speichern.

<sub>(mit NextAuth.js)</sub>

#### `src/types/next-auth.d.ts`

Die `next-auth.d.ts` Datei wird verwendet, um den Standardtyp der NextAuth-Sitzung um die Benutzer-ID zu erweitern. Weitere Informationen findest du unter [Verwendung von NextAuth.js](/de/usage/next-auth#inclusion-of-userid-on-the-session).

<sub>(mit NextAuth.js)</sub>

### `src/utils`

Der `utils` Ordner wird verwendet, um häufig wiederverwendete Hilfsfunktionen zu speichern.

<sub>(mit tRPC)</sub>

#### `src/utils/trpc.ts`

Die `trpc.ts` Datei ist der clientseitige Einstiegspunkt für tRPC. Weitere Informationen findest du unter [Verwendung von tRPC](/de/usage/trpc#-utilstrpcts).

<sub>(mit tRPC)</sub>

### `.env`

Die `.env` Datei wird verwendet, um Umgebungsvariablen bereitzustellen. Weitere Informationen findest du unter [Umgebungsvariablen](/de/usage/env-variables). Diese Datei sollte **nicht** committed werden.

### `.env.example`

Die `.env.example` Datei zeigt Beispiele für Umgebungsvariablen basierend auf den ausgewählten Bibliotheken. Diese Datei sollte **nicht** committed werden.

### `.eslintrc.json`

Die `.eslintrc.json` Datei wird verwendet, um ESLint zu konfigurieren. Weitere Informationen findest du in der [ESLint Dokumentation](https://eslint.org/docs/latest/user-guide/configuring/configuration-files).

### `next-env.d.ts`

Die `next-env.d.ts` Datei stellt sicher, dass die Next.js Typen vom TypeScript-Compiler erkannt werden. **Du solltest sie nicht entfernen oder bearbeiten, da sie jederzeit geändert werden kann.** Weitere Informationen findest du in der [Next.js Dokumentation](https://nextjs.org/docs/basic-features/typescript#existing-projects).

### `next.config.mjs`

Die `next.config.mjs` Datei wird verwendet, um Next.js zu konfigurieren. Weitere Informationen findest du in der [Next.js Dokumentation](https://nextjs.org/docs/api-reference/next.config.js/introduction). Hinweis: Die .mjs Dateiendung wird verwendet, um ESM-Importe zu ermöglichen.

### `postcss.config.cjs`

Die `postcss.config.cjs` Datei wird für die Verwendung von Tailwind PostCSS verwendet. Weitere Informationen findest du in der [Taiwind PostCSS Dokumentation](https://tailwindcss.com/docs/installation/using-postcss).

<sub>(mit Tailwind CSS)</sub>

### `prettier.config.cjs`

Die `prettier.config.cjs` Datei wird verwendet, um Prettier zu konfigurieren und das prettier-plugin-tailwindcss für die Formatierung von Tailwind CSS-Klassen zu verwenden. Weitere Informationen findest du im [Tailwind CSS Blogbeitrag](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier).

<sub>(mit Tailwind CSS)</sub>

### `tsconfig.json`

Die `tsconfig.json` Datei wird verwendet, um TypeScript zu konfigurieren. Einige nicht-Standardwerte, wie `strict mode` wurden aktiviert, um die beste Verwendung von TypeScript für `create-t3-app` und die verwendeten Bibliotheken zu gewährleisten. Weitere Informationen findest du in der [TypeScript Dokumentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) und [Verwendung von TypeScript](/de/usage/typescript).
