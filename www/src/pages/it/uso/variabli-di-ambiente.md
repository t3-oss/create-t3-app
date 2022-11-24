---
title: Variabili di ambiente
description: Variabili di Ambiente con create-t3-app
layout: ../../../layouts/docs.astro
---

Create-T3-App utilizza [Zod](https://github.com/colinhacks/zod) per convalidare le variabili di ambiente in fase di runtime _e_ buildtime fornendo alcuni file aggiuntivi nella directory `env`:

📁 src/env

┣ 📄 client.mjs

┣ 📄 schema.mjs

┣ 📄 server.mjs

Il contenuto di questi file può sembrare spaventoso a prima vista, ma non preoccuparti, non è così complicato come sembra. Diamo un'occhiata a loro uno per uno e passiamo attraverso il processo di aggiunta di ulteriori variabili d'ambiente.

_TLDR; Se vuoi aggiungere una nuova variabile d'ambiente, devi aggiungerla sia al tuo `.env` che definire il validatore in `env/schema.mjs`._

## schema.mjs

Questo è il file che veramente toccherai. Contiene due schemi, uno per le variabili d'ambiente lato server e uno per il lato client, oltre a un oggetto `clientEnv`.

```ts:env/schema.mjs
export const serverSchema = z.object({
  // DATABASE_URL: z.string().url(),
});

export const clientSchema = z.object({
  // NEXT_PUBLIC_WS_KEY: z.string(),
});

export const clientEnv = {
  // NEXT_PUBLIC_WS_KEY: process.env.NEXT_PUBLIC_WS_KEY,
};
```

### Schema del server

Definisci qui lo schema delle variabili di ambiente lato server.

Assicurati di non prefissare qui le chiavi con `NEXT_PUBLIC`. La convalida fallirà se lo fai per aiutarti a rilevare la configurazione non valida.

### Schema client

Definisci qui lo schema delle variabili di ambiente lato client.

Per esporli al client è necessario prefissarli con `NEXT_PUBLIC`. La convalida fallirà se non lo fai per aiutarti a rilevare la configurazione non valida.

### Oggetto clientEnv

Distruggi "process.env" qui.

Abbiamo bisogno di un oggetto JavaScript con cui possiamo analizzare i nostri schemi Zod e, a causa del modo in cui Next.js gestisce le variabili d'ambiente, non puoi distruggere `process.env` come un normale oggetto, quindi dobbiamo farlo manualmente.

TypeScript ti aiuterà ad assicurarti di aver inserito le chiavi sia in `clientEnv` che in `clientSchema`.

```ts
// ❌ Questo non funziona, dobbiamo distruggerlo manualmente
const schema = z.object({
  NEXT_PUBLIC_WS_KEY: z.string(),
});

const convalidato = schema.parse(process.env);
```

## server.mjs e client.mjs

Qui è dove avviene la convalida e vengono esportati gli oggetti convalidati. Non dovrebbe essere necessario modificare questi file.

## Utilizzo delle variabili d'ambiente

Quando vuoi usare le tue variabili d'ambiente, puoi importarle da `env/client.mjs` o `env/server.mjs` a seconda di dove vuoi usarle:

```ts:pages/api/ciao.ts
import { env } from "../../env/server.mjs";

// `env` è completamente indipendente dai tipi e fornisce il completamento automatico
const dbUrl = env.DATABASE_URL;
```

## .env.example

Poiché il file `.env` predefinito non è impegnato nel controllo della versione, abbiamo incluso anche un file `.env.example`, in cui puoi facoltativamente conservare una copia del tuo file `.env` con eventuali segreti rimossi. Questo non è obbligatorio, ma si consiglia di mantenere l'esempio aggiornato per rendere il più semplice possibile per i nuovi contributori ricreare l'ambiente

## Aggiunta di variabili d'ambiente

Per assicurarti che la tua build non venga mai completata senza le variabili di ambiente necessarie al progetto, dovrai aggiungere nuove variabili di ambiente in **due** posizioni:

📄 `.env`: inserisci la tua variabile d'ambiente come faresti normalmente in un file `.env`, cioè `CHIAVE=VALORE`

📄 `schema.mjs`: aggiungi la logica di convalida appropriata per la variabile di ambiente definendo uno schema Zod, ad es. `CHIAVE: z.string()`

Facoltativamente, puoi anche mantenere aggiornato `.env.example`:

📄 `.env.example`: inserisci la tua variabile d'ambiente, ma assicurati di non includere il valore se è segreto, ad esempio `CHIAVE=VALORE` o `CHIAVE=`

### Esempio

_Voglio aggiungere il mio Token API di Twitter come variabile di ambiente lato server_

1. Aggiungi la variabile d'ambiente a `.env`:

```
TWITTER_API_TOKEN=1234567890
```

2. Aggiungi la variabile d'ambiente a `schema.mjs`:

```ts
export const serverSchema = z.object({
  //...
  TWITTER_API_TOKEN: z.string(),
});
```

_**NOTA:** Una stringa vuota è ancora una stringa, quindi `z.string()` accetterà una stringa vuota come valore valido. Se vuoi assicurarti che la variabile d'ambiente non sia vuota, puoi usare `z.string().min(1)`._

3. opzionale: aggiungi la variabile d'ambiente a `.env.example`, ma non includere il token

```
TWITTER_API_TOKEN=
```