---
title: FAQ
description: Domande chieste frequentamente su Create T3 App
layout: ../../layouts/docs.astro
---

Ecco alcune domande frequenti su `create-t3-app`.

## Adesso che faccio? Come faccio a creare un'app con questa stack?

Cerchiamo di mantenere questo progetto il più semplice possibile, in modo che tu possa iniziare solo con l'impalcatura che abbiamo allestito per te e aggiungere altre cose in seguito, quando saranno necessarie.

Se non si ha familiarità con le diverse tecnologie utilizzate in questo progetto, fai riferimento alle rispettive documentazioni. Se sei ancora nelle nuovle, unisciti al nostro [Discord](https://t3.gg/discord) e chiedi aiuto.

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Quali risorse di apprendimento sono attualmente disponibili?

Sebbene le risorse elencate di seguito siano tra le migliori esistenti per lo stack T3, la community (e [Theo](https://youtu.be/rzwaaWH0ksk?t=1436)) consigliano di iniziare a utilizzare lo stack e imparare lungo la strada costruendo con essa.

Se stai considerando `create-t3-app`, è probabile che tu abbia già utilizzato alcune delle parti dello stack. Allora perché non buttarti a capofitto e imparare le altre parti mentre costruisci qualcosa?

Ora, ci rendiamo conto che questo percorso non funziona per tutti. Quindi, se ritieni di aver provato la raccomandazione e vorresti ancora alcune risorse, o semplicemente non sei sicuro di farlo da solo e/o ti senti sopraffatto dallo stack, dai un'occhiata a questi fantastici tutorial su `create-t3-app `:

### Articoli

- [Crea un'app full stack con create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)
- [Un primo sguardo a create-t3-app](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrazione della tua app T3 in un Turborepo](https://www.jumr.dev/blog/t3-turbo)

### Video

- [Crea un blog con lo stack T3 - tRPC, TypeScript, Next.js, Prisma e Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Crea un'applicazione di chat dal vivo con lo stack T3 - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [Lo stack T3 - Come l'abbiamo costruito](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [Una panoramica dell'app T3 create (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)

## Perché ci sono file `.js` nel progetto?

Come per [T3-Axiom #3](/it/introduction#typesafety-isnt-optional), prendiamo la typesafety come un cittadino di prima classe. Sfortunatamente, non tutti i framework e i plugin supportano TypeScript, il che significa che alcuni dei file di configurazione devono essere file `.js`.

Cerchiamo di sottolineare che questi file sono javascript per un motivo, dichiarando esplicitamente il tipo di ogni file (`cjs` o `mjs`) a seconda di ciò che è supportato dalla libreria da cui è utilizzato. Inoltre, tutti i file `js` in questo progetto sono ancora sottoposti a typechecking utilizzando un commento `@ts-check` in alto.

## Sto lottando per aggiungere i18n alla mia app. C'è qualche riferimento che posso usare?

Abbiamo deciso di non includere i18n come impostazione predefinita in `create-t3-app` perché è un argomento molto supponente e ci sono molti modi per implementarlo.

Tuttavia, se hai difficoltà a implementarlo e vuoi vedere un progetto di riferimento, abbiamo un [repo di riferimento](https://github.com/juliusmarminge/t3-i18n) che mostra come puoi aggiungere i18n a un'app T3 usando [next-i18next](https://github.com/i18next/next-i18next).

## Perché stiamo usando `/pages` e non `/app` da Next.js 13?

Come da [T3-Axiom #2](/it/introduction#bleed-responsibly), amiamo le cose all'avanguardia ma diamo valore alla stabilità, l'intero router è difficile da portare, [non è un ottimo posto per modernizzare](https://youtu.be/mnwUbtieOuI?t=1662). Mentre `/app` è [uno sguardo al futuro](https://youtu.be/rnsC-12PVlM?t=818), non è pronto per la produzione; L'API è in versione beta e dovrebbe contenere modifiche sostanziali.

Per un elenco delle funzionalità supportate, pianificate e lavorate nella directory `/app`, visita le [documentazioni beta Next.js](https://beta.nextjs.org/docs/app-directory-roadmap#supported-e-funzionalità-pianificate).