---
title: Introduction
description: Introduction to the T3 Stack
layout: ../../layouts/docs.astro
---

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/PbjHxIuHduU" title="Il miglior stack per il tuo prossimo progetto" frameborder="0" allow="accelerometro; riproduzione automatica; scrittura negli appunti; supporto crittografato; giroscopio; picture-in-picture" allowfullscreen></iframe>
</div>

## La pila T3

Lo _"T3 Stack"_ è uno stack di sviluppo web realizzato da [Theo](https://twitter.com/t3dotgg) incentrato su semplicità, modularità e sicurezza dei tipi full-stack.

I pezzi principali sono [**Next.js**](https://nextjs.org/) e [**TypeScript**](https://typescriptlang.org/). [**Tailwind CSS**](https://tailwindcss.com/) è quasi sempre incluso. Se stai facendo qualcosa di simile al backend, [**tRPC**](https://trpc.io/), [**Prisma**](https://prisma.io/) e [**NextAuth .js**](https://next-auth.js.org/) sono anche ottime aggiunte.

Potresti aver notato che ci sono molti... molti pezzi. Questo è di design. Scambia i pezzi dentro e fuori di cui hai bisogno: questo stack è modulare :)

## Quindi... cos'è l'app create-t3? Un modello?

Tipo? `create-t3-app` è una CLI creata da esperti sviluppatori di T3 Stack per semplificare la configurazione di un'app T3 Stack modulare. Ciò significa che ogni pezzo è facoltativo e il "modello" viene generato in base alle tue esigenze specifiche.

Dopo innumerevoli progetti e molti anni su questa tecnologia, abbiamo molte opinioni e intuizioni. Abbiamo fatto del nostro meglio per codificarli in questa CLI.

Questo **NON** è un modello all-inclusive. **Ci aspettiamo** che tu porti le tue librerie che risolvono le esigenze della **TUA** applicazione. Anche se non vogliamo prescrivere soluzioni a problemi più specifici come la gestione dello stato e la distribuzione, [abbiamo alcune raccomandazioni elencate qui](/altre-raccomandazioni).

## T3 Aximos

Saremo sinceri: questo è un _progetto opinionato_. Condividiamo una manciata di convinzioni fondamentali sulla costruzione e le trattiamo come base per le nostre decisioni.

### Risolvere problemi

È facile cadere nella trappola di "aggiungere tutto" - non volgiamo fare propio questo. Tutto ciò che viene aggiunto a `create-t3-app` dovrebbe risolvere un problema specifico che esiste all'interno delle tecnologie di base incluse. Ciò significa che non aggiungeremo cose come librerie di stato (`zustand`, `redux`) ma aggiungeremo cose come NextAuth.js e integreremo Prisma e tRPC per te.

### Essere all'avanguardia con responsabilmente

Adoriamo la nostra tecnologia all'avanguardia. La velocità e, onestamente, il divertimento che viene fuori da provare cose nuove è davvero fantastica. Pensiamo che sia importante essere all'avanguardia in modo responsabile, utilizzando la tecnologia più rischiosa nelle parti meno rischiose. Ciò significa che non ⛔️ scommetteremmo su una nuova tecnologia di database rischiosa (SQL è fantastico!). Ma ✅ scommettiamo felicemente su tRPC poiché sono solo funzioni banali da spostare.

### La sicurezza dei tipi non è facoltativa

L'obiettivo dichiarato di `create-t3-app` è quello di fornire il modo più rapido per avviare una nuova applicazione web full-stack, **sicura**. Prendiamo sul serio la sicurezza dei tipi in queste parti in quanto migliora la nostra produttività e ci aiuta a spedire meno bug. Qualsiasi decisione che comprometta la natura typesafe di `create-t3-app` è una decisione che dovrebbe essere presa in un progetto diverso.