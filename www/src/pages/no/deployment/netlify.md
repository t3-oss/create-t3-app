---
title: Netlify
description: Utrulling med Netlify
layout: ../../../layouts/docs.astro
---

Netlify er en alternativ distribusjonsleverandør på samme måte som Vercel. Se [`ajcwebdev/ct3a-netlify`](https://github.com/ajcwebdev/ct3a-netlify) for et eksempel-repo basert på dette dokumentet.

## Hvorfor hoste på Netlify

Konvensjonell visdom tilsier at Vercel har en overlegen støtte for Next.js fordi Vercel utvikler Next.js. De har en egeninteresse i å sikre at plattformen er innstilt for optimal ytelse og best utvikleropplevelse med Next.js. For de fleste brukstilfeller vil dette være sant, og det vil ikke være fornuftig å avvike fra standardbanen.

Det er også en felles oppfatning at mange Next.js-funksjoner kun støttes på Vercel. Selv om det er sant at nye Next.js-funksjoner vil bli testet og støttet på Vercel på utgivelsestidspunktet som standard, er det også slik at andre leverandører som Netlify raskt vil [implementere og gi ut støtte](https://www.netlify.com/blog/deploy-nextjs-13/) for [stabile Next.js-funksjoner](https://docs.netlify.com/integrations/frameworks/next-js/overview/).

Det er noen fordeler og ulemper for alle distribusjonsleverandører siden ingen enkelt leverandør kan ha den beste støtten for alle brukstilfeller. For eksempel bygde Netlify sin egen [tilpassede Next.js kjøretid](https://github.com/netlify/next-runtime) for Netlifys Edge-funksjoner (som kjører på Deno Deploy) og [opprettholder unik mellomvare for å få tilgang til og endre HTTP-responser](https://github.com/netlify/next-runtime#nextjs-middleware-on-netlify).

> _MERK: For å følge statusen til ustabile Neste 13-funksjoner, se [Bruk av Next 13 `app` -katalogen på Netlify](https://github.com/netlify/next-runtime/discussions/1724)._

## Prosjektkonfigurasjon

Det er mange måter å konfigurere byggeinstruksjonene på, inkludert direkte gjennom Netlify CLI- eller Netlify-dashbordet. Selv om det ikke er nødvendig, er det tilrådelig å opprette og inkludere en [`netlify.toml`](https://docs.netlify.com/configure-builds/file-based-configuration/) fil. Dette sikrer at forka og klonede versjoner av prosjektet blir enklere å rulle ut på en reproduserbar måte.

```toml
[build]
  command = "next build"
  publish = ".next"
```

## Bruk av Netlify-dashbordet

1. Push koden din til et GitHub-repo og registrer deg for [Netlify](https://app.netlify.com/signup). Etter at du har opprettet en konto, klikker du på **Add new site** og deretter **Import an existing project**.

![Nytt prosjekt på Netlify](/images/netlify-01-new-project.webp)

2. Koble til Git-leverandøren din.

![Importer repository](/images/netlify-02-connect-to-git-provider.webp)

3. Velg prosjektets repository.

![Velg prosjektets repository](/images/netlify-03-pick-a-repository-from-github.webp)

4. Netlify vil oppdage om du har en `netlify.toml`-fil og automatisk konfigurere build-kommandoen og publiseringskatalogen.

![Nextjs byggeinnstillinger](/images/netlify-04-configure-build-settings.webp)

5. Klikk **Show advanced** og deretter **New variable** for å legge til miljøvariablene dine.

![Legg til miljøvariabler](/images/netlify-05-env-vars.webp)

6. Klikk på **Deploy site**, vent til bygget er fullført, og se det nye nettstedet ditt.

## Bruk av Netlify CLI

For å rulle ut fra kommandolinjen må du først pushe prosjektet til et GitHub-repo og [installere Netlify CLI](https://docs.netlify.com/cli/get-started/). Du kan installere `netlify-cli` som en prosjektavhengighet eller installere den globalt på maskinen din med følgende kommando:

```bash
npm i -g netlify-cli
```

For å teste prosjektet ditt lokalt, kjør [`ntl dev`](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment) kommando og åpne [`localhost:8888`](http://localhost:8888/) for å se din lokalt kjørende Netlify-app:

```bash
ntl dev
```

Kjør [`ntl init`](https://docs.netlify.com/cli/get-started/#continuous-deployment) kommando for å konfigurere prosjektet:

```bash
ntl init
```

Importer prosjektets miljøvariabler fra `.env`-filen din med [`ntl env:import`](https://cli.netlify.com/commands/env#envimport):

```bash
ntl env:import .env
```

Rull ut prosjektet ditt med [`ntl deploy`](https://docs.netlify.com/cli/get-started/#manual-deploys). Du må ha med `--build`-flagget for å kjøre build-kommandoen før utrullingen og `--prod`-flagget for å rulle ut til nettstedets hoved-URL:

```bash
ntl deploy --prod --build
```

For å se et kjørende eksempel på Netlify, besøk [ct3a.netlify.app](https://ct3a.netlify.app/).
