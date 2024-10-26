---
title: Pierwsze Kroki
description: Jak zacząć pracę z nową aplikacją T3
layout: ../../../layouts/docs.astro
lang: pl
---

Skorzytałeś właśnie z szablonu aplikacji T3 i jesteś gotowy, aby zacząć z nim pracę. Tu znajdziesz minimalny setup, jaki powinieneś wykonać, aby uruchomić aplikację.

## Baza Danych

### Prisma

Jeżeli twoja aplikacja zawiera Prismę, koniecznie uruchom `npx prisma db push` z głównego folderu projektu. Komenda ta zsynchronizuje twój schemat Prismy z bazą danych i wygeneruje typy TypeScripta dla "Prisma Client" bazując na tym schemacie. Uwaga: po wygenerowaniu typów Prismy prawdopodobnie będziesz musiał [zrestartować serwer TypeScripta](https://tinytip.co/tips/vscode-restart-ts/), aby był on w stanie je wykryć.

### Drizzle

Jeżeli twoja aplikacja zawiera Drizzle, sprawdź plik `.env` po instrukcje jak stworzyć swój `DATABASE_URL`. Po dodaniu `DATABASE_URL` do pliku `.env` uruchom `pnpm db:push` ( lub odpowiednik dla innych menedżerów pakietów) - dokonana zostanie synchronizacja schematów twojej bazy danych.

## Uwierzytelnianie

Jeżeli twoja aplikacja zawiera NextAuth.js, posiadasz przygotowany już przez nas `DiscordProvider`. Jest to jeden z najprostszych providerów oferowanych przez NextAuth.js, w dalszym ciągu wymaga on jednak trochę setupu po twojej części.

Oczywiście, jeżeli wolisz korzystać z innego, możesz użyć jednego z [wielu providerów](https://next-auth.js.org/providers/) oferowanych przez NextAuth.js.

1. Potrzebować będziesz konta Discord, więc utwórz je, jeśli jeszcze tego nie zrobiłeś.
2. Przejdź do strony https://discord.com/developers/applications i kliknij "New Appliction" w prawym górnym rogu. Nazwij ją i wyraź zgodę na warunki korzystania z serwisu.
3. Po stworzeniu aplikacji, przejdź do "Settings → OAuth2 → General".
4. Skopiuj "Client ID" i dodaj go do pliku `.env` pod kluczem `AUTH_DISCORD_ID`.
5. Kliknij "Reset Secret", skopiuj nowy secret i dodaj go do pliku `.env` pod kluczem `AUTH_DISCORD_SECRET`.
6. Kliknij "Add Redirect" i wpisz `http://localhost:3000/api/auth/callback/discord`.

- Dla deploymentu w wersji produkcyjnej, podążaj za powyższymi krokami aby stworzyć nową aplikację Discord, ale tym razem zamień `http://localhost:3000` na URL, na który wrzucasz swój projekt.

1. Zapisz zmiany
2. Ustaw `AUTH_SECRET` w pliku `.env`. W wersji rozwojowej zadziała byle co, w wersji produkcyjnej zobacz uwagę w pliku `.env`, która mówi, jak wygenerować bezpieczny secret.

Powinieneś być w stanie się zalogować.

## Konfiguracja Edytora

Następujące rozszerzenia są przez nas polecane dla optymalnego DX'u. Poniższe linki dostarczają pluginy dla odpowiednich edytorów.

- [Prisma Extension](https://www.prisma.io/docs/guides/development-environment/editor-setup)
- [Tailwind CSS IntelliSense Extension](https://tailwindcss.com/docs/editor-setup)
- [Prettier Extension](https://prettier.io/docs/en/editors.html)

## Następne Kroki

- Jeżeli twoja aplikacja zawiera tRPC, sprawdź pliki `src/pages/index.tsx` i `src/server/api/routers/post.ts` aby dowiedzieć się, jak działają zapytania wykonywane przez tRPC.
- Rozejrzyj się po dokumentacji Create T3 App oraz dokumentacji paczek, z których korzysta twój projekt.
- Dołącz do naszego serwera [Discord](https://t3.gg/discord) i dodaj gwiazdkę na repozytorium [GitHub](https://github.com/t3-oss/create-t3-app)! :)
