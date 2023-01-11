---
title: Algengar spurningar
description: Algengar spurningar um Create T3 App
layout: ../../layouts/docs.astro
lang: is
---

Hér eru sumar algengar spurningar um Create T3 App.

## Hvað er næst? Hvernig bý ég til forrit með þessu?

Við reynum að hafa þetta verkefni eins einfalt og mögulegt er, svo þú getir byrjað með grunnstoðir sem við stillum upp fyrir þig, og bætum við fleiri hlutum síðar þegar þeir verða nauðsynlegir.

Ef þú þekkir ekki þau mismunandi tækni sem er notað í þessu verkefni, vinsamlegast skoðaðu viðkomandi skjalanir. Ef eitthvað er enn óljóst skaltu ganga í [Discord](https://t3.gg/discord) hópinn okkar og biddu um aðstoð.

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Hvaða námsgögn eru aðgengileg núna?

Þrátt fyrir að listinn hér fyrir neðan birtir lista yfir sum af þeim bestu greinum fyrir T3 staflann, þá mælir samfélagið (og [Theo](https://youtu.be/rzwaaWH0ksk?t=1436)) með að þú byrjar að nota staflann og læra samhliða því að byggja með honum.

Nú, við skiljum að þessi leið henti ekki öllum. Svo, ef þér líður eins og þú hefur prófað það sem er mælt með og ert að leita þér að frekari hjálpargögnum, eða þér einfaldlega líður óöruggan að gera það sjálfur, eða þér líður eins T3 staflinn er yfirþyrmandi, tékkaðu á þessum æðislegu náms- og hjálpargögnum á Create T3 App:

### Greinar

- [Build a full stack app with Create T3 App](https://www.nexxel.dev/blog/ct3a-guestbook)
- [A first look at Create T3 App](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrating your T3 App into a Turborepo](https://www.jumr.dev/blog/t3-turbo)
- [Integrating Stripe into your T3 App](https://blog.nickramkissoon.com/posts/integrate-stripe-t3)

### Myndbönd

- [Build a Twitter Clone with the T3 Stack - tRPC, Next.js, Prisma, Tailwind & Zod](https://www.youtube.com/watch?v=nzJsYJPCc80)
- [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [The T3 Stack - How We Built It](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [An overview of the Create T3 App (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)
  ct?

## Afhverju eru `.js` skrár í verkefninu?

Samkvæmt [T3-Axiom #3](/en/introduction#typesafety-isnt-optional), þá tökum við öryggi gerða sem fyrsta flokks borgara. Því miður, þá styðja ekki allir rammar og viðbætur TypeScript sem þýðir að sumar stillingarskrárnar verða að vera `.js` skrár.

Við reynum að leggja áherslu á að þessar skrár séu JavaScript af ástæðu, með því að lýsa skýrt yfir gerð hverrar skráar (`cjs` eða `mjs`) eftir því hvað er stutt af kóðasafninu sem hún er notuð af. Einnig eru allar `js` skrár í þessu verkefni enn tegundathugaðar (en: typechecked) með `@ts-check`athugasemd efst á skránni.

## Ég er að eiga vandræði með að bæta i18n við forritið mitt. Er til einhver fyrirmynd eða dæmi sem ég get notað?

Við höfum ákveðið að ekki bæta sjálfgefið i18n við í `create-t3-app` vegna þess að það er mjög deilt um efni og eru margar leiðir til að útfæra það.

Þrátt fyrir það, ef þú ert að eiga vandræði við að útfæra það og vilt sjá dæmi um hvernig það sé gert, þá er hér er dæmi um [kóða repo](https://github.com/juliusmarminge/t3-i18n) sem sýnir hvernig þú getur bætt i18n við T3 App með því að nota [next-i18next](https://github.com/i18next/next-i18next).

## Afhverju erum við að nota `/pages` en ekki `/app` frá Next.js 13?

Samkvæmt [T3-Axiom #2](/en/introduction#bleed-responsibly) þá elskum við nýustu tækni og tól, en við metum stöðugleika, beinirinn þinn er mjög erfitt að flytja, [ekki mjög góð staður til að blóða](https://youtu.be/mnwUbtieOuI?t=1662). Á meðan `/app` er [innsýni inn í framtíðina](https://youtu.be/rnsC-12PVlM?t=818), það er ekki enn tilbúið fyrir útgáfu í raunverulegu umhverfi. API-inn er enn í beta þróun og er sagður innihalda kóða sem gæti hafð btjónanlegar afleiðingar.

Til að sjá nánar lista yfir studdar, áætlaðar og eiginleika sem eru enn í þróun í `/app` möppunni, farðu á [beta Next.js docs](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features).
