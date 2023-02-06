---
title: FAQ
description: Ofte stilte spørsmål om Create T3 App
layout: ../../layouts/docs.astro
lang: no
---

Her er noen ofte stilte spørsmål om "create-t3-app".

## Hva nå? Hvordan lager jeg en app med dette?

Vi prøver å holde dette prosjektet så enkelt som mulig, slik at du kan starte med bare det grunnleggende rammeverket vi har laget for deg. Du kan legge til flere ting senere etter hvert som de blir nødvendige.

Hvis du ikke er kjent med de forskjellige teknologiene som brukes i dette prosjektet, vennligst se den relevante dokumentasjonen . Hvis du har flere spørsmål kan du bli med i vår [Discord](https://t3.gg/discord) og be om hjelp.

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Hvilke læringsressurser er tilgjengelige for øyeblikket?

Selv om ressursene som er oppført nedenfor, er noen av de beste som finnes for T3-Stakken, anbefaler vårt samfunn (og [Theo](https://youtu.be/rzwaaWH0ksk?t=1436)) at du bare begynner å bruke stakken og bygger med den mens du lærer.

Hvis du vurderer "create-t3-app", er sjansen stor for at du allerede har brukt noen av delene av stakken. Så hvorfor ikke bare hoppe inn i det og lære de andre delene mens du bygger noe?

Nå har vi forståelse for at denne metoden ikke fungerer for alle. Så hvis du føler at du har prøvd anbefalingen og fortsatt vil ha noen ressurser, eller du bare ikke er sikker på hvordan å gjøre det selv og/eller føler deg overveldet av stakken, så sjekk ut disse fantastiske veiledningene på `create-t3-app `:

### Artikler

- [Bygg en full stakk-app med create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)
- [En første titt på create-t3-app](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrering av T3-applikasjonen din til et Turborepo](https://www.jumr.dev/blog/t3-turbo)
- [Integrering av Stripe i T3-applikasjonen din](https://blog.nickramkissoon.com/posts/integrate-stripe-t3)

### Videoer

- [Bygg en Twitter-klone med T3-stakken - tRPC, Next.js, Prisma, Tailwind & Zod](https://www.youtube.com/watch?v=nzJsYJPCc80)
  – [Bygg en Blogg Med T3-stakken – tRPC, TypeScript, Next.js, Prisma og Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Bygg en Live Chat-applikasjon med T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [T3-stakken - Hvordan Vi Bygget Den](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [En oversikt over create-T3-app (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)

## Hvorfor er det `.js`-filer i prosjektet?

I henhold til [3. T3-Prinsipp](/no/introduction#typesafety-isnt-optional), anser vi _typesafety_ som en førsteklasses borger. Dessverre støtter ikke alle rammeverk og plugins TypeScript, noe som betyr at noen av konfigurasjonsfilene nødvendigvis må være `.js`-filer.

Vi forsøker å understreke at disse filene er JavaScript for en grunn, ved å eksplisitt deklarere hver filtype (`cjs` eller `mjs`) avhengig av hva som støttes av biblioteket den brukes av. Dessuten er alle `js`-filene i dette prosjektet fortsatt typesjekket med en `@ts-check`-kommentar øverst.

## Jeg sliter med å legge til i18n i applikasjonen min. Er det noen referanse jeg kan bruke?

Vi har bestemt oss for å ikke inkludere i18n som standard i `create-t3-app` fordi det er et emne omgitt av mange meninger og det er mange måter å implementere det på.

Men hvis du sliter med å implementere det og ønsker å se et referanseprosjekt, så har vi et [referanserepo](https://github.com/juliusmarminge/t3-i18n) som viser hvordan du kan legge til i18n i en T3-app ved å bruke [next-i18next](https://github.com/i18next/next-i18next).

## Hvorfor bruker vi `/pages` og ikke `/app` fra Next.js 13?

I henhold til [2. T3-Prinsipp](/no/introduction#bleed-responsibly), elsker vi ny teknologi, men verdsetter stabilitet. Det er vanskelig flytte hele ruteren og det er ikke en god idé å ta disse risikoene der, [se: Moderne og Ansvarsbevisst](https://youtu.be/mnwUbtieOuI?t=1662). Mens `/app` er [et glimt inn i fremtiden](https://youtu.be/rnsC-12PVlM?t=818), er det ikke klart for produksjon; API-et er i beta og forventes å ha _breaking changes_.

For en liste over støttede, planlagte og funksjoner under arbeid i `/app`-katalogen, gå til [beta Next.js docs](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features).
