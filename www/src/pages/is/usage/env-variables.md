---
title: Umhverfisbreytur
description: Að byrja með Create T3 App
layout: ../../../layouts/docs.astro
lang: is
---

Create T3 App notar [Zod](https://github.com/colinhacks/zod) til að fullgilda umhverfisbreyturnar þýnar í keyrslu _og_ á byggingartíma með því að bæta við auka skrár í `env` möppuna:

📁 src/env

┣ 📄 client.mjs

┣ 📄 schema.mjs

┣ 📄 server.mjs

Innihald þessara skráa getur litið út skringilega við fyrstu sýn, en þú þarft ekki að hafa áhyggjur, þetta er ekki eins flókið og það sýnist. Skoðum þessar skár eina í einu og förum í gegnum fyrirkomulagið að bæta við auka umhverfisbreytum.

_Í stutt máli: ef þú vilt bæta við nýrri umhverfisbreytu þarftu að bæta henni við í `.env` og skilgreina fullgildingaraðilan í `env/schema.mjs`._

## schema.mjs

Þetta er skráin sem þú vilt vera að vinna með. Hún inniheldur tvö skapalón og umhverfishluti, einn fyrir umhverfisbreyturnar á vefþjóninum og einn fyrir umhverfisbreyturnar hjá biðlaranum.

```ts:env/schema.mjs
export const serverSchema = z.object({
  // DATABASE_URL: z.string().url(),
});

export const serverEnv = {
  // DATABASE_URL: process.env.DATABASE_URL,
};

export const clientSchema = z.object({
  // NEXT_PUBLIC_WS_KEY: z.string(),
});

export const clientEnv = {
  // NEXT_PUBLIC_WS_KEY: process.env.NEXT_PUBLIC_WS_KEY,
};
```

### Server Schema (Skapalón hjá vefþjóninum)

Tilgreindu skapalónið fyrir umhverfisbreyturnar á vefþjóninum þínum hér.

Gakktu um skugga um að þú notar ekki forskeytið `NEXT_PUBLIC` hér. Fullgilding mun mistakast ef þú gerir það, þetta er gert til að hjálpa þér að greina ógildar stillingar.

### Client Schema (Skapalón hjá biðlaranum)

Tilgreindu skapalónið fyrir umhverfisbreyturnar hjá biðlaranum þínum hér.

Til að birta þær til biðlarans þá þarft þú að forskeyta þær með `NEXT_PUBLIC`. Fullgilding mun mistakast ef þú gerir það ekki, þetta er get til að hjálpa þér að greina ógildar stillingar.

### clientEnv Hluturinn

Brjóttu niður `process.env` breytuna hér.

Við þurfum á JavaScript hlut sem við getum notað til að greina Zod-skapalónið, við getum ekki ekki brotið niður `process.env` breytuna eins og venjulegan JavaScript hlut, svo við þurfum að gera það handvirkt.

TypeScript mun aðstoða þig við að tryggja að þú sért búinn að bæta við lyklunum hjá `clientEnv` og `clientSchema`.

````ts

```ts
// ❌ This doesn't work, we need to destruct it manually
const schema = z.object({
  NEXT_PUBLIC_WS_KEY: z.string(),
});

const validated = schema.parse(process.env);
````

## server.mjs & client.mjs

Hér á sér stað fullgildingin og útflutningurinn á fullgilduðum hlutum. Þú ættir ekki að þurfa að breyta þessum skrám.

````ts:env/server.mjs

## Að nota umhverfisbreytur

Þegar þú vilt nota umhverfisbreytur þá getur þú sótt þær úr `env/client.mjs` eða `env/server.mjs` eftir því hvar þú vilt nota þær:

```ts:pages/api/hello.ts
import { env } from "../../env/server.mjs";

// `env` is fully typesafe and provides autocompletion
const dbUrl = env.DATABASE_URL;
````

## .env.example

Þar sem sjálfgefna `.env` skráin er ekki bætt við í útgáfu stjórnun, þá höfum við bætt við `.env.example` skrána sem þú getur valfrjálst haldið afrit af `.env` skránni þinni með öllum leyndum texta fjarlægðann. Þetta er ekki nauðsynlegt, en við mælum með að halda `.env.example` skránni uppfærðri til að gera það sem auðveldast fyrir þá sem vilja taka þátt í þessu verkefni.

Sumir hugbúnaðarrammar og hugbúnaðarbyggingartól, eins og Next.js, mæla með að þú geymir leynda lykla í `.env.local` skránni og kommitta síðan `.env` skránna við verkefnið þitt. Það er ekki mælt með að fylgja þessu, því það gæti gert það auðveldara að óvart að kommitta leyndu lyklunum í verkefninu þínu. Þú ættir í staðinn að geyma leynda lykla í `.env` skránni, og bæta síðan við `.env` skránni í `.gitignore` skránna og aðeins kommitta `.env.example` skránna við verkefnið þitt.

## Að bæta við umhverfisbreytum

Til þess að tryggja að byggingarferlið þið klárist aldrei án nauðsynlegum umhverfisbreytum, þá þarft þú að bæta við nýjum umhverfisbreytum á **tvo** staði.

📄 `.env`: Eins og þú myndir gerir venjulega bættu við þinni umhverfisbreytu í `.env` skránna, t.d. `KEY=VALUE`

📄 `schema.mjs`: Bættu við viðeigandi fullgildungarvirkni fyrir umhverfisbreytuna með því að skilgreina Zod-skapalón, t.d. `KEY: z.string

Valkvætt, þú getur einnig haldið `.env.example` skránni uppfærðri:

📄 `.env.example`: Bættu við umhverfisbreytunni, en passaðu upp á að ekki setja inn gildið ef það er það er leyndur lykill t.d. `KEY=VALUE` eða `KEY=`

### Dæmi

_Mig langar að bæta við Twitter API lyklinum sem umhverfisbreytu_

1. Bættu við umhverfisbreytunni í `.env` skránna:

```
TWITTER_API_TOKEN=1234567890
```

2. Bættu við umhverfisbreytunni í `schema.mjs`:

```ts
export const serverSchema = z.object({
  // ...
  TWITTER_API_TOKEN: z.string(),
});

export const serverEnv = {
  // ...
  TWITTER_API_TOKEN: process.env.TWITTER_API_TOKEN,
};
```

_**ATH** Tómur strengur er enn gildur strengur, svo `z.string()` mun samþykkja tóman streng sem gildi. Ef þú vilt tryggja að umhverfisbreytan sé ekki tóm, þá getur þú notað `z.string().min(1)`._

3. valkvætt: Bættu við umhverfisbreytuna í `.env.example` skránna, en passaðu upp á að ekki setja inn gildið:

```
TWITTER_API_TOKEN=
```
