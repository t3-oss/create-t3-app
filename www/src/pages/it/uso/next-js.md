---
title: Next.js
description: Usare Next.js
layout: ../../../layouts/docs.astro
---

Next.js è un framework di backend per le tue applicazioni React.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js è un framework di backend" frameborder="0" allow="accelerometro; riproduzione automatica; scrittura negli appunti; supporto crittografato; giroscopio; picture-in-picture" allowfullscreen></iframe>
</div>

Dai un'occhiata al [Discorso di Theo's allla Next.js Conf](https://www.youtube.com/watch?v=W4UhNo3HAMw) per capire meglio cos'è Next.js e come funziona.</p>

## Perché dovrei usarlo?

Adoriamo React. Ha reso lo sviluppo dell'interfaccia utente accessibile in modi che non avremmo mai immaginato prima. Può anche portare gli sviluppatori su alcuni percorsi accidentati. Next.js offre un approccio leggermente ostinato e fortemente ottimizzato alla creazione di applicazioni utilizzando React. Dal routing alle definizioni API al rendering delle immagini, ci affidiamo a Next.js per guidare gli sviluppatori verso decisioni corrette.

L'associazione di Next.js con [Vercel](https://vercel.com/) rende lo sviluppo e la distribuzione di app Web più semplice che mai. Il loro livello gratuito estremamente generoso e l'interfaccia super intuitiva forniscono una soluzione punta e clicca per implementare il tuo sito (Noi ❤️ Vercel)

## Ottieni props statici/server

Una caratteristica chiave di Next.js sono le sue capacità di recupero dei dati. Consigliamo vivamente di leggere la [documentazione ufficiale](https://nextjs.org/docs/basic-features/data-fetching) per capire come utilizzare ciascun metodo e in che modo differiscono. `getServerSideProps` è generalmente sconsigliato a meno che non ci sia una buona ragione per farlo, poiché è una chiamata bloccante e rallenterà il tuo sito. [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) è un'ottima alternativa a `getServerSideProps` quando i dati sono dinamici e possono essere recuperati in modo incrementale.

## Risorse utili

| Risorsa | Collegamento |
| ------------------------------ | ---------------------------------- |
| Next.js Documentazione | https://nextjs.org/docs |
| Next.js GitHub | https://github.com/vercel/next.js |
| Next.js Blog | https://nextjs.org/blog |
| Next.js Discord | https://nextjs.org/discord |
| Next.js Twitter | https://twitter.com/nextjs |
| Vercel/Next.js Canale YouTube | https://www.youtube.com/c/VercelHQ |