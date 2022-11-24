---
title: Installazione
description: Istruzioni di Installazione per Create T3 App
layout: ../../layouts/docs.astro
---

Per eseguire la creazione di un'app utilizzando "create-t3-app", esegui uno dei seguenti tre comandi e rispondi alle domande del prompt dei comandi:

### npm

``` bash
npm create t3-app@latest
```

### yarn

``` bash
yarn create t3-app
```

### pnpm

``` bash
pnpm create t3-app@latest
```

Dopo che la tua app è stata create, dai un'occhiata ai [primi passaggi](uso/primi-passi) per iniziare con la tua nuova applicazione.

## Utilizzo avanzato

| Opzione/Bandiera | Descrizione |
| ----------------- | -------------------------------------------------- --------------------- |
| `[dir]` | Includere un argomento di directory con un nome per il progetto |
| `--noGit` | Indica esplicitamente alla CLI di non inizializzare un nuovo repository git nel progetto |
| `-y`, `--default` | Ignora la CLI e avvia una nuova app t3 con tutte le opzioni selezionate |
| `--noInstall` | Genera progetto senza installare niente |

## Uso sperimentale

Per il nostro CI, abbiamo alcuni flag sperimentali che ti consentono di eseguire lo scaffolding di qualsiasi app senza alcuna richiesta. Se questo caso d'uso si applica a te, puoi utilizzare questi flag. Si prega di notare che questi flag sono sperimentali e potrebbero cambiare in futuro senza seguire il controllo delle versioni semver.

| Bandiera | Descrizione |
| ------------ | ----------------------------------- |
| `--CI` | Fai sapere alla CLI che sei in modalità CI |
| `--trpc` | Includi tRPC nel progetto |
| `--prisma` | Includere Prisma nel progetto |
| `--nextAuth` | Includi NextAuth.js nel progetto |
| `--tailwind` | Includi Tailwind CSS nel progetto |

**Nota: se non fornisci il flag `CI`, il resto di questi flag non ha effetto.**

Non è necessario rinunciare esplicitamente ai pacchetti che non si desidera. Tuttavia, se preferisci essere esplicito, puoi passare `false`, ad es. `--nextAuth false`.

### Esempio

Quanto segue creara un'app T3 con tRPC e Tailwind CSS.

``` bash
pnpm dlx create-t3-app@latest --CI --trpc --tailwind
```