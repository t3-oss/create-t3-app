---
title: Umgebungsvariablen
description: Einführung in create-t3-app
layout: ../../../layouts/docs.astro
lang: de
---

`create-t3-app` benutzt [Zod](https://github.com/colinhacks/zod) um deine Umgebungsvariablen zur Laufzeit _und_ zur Build Time zu validieren. Dazu werden zusätzliche Dateien im `env`-Verzeichnis bereitgestellt:

📁 src/env

┣ 📄 client.mjs

┣ 📄 schema.mjs

┣ 📄 server.mjs

Der Inhalt dieser Dateien mag auf den ersten Blick beängstigend sein, aber keine Sorge, es ist nicht so kompliziert wie es aussieht. Schauen wir uns diese nacheinander an und wie man zusätzliche Umgebungsvariablen hinzufügt.

_TLDR; Wenn du eine neue Umgebungsvariable hinzufügen möchtest, musst du sie sowohl in deiner `.env` als auch in `env/schema.mjs` definieren._

## schema.mjs

In dieser Datei finden die Änderungen statt. Sie enthält zwei Schemas, eines für Server-Umgebungsvariablen und eines für Client-Umgebungsvariablen sowie ein `clientEnv`-Objekt.

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

### Server Schema

Definiere hier dein Server-Umgebungsvariablen-Schema.

Stellt sicher, dass du hier keine Umgebungsvariablen mit dem `NEXT_PUBLIC`-Präfix verwendest. Die Validierung wird fehlschlagen, wenn du dies tust, um dir bei der Erkennung einer ungültigen Konfiguration zu helfen.

### Client Schema

Definiere hier dein Client-Umgebungsvariablen-Schema.

Um sie dem Client zugänglich zu machen, musst du sie mit `NEXT_PUBLIC` präfixen. Die Validierung wird fehlschlagen, wenn du das nicht tust, um dir bei der Erkennung einer ungültigen Konfiguration zu helfen.

### clientEnv Object

In dieser Datei müssen wir auf die Werte vom `process.env`-Objekt zugreifen.

Wir benötigen ein JavaScript-Objekt, welches wir durch das Zod-Schema validieren können und aufgrund der Art, wie Next.js Umgebungsvariablen behandelt. Da wir das `process.env`-Objekt nicht wie ein normales Objekt zerlegen ("destruct") können, müssen wir dies manuell machen.

TypeScript wird dir helfen, sicherzustellen, dass du die Schlüssel sowohl in `clientEnv` als auch in `clientSchema` eingegeben hast.

```ts
// ❌ Das funktioniert nicht. Wir müssen es manuell zerlegen.
const schema = z.object({
  NEXT_PUBLIC_WS_KEY: z.string(),
});

const validated = schema.parse(process.env);
```

## server.mjs & client.mjs

Hier findet die Validierung statt und die validierten Objekte werden exportiert. Diese Dateien solltest du nicht bearbeiten müssen.

## Umgebungsvariablen verwenden

Wenn du deine Umgebungsvariablen verwenden möchtest, kannst du sie aus `env/client.mjs` oder `env/server.mjs` importieren, je nachdem, wo du sie verwenden möchtest:

```ts:pages/api/hello.ts
import { env } from "../../env/server.mjs";

// `env` ist vollständig typisiert und ermöglicht Autovervollständigung
const dbUrl = env.DATABASE_URL;
```

## .env.example

Da die Standard `.env`-Datei nicht versioniert wird, haben wir ebenfalls eine `.env.example`-Datei beigefügt, in der du optional eine Kopie deiner `.env`-Datei mit entfernten geheimen Werten speichern kannst. Dies ist nicht erforderlich, aber wir empfehlen, das Beispiel auf dem neuesten Stand zu halten, um es für Mitwirkende so einfach wie möglich zu machen, ihre Umgebung zum Laufen zu bekommen.

## Umgebungsvariablen hinzufügen

Um sicherzustellen, dass dein Build niemals ohne die Umgebungsvariablen abgeschlossen wird, die das Projekt benötigt, musst du neue Umgebungsvariablen an **zwei** Stellen hinzufügen:

📄 `.env`: Schreibe hier deine Umgebungsvariable wie du es normalerweise in einer `.env`-Datei tun würdest, z.B. `KEY=VALUE`

📄 `schema.mjs`: Füge die entsprechende Validierungslogik für die Umgebungsvariable hinzu, indem du ein Zod-Schema definierst, z.B. `KEY: z.string()`

Optional kannst du auch `.env.example` aktualisieren:

📄 `.env.example`: Füge deine Umgebungsvariable hinzu, aber vergiss nicht, den Wert zu entfernen, wenn dieser geheim ist, z.B. `KEY=VALUE` oder `KEY=`

### Beispiel

_Ich möchte meinen Twitter-API-Token als Server-Umgebungsvariable hinzufügen_

1. Füge die Umgebungsvariable in die `.env`-Datei ein:

```
TWITTER_API_TOKEN=1234567890
```

2. Füge die Umgebungsvariable in `schema.mjs` ein:

```ts
export const serverSchema = z.object({
  // ...
  TWITTER_API_TOKEN: z.string(),
});
```

_**Notiz:** Ein leerer String ist immer noch ein String und deshalb wird `z.string()` einen leeren String als gültigen Wert akzeptieren. Wenn du sicherstellen möchtest, dass die Umgebungsvariable nicht leer ist, kannst du `z.string().min(1)` verwenden._

3. optional: Füge die Umgebungsvariable in `.env.example` ein, aber vergiss nicht, den Wert zu entfernen

```
TWITTER_API_TOKEN=
```
