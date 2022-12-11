---
title: Introductie
description: Introductie voor de T3 Stack
layout: ../../layouts/docs.astro
lang: nl
---

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/PbjHxIuHduU" title="The best stack for your next project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## De T3 Stack

De _"T3 Stack"_ is een web development stack geemaakt door [Theo](https://twitter.com/t3dotgg) met een focus op simpliciteit, modulariteit, en full-stack typesafety.

De kern onderdelen zijn [**Next.js**](https://nextjs.org/) en [**TypeScript**](https://typescriptlang.org/). [**Tailwind CSS**](https://tailwindcss.com/) is bijna altijd inbegrepen. Als je ook maar iets in de buurt van backend doet zijn [**tRPC**](https://trpc.io/), [**Prisma**](https://prisma.io/), en [**NextAuth.js**](https://next-auth.js.org/) ook geweldige toevoegingen.

Je merkt misschien dat er heel veel onderdelen zijn. Daar zit een goede gedachte achter. Je kan altijd pakketten in en uit wisselen - de stack is van binnen naar buiten modulair :)

## Dus... wat is create-t3-app? Een template?

Soort van? `create-t3-app` is een CLI gemaakt door getalenteerde T3 Stack ontwikkelaars om de setup van de modulaire T3 stack zo makkelijk mogelijk te maken. Dit betekent dat ieder onderdeel optioneel is, en dat de "template" op maat gemaakt is voor jou.

Na vele projecten en meerdere jaren in deze technologie, hebben we veel meningen en nuttige inzichten. We hebben ons best gedaan om dit te verwerken in de CLI.

Dit is **NIET** een all-inclusive template. We **verwachten** dat je je eigen libraries brengt om problemen in **JOUW** applicatie op te lossen. We willen niet oplossing voor specifieke problemen zoals state management en deployment voorschotelen, maar we hebben wel [een paar aanbevolingen](/nl/other-recs).

## T3 uitgangspunten

We zullen eerlijk zijn - dit project is gebaseerd op onze ideeën. We hebben een paar kerngedachtes over het bouwen van apps die we gebruiken als de basis van onze beslissingen.

### Problemen oplossen

Het is makkelijk om "alles toe te voegen" - dat willen wij uitdrukkelijk niet. Alles wat toegevoegd wordt aan `create-t3-app` moet een specifiek probleem oplossen wat in de kern van de technologieën bestaat. Dit betekent dat we niet state libraries zoals (`zustand`, `redux`) toevoegen, maar dingen zoals NextAuth.js toevoegen en automatisch voor je integreren met Prisma en tRPC.

### Modern en Verantwoord

Wij houden van bleeding edge technologie. De snelheid en, eerlijk gezegd, lol die uit nieuwe shit komt is heel cool. Wij vinden dat het belangrijk is om modern en verantwoord te blijven, dus riskante technologie gebruiken in de minder riskante gedeeltes. Dit betekent dat we niet ⛔️ de nieuwe database technologie gaan gebruiken (SQL is prima!). Maar we integreren graag ✅ tRPC omdat het gewoon functies zijn die triviaal zijn om te veranderen.

### Typesafety is niet optioneel

Het doel van `create-t3-app` is om de snelste manier te zijn om een full-stack, **typesafe** web appliatie te starten. Wij nemen typesafety serieus omdat het ons productiever maakt en veel bugs voorkomt. Iedere overweging die `create-t3-app` minder typesafe maakt is een overweging wat in een ander project gemaakt moet worden.
