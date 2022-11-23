---
title: Why CT3A?
description: Why you should pick Create T3 App for your next project
layout: ../../layouts/docs.astro
---

Abbiamo avviato create-t3-app perché [Theo](https://twitter.com/t3dotgg) si è rifiutato di creare un modello delle sue tecnologie preferite. Ispirato da create-next-app, la [CLI di Astro](https://astro.build) e da un amore generale per la sicurezza dei tipi, il team di create-t3-app ha lavorato duramente per creare il miglior punto di partenza possibile per i nuovi progetti T3 Stack.

Se sei interessato a utilizzare Next.js in modo typesafe, questo è il punto di partenza. Se sei curioso di conoscere una delle scelte tecnologiche specifiche che abbiamo fatto, continua a leggere :)

## Perché TypeScript?

Javascript è difficile. Perché aggiungere più regole?

Crediamo fermamente che l'esperienza fornita da TypeScript ti aiuterà a diventare uno sviluppatore migliore. Fornisce feedback in tempo reale mentre scrivi il tuo codice definendo i tipi di dati previsti e fornisce un utile completamento automatico nel tuo editor o ti urla con linee ondulate rosse se stai tentando di accedere a una proprietà che non esiste o provando a passare un valore del tipo sbagliato, che altrimenti dovresti debugure più avanti. Che tu sia un principiante dello sviluppo web o un professionista esperto, il "rigore" di TypeScript fornirà un'esperienza meno frustrante e più coerente rispetto a vanilla JS.

La sicurezza dei tipi ti rende più veloce. Se non sei convinto, [potresti usare TypeScript in modo sbagliato...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)

## Perché Next.js?

Adoriamo React. Ha reso lo sviluppo dell'interfaccia utente accessibile in modi che non avremmo mai immaginato prima. Può anche portare gli sviluppatori su alcuni percorsi accidentati.

Next.js offre un approccio leggermente ostinato e fortemente ottimizzato alla creazione di applicazioni utilizzando React. Dal routing alle definizioni API al rendering delle immagini, ci affidiamo a Next.js per guidare gli sviluppatori verso decisioni corrette.

## Perché tRPC/Prisma/Tailwind/etc?

Sebbene crediamo nel mantenere le cose il più semplici possibile, troviamo che questi pezzi vengono utilizzati in ogni "app" come il progetto che costruiamo. `create-t3-app` fa un ottimo lavoro permettendoti di adottare i pezzi di cui hai bisogno.

### tRPC

tRPC mantiene la promessa di GraphQL di uno sviluppo client senza soluzione di continuità rispetto a un server typesafe senza tutto il boilerplate. È un abuso intelligente di TypeScript che offre un'esperienza di sviluppo incredibile.

### Prisma

Prisma è per SQL ciò che TypeScript è per JS. Ha creato un'esperienza di sviluppo che prima non esisteva. Generando tipi da uno schema definito dall'utente compatibile con [diversi database](https://www.prisma.io/docs/concepts/database-connectors), Prisma garantisce la sicurezza dei tipi end-to-end dal tuo database alla tua app.

Prisma fornisce un'intera [suite di strumenti](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-olisticically-covers-your-database-workflows) semplificando le interazioni quotidiane con il database. In particolare, Prisma Client è responsabile delle query e rende SQL così semplice che ti accorgerai a malapena che lo stai utilizzando, e Prisma Studio è una comoda GUI per il tuo database che ti consente di leggere e manipolare i tuoi dati rapidamente senza dover scrivere codice.

### Tailwind

Tailwind sembra "CSS in modalità zen".

Fornendo elementi costitutivi sotto forma di buoni colori predefiniti, spaziatura e altre primitive, Tailwind semplifica la creazione di un'app di bell'aspetto. E a differenza delle librerie di componenti, non ti trattiene quando vuoi portare la tua app al livello successivo e creare qualcosa di bello e unico.

Inoltre, con il suo approccio in linea, Tailwind ti incoraggia a creare uno stile senza preoccuparti di nominare classi, organizzare file o qualsiasi altro problema non direttamente legato al problema che stai cercando di risolvere.

### NextAuth.js

Quando desideri un sistema di autenticazione nella tua applicazione NextJS, NextAuth.js è un'ottima soluzione per introdurre la complessità della sicurezza senza il fastidio di doverlo creare da solo. Viene fornito con un ampio elenco di provider per aggiungere rapidamente l'autenticazione OAuth e fornisce adattatori per molti database e ORM.