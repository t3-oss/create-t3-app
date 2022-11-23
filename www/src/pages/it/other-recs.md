---
title: Other Recommendations
description: Libraries and Services that we recommend for many projects
layout: ../../layouts/docs.astro
---

Riconosciamo che le librerie incluse in `create-t3-app` non risolvono tutti i problemi. Mentre ti incoraggiamo a iniziare il tuo progetto con le cose che forniamo, arriverà un momento in cui dovrai portare altre librerie. Solo tu puoi sapere di cosa ha bisogno il tuo progetto, ma qui ci sono alcune cose che ci troviamo a consigliare frequentemente.

Queste sono raccomandazioni di singoli collaboratori di create-t3-app e non devono essere viste come approvazioni "ufficiali" da parte del team di create-t3-app o di T3-OSS. _**Si prega di fare le proprie ricerche, soprattutto prima di impegnarsi in servizi a pagamento**_.

## Gestione dello stato

_**Nota dell'editore**_: le librerie di gestione dello stato possono essere ottime, ma spesso non sono necessarie. Gli hook React Query di tRPC dovrebbero essere in grado di prendersi cura dello stato del tuo server. Per lo stato del client, inizia con `useState` di React e raggiungi una di queste opzioni quando ne hai bisogno di più.

### Zustand

**Per non aver mai più usato Redux**

Il "moderno, semplice Redux" di cui non sapevi di aver bisogno. [Poimandres](https://github.com/pmndrs) è sempre affidabile. Puoi creare di tutto, dalle app per videochiamate ai giochi ai server con questa piccola libreria.

- [Home page di Zustand](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Jotai

**Per non aver mai più usato Context**

Per un approccio più atomico, Jotai è difficile da battere. Sempre da [Poimandres](https://github.com/pmndrs), Jotai ti consente di definire singleton che sembrano global useState. Un'ottima opzione per comportamenti con stato che non richiedono ancora una macchina a stati.

- [Home page di Jotai](https://jotai.org/)
- [Jotai GitHub](https://github.com/pmndrs/jotai)

## Librerie di componenti

La maggior parte delle app necessita della stessa manciata di componenti: pulsanti di commutazione, menu a discesa, modali e così via. Queste librerie forniscono componenti eccezionali e accessibili che puoi utilizzare e personalizzare a tuo piacimento.

### Librerie di componenti senza stile

Conosciute anche come librerie senza testa, forniscono ottimi componenti senza stile e accessibili che puoi personalizzare a tuo piacimento. Ecco alcuni consigli.

- [Radix UI](https://www.radix-ui.com/) ti offre un potente set di primitive convenienti e accessibili che puoi modellare con vanilla o Tailwind CSS.

- [Headless UI](https://headlessui.com/) realizzato dal team CSS di Tailwind fornisce anche componenti senza stile e accessibili che si integrano perfettamente con Tailwind CSS.

- [React Aria](https://react-spectrum.adobe.com/react-aria/) fornisce primitive di interfaccia utente accessibili per il tuo sistema di progettazione. Il loro componente Date Picker è di livello superiore.

### Librerie di componenti con stili

**Per quando vuoi solo che la tua app abbia un bell'aspetto**

A volte stai costruendo un progetto in cui vuoi solo che l'interfaccia utente abbia un aspetto decente fuori dagli schemi. Per Admin Dashboards e altri progetti simili, ognuna di queste librerie di componenti farà il suo lavoro.

- [Interfaccia utente Chakra](https://chakra-ui.com)
- [Mantine](https://mantine.dev)

### Autorità di varianza di classe

**Per la creazione di librerie UI**

Crea in modo dichiarativo una libreria dell'interfaccia utente con diverse varianti di colore, dimensione e così via. Quando il tuo progetto raggiunge una scala in cui desideri un set standardizzato di componenti dell'interfaccia utente con più varianti utilizzando Tailwind CSS, CVA è un ottimo strumento.

- [Autorità GitHub per la variazione delle classi](https://github.com/joe-bell/cva)

## Animazioni

Per quando hai bisogno di animazioni nella tua app, ecco i nostri consigli.

### Animazione automatica

**Per animazioni con una sola riga di codice**

La maggior parte delle librerie di animazione cerca di soddisfare ogni possibile caso d'uso e di conseguenza diventa goffa. AutoAnimate è uno strumento a configurazione zero che ti offrirà un miglioramento significativo dell'esperienza utente senza ulteriori sforzi per gli sviluppatori.

- [Home page di AutoAnimate](https://auto-animate.formkit.com/)
- [AutoAnimate GitHub](https://github.com/formkit/auto-animate)
- [Snippet componente AutoAnimate](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Movimento di Framer

**Per animazioni complesse con codice dichiarativo**

Framer Motion fornisce una sintassi semplice e dichiarativa e ti consente di scrivere meno codice per creare qualsiasi cosa, da animazioni complesse a persino gesti.

- [Home page di Framer Motion](https://framer.com/motion)
- [Documentazione Framer Motion](https://www.framer.com/docs/)

## Distribuzioni, infrastrutture, database e CI

### Vercel

**Per l'hosting della tua app**

Vercel ha preso l'inferno delle distribuzioni web e ne ha fatto un'integrazione GitHub imposta e dimentica. Siamo passati a centinaia di migliaia di utenti senza problemi. Alimentato da AWS, solo un'interfaccia decisamente migliore :)

- [Home page di Vercel](https://vercel.com/)
- [App T3 su Vercel](/distribuzione/vercel)

### PlanetScale

**Per i database senza problemi**

PlanetScale è la migliore "piattaforma di database senza server" che abbiamo utilizzato di gran lunga. Distribuzione folle, ottima esperienza di sviluppo e prezzi fantastici. Se stai usando SQL (e si spera Prisma), questo è difficile da battere.

- [Home page di PlanetScale](https://planetscale.com/)

### Railway

**Per l'hosting della tua infra**

"Heroku moderno". Il modo più semplice per far funzionare un vero server. Se Vercel e PlanetScale non sono abbastanza, Railway probabilmente lo è. Puntalo su un repository GitHub e vai.

- [Home page di railway](https://railway.app/)

### Upstash

**Per Redis senza server**

Amiamo Prisma e PlanetScale, ma alcuni progetti richiedono una soluzione più performante. Upstash ti consente di ottenere le prestazioni in memoria di Redis nel tuo progetto serverless, senza dover gestire l'infrastruttura e ridimensionare te stesso.

- [Home page di Upstash](https://upstash.com/)

### Pusher

**Per WebSocket serverless**

Se i WebSocket sono l'obiettivo principale del tuo progetto, potresti prendere in considerazione un backend più tradizionale come [Fastify](https://www.fastify.io/) (che [funziona anche con tRPC!](https://trpc.io/docs/v10/fastify)). Ma per aggiungere rapidamente WebSocket a un'app T3, Pusher è una scelta eccellente.

- [Home page di Pusher](https://pusher.com/)

### Soketi

Soketi è un'alternativa self-hostable, semplice e veloce a Pusher. È completamente compatibile con Pusher SDK che puoi utilizzare per connetterti al server. Anche Soketi serverless è in versione beta.

- [Home page di Soketi](https://soketi.app)
- [Soketi GitHub](https://github.com/soketi/soketi)

## Analisi

I dati utente sono molto preziosi quando crei un'app. Ecco alcuni fornitori di analisi che consigliamo.

### Plausibile

Hai bisogno di analisi? Plausibile è uno dei modi più rapidi per ottenerli. Super minimale. Ha anche un [semplice plugin per Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Home page plausibile](https://plausible.io/)

### Ummami

Umami è un'alternativa self-hostable, semplice, veloce e incentrata sulla privacy a Google Analytics. Puoi distribuirlo molto facilmente con Vercel, Railway, ecc. E con PlanetScale come database.

- [Home page di Umami](https://umami.is/)
- [Umami GitHub](https://github.com/umami-software/umami)

## Altro

### Prossimo analizzatore di pacchetti

A volte può essere difficile determinare cosa verrà incluso nell'output di compilazione per la tua app. Next Bundle Analyzer è un modo semplice per visualizzare e analizzare i bundle JavaScript generati.

- [@next/bundle-analyzer su npm](https://www.npmjs.com/package/@next/bundle-analyzer)