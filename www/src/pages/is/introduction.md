---
title: Kynning
description: Kynning á T3 stakkinum
layout: ../../layouts/docs.astro
lang: is
---

<div class="embed">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/PbjHxIuHduU"
    title="The best stack for your next project"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

## T3 stakkurinn

_T3 stakkurinn_ er vefstakkur búinn til af [Theo](https://twitter.com/t3dotgg) sem einblínir sér að vera einfaldur, með hátt einingastig, og vera með öruggar tegundir í gegnum allan stakkinn.

Grunnstoðirnar eru [**Next.js**](https://nextjs.org/) og [**TypeScript**](https://typescriptlang.org/). [**Tailwind CSS**](https://tailwindcss.com/) er oftast með. Ef þú ert að vinna með eitthvað sem nær því að vera bakendi, eru [**tRPC**](https://trpc.io/), [**Prisma**](https://prisma.io/), og [**NextAuth.js**](https://next-auth.js.org/) góðir viðaukar.

Þú hefur líklega tekið eftir að það séu margar... einingar. Það er eftir útfærslu. Skiptu einingunum út og inn eins og þú þarft - þessi stakkur er byggður á einingum:)

## Svo.. hvað er create-t3-app? Sniðmát?

Eins konar? `create-t3-app` er skipanalínuviðmót byggt af reyndum T3 stakkforriturum til að flýta uppsetningu á einingarmiðað forritað sem styður sig við T3 stakkinn. Þetta þýðir að hver eining er valfrjáls, og "sniðmátið" er búið til miðað við þínar sérstakar þarfir.

Eftir ótal verkefni og mörg ár í þessum geira, við höfum margar skoðanir og innisýni. Við höfum gert okkur bestu til að kóða þær í þetta skipanalínuviðmót.

Þetta er **EKKI** sniðmát sem á að leysa allt. Við **búumst við** að þú bætir við þínum eigin kóða og söfnum til að leysa þínar þarfir. Þrátt fyrir að við viljum ekki mæla með ákvöðnum lausnum þá erum við með [pakka hér sem við mælum með](/en/other-recs) t.d. fyrir útgáfustjórnun og meðhöndlun staða.

## T3 Axioms

Í fáum orðum - þetta er þetta _gagnrýnt verkefni_. Við höfum mjög ákveðnar skoðanir og tökum mið af þeim.

### Að leysa verkefni

Það er auðvelt að detta í "að bæta við allt" gryfjuna - við viljum halda okkur frá því. Allt sem hefur verið bætt við í `create-t3-app` ætti að leysa sérstakt vandamál sem er til staðar innan í þessum stakk. Þetta þýðir að við munum ekki bæta við söfn sem meðhölda stöður (`zustand`, `redux`) en við munum bæta við pakka eins og NextAuth.js og innleiða Prisma og tRPC fyrir þig.

### Ábyrgð til nýjastu tæknina

Við elskum okkar nýjustu tækni. Satt best að segja þá er hraðinn og ánægjan sem kemur frá þessari tækni mjög " Cool " . Við teljum að það sé mikilvægt að nota nýjustu tækni, að nota áhættusamari tækni þar sem það er minna áhættu. Þetta þýðir að við munum ekki taka áhættuna á að bæta við nýjustu gagnagrunninn (SQL er nægilega gott). En við munum með ánægju bæta við tRPC þar sem það er bara hjálparföll sem er mjög auðvelt að útfæra.

### Öryggi tegunda eru ekki valfrjálst

Eins og kemur fram þá er meginmarkmið Create T3 App að veita hröðustu leiðina að byrja nýtt forrit sem styður sig við öruggar tegundir. Við tökum öryggi tegunda alvarlega þar sem það geri starfið okkar auðveldara og hjálpa okkur að framkvæma færri villur. Allar ákvaðirnar sem byggjast gegn öryggi tegunda í Create T3 App ættu að vera gerðar í öðru verkefni.
