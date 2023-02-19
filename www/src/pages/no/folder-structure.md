---
title: Mappestruktur
description: Mappestrukturen til en nylig opprettet T3 App
layout: ../../layouts/docs.astro
lang: no
---

Det som følger er mappestrukturen til en nylig opprettet T3-app, med alle alternativer valgt.

Lenger nede angis hver mappebeskrivelse formålet med mappen, og om den kun er inkludert i utvalgte biblioteker.

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
├─ .eslintrc.cjs
├─ next-env.d.ts
├─ next.config.mjs
├─ postcss.config.cjs
├─ prettier.config.cjs
├─ tailwind.config.cjs
└─ tsconfig.json
```

### `prisma`

`prisma`-mappen inneholder `schema.prisma`-filen som brukes til å konfigurere databasetilkoblingen og databaseskjemaet. Det er også stedet for å lagre migreringsfiler og/eller _seedscript_, dersom de brukes. Se [Bruk av Prisma](/no/usage/prisma) for mer informasjon.

<sub>(Med Prisma)</sub>

### `public`

`public`-mappen inneholder statiske ressurser som betjenes av _webserveren_. `favicon.ico`-filen er et eksempel på en statisk ressurs.

### `src/env`

Brukes for validering av miljøvariabler og typedefinisjoner - se [Miljøvariabler](usage/env-variables).

### `src/pages`

`pages`-mappen inneholder alle sidene til Next.js-applikasjonen. `index.tsx`-filen i rotkatalogen til `/pages` er hjemmesiden til applikasjonen. Filen `_app.tsx` brukes til å pakke applikasjonen sammen med _providers_. Se [Next.js-dokumentasjon](https://nextjs.org/docs/basic-features/pages) for mer informasjon.

#### `src/pages/api`

Mappen `api` inneholder alle API-rutene til Next.js-applikasjonen. Filen `examples.ts` (med Prisma) inneholder et eksempel på en rute som bruker [Next.js API-rute](https://nextjs.org/docs/api-routes/introduction)-funksjonaliteten sammen med Prisma. `restricted.ts`-filen (med Next-Auth) inneholder et eksempel på en rute som bruker [Next.js API-rute](https://nextjs.org/docs/api-routes/introduction)-funksjonaliteten, og er beskyttet av [NextAuth.js](https://next-auth.js.org/).

<sub>(Med NextAuth.js, tRPC eller tRPC + Prisma)</sub>

#### `src/pages/api/auth/[...nextauth].ts`

`[...nextauth].ts`-filen er autentiseringsslug-ruten for NextAuth.js. Den brukes til å håndtere autentiseringsforespørsler. Se [Bruk av NextAuth.js](usage/next-auth) for mer informasjon om NextAuth.js, og [Next.js Dynamic Routes Docs](https://nextjs.org/docs/routing/dynamic-routes) for informasjon på catch-all/slug-ruter.

<sub>(med NextAuth.js)</sub>

#### `src/pages/api/trpc/[trpc].ts`

`[trpc].ts`-filen er inngangspunktet for tRPC-APIet. Den brukes til å håndtere tRPC-forespørsler. Se [Bruk av tRPC](usage/trpc#-pagesapitrpctrpcts) for mer informasjon om denne filen, og [Next.js Dynamic Routes Docs](https://nextjs.org/docs/routing/dynamic-routes) for informasjon om catch-all/slug-ruter.

<sub>(med tRPC)</sub>

### `src/server`

`server`-mappen brukes til å tydelig skille serverside-kode fra klientside-kode.

<sub>(med tRPC og/eller Prisma)</sub>

### `src/server/common`

`common`-mappen inneholder ofte gjenbrukt kode på serversiden.

<sub>(med NextAuth.js + tRPC)</sub>

#### `src/server/common/get-server-auth-session.ts`

`get-server-auth-session.ts`-filen brukes til å hente NextAuth.js-sesjonen på serversiden. Se [Bruk av NextAuth.js](usage/next-auth#usage-with-trpc) for mer informasjon.

<sub>(med NextAuth.js + tRPC)</sub>

#### `src/server/db/client.ts`

`client.ts`-filen brukes til å instansiere Prisma-klienten globalt. Se [Bruk av Prisma](usage/prisma#prisma-client) for mer informasjon.

<sub>(med Prisma)</sub>

### `src/server/trpc`

`trpc`-mappen inneholder tRPC serverside-koden.

<sub>(med tRPC)</sub>

#### `src/server/trpc/context.ts`

`context.ts`-filen brukes til å lage konteksten som brukes i tRPC-forespørsler. Se [Bruk av tRPC](usage/trpc#-servertrpccontextts) for mer informasjon.

<sub>(med tRPC)</sub>

#### `src/server/trpc/trpc.ts`

`trpc.ts`-filen brukes til å eksportere prosedyrehjelpere. Se [Bruk av tRPC](usage/trpc#-servertrpctrpcts) for mer informasjon.

<sub>(med tRPC)</sub>

### `src/server/trpc/router`

`router`-mappen inneholder tRPC-ruterne.

<sub>(med tRPC)</sub>

#### `src/server/trpc/router/_app.ts`

`_app.ts`-filen brukes til å slå sammen tRPC-rutere og eksportere dem som en enkelt ruter, i tillegg til typedefinisjonene. Se [Bruk av tRPC](usage/trpc#-servertrpcrouterts) for mer informasjon
på.

<sub>(med tRPC)</sub>

#### `src/server/trpc/router/auth.ts`

`auth.ts`-filen er et eksempel på en tRPC-ruter som bruker `protectedProcedure`-hjelperen for å demonstrere hvordan man beskytter en tRPC-rute med NextAuth.js.

<sub>(med NextAuth.js + tRPC)</sub>

#### `src/server/trpc/router/example.ts`

`example.ts`-filen er et eksempel på en tRPC-ruter som bruker `publicProcedure`-hjelperen for å demonstrere hvordan man oppretter en offentlig tRPC-rute.

<sub>(med tRPC)</sub>

### `src/styles`

`stiler`-mappen inneholder det globale stilsettet til applikasjonen.

<sub>(med Tailwind CSS)</sub>

### `src/types`

`types`-mappen brukes til å lagre gjenbrukte typer eller typedeklarasjoner.

<sub>(med NextAuth.js)</sub>

#### `src/types/next-auth.d.ts`

`next-auth.d.ts`-filen brukes til å utvide standardsesjonstypen til NextAuth for å inkludere _user ID_. Se [Bruk av NextAuth.js](usage/next-auth#inclusion-of-userid-on-the-session) for mer informasjon.

<sub>(med NextAuth.js)</sub>

### `src/utils`

`utils`-mappen brukes til å lagre ofte gjenbrukte verktøyfunksjoner.

<sub>(med tRPC)</sub>

#### `src/utils/trpc.ts`

`trpc.ts`-filen er frontendinngangspunktet til tRPC. Se [Bruk av tRPC](usage/trpc#-utilstrpcts) for mer informasjon.

<sub>(med tRPC)</sub>

### `.env`

`.env`-filen brukes til å lagre miljøvariabler. Se [Miljøvariabler](usage/env-variables) for mer informasjon. Denne filen skal **ikke** _commites_ til git-historikk.

### `.env.example`

`.env.example`-filen viser noen eksempler på miljøvariabler basert på valgte bibliotek. Denne filen skal _commites_ til git-historikk.

### `.eslintrc.cjs`

`.eslintrc.cjs`-filen brukes til å konfigurere ESLint. Se [ESLint Docs](https://eslint.org/docs/latest/user-guide/configuring/configuration-files) for mer informasjon.

### `neste-env.d.ts`

`next-env.d.ts`-filen sikrer at Next.js-typer blir plukket opp av TypeScript-kompilatoren. **Du bør ikke fjerne den eller redigere den, da den kan endres når som helst.** Se [Next.js Docs](https://nextjs.org/docs/basic-features/typescript#existing-projects) for mer informasjon.

### `neste.config.mjs`

`next.config.mjs`-filen brukes til å konfigurere Next.js. Se [Next.js Docs](https://nextjs.org/docs/api-reference/next.config.js/introduction) for mer informasjon. Merk: .mjs-utvidelsen brukes for å tillate ESM-import.

### `postcss.config.cjs`

`postcss.config.cjs`-filen er for bruk av Tailwind PostCSS. Se [Tailwind PostCSS Docs](https://tailwindcss.com/docs/installation/using-postcss) for mer informasjon.

<sub>(med Tailwind CSS)</sub>

### `prettier.config.cjs`

`prettier.config.cjs`-filen brukes til å konfigurere Prettier slik at prettier-plugin-tailwindcss inkluderes for formatering av Tailwind CSS-klasser. Se [Tailwind CSS-blogginnlegget](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) for mer informasjon.

<sub>(med Tailwind CSS)</sub>

### `tsconfig.json`

Filen `tsconfig.json` brukes til å konfigurere TypeScript. Noen ikke-standardinnstillinger, som for eksempel `strict mode`, har blitt aktivert for å sikre best mulig bruk av TypeScript i create-t3-app og tilhørende biblioteker. Se [TypeScript Docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) eller [TypeScript Usage](usage/typescript) for mer informasjon.
