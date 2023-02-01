---
title: Vercel
description: Deployment mit Vercel
layout: ../../../layouts/docs.astro
lang: de
---

Wir empfehlen, deine App auf [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) zu deployen da Vercel es super einfach macht, Next.js Apps zu deployen.

## Projektkonfiguration

Vercel wird sehr wahrscheinlich automatisch deinen Build-Befehl konfigurieren und das Verzeichnis veröffentlichen. Du kannst dies aber auch, zusammen mit anderen Konfigurationen, in einer Datei namens [`vercel.json`](https://vercel.com/docs/project-configuration) angeben und folgende Befehle einfügen:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Verwendung des Vercel Dashboards

1. Nachdem du deinen Code in ein GitHub Repository gepusht hast, melde dich bei [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) mit GitHub an und klicke auf **Add New Project**.

![New project on Vercel](/images/vercel-new-project.webp)

2. Importiere das GitHub Repository mit deinem Projekt, welches du deployen möchtest.

![Import repository](/images/vercel-import-project.webp)

3. Füge deine Umgebungsvariablen hinzu.

![Add environment variables](/images/vercel-env-vars.webp)

4. Klicke auf **Deploy**. Wenn du nun einen Push in dein Repository machst, wird Vercel automatisch deine App neu deployen!

## Verwendung der Vercel CLI

Um deine App von der Kommandozeile zu deployen, musst du zuerst die Vercel CLI global [installieren](https://vercel.com/docs/cli#installing-vercel-cli).

```bash
npm i -g vercel
```

Führe den [`vercel`](https://vercel.com/docs/cli/deploying-from-cli) Befehl aus, um dein Projekt zu deployen.

```bash
vercel
```

Füge `--env DATABASE_URL=YOUR_DATABASE_URL_HERE` für Umgebungsvariablen wie die Datenbankverbindung hinzu. Verwende `--yes`, wenn du die Deployment-Fragen überspringen möchtest und die Standardantwort für jede geben möchtest.

```bash
vercel --env DATABASE_URL=YOUR_DATABASE_URL_HERE --yes
```

Nach dem ersten Deployment wird dieser Befehl auf einen Preview-Branch deployen. Du musst `--prod` hinzufügen, um Änderungen direkt auf die Produktivsystem zu pushen.

```bash
vercel --prod
```
