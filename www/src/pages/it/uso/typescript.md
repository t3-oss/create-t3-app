---
title: TypeScript
description: Usare TypeScript
layout: ../../../layouts/docs.astro
---

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 arrotondato-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>Costruisci reti di sicurezza, non parapetti<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar di @t3dotgg"
      className="w-12 mr-4 arrotondato-pieno bg-neutro-500"
      src="/images/theo_300x300.webp"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Theo - creatore dello Stack T3</span>
      <a
        href="https://twitter.com/t3dotgg"
        destinazione="_blank"
        rel="noopener noreferrer"
        className="testo-sm"
      >
        @t3dotgg
      </a>
    </div>
  </cite>
</blockquote>

Che tu sia uno sviluppatore nuovo o esperto, pensiamo che TypeScript sia necessario. All'inizio può sembrare intimidatorio, ma proprio come molti strumenti, è qualcosa a cui molti non guardano mai indietro dopo aver iniziato a usarlo.

Fornisce feedback in tempo reale mentre scrivi il tuo codice definendo i tipi di dati previsti e fornisce un utile completamento automatico nel tuo editor di codice o ti urla con linee ondulate rosse se stai tentando di accedere a una proprietà che non esiste o provi a dare un valore del tipo sbagliato, che altrimenti dovresti debugure più avanti.

È, forse, lo strumento che fornisce la maggiore produttività agli sviluppatori; fornire la documentazione del codice che stai scrivendo o consumando direttamente nel tuo editor e avere un feedback immediato quando inevitabilmente commetti errori è assolutamente impagabile.

## Digitare Inferenza

Sebbene molti nuovi sviluppatori di TypeScript si occupino di _scrivere_ TypeScript, molti dei suoi vantaggi in realtà non richiedono affatto di modificare il codice, in particolare l'inferenza. Inferenza significa che se qualcosa viene digitato, quel tipo lo seguirà per tutto il flusso dell'applicazione senza dover essere nuovamente dichiarato in altri punti. Ciò significa che, ad esempio, una volta definiti i tipi degli argomenti accettati da una funzione, il resto della funzione sarà solitamente sicuro per i tipi senza richiedere ulteriore codice specifico di TypeScript. Gli sviluppatori di librerie dedicano molto lavoro al mantenimento dei tipi per le loro librerie, il che significa che noi sviluppatori di applicazioni possiamo trarre vantaggio sia dall'inferenza che dalla documentazione incorporata nell'editor di codice fornito da questi tipi.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="Potresti usare Typescript errato" frameborder="0" allow="accelerometro; riproduzione automatica ; scrittura negli appunti; supporto crittografato; giroscopio; picture-in-picture" allowfullscreen></iframe>
</div>

Guarda il video di Theo su come [potresti usare TypeScript in modo sbagliato](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## Usi potenti dell'inferenza del tipo

### Zod

[Zod](https://github.com/colinhacks/zod) è una libreria di convalida dello schema costruita su TypeScript. Scrivi uno schema che rappresenti un'unica fonte di verità per i tuoi dati e Zod assicurerà che i tuoi dati siano validi in tutta la tua applicazione, anche oltre i confini della rete e le API esterne.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) offre query e mutazioni autogestite dichiarative e sempre aggiornate che migliorano direttamente sia l'esperienza dello sviluppatore che quella dell'utente.

## Risorse utili

| Risorsa | Collegamento |
| -------------------------------------------------- ------- | -------------------------------------------------- --------------- |
| Manuale di TypeScript | https://www.typescriptlang.org/docs/handbook/ |
| Tutorial TypeScript per principianti | https://github.com/total-typescript/beginners-typescript-tutorial |
| Tipo Sfide | https://github.com/type-challenges/type-challenges |
| Il Rodney Mullen di TypeScript (Matt Pocock) | https://www.youtube.com/c/MattPocockUk/videos |