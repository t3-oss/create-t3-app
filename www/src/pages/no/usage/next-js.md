---
title: Next.js
description: Bruk av Next.js
layout: ../../../layouts/docs.astro
lang: no
---

Next.js er et backend-rammeverk for dine React-applikasjoner.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js is a backend framework" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Se [Theos Next.js Conf-prat](https://www.youtube.com/watch?v=W4UhNo3HAMw) for å bedre forstå hva Next.js er og hvordan det fungerer.

## Hvorfor skal jeg bruke det?

Vi elsker React. Det har gjort UI-utvikling tilgjengelig på måter vi aldri kunne ha forestilt oss før. Det kan også lede utviklere ned noen vanskelige veier. De som utvikler Next.js har noen klare meninger om hvordan de ønsker at ting skal gjøres, samtidig som de tilbyr en svært optimalisert tilnærming til hvordan å bygge React-applikasjoner. Fra ruting til API-definisjoner til bilde-rendering stoler vi på at gjenge i Next.js dirigerer oss utviklere til gode beslutninger.

Next.js kombinert med [Vercel](https://vercel.com/) gjør utvikling og utrulling av webapplikasjoner enklere enn noen gang. Deres ekstremt sjenerøse free-tier og superintuitive grensesnitt lar deg publisere nettstedet ditt i løpet av noen få klikk. (Vi ❤️ Vercel)

## Get Static/Server Props

En nøkkelfunksjon i Next.js er hvordan man henter data. Vi anbefaler på det sterkeste å lese den [offisielle dokumentasjonen](https://nextjs.org/docs/basic-features/data-fetching) for å forstå hvordan disse funksjonene fungerer og hvordan de er forskjellige. `getServerSideProps` anbefales vanligvis bare når det er en god grunn til å bruke det, da det er et blokkerende anrop og fordi det gjør siden tregere. [Inkrementell statisk regenerering (ISR)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) er et godt alternativ til `getServerSideProps` når dataen er dynamiske og kan hentes trinnvis.

## Nyttige Ressurser

| Ressurser                    | Link                               |
| ---------------------------- | ---------------------------------- |
| Next.js Dokumentasjon        | https://nextjs.org/docs            |
| Next.js GitHub               | https://github.com/vercel/next.js  |
| Next.js Blogg                | https://nextjs.org/blog            |
| Next.js Discord              | https://nextjs.org/discord         |
| Next.js Twitter              | https://twitter.com/nextjs         |
| Vercel/Next.js YouTube-kanal | https://www.youtube.com/c/VercelHQ |
