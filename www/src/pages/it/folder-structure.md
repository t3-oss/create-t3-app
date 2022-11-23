---
title: Folder Structure
description: Folder structure of a newly scaffolded T3 App
layout: ../../layouts/docs.astro
---

Di seguito è riportata la struttura delle cartelle di un'app T3 appena creata, con tutte le opzioni selezionate.

Più in basso, la descrizione di ciascuna cartella indica il suo scopo e se è inclusa solo con librerie selezionate.

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

La cartella `prisma` contiene il file `schema.prisma` utilizzato per configurare la connessione al database e lo schema del database. È anche la posizione in cui archiviare i file di migrazione e/o gli script di inizializzazione, se utilizzati. Vedi [Utilizzo di Prisma](/it/utilizzo/prisma) per maggiori informazioni.

<sub>(Con Prisma)</sub>

### `public`

La cartella "public" contiene risorse statiche servite dal server web. Il file `favicon.ico` è un esempio di risorsa statica.

### `src/env`

Utilizzato per la convalida delle variabili di ambiente e le definizioni dei tipi - vedere [Variabili d'ambiente](it/utilizzo/variabili-di-ambiente/).

### `src/pages`

La cartella `pages` contiene tutte le pagine dell'applicazione Next.js. Il file `index.tsx` nella directory principale di `/pages` è la home page dell'applicazione. Il file `_app.tsx` viene utilizzato per avvolgere l'applicazione con i provider. Consulta la [documentazione Next.js](https://nextjs.org/docs/basic-features/pages) per ulteriori informazioni.

#### `src/pages/api`

La cartella `api` contiene tutte le route API dell'applicazione Next.js. Il file `examples.ts` (con Prisma) contiene un esempio di percorso che utilizza la funzione [Next.js API route](https://nextjs.org/docs/api-routes/introduction) insieme a Prisma. Il file `restricted.ts` (con Next-Auth) contiene un esempio di percorso che utilizza la funzione [Next.js API route](https://nextjs.org/docs/api-routes/introduction) ed è protetto di [NextAuth.js](https://next-auth.js.org/).

<sub>(Con NextAuth.js, tRPC o tRPC + Prisma)</sub>

#### `src/pages/api/auth/[...nextauth].ts`

Il file `[...nextauth].ts` è il percorso slug di autenticazione NextAuth.js. Viene utilizzato per gestire le richieste di autenticazione. Vedi [Utilizzo di NextAuth.js](utilizzo/next-auth) per ulteriori informazioni su NextAuth.js e [Documentazione sui percorsi dinamici Next.js](https://nextjs.org/docs/routing/dynamic-routes) per informazioni sulle rotte catch-all/slug.

<sub>(con NextAuth.js)</sub>

#### `src/pages/api/trpc/[trpc].ts`

Il file `[trpc].ts` è il punto di ingresso dell'API tRPC. Viene utilizzato per gestire le richieste tRPC. Vedi [utilizzo di tRPC](it/utilizzo/trpc#-pagesapitrpctrpcts) per ulteriori informazioni su questo file e la [Documentazione su Next.js Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes) per informazioni su catturare le rotte/slug.

<sub>(con tRPC)</sub>

### `src/server`

La cartella "server" viene utilizzata per separare chiaramente il codice lato server dal codice lato client.

<sub>(con tRPC e/o Prisma)</sub>

### `src/server/common`

La cartella `common` contiene il codice lato server comunemente riutilizzato.

<sub>(con NextAuth.js + tRPC)</sub>

#### `src/server/common/get-server-auth-session.ts`

Il file `get-server-auth-session.ts` viene utilizzato per ottenere la sessione NextAuth.js sul lato server. Per ulteriori informazioni, consulta [Utilizzo di NextAuth.js](it/utilizzo/next-auth#utilizzo-con-tRPC).

<sub>(con NextAuth.js + tRPC)</sub>

#### `src/server/db/client.ts`

Il file `client.ts` viene utilizzato per istanziare il client Prisma a livello globale. Vedere [Utilizzo di Prisma](utilizzo/prisma#client-prisma) per ulteriori informazioni.

<sub>(con Prisma)</sub>

### `src/server/trpc`

La cartella `trpc` contiene il codice lato server tRPC.

<sub>(con tRPC)</sub>

#### `src/server/trpc/context.ts`

Il file `context.ts` viene utilizzato per creare il contesto utilizzato nelle richieste tRPC. Vedi [utilizzo di tRPC](utilizzo/trpc#-servertrpccontextts) per maggiori informazioni.

<sub>(con tRPC)</sub>

#### `src/server/trpc/trpc.ts`

Il file `trpc.ts` viene utilizzato per esportare gli helper delle procedure. Vedi [usare tRPC](utilizzo/trpc#-servtrpctrpcts) per maggiori informazioni.

<sub>(con tRPC)</sub>

### `src/server/trpc/router`

La cartella `router` contiene i router tRPC.

<sub>(con tRPC)</sub>

#### `src/server/trpc/router/_app.ts`

Il file `_app.ts` viene utilizzato per unire i router tRPC ed esportarli come un singolo router, così come le definizioni dei tipi. Vedi [usare il router trpc](utilizzo/trpc#-servtrpcrouterts) per ulteriori informazioni.

<sub>(con tRPC)</sub>

#### `src/server/trpc/router/auth.ts`

Il file `auth.ts` è un esempio di router tRPC che utilizza l'helper `protecdetProcedure` per dimostrare come proteggere una rotta tRPC con NextAuth.js.

<sub>(con NextAuth.js + tRPC)</sub>

#### `src/server/trpc/router/example.ts`

Il file `example.ts` è un esempio di router tRPC che utilizza l'helper `publicProcedure` per dimostrare come creare una rotta tRPC pubblica.

<sub>(con tRPC)</sub>

### `src/styles`

La cartella `styles` contiene gli stili globali dell'applicazione.

<sub>(con Tailwind CSS)</sub>

### `src/types`

La cartella `types` viene utilizzata per memorizzare i tipi riutilizzati o le dichiarazioni di tipo.

<sub>(con NextAuth.js)</sub>

#### `src/types/next-auth.d.ts`

Il file `next-auth.d.ts` viene utilizzato per estendere il tipo di sessione predefinito NextAuth per includere l'ID utente. Per ulteriori informazioni, consulta [Utilizzo di NextAuth.js](utilizzo/next-auth#inclusione-di-user.id-nella-sessione).

<sub>(con NextAuth.js)</sub>

### `src/utils`

La cartella `utils` viene utilizzata per memorizzare le funzioni di utilità comunemente riutilizzate.

<sub>(con tRPC)</sub>

#### `src/utils/trpc.ts`

Il file `trpc.ts` è il punto di accesso front-end a tRPC. Vedi [utilizzo di tRPC](usage/trpc#-utilstrpcts) per maggiori informazioni.

<sub>(con tRPC)</sub>

### `.env`

Il file `.env` viene utilizzato per memorizzare le variabili di ambiente. Vedere [Variabili d'ambiente](usage/env-variables) per ulteriori informazioni. Questo file **non** dovrebbe essere inserito nella cronologia di git.

### `.env.example`

Il file `.env.example` mostra variabili d'ambiente di esempio basate sulle librerie scelte. Questo file dovrebbe essere impegnato nella cronologia di git.

### `.eslintrc.json`

Il file `.eslintrc.json` viene utilizzato per configurare ESLint. Vedere [ESLint Docs](https://eslint.org/docs/latest/user-guide/configuring/configuration-files) per ulteriori informazioni.

### `next-env.d.ts`

Il file `next-env.d.ts` garantisce che i tipi Next.js vengano rilevati dal compilatore TypeScript. **Non dovresti rimuoverlo o modificarlo poiché può cambiare in qualsiasi momento.** Vedi [Next.js Docs](https://nextjs.org/docs/basic-features/typescript#existing-projects) per ulteriori informazioni informazione.

### `next.config.mjs`

Il file `next.config.mjs` viene utilizzato per configurare Next.js. Vedere [Next.js Docs](https://nextjs.org/docs/api-reference/next.config.js/introduction) per ulteriori informazioni. Nota: l'estensione .mjs viene utilizzata per consentire le importazioni ESM.

### `postcss.config.cjs`

Il file `postcss.config.cjs` viene utilizzato per l'utilizzo di Tailwind PostCSS. Consulta [Taiwind PostCSS Docs](https://tailwindcss.com/docs/installation/using-postcss) per ulteriori informazioni.

<sub>(con Tailwind CSS)</sub>

### `prettier.config.cjs`

Il file `prettier.config.cjs` viene utilizzato per configurare Prettier in modo da includere il prettier-plugin-tailwindcss per la formattazione delle classi CSS di Tailwind. Consulta il [post del blog CSS di Tailwind](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) per ulteriori informazioni.

<sub>(con Tailwind CSS)</sub>

### `tsconfig.json`

Il file `tsconfig.json` viene utilizzato per configurare TypeScript. Alcuni non predefiniti, come `strict mode`, sono stati abilitati per garantire il miglior utilizzo di TypeScript per create-t3-app e le sue librerie. Vedere [Documentazione TypeScript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) o [Utilizzo TypeScript](usage/typescript) per ulteriori informazioni.