---
title: Installation
description: Anleitung zur Installation von Create T3 App
layout: ../../layouts/docs.astro
lang: de
---

Um eine App mit `create-t3-app` zu erstellen, führe eines der folgenden drei Befehle aus und beantworte die Fragen über dein Terminal:

### npm

```bash
npm create t3-app@latest
```

### yarn

```bash
yarn create t3-app
```

### pnpm

```bash
pnpm create t3-app@latest
```

Nachdem deine App erstellt wurde, schau dir die [ersten Schritte](/de/usage/first-steps) an, um mit der Entwicklung deiner neuen App zu beginnen.

## Erweiterte Nutzung

| Option/Flag       | Beschreibung                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `[dir]`           | Füge ein Ordner Argument hinzu mit dem Namen für das Projekt                                 |
| `--noGit`         | Explizit der CLI sagen, dass keine neues git repo für das Projekt initialisiert werden soll  |
| `-y`, `--default` | Die CLI wird übersprungen und eine neue t3-app mit allen ausgewählten Optionen wird erstellt |
| `--noInstall`     | Erstellt das Projekt ohne die Abhängigkeiten zu installieren                                 |

## Experimentelle Nutzung

Wir haben einige experimentelle Flags, die es dir ermöglichen, eine App ohne jegliche Prompts zu erstellen. Wenn du davon Gebrauch machen möchtest, kannst du diese Flags verwenden. Bitte beachte, dass diese Flags experimentell sind und sich in Zukunft ohne semver Versionierung ändern können.

| Flag         | Beschreibung                                       |
| ------------ | -------------------------------------------------- |
| `--CI`       | Teilt der CLI mit das wir uns im CI Modus befinden |
| `--trpc`     | Fügt tRPC zum Projekt hinzu                        |
| `--prisma`   | Fügt Prisma zum Projekt hinzu                      |
| `--nextAuth` | Fügt NextAuth.js zum Projekt hinzu                 |
| `--tailwind` | Fügt Tailwind CSS zum Projekt hinzu                |

**Hinweis: Wenn du die `CI` Flag nicht angibst, haben die restlichen Flags keine Auswirkung.**

Du musst nicht explizit die Pakete ausschließen, die du nicht möchtest. Wenn du aber explizit sein möchtest, kannst du `false` übergeben, z.B. `--nextAuth false`.

### Beispiel

Die folgende Eingabe würde eine t3-app mit tRPC und Tailwind CSS erstellen.

```bash
pnpm dlx create-t3-app@latest --CI --trpc --tailwind
```
