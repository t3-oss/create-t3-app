---
title: Vercel
description: Utrulling med Vercel
layout: ../../../layouts/docs.astro
lang: no
---

Vi anbefaler at du ruller ut applikasjonen din til [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). Det gjør det superenkelt å rulle ut Next.js-applikasjoner.

## Prosjektkonfigurasjon

Vercel vil mest sannsynlig automatisk konfigurere byggekommandoen og publisere katalogen din. Du kan imidlertid også spesifisere dette, i tillegg til andre konfigurasjoner, i en fil som heter [`vercel.json`](https://vercel.com/docs/project-configuration) og inkludere følgende kommandoer:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Bruk av Vercel Dashboard

1. Etter å ha pushet koden til et GitHub-repo, logger du på [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) med GitHub og klikker på **Add New Project**.

![Nytt prosjekt på Vercel](/images/vercel-new-project.webp)

2. Importer GitHub-repoet med prosjektet du vil rulle ut.

![Importer repository](/images/vercel-import-project.webp)

3. Legg til miljøvariablene dine.

![Legg til miljøvariabler](/images/vercel-env-vars.webp)

4. Klikk på **Deploy**. Hvis du nå _pusher_ repoet ditt vil Vercel automatisk rulle ut applikasjonen din på nytt!

## Bruke Vercel CLI

For å rulle ut applikasjonen din fra kommandolinjen, må du først [installere](https://vercel.com/docs/cli#installing-vercel-cli) Vercel CLI globalt.

```bash
npm i -g vercel
```

Kjør kommandoen [`vercel`](https://vercel.com/docs/cli/deploying-from-cli) for å rulle ut prosjektet ditt.

```bash
vercel
```

Legg til `--env DATABASE_URL=DIN_DATABASE_URL_HER` for miljøvariabler slik som strengen for databasetilkobling. Bruk `--yes` hvis du vil hoppe over spørsmålene rundt utrullingen og angi standardsvaret for hvert spørsmål.

```bash
vercel --env DATABASE_URL=DIN_DATABASE_URL_HER --yes
```

Etter den første utrullingen vil denne kommandoen rulle ut til en forhåndsvisnings-_branch_. Du må legge til `--prod` for å _pushe_ endringer direkte til produksjonmiljøet.

```bash
vercel --prod
```
