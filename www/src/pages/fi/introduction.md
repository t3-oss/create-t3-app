---
title: Introduction
description: Introduction to the T3 Stack
layout: ../../layouts/docs.astro
lang: fi
---

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/PbjHxIuHduU" title="The best stack for your next project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## The T3 Stack

_"T3 Stack"_ on web-kehitys stack, jonka on tehnyt [Theo](https://twitter.com/t3dotgg) keskittyy yksinkertaisuuteen, modulaarisuuteen ja full-stackin tyyppiturvallisuuteen.

Ydinkappaleet ovat [**Next.js**](https://nextjs.org/) ja [**TypeScript**](https://typescriptlang.org/). [**Tailwind CSS**](https://tailwindcss.com/) ovat melkein aina mukana. Jos teet jotain back-endiä muistuttavaa, [**tRPC**](https://trpc.io/), [**Prisma**](https://prisma.io/) ja [**NextAuth .js**](https://next-auth.js.org/) ovat myös hienoja lisäyksiä.

Olet ehkä huomannut, että eri osia on… paljon. Se on osa suunnittelua. Vaihda eri osia sisään ja ulos tarpeen mukaan - tämä stack on ytimessään modulaarinen :)

## Joten... mikä on create-t3-app? Jokin malli?

Jollain tavoin? "create-t3-app" on kokeneiden T3 Stack -kehittäjien rakentama CLI (command line interface) virtaviivaistamaan modulaarisen T3 Stack -sovelluksen asennusta. Tämä tarkoittaa, että jokainen osa on valinnainen, ja "malli" luodaan erityistarpeidesi perusteella.

Lukemattomien projektien ja tämän tekniikan vuosien jälkeen meillä on paljon mielipiteitä ja oivalluksia. Olemme tehneet parhaamme koodataksemme ne tähän CLI:hen.

Tämä **EI** ole all inclusive -malli. **Odotamme** sinun tuovan mukanasi omat kirjastosi, jotka ratkaisevat **SINUN** sovelluksesi tarpeet. Vaikka emme halua määrätä ratkaisuja tarkempiin ongelmiin, kuten tilanhallintaan ja käyttöönottoon, meillä [on tässä lueteltu joitain suosituksia](/en/other-recs).

## T3 Axioms

Olemme rehellisiä - tämä projekti _perustuu mielipiteisiimme_. Meillä on kourallinen rakentamiseen liittyviä ydinuskomuksia ja pidämme niitä päätöstemme perustana.

### Ratkaise eri ongelmia

On helppo pudota "kaiken lisääminen" ansaan - emme nimenomaisesti halua tehdä niin. Kaiken "create-t3-app" -sovellukseen lisätyn pitäisi ratkaista tietty ongelma, joka esiintyy mukana tulevissa ydintekniikoissa. Tämä tarkoittaa, että emme lisää asioita, kuten tila kirjastoja (`zustand`, `redux`) (state libraries), mutta lisäämme asioita, kuten NextAuth.js ja integroimme Prisman ja tRPC:n puolestasi.

### Tulevaisuuden vastuu (Bleed Responsibly)

Rakastamme uusinta teknologiaa. Se nopeus ja rehellisesti sanottuna hauskuus, joka syntyy uudesta roskasta, on todella siistiä. Mielestämme on tärkeää toimia vastuullisesti ja käyttää riskialttiimpaa tekniikkaa vähemmän riskialttiissa osissa. Tämä tarkoittaa, että emme lyöisi vetoa riskialtista uudesta tietokantatekniikasta (SQL on mahtava!). Mutta mielellämme ✅ lyömme vetoa tRPC:hen, koska se on vain funktioita, jotka ovat vähäpätöisiä.

### Tyyppiturvallisuus ei ole valinnaista

"create-t3-app" -sovelluksen tavoite on tarjota nopein tapa aloittaa uusi full-stack, **tyyppiturvallinen** -verkkosovellus. Otamme tyyppiturvallisuuden vakavasti näissä osissa, koska se parantaa tuottavuuttamme ja auttaa meitä toimittamaan vähemmän virheitä. Kaikki päätökset, jotka vaarantavat "create-t3-app" tyyppiturvallisuuden, on päätös, joka tulisi tehdä eri projektissa.
