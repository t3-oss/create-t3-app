---
title: Installasjon
description: Installasjonsveiledning for Create T3 App
layout: ../../layouts/docs.astro
lang: no
---

For å lage en app med `create-t3-app`, kjør en av følgende tre kommandoer og svar på spørsmålene i veiviseren:

### npm

```bash
npm create-t3-app@latest
```

### yarn

```bash
yarn create-t3-app
```

### pnpm

```bash
pnpm create-t3-app@latest
```

Etter at applikasjonen din har blitt opprettet, sjekk ut [første steg](/no/usage/first-steps) for å begynne å utvikle den nye applikasjonen.

## Avansert bruk

| Alternativ/Flagg  | Beskrivelse                                                                            |
| ----------------- | -------------------------------------------------------------------------------------- |
| `[dir]`           | Inkluder et mappeargument med navnet på prosjektet                                     |
| `--noGit`         | Eksplisitt be CLI om ikke å initialisere et nytt git-repo i prosjektet                 |
| `-y`, `--default` | CLI vil bli hoppet over og en ny t3-app vil bli opprettet med alle alternativene valgt |
| `--noInstall`     | Bygger prosjektet uten å installere avhengigheter                                      |

## Eksperimentell bruk

For vår CI (Kontinuerlig Integrasjon) har vi noen eksperimentelle flagg som lar deg opprette skjelett for hvilken som helst app uten noen spørsmål. Hvis denne _use casen_ gjelder deg, kan du bruke disse flaggene. Vær oppmerksom på at disse flaggene er eksperimentelle og kan bli endret i fremtiden uten å følge noen semver-versjonering.

| Flagg        | Beskrivelse                        |
| ------------ | ---------------------------------- |
| `--CI`       | La CLI vite at du er i CI-modus    |
| `--trpc`     | Inkluder tRPC i prosjektet         |
| `--prisma`   | Inkluder Prisma i prosjektet       |
| `--nextAuth` | Inkluder NextAuth.js i prosjektet  |
| `--tailwind` | Inkluder Tailwind CSS i prosjektet |

**Merk: Hvis du utelater CI-flagget har resten flaggene ingen effekt.**

Du trenger ikke å eksplisitt velge bort pakkene du ikke vil ha. Men hvis du vil være eksplisitt, kan du sende `false`, f.eks. `--nextAuth false`.

### Eksempel

Følgende vil lage en T3-app med både tRPC og Tailwind CSS.

```bash
pnpm dlx create-t3-app@latest --CI --trpc --tailwind
```
