---
title: Miljøvariabler
description: Introduksjon til create-t3-app
layout: ../../../layouts/docs.astro
lang: no
---

`create-t3-app` bruker [Zod](https://github.com/colinhacks/zod) for å validere miljøvariablene dine ved kjøretid _og_ ved byggetidspunkt. Ytterligere filer er angitt i `env`-katalogen for dette formålet:

📁 src/env

┣ 📄 client.mjs

┣ 📄 schema.mjs

┣ 📄 server.mjs

Innholdet i disse filene kan virke skummelt til å begynne med, men ikke til bekymring, det er ikke så komplisert som det ser ut til. La oss se på disse en etter en og på hvordan du legger til flere miljøvariabler.

_TLDR; Hvis du vil legge til en ny miljøvariabel, må du definere den i både `.env` og `env/schema.mjs`._

## schema.mjs

Endringene skjer i denne filen. Den inneholder to skjemaer, ett for servermiljøvariabler og ett for klientmiljøvariabler.

```ts:env/schema.mjs
export const serverSchema = z.object({
  // DATABASE_URL: z.string().url(),
});

export const clientSchema = z.object({
  // NEXT_PUBLIC_WS_KEY: z.string(),
});
```

### Oppsett av Serverskjema

Definer skjemaet for servermiljøvariablene her.

Pass på at du _ikke_ bruker nøkler med prefikset `NEXT_PUBLIC` her. Validering vil mislykkes hvis du gjør dette for å hjelpe deg med å oppdage en ugyldig konfigurasjon.

### Oppsett av Klientskjema

Definer ditt skjema for klientmiljøvariabeler her.

For å gjøre dem tilgjengelige for klienten, _må_ du prefiksere dem med `NEXT_PUBLIC`. Validering vil mislykkes hvis du ikke gjør det, for å hjelpe deg med å oppdage en ugyldig konfigurasjon.

```ts
// ❌ Dette fungerer ikke. Vi må destrukturere den manuelt.
const schema = z.object({
  NEXT_PUBLIC_WS_KEY: z.string(),
});

const validated = schema.parse(process.env);
```

## server.mjs & client.mjs

Her foregår valideringen og de validerte objektene eksporteres. Du bør ikke redigere disse filene.

## Bruk Miljøvariabler

Hvis du vil bruke miljøvariablene dine, kan du importere dem fra `env/client.mjs` eller `env/server.mjs` avhengig av hvor du vil bruke dem:

```ts:pages/api/hello.ts
import { env } from "../../env/server.mjs";

// `env` er helt typesikker og tillater autofullføring
const dbUrl = env.DATABASE_URL;
```

## .env.example

Siden standard `.env`-filen ikke er versjonert, har vi også inkludert en `.env.example`-fil der du eventuelt kan lagre en kopi av `.env`-filen din med eventuelle hemmeligheter fjernet. Dette er ikke nødvendig, men vi anbefaler å holde eksempelfilen oppdatert for å gjøre det så enkelt som mulig for bidragsytere å få miljøet sitt i gang.

## Legg til Miljøvariabler

For å sikre at _builden_ aldri fullføres uten miljøvariablene som prosjektet trenger, må du legge til nye miljøvariabler **to** steder:

📄 `.env`: Skriv miljøvariabelen din her slik du vanligvis ville gjort i en `.env`-fil, f.eks. `KEY=VALUE`

📄 `schema.mjs`: Legg til riktig valideringslogikk for miljøvariabelen ved å definere et Zod-skjema, f.eks. `KEY: z.string()`

I tillegg kan du også oppdatere `.env.example`:

📄 `.env.example`: Legg til miljøvariabelen din, men ikke glem å fjerne verdien hvis den er hemmelig, for eksempel `KEY=VALUE` eller `KEY=`

### Eksempel

_Jeg vil legge til min Twitter API-token som en servermiljøvariabel_

1. Legg til miljøvariabelen i filen ".env":

```
TWITTER_API_TOKEN=1234567890
```

2. Legg til miljøvariabelen i `schema.mjs`:

```ts
export const serverSchema = z.object({
  // ...
  TWITTER_API_TOKEN: z.string(),
});
```

_**MERK:** En tom streng er fortsatt en streng, så `z.string()` vil godta en tom streng som en gyldig verdi. Hvis du vil forsikre deg om at miljøvariabelen ikke er tom, kan du bruke `z.string().min(1)`._

3. Valgfritt: Inkluder miljøvariabelen i `.env.example`, men ikke glem å fjerne verdien

```
TWITTER_API_TOKEN=
```
