---
title: Hvorfor CT3A?
description: Hvorfor du bør velge Create T3 App for ditt neste prosjekt
layout: ../../layouts/docs.astro
lang: no
---

Vi startet create-t3-app fordi [Theo](https://twitter.com/t3dotgg) ikke ønsket å lage en mal for favoritteknologiene sine. Inspirert av create-next-app, [Astro's CLI](https://astro.build) og en forkjærlighet for typesikkerhet, har create-t3-app-teamet jobbet hardt for å skape et best mulig utgangspunkt for nye T3-stakkprosjekter.

Hvis du er interessert i å bruke Next.js på en typesikker måte, er dette det rette stedet å starte. Hvis du er interessert i hvorfor vi tok visse spesifikke teknologivalg, les videre :)

## Hvorfor TypeScript?

JavaScript er vanskelig. Hvorfor legge til enda flere regler?

Vi er overbevist om at opplevelsen som TypeScript gir vil gjøre deg til en bedre utvikler.
Man mottar umiddelbar tilbakemelding når man skriver koden sin. De forventede datatypene er definert, og enten får vi nyttig autofullføring i kodeeditoren, eller røde understrekinger som varsler oss om et problem, for eksempel når vi prøver å få tilgang til en attributt som ikke eksisterer eller når vi prøver å angi en verdi av feil type. Dette lar oss identifisere og fikse feil tidlig uten å måtte feilsøke etterpå. Enten du er helt ny på webutvikling eller en erfaren proff, vil TypeScripts "strenghet" gi deg en mindre frustrerende, mer konsekvent opplevelse enn vanilla JS.

Typesikkerhet gjør deg raskere. Hvis du ikke er overbevist, [kan det hende du bruker TypeScript feil...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)

## Hvorfor Next.js?

Vi elsker React. Det har gjort UI-utvikling tilgjengelig på måter vi aldri kunne ha forestilt oss før. Det kan også lede utviklere ned noen vanskelige veier.

Next.js, som har noen enkle, tydelige meninger, tilbyr en svært optimalisert tilnærming til å bygge applikasjoner med React. Fra ruting til API-definisjoner til bilde-rendering stoler vi på at Next.js dirigerer utviklere til gode beslutninger.

## Hvorfor tRPC/Prisma/Tailwind/osv?

Selv om vi ønsker å holde ting så enkelt som mulig, så opplever vi at disse delene kan brukes i så og si alle applikasjonene vi lager. `create-t3-app` gjør det enkelt for deg å legge til delene du trenger.

### tRPC

tRPC bygger på GraphQLs løfte om sømløs klientsideutvikling opp mot en typesikker server uten å generere mye _boilerplate_. Det er en smart utnyttelse av TypeScript som tilbyr en utrolig utvikleropplevelse.

### Prisma

Prisma er for SQL det TypeScript er for JS. Det skaper en utvikleropplevelse som ikke har eksistert før.
Prisma garanterer ende-til-ende typesikkerhet fra databasen til applikasjonen din ved å generere typer fra et brukerdefinert skjema som er kompatible med [forskjellige databaser](https://www.prisma.io/docs/concepts/database-connectors).

Prisma tilbyr et helt [sett med verktøy](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows) som gjør det daglige arbeidet med databasen enklere. Spesielt å merke seg er Prisma-klienten, som utfører spørringer og gjør SQL så enkelt at du knapt vil legge merke til at du bruker det. Prisma Studio er et nyttig GUI for databasen din som lar deg raskt lese og manipulere dataene dine uten å måtte skrive noen kode.

### Tailwind CSS

Tailwind føles som "zen-modus CSS".

Tailwind lar deg lage en tydelig beskrevet applikasjon ved å gi deg grunnleggende byggeklosser i form av gode standardfarger, mellomrom og andre primitiver. I motsetning til komponentbiblioteker, blir du ikke holdt tilbake hvis du ønsker å ta applikasjonen din til det neste nivået og skape noe ekstraordinært og unikt.

I tillegg betyr Tailwinds "inline"-tilnærming at du ikke trenger å bekymre deg for klassenavn, mappestruktur eller andre problemer som ikke er direkte relatert til problemet du ønsker å løse.

### NextAuth.js

Hvis du vil ha et autentiseringssystem i Next.js-applikasjonen din, er NextAuth.js en utmerket løsning for å unngå kompleksiteten innebært i å bygge det selv. Den kommer med en omfattende liste over _providers_ for å raskt legge til OAuth-autentisering og tilbyr adaptere for mange databaser og ORM-er.
