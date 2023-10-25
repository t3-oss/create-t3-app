---
title: Komme i gang
description: De første stegene med din nye T3-app
layout: ../../../layouts/docs.astro
lang: no
---

Du har nettopp opprettet en ny T3-app, og du er klar til å sette i gang. Her er det minste du må gjøre for å få applikasjonen din til å kjøre.

## Database

Hvis applikasjonen din bruker Prisma, må du kjøre `npx prisma db push` fra rotmappen av applikasjonen. Denne kommandoen synkroniserer Prisma-skjemaet til databasen og genererer TypeScript-typene for Prisma-klienten basert på skjemaet ditt. Merk at du må [starte TypeScript-serveren på nytt](https://tinytip.co/tips/vscode-restart-ts/) etter denne handlingen for at de genererte typene skal gjenkjennes.

## Autentisering

Hvis applikasjonen din bruker NextAuth.js, starter vi med `DiscordProvider`. Dette er en av de enkleste leverandørene som NextAuth.js tilbyr, men det krever fortsatt litt oppsett fra din side.

Hvis du foretrekker en annen autentiseringsleverandør, kan du også bruke en av de [mange leverandørene](https://next-auth.js.org/providers/) som NextAuth.js tilbyr.

1. Du trenger en Discord-konto. Meld deg på hvis du ikke har en ennå.
2. Naviger til https://discord.com/developers/applications og klikk "New Application" øverst til høyre. Gi applikasjonen din et navn og godta vilkårene for bruk.
3. Når applikasjonen din er opprettet, naviger til "Settings → OAuth2 → General".
4. Kopier "Client ID" og lim den inn i `.env` som `DISCORD_CLIENT_ID`.
5. Klikk "Reset Secret", kopier den nye hemmeligheten og lim inn verdien i `.env` som `DISCORD_CLIENT_SECRET`.
6. Klikk "Add Redirect" og skriv inn `http://localhost:3000/api/auth/callback/discord`.
   - For utrulling i produksjonsmiljø må de foregående trinnene følges på nytt for å lage en annen Discord-applikasjon. Denne gangen erstatt `http://localhost:3000` med URL-en du publiserer til.
7. Lagre endringene.
8. Skriv `NEXTAUTH_SECRET` i `.env`. Hvilken som helst streng vil fungere under utviklingen. For bruk i produksjonsmiljø, ta en titt på notatet i `.env` for å lage en sikker hemmelighetvariabel.

Du skal nå kunne logge på.

## Editor Setup

Følgende utvidelser anbefales for en optimal utvikleropplevelse. Linkene nedenfor gir støtte for redigeringsprogram utvidelser.

- [Prisma Extension](https://www.prisma.io/docs/guides/development-environment/editor-setup)
- [Tailwind CSS IntelliSense Extension](https://tailwindcss.com/docs/editor-setup)
- [Prettier Extension](https://prettier.io/docs/en/editors.html)

## Neste Steg

- Hvis applikasjonen din bruker tRPC, ta en titt på `src/pages/index.tsx` og `src/server/api/routers/post.ts` for å se hvordan tRPC-spørringer fungerer.
- Ta en titt på dokumentasjonen for `create-t3-app` samt dokumentasjonen for pakkene applikasjonen din inkluderer.
- Bli med i [Discord](https://t3.gg/discord) og gi oss en stjerne på [GitHub](https://github.com/t3-oss/create-t3-app)! :)
