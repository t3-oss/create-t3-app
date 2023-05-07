---
title: Flere anbefalinger
description: Biblioteker og tjenester som vi anbefaler til mange prosjekter
layout: ../../layouts/docs.astro
lang: no
---

Vi er klar over at bibliotekene som er inkludert i `create-t3-app` ikke løser alle problemer.
Selv om vi oppfordrer deg til å starte prosjektet med tingene vi tilbyr, vil det garantert komme en tid da du må inkludere andre pakker. Bare du kan vite hva prosjektet ditt trenger, men her er noen ting vi ofte anbefaler å bruke.

Disse anbefalingene er gitt av individuelle create-t3-app-bidragsytere og skal ikke tas som "offisielle" godkjenninger gitt av create-t3-app-teamet eller T3-OSS. _**Vennligst gjør din egen undersøkelse, spesielt før du velger betaltingstjenester**_.

## Statehåndtering

_**Merk**_: Statehåndteringsbiblioteker kan være flotte, men er ofte ikke nødvendige. tRPCs React Query Hooks skal kunne håndtere serverstaten din. For state på klientsiden bør du starte med Reacts `useState` og vurdere ett av disse alternativene hvis du trenger noe mer omfattende.

### Zustand

**For aldri å måtte bruke Redux igjen**

Den "moderne, enkle Reduxen" du ikke visste du trengte. [Poimandres](https://github.com/pmndrs) kan du alltid stole på. Med dette lille biblioteket kan du bygge alt fra videokonferanseapper til spill og servere.

- [Zustand Hjemmeside](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Jotai

**For aldri å måtte bruke Context igjen**

Jotai er vanskelig å slå når en atomær tilnærming er foretrukket. Også av [Poimandres](https://github.com/pmndrs). Jotai lar deg definere _singletons_ som føles som global `useState`. Et flott alternativ for stateful adfærd som ennå ikke trenger en statemaskin.

- [Jotai Hjemmeside](https://jotai.org/)
- [Jotai GitHub](https://github.com/pmndrs/jotai)

## Komponentbibliotek

De fleste applikasjoner krever den samme håndfullen komponenter – toggleknapper, dropdownmenyer, modaler osv. Disse bibliotekene gir flotte, tilgjengelige komponenter som du kan bruke og tilpasse etter dine egne behov.

### Ustilte Komponentbiblioteker

Slike biblioteker er også kjent som hodeløse biblioteker. De tilbyr flotte, ustilte og tilgjengelige komponenter som du kan tilpasse etter din smak. Her er noen anbefalinger.

- [Radix UI](https://www.radix-ui.com/) tilbyr deg et kraftig sett med praktiske og tilgjengelige primitive komponenter som du kan style med vanilla CSS eller Tailwind CSS.

– [Headless UI](https://headlessui.com/) ble opprettet av Tailwind CSS-teamet og tilbyr også ustilte, tilgjengelige komponenter som enkelt kan lages med Tailwind CSS.

- [React Aria](https://react-spectrum.adobe.com/react-aria/) en stor samling av React-hooks for å lage tilgjengelige komponenter. Datovelgeren deres er aldeles toppnivå.

### Stylede Komponentbiblioteker

**Hvis du bare vil ha en app som ser helt OK ut**

Noen ganger vil du lage et prosjekt der brukergrensesnittet ser helt ordinært ut. Dette kan være tilfelle med f.eks. admin dashboards eller lignende prosjekter. For slike prosjekter er alle disse komponentbibliotekene gode valg.

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)

### Class Variance Authority

**For å lage UI-biblioteker**

Lar deg deklarativt lage et brukergrensesnittbibliotek med forskjellige varianter av farger, størrelser osv. Hvis prosjektet ditt har nådd en størrelse der du vil ha et standardisert sett med UI-komponenter med flere varianter enn ved å bruke Tailwind CSS, er CVA et flott verktøy.

- [Class Variance Authority GitHub](https://github.com/joe-bell/cva)

## Animasjoner

Her er våre anbefalinger hvis du trenger animasjoner i applikasjon din.

### AutoAnimate

**For animasjoner med bare én kodelinje**

De fleste animasjonsbiblioteker forsøker å oppfylle alle mulige brukstilfeller og blir dermed uhåndterlig. AutoAnimate er et nullkonfigurasjonsverktøy som gir deg betydelige UX-forbedringer uten ytterligere utviklerinnsats.

- [AutoAnimate Hjemmeside](https://auto-animate.formkit.com/)
- [AutoAnimate GitHub](https://github.com/formkit/auto-animate)
- [AutoAnimate Komponentkodebit](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Framer Motion

**For komplekse animasjoner med deklarativ kode**

Framer Motion tilbyr en enkel, deklarativ syntaks og lar deg lage komplekse animasjoner og til og med gestikuleringer med bare noen få linjer kode.

- [Framer Motion Hjemmeside](https://framer.com/motion)
- [Framer Motion Dokumentasjon](https://www.framer.com/docs/)

## Implementeringer, Infrastruktur, Databaser og CI

### Vercel

**For å hoste applikasjonen din**

Vercel har gjort web-app-hosting til en lek. Vi har skalert applikasjonen vår til hundretusenvis av brukere, og vi har aldri støtt på noen problemer. Vercel bruker AWS-teknologi, og tilbyr et mye bedre brukergrensesnitt enn mange andre tjenester.

- [Vercels Hjemmeside](https://vercel.com/)
- [Create T3 App Vercel-utrullingsveiledning](/no/deployment/vercel)

### PlanetScale

**For databaser uten å måtte bekymre deg**

PlanetScale er den beste "serverløse databaseplattformen" vi har brukt så langt. Vanvittig skalerbarhet, meget utviklervennlig og fantastiske priser. Hvis du bruker SQL (og forhåpentligvis Prisma) er dette vanskelig å slå.

- [PlanetScale Hjemmeside](https://planetscale.com/)

### Railway

**For å hoste infrastrukturen din**

"Den moderne Heroku". Den enkleste måten å starte en ekte server på. Hvis Vercel og PlanetScale ikke er nok, er Railway sannsynligvis det beste alternativet. Bare pek på et GitHub-repo og kom i gang.

- [Railway Homepage](https://railway.app/)

### Upstash

**For serverløse Redis**

Vi elsker Prisma og PlanetScale, men enkelte prosjekter tremger noen ganger en mer effektiv løsning. Upstash lar deg bruke minneytelsen til Redis i ditt serverløse prosjekt uten å måtte bekymre deg for infrastruktur og skalering.

- [Upstash hjemmeside](https://upstash.com/)

### Pusher

**For serverløse WebSockets**

Hvis WebSockets er hovedfokuset for prosjektet ditt, kan det være lurt å vurdere en mer tradisjonell backend-løsning som [Fastify](https://www.fastify.io/) (som [også fungerer med tRPC!](https://trpc.io/docs/v10/fastify)). For raskt å legge til WebSockets i en T3-app er Pusher et utmerket valg.

- [Pusher Hjemmeside](https://pusher.com/)

### Soketi

Soketi er et selvhostende, enkelt og raskt alternativ til Pusher. Det er helt kompatibel med Pusher SDK, som du kan bruke til å koble til serveren. Soketi serverless er fortsatt i beta.

- [Soketi Hjemmeside](https://soketi.app)
- [Soketi GitHub](https://github.com/soketi/soketi)

## Analytics

Brukerdata er svært verdifullt når du skal utvikle en app. Her er noen analyseleverandører vi anbefaler.

### Plausible

Trenger du analyser? Plausibel er en av de raskeste måtene. Superminimal. Og den har til og med en [enkel plugin for Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Plausible Hjemmeside](https://plausible.io/)

### Umami

Umami er et åpen kilde, selvhostende, enkelt, raskt og personvernvennlig alternativ til Google Analytics. Du kan hoste det veldig enkelt på Vercel, Railway, osv. med PlanetScale som database.

- [Umami Hjemmeside](https://umami.is/)
- [Umami GitHub](https://github.com/umami-software/umami)

## Annet

### Neste Bundle Analyzer

Noen ganger er det vanskelig å finne ut hvilken kode som inkluderes i byggeutdataen til applikasjonen din. Next Bundle Analyzer er en enkel måte å visualisere og analysere JavaScript-bundler på.

- [@next/bundle-analyzer på npm](https://www.npmjs.com/package/@next/bundle-analyzer)
