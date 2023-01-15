---
title: FAQ
description: Najczęściej zadawane pytania dotyczące Create T3 App
layout: ../../layouts/docs.astro
lang: pl
---

Tu znajdziesz najczęściej zadawane pytania dotyczące `create-t3-app`.

## Co dalej? Jak mam napisać aplikację?

Staramy się, aby projekt ten był jak najprostszy - możesz zacząć już korzystać z zawartego w nim szablonu a następnie stopniowo dodawać potrzebne Ci rzeczy.

Jeżeli nie znasz poszczególnych technologi użytych w projekcie, skorzystaj z odnośników do odpowiednich stron z dokumentacjami. Jeżeli dalej nie jesteś co do nich pewien, możesz dołączyć do naszego [serwera Discord](https://t3.gg/discord) i poprosić o pomoc.

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Jakie zasoby do nauki są dostępne?

Poniższe elementy to jedne z najlepszych zasobów dla T3 Stacka, jednak społeczność oraz [Theo](https://youtu.be/rzwaaWH0ksk?t=1436) polecają Ci zacząć po prostu z niego korzystać. W ten sposób podczas pisania aplikacji zdobędziesz potrzebną wiedzę.

Jeżeli zastanawiasz się nad korzystaniem z `create-t3-app`, mogłeś już używać poszczególnych jego składowych w przeszłości. W takim przyadku spróbuj wskoczyć na głęboką wodę i nauczyć się innych jego części po drodze!

Zdajemy sobie sprawę z tego, iż opisany wyżej sposób nie jest dla każdego najlepszy. Jeżeli więc w dalszym ciągu czujesz potrzebę skorzystania z innych źródeł (lub jeżeli nie jesteś wystarczająco pewny siebie / czujesz się przytłoczony stackiem), sprawdź te poradniki dotyczące `create-t3-app` (pamiętaj, że są one w języku angielskim):

### Artykuły

- [Zbuduj aplikację full stack z create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)
- [Pierwsze spojrzenie na create-t3-app](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrowanie aplikacji T3 do Turborepo](https://www.jumr.dev/blog/t3-turbo)
- [Integrowanie Stripe'a z Aplikacją T3](https://blog.nickramkissoon.com/posts/integrate-stripe-t3)

### Filmy

- [Zbuduj klon Twittera z T3 Stakiem - tRPC, Next.js, Prisma, Tailwind oraz Zod](https://www.youtube.com/watch?v=nzJsYJPCc80)
- [Zbuduj blog z T3 Stackiem - tRPC, TypeScript, Next.js, Prisma i Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Zbuduj live chat z T3 Stackiem - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [T3 Stack - Jak go zbudowaliśmy](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [Przegląd `create T3 App` (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)

## Dlaczego w projekcie są pliki `.js`?

Tak jak opisano w [aksjomacie #3](/pl/introduction#typesafety-nie-jest-opcjonalne), traktujemy typesafety za pierwszorzędną rzecz. Niestety nie wszystkie frameworki i pluginy posiadają wsparcie do TypeScripta, dlatego też niektóre pliki konfiguracyjne muszą mieć powyższe rozszerzenie.

Staramy się podkreślić, iż pliki te korzystają z TypeScripta nie bez powodu. Wyraźnie określamy rozszerzenia plików jako `cjs` lub `mjs`, zależnie od wsparcia przez daną bibliotekę. Dodatkowo, wszystkie pliki `.js` w naszym projekcie są w dalszym ciągu sprawdzane pod kątem poprawności typów - korzystamy do tego z komentarza `@ts-check` na górze pików.

## Mam problem z dodaniem i18n do aplikacji. Czy istnieje jakiś projekt, do którego mógłbym się odnieść przy jej budowaniu?

Zdecydowaliśmy się nie umieszczać i18n w `create-t3-app`, ponieważ jest to bardzo kontrowersyjny temat i istnieje wiele sposobów, aby element ten zaimplementować.

Jeżeli jednak nie wiesz jak wygląda poprawna interpretacja internacjonalizacji i chciałbyś zobaczyć przykładowy projekt, sprawdź [to repozytorium](https://github.com/juliusmarminge/t3-i18n) - ukazuje ono jak możesz dodać i18n do aplikacji T3 korzystając przy tym z [next-i18next](https://github.com/i18next/next-i18next).

## Dlaczego korzystamy z folderu `/pages` a nie `/app` z Next.js 13?

Tak jak opisano w [aksjomacie #2](/pl/introduction#bleed-responsibly-korzystaj-rozważnie-z-nowych-technologii), kochamy technologie "bleeding edge", jednak ważna jest dla nas stabilność. Ciężko jest zmienić cały `router` w aplikacji ([not a great place to bleed](https://youtu.be/mnwUbtieOuI?t=1662)). Folder `/app` to [wgląd na przyszłość](https://youtu.be/rnsC-12PVlM?t=818), jednak nie jest on gotowy na wersję produkcyjną. API jest w becie i oczekiwać można zmian wpływających na działanie całej aplikacji (niekoniecznie pozytywnie!).

Żeby poznać listę wspieranych, zaplanowanych i tych, nad którymi prace trwają funkcji, odwiedź [dokumentację Next.js beta](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features).
