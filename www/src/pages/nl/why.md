---
title: Waarom CT3A?
description: Waarom jij Create T3 App zou moeten gebruiken voor je volgende project
layout: ../../layouts/docs.astro
lang: nl
---

We zijn begonnen met create-t3-app omdat [Theo](https://twitter.com/t3dotgg) geen template wou maken van zijn favoriete technologieën. Geïnspireerd door create-next-app, [Astro zijn CLI](https://astro.build) en liefde voor typesafety, heeft het create-t3-app team hard gewerkt om het beste startpunt te maken voor nieuwe T3 stack projecten.

Als je geïnteresseerd bent in Next.js typesafe te gebruiken is dit de perfecte start. Als je nieuwsgierig bent naar de technologieën die we gebruiken, blijf dan lezen :)

## Waarom TypeScript ?

JavaScript is moeilijk. Waarom zou je meer regels toevoegen?

Wij denken dat TypeScript je een betere developer maakt. Het geeft live feedback terwijl je je code schrijft door middel van data types, code automatisch aanvullen in je IDE en aantonen wanneer je een property probeert te lezen die niet bestaat of de verkeerde data types gebruikt in een functie. Het maakt niet uit hoe lang je al web development doet, door de "strictheid" van TypeScript zal het minder frustratie en meer samenhang creëren dan vanilla JS.

Typesafety laat je sneller code schrijven. Als je niet overtuigd bent, [gebruik je TypeScript misschien verkeerd...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)

## Waarom Next.js ?

Wij houden van React. Het heeft UI development toegankelijk gemaakt op manieren die we ons eerder niet konden voorstellen. Het kan echter developers ook af en toe in de weg zitten.

Next.js bied een lichtelijk opinionated, erg geoptimaliseerde manier om React applicaties te maken. Van routing naar API definities naar Image rendering, we vertrouwen dat Next.js developers goede keuzes laat maken.

## Waarom tRPC/Prisma/Tailwind/etc?

Wij houden van simpliciteit, maar we merken dat we deze technologieën in ieder "app"-achtig project gebruiken. `create-t3-app` maakt het makkelijk om een van deze technologieën te gebruiken als je er een nodig hebt.

### tRPC

tRPC doet wat GraphQL had beloofd; vlekkeloos apps developen met een typesafe server zonder boilerplate. Het misbruikt TypeScript om een geweldige dev experience te creëren.

### Prisma

Prisma is wat TypeScript is voor JS, maar dan voor SQL. Door type definities te genereren op basis van een schema wat te gebruiken is met [meerdere databases](https://www.prisma.io/docs/concepts/database-connectors), kan Prisma end-to-end typesafety garanderen voor jouw app.

Prisma bied [meerdere tools](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows) die interacties met je database makkelijker maken. De Prisma Client is verantwoordelijk voor query's naar je database te sturen waardoor SQL zo makkelijk is dat je bijna niet door hebt dat je het gebruikt. Prisma Studio is een handige GUI voor je database die je snel je data laat veranderen zonder code te schrijven.

### Tailwind CSS

Tailwind voelt als "zen-modus CSS".

Door blokken te geven in de vorm van goede standaard kleuren, marges en eldere primitiven maakt Tailwind het makkelijk om een app te maken die er goed uit ziet. In tegenstelling tot component libraries houdt het je niet tegen wanneer je een next level app wilt brengen en iets moois en unieks wilt maken.

Ten slotte, met de inline-like aanpak moedigt Tailwind je aan om CSS te schrijven zonder je zorgen te maken over class namen, bestandsorganisatie of andere problemen die niet te maken hebben met het probleem wat je probeert op te lossen.

### NextAuth.js

Als je authenticatie in je NextJS app wilt toevoegen is NextAuth.js een geweldige oplossing om een veilige authenticatie methode te hebben zonder dat je er zelf zorgen over hoeft te maken. Het heeft een grote lijst van providers waarmee je snel OAuth authenticatie kan toevoegen. Ook heeft het ingebouwde adapters voor vele databases en ORMs.
