---
title: Vercel
description: Deploying to Vercel
layout: ../../../layouts/docs.astro
---

Ti consigliamo di distribuire la tua app su [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). Questa piattaforma semplifica la distribuzione delle app Next.js.

## Configurazione del progetto

Vercel probabilmente configurerà il tuo comando build e pubblicherà automaticamente la directory. Tuttavia, puoi anche specificare queste informazioni insieme ad altre configurazioni creando un file chiamato [`vercel.json`](https://vercel.com/docs/project-configuration) e includendo i seguenti comandi:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Utilizzo della dashboard di Vercel

1. Dopo aver messo il codice su una repository GitHub, registrati a [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) con GitHub e fai clic su **Aggiungi nuovo progetto**.

![Nuovo progetto su Vercel](/images/vercel-new-project.webp)

2. Importa la repository GitHub nel tuo progetto.

![Importa repository](/images/vercel-import-project.webp)

3. Aggiungi le tue variabili di ambiente.

![Aggiungi variabili d'ambiente](/images/vercel-env-vars.webp)

4. Fai clic su **Distribuisci**. Ora ogni volta che invii una modifica alla tua repository, Vercel ridistribuirà automaticamente la tua app!

## Utilizzo dell'interfaccia a riga di comando di Vercel

Per distribuire dalla riga di comando devi prima [installare la CLI di Vercel a livello globale](https://vercel.com/docs/cli#installing-vercel-cli).

``` bash
npm i -g vercel
```

Esegui il comando [`vercel`](https://vercel.com/docs/cli/deploying-from-cli) per distribuire il tuo progetto.

``` bash
vercel
```

Includere `--env DATABASE_URL=YOUR_DATABASE_URL_HERE` per le variabili di ambiente come la stringa di connessione al database. Usa `--yes` se vuoi saltare le domande sulla distribuzione e dare la risposta predefinita per ognuna.

``` bash
vercel --env DATABASE_URL=IL TUO_DATABASE_URL_QUI --sì
```

Dopo la prima distribuzione, questo comando verrà distribuito in un ramo di anteprima. Dovrai includere `--prod` per inviare le modifiche direttamente al sito live per future distribuzioni.

``` bash
vercel --prod
```