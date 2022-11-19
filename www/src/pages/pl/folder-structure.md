---
title: Struktura projektu
description: Struktura projektu nowej aplikacji T3
layout: ../../layouts/docs.astro
lang: pl
---

Poniżej przedstawiona jest struktura projektu nowej aplikacji T3, zawierającej wszystkie możliwe opcje instalacji.

Poniżej diagramu znajdują się opisy każdego folderu wraz z jego celem oraz informacją, czy zawarty jest tylko po wybraniu danej biblioteki.

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

Folder `prisma` zawiera plik `schema.prisma`, który używany jest do konfiguracji połączenia z bazą danych i struktury tej bazy. Jest to także miejsce, w którym przechowywać można pliki migracji i/lub skrypty "seedowania" (jeżeli z nich korzystasz). Po więcej informacji, zobacz [korzystanie z Prismy](/pl/usage/prisma).

<sub>(Z Prismą)</sub>

### `public`

Folder `public` zawiera zasoby statyczne, które "serwowane" są przez serwer webowy. Plik `favicon.ico` jest przykładem jednego z takich zasobów.

### `src/env`

Używany do walidacji zmiennych środowiskowych i definiowania ich typów - zobacz [zmienne środowiskowe](/pl/usage/env-variables).

### `src/pages`

Folder `pages` zawiera wszystkie strony aplikacji Next.js. Plik `index.tsx` w głównym folderze zawierającym folder `/pages` to strona główna twojej aplikacji. Plik `_app.tsx` dostarcza aplikacji odpowiednie "providery". Po więcej informacji, zobacz [dokumentację Next.js](https://nextjs.org/docs/basic-features/pages).

#### `src/pages/api`

Folder `api` zawiera wszystkie API route'y aplikacji Next.js. Plik `examples.ts` (z Prismą) zawiera przykład takiego route'a korzystającego z funkcji [Next.js API route](https://nextjs.org/docs/api-routes/introduction) oraz z Prismy. Plik `restricted.ts` (z Next-Auth) zawiera przykład route'a korzystającego z funkcji [Next.js API route](https://nextjs.org/docs/api-routes/introduction) i jest on chroniony przez [NextAuth.js](https://next-auth.js.org/).

<sub>(Z NextAuth.js, tRPC lub tRPC + Prisma)</sub>

#### `src/pages/api/auth/[...nextauth].ts`

Plik `[...nextauth].ts` jest slug routem używanym do uwierzytelniania poprzez NextAuth.js. Pomaga on przetwarzać zapytania o uwierzytelnianie. Po więcej informacji o kolejno NextAuth.js i slug route'ach, zobacz [korzystanie z NextAuth.js](/pl/usage/next-auth) oraz [dokumentację dynamicznych route'ów Next.js](https://nextjs.org/docs/routing/dynamic-routes).

<sub>(Z NextAuth.js)</sub>

#### `src/pages/api/trpc/[trpc].ts`

Plik `[trpc].ts` to punkt wejścia dla API (tRPC). Pomafa on przetwarzać zapytania wykonane z tRPC. Po więcej informacji o kolejno tRPC i slug route'ach, zobacz [korzystanie z tRPC](/pl/usage/trpc#-pagesapitrpctrpcts) oraz [dokumentację dynamicznych route'ów Next.js](https://nextjs.org/docs/routing/dynamic-routes).

<sub>(Z tRPC)</sub>

### `src/server`

Folder `server` używany jest do stworzenia wyraźnego podziału między kodem działającym na serwerze, a tym po stronie klienta.

<sub>(Z tRPC i/lub Prismą)</sub>

### `src/server/common`

Folder `common` zawiera często powielający się kod działający po stronie serwera.

<sub>(Z NextAuth.js + tRPC)</sub>

#### `src/server/common/get-server-auth-session.ts`

Plik `get-server-auth-session.ts` używany jest do otrzymywania sesji NextAuth.js po stronie serwera. Po więcej informacji, zobacz [korzystanie z NextAuth.js](/pl/usage/next-auth#usage-with-trpc).

<sub>(Z NextAuth.js + tRPC)</sub>

#### `src/server/db/client.ts`

Plik `client.ts` jest używany do tworzenia instancji klienta Prismy z globalnym zakresie. Po więcej informacji, zobacz [korzystanie z Prismy](/pl/usage/prisma#prisma-client).

<sub>(Z Prismą)</sub>

### `src/server/trpc`

Folder `trpc` zawiera kod tRPC po stronie serwera.

<sub>(Z tRPC)</sub>

#### `src/server/trpc/context.ts`

Plik `context.ts` jest używany do tworzenia kontekstu w zapytaniach tRPC. Po więcej informacji, zobacz [korzystanie z tRPC](/pl/usage/trpc#-servertrpccontextts).

<sub>(Z tRPC)</sub>

#### `src/server/trpc/trpc.ts`

Plik `trpc.ts` jest używany do eksportowania helperów procedur. Po więcej informacji, zobacz [korzystanie z tRPC](/pl/usage/trpc#-servertrpctrpcts).

<sub>(Z tRPC)</sub>

### `src/server/trpc/router`

Folder `router` zawiera routery tRPC.

<sub>(Z tRPC)</sub>

#### `src/server/trpc/router/_app.ts`

Plik `_app.ts` używany jest do łączenia routerów tRPC i eksportowania ich jako jednego routera oraz do definiowania typów.as the type definitions. Po więcej informacji, zobacz [korzystanie z tRPC](/pl/usage/trpc#-servertrpcrouterts).

<sub>(Z tRPC)</sub>

#### `src/server/trpc/router/auth.ts`

Plik `auth.ts` jest przykładowym routerem tRPC korzystającym z procedury `protectedProcedure` w celu zademonstrowania, jak zabezpieczyć route'a tRPC z NextAuth.js.

<sub>(Z NextAuth.js + tRPC)</sub>

#### `src/server/trpc/router/example.ts`

Plik `example.ts` jest przykładowym routerem tRPC korzystającym z procedury `publicProcedure` w celu zademonstrowania, jak stworzyć publiczny route w tRPC.

<sub>(Z tRPC)</sub>

### `src/styles`

Folder `styles` zawiera globalne style aplikacji.

<sub>(Z Tailwind CSS)</sub>

### `src/types`

Folder `types` jest używany do przechowywania typów oraz ich deklaracji.

<sub>(Z NextAuth.js)</sub>

#### `src/types/next-auth.d.ts`

Plik `next-auth.d.ts` jest używany do poszerzenia domyślnego typu sesji NextAuth.js. Dodaje on ID użytkownika. Po więcej informacji, zobacz [korzystanie z NextAuth.js](/pl/usage/next-auth#inclusion-of-userid-on-the-session).

<sub>(Z NextAuth.js)</sub>

### `src/utils`

Folder `utils` jest używany do przechowywania często powielanych funkcji pomocniczych.

<sub>(Z tRPC)</sub>

#### `src/utils/trpc.ts`

Plik `trpc.ts` to plik wejścia tRPC od strony klienta. Po więcej informacji, zobacz [korzystanie z tRPC](/pl/usage/trpc#-utilstrpcts).

<sub>(Z tRPC)</sub>

### `.env`

Plik `.env` jest używany do przechowywania zmiennych środowiskowych. Po więcej informacji, zobacz [Zmienne Środowiskowe](usage/env-variables). Plik ten **nie** powinien być commitowany do historii gita.

### `.env.example`

Plik `.env.example` pokazuje przykładowe zmienne środowiskowe bazując na wybranych bibliotekach. Plik ten powinien być commitowany do historii gita.

### `.eslintrc.json`

Plik `.eslintrc.json` jest używany do konfigurowania ESLinta. Po więcej informacji, zobacz [dokumentację ESLinta](https://eslint.org/docs/latest/user-guide/configuring/configuration-files).

### `next-env.d.ts`

Plik `next-env.d.ts` gwarantuje korzystanie z typów Next.jsa przez kompilator TypeScripta. \*\*Nie powinieneś go usuwać ani modyfikować, ponieważ może on zmienić się w każdym momencie. Po więcej informacji, zobacz [dokumentację Next.js](https://nextjs.org/docs/basic-features/typescript#existing-projects).

### `next.config.mjs`

Plik `next.config.mjs` jest używany do konfigurowania Next.js. Po więcej informacji, zobacz [dokumentację Next.js](https://nextjs.org/docs/api-reference/next.config.js/introduction). Uwaga: Rozszerzenie .mjs pozwala korzystać z importów ESM.

### `postcss.config.cjs`

Plik `postcss.config.cjs` jest używany przez Tailwind PostCSS. Po więcej informacji, zobacz [dokumentację Taiwind PostCSS](https://tailwindcss.com/docs/installation/using-postcss).

<sub>(Z Tailwind CSS)</sub>

### `prettier.config.cjs`

Plik `prettier.config.cjs` jest używany do konfigurowania Prettiera. Dołącza on plugin `prettier-plugin-tailwindcss` formatujący klasy CSS Tailwinda. Po więcej informacji, zobacz [post na blogu Tailwind CSS](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier).

<sub>(Z Tailwind CSS)</sub>

### `tsconfig.json`

Plik `tsconfig.json` jest używany do konfigurowania TypeScripta. Niektóre ustawienia zostały włączone (takie jak `strict mode`), aby zapewnić najlepsze użycie TypeScripta do aplikacji T3 i jej bibliotek. Po więcej informacji, zobacz [dokumentację TypeScripta](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) albo [korzystanie z TypeScripta](/pl/usage/typescript).
