---
title: Introduksjon
description: Introduksjon til T3-stakken
layout: ../../layouts/docs.astro
lang: no
---

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/PbjHxIuHduU" title="The BEST Stack For Your Next Project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## T3-Stakken

_"T3-Stakken"_ er en webutviklingsstakk inspirert av [Theo](https://twitter.com/t3dotgg) som fokuserer på enkelhet, modularitet og full typesikkerhet.

I kjernen består den av [**Next.js**](https://nextjs.org/) og [**TypeScript**](https://typescriptlang.org/). [**Tailwind CSS**](https://tailwindcss.com/) brukes også nesten alltid. Dersom backend-funksjonalitet er nødvendig så er [**tRPC**](https://trpc.io/), [**Prisma**](https://prisma.io/) og [**NextAuth.js**](https://next-auth.js.org/) også gode tillegg.

Du har kanskje lagt merke til at T3-stakken har mange komponenter. Det er med vilje. Bytt ut delene hvis du trenger dem - stakken er modulær i kjernen :)

## Så... hva er create-t3-app? En mal?

På en måte? `create-t3-app` er en CLI utviklet av erfarne T3-stakk-utviklere som forenkler oppsett av en modulær T3-stakk-app. Dette betyr at hver komponent er valgfri og "malen" lages basert på dine spesifikke krav.

Etter å ha jobbet med mange prosjekter og mange år med denne teknologien, har vi mange meninger og mye innsikt. Vi har gjort vårt beste for inkludere dette i CLI-et.

Dette er **IKKE** en altomfattende mal. Vi **forventer** at du tar inn dine egne biblioteker som oppfyller behovene til **DIN** applikasjon. Selv om vi ikke ønsker å foreskrive løsninger for mer spesifikke problemer som _state_-administrasjon og utrulling, har vi [laget en liste over noen anbefalinger her](/no/other-recs).

## T3-Prinsipper

Vi skal være ærlige - Dette prosjektet ble designet i henhold til _våre ideer_. Vi deler et sett med oppfatninger om å bygge webapplikasjoner og bruker disse som grunnlag for våre beslutninger.

### Løs Problemer

Det er lett å gå i fellen med "å legg til alt" – det ønsker vi spesifikt _ikke_ å gjøre. Alt som legges til 'create-t3-app' bør løse et spesifikt problem som finnes innenfor de inkluderte kjerneteknologiene. Dette betyr at vi ikke vil legge til ting som state-biblioteker (`zustand`, `redux`). Vi vil imidlertid integrere ting som NextAuth.js, Prisma og tRPC.

### Moderne og Ansvarsbevisst

Vi elsker moderne teknologi. Arbeidshastigheten og, ærlig talt, hvor moro det er å jobbe med disse teknologiene er fantastisk. Imidlertid synes vi det er viktig å være ansvarsbevisst når det gjelder å bruke noe risikofylte teknologier i de mindre risikofylte delene av stakken. Dette betyr at vi ikke ⛔️ stoler på risikable nye databaseteknologier (SQL er flott!). Men vi liker å ✅ stole på tRPC da det kun gjelder funksjonalitet som er trivielt å endre.

### Typesikkerhet er ikke valgfritt

Det uttalte målet med `create-t3-app` er å gi den raskeste ruten til en ny, **typesikker** fullstakk-webapplikasjon. Vi tar typesikkerhet på alvor fordi det forbedrer produktiviteten vår og hjelper oss å sende færre feil ut i produksjonsmiljø. Enhver beslutning som svekker typesikkerheten til `create-t3-app` er en beslutning som bør tas i et annet prosjekt.
