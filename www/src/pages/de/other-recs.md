---
title: Weitere Empfehlungen
description: Bibliotheken und Dienste, die wir für viele Projekte empfehlen
layout: ../../layouts/docs.astro
lang: de
---

Wir sind uns bewusst darüber, dass die Bibliotheken, die in `create-t3-app` enthalten sind, nicht jedes Problem lösen.
Während wir dich dazu ermutigen möchten dein Projekt mit den Dingen zu beginnen, die wir zur Verfügung stellen, wird es sicherlich zu ein Zeitpunkt kommen, an dem du andere Pakete einbinden musst. Nur du kannst wissen, was dein Projekt braucht, aber hier sind einige Dinge, die wir gerne und häufig empfehlen.

Diese Empfehlungen stammen von einzelnen create-t3-app Mitwirkenden und sollte nicht als "offizielle" Bekanntmachung
durch das create-t3-app Team oder T3-OSS gesehen werden. _**Bitte führe deine eigene Recherche durch, insbesondere bevor du dich für kostenpflichtige Dienste entscheidest**_.

## State Management

_**Hinweis**_: State Management Bibliotheken können großartig sein sind aber oft nicht notwendig. Die tRPC's React Query Hooks sollten in der Lage sein deinen Server State zu verwalten. Für Client State solltest du mit `useState` von React beginnen und auf einer dieser Optionen zurückgreifen, wenn du mehr brauchst.

### Zustand

**Um nie wieder Redux verwenden zu müssen**

Das "moderne, einfache Redux" von dem du nicht wusstest, dass du es brauchst. [Poimandres](https://github.com/pmndrs) kann immer vertraut werden. Mit dieser kleinen Bibliothek kannst du alles von Videokonferenz-Apps bis hin zu Spielen und Servern erstellen.

- [Zustand Homepage](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Jotai

**Um nie wieder Context verwenden zu müssen**

Jotai ist schwer zu schlagen, wenn ein atomarer Ansatz bevorzugt wird. Ebenfalls von [Poimandres](https://github.com/pmndrs). Jotai ermöglicht es dir, Singletons zu definieren, die sich wie globale useState anfühlen. Eine großartige Option für States, die noch nicht eine State Machine benötigen.

- [Jotai Homepage](https://jotai.org/)
- [Jotai GitHub](https://github.com/pmndrs/jotai)

## Komponentenbibliotheken

Die meisten Apps benötigen die gleichen ähnlichen Komponenten - Toggle Buttons, Dropdown Menüs, Modals usw. Diese Bibliotheken bieten großartige, barrierefreie Komponenten, die du verwenden und an deine Bedürfnisse anpassen kannst.

### Ungestaltete Komponentenbibliotheken

Solche Bibliotheken sind auch bekannt als Headless Libraries. Sie bieten großartige, ungestylte und barrierefreie Komponenten, die du nach deinem Geschmack anpassen kannst. Hier sind ein paar Empfehlungen.

- [Radix UI](https://www.radix-ui.com/) bietet dir ein mächtiges Set an praktischen und barrierefreien primitiven Komponenten, die du mit Vanilla CSS, Tailwind CSS und mehr stylen kannst.

- [Headless UI](https://headlessui.com/) wurde von dem Tailwind CSS Team erstellt und bietet ebenfalls ungestylte, barrierefreie Komponenten, die problemlos mit Tailwind CSS verwenden kannst.

- [React Aria](https://react-spectrum.adobe.com/react-aria/) eine große Sammlung an React Hooks um barrierefrei Komponente erstellen zu können. Deren Date Picker ist top.

### Gestaltete Komponentenbibliotheken

**Wenn du einfach nur eine App haben willst, die OK aussieht**

Manchmal möchtest du ein Projekt erstellen, bei dem die UI direkt in Ordnung aussieht. Das könnte zum Beispiel der Fall bei Admin Dashboards oder ähnlichen Projekten sein. Für solche Projekte sind alle diese Komponentenbibliotheken eine gute Wahl.

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)

### Class Variance Authority

**Um UI Bibliotheken zu erstellen**

Ermöglicht es dir deklarativ eine UI Bibliothek mit verschiedenen Farben, Größen usw. Varianten zu erstellen. Wenn dein Projekt eine Größe erreicht hat, bei der du ein standardisiertes Set an UI Komponenten mit mehreren Varianten mit Tailwind CSS haben möchtest, ist CVA ein großartiges Tool.

- [Class Variance Authority GitHub](https://github.com/joe-bell/cva)

## Animationen

Hier sind unsere Empfehlungen, wenn du du Animationen in deiner App benötigst.

### AutoAnimate

**Für Animationen mit nur einer Zeile Code**

Die meisten Animations Bibliotheken versuchen alle möglichen Anwendungsfälle zu erfüllen und werden dadurch unhandlich. AutoAnimate ist ein Tool ohne Konfiguration, das dir eine signifikante UX-Verbesserung ohne zusätzlichen Entwickleraufwand bringt.

- [AutoAnimate Homepage](https://auto-animate.formkit.com/)
- [AutoAnimate GitHub](https://github.com/formkit/auto-animate)
- [AutoAnimate Component Snippet](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Framer Motion

**Für komplexe Animationen mit deklarativem Code**

Framer Motion bietet eine einfache, deklarative Syntax und ermöglicht es dir mit wenig Zeilen an Code komplexe Animationen bis hin zu Gesten zu erstellen.

- [Framer Motion Homepage](https://framer.com/motion)
- [Framer Motion Documentation](https://www.framer.com/docs/)

## Deployments, Infrastruktur, Datenbanken und CI

### Vercel

**Um deine App zu hosten**

Vercel hat das Hosting von Web Apps zu einem Kinderspiel gemacht. Wir haben unsere App auf Hunderttausende von Nutzern hochskaliert und es gab nie Probleme. Betrieben durch AWS und mit einer viel besseren Benutzeroberfläche.

- [Vercel Homepage](https://vercel.com/)
- [Create T3 App Vercel deployment guide](/en/deployment/vercel)

### PlanetScale

**Für Datenbanken ohne sich Sorgen machen zu müssen**

PlanetScale ist die beste "serverless Datenbank Plattform" die wir bisher verwendet haben. Wahnsinnige Skalierbarkeit, großartige Entwicklerzufriedenheit und fantastische Preise. Wenn du SQL verwendest (und hoffentlich Prisma) ist es schwer dies zu schlagen.

- [PlanetScale Homepage](https://planetscale.com/)

### Railway

**Um deine Infrastruktur zu hosten**

"Das moderne Heroku". Die einfachste Möglichkeit einen echten Server hochzufahren. Wenn Vercel und PlanetScale nicht ausreichen, ist Railway wahrscheinlich die beste Wahl. Einfach auf ein GitHub Repo zeigen und loslegen.

- [Railway Homepage](https://railway.app/)

### Upstash

**Für serverless Redis**

Wir lieben Prisma und PlanetScale, aber manche Projekt benötigten manchmal eine performantere Lösung. Upstash ermöglicht es die in-memory Performance von Redis in deinem serverless Projekt zu nutzen, ohne sich um die Infrastruktur und Skalierung kümmern zu müssen.

- [Upstash Homepage](https://upstash.com/)

### Pusher

**Für serverless WebSockets**

Wenn WebSockets der Hauptfokus deines Projekts sind, solltest du vielleicht eine traditionellere Backend Lösung wie [Fastify](https://www.fastify.io/) (welche [auch mit tRPC funktioniert!](https://trpc.io/docs/v10/fastify)) in Betracht ziehen. Für das schnelle Hinzufügen von WebSockets zu einer T3 App ist Pusher eine ausgezeichnete Wahl.

- [Pusher Homepage](https://pusher.com/)

### Soketi

Soketi ist eine selbsthostbare, einfache und schnelle Alternative zu Pusher. Es ist vollständig kompatibel mit der Pusher SDK, welches du verwenden kannst um dich mit dem Server zu verbinden. Soketi serverless befindet sich aktuell noch in der Beta.

- [Soketi Homepage](https://soketi.app)
- [Soketi GitHub](https://github.com/soketi/soketi)

## Analytics

Benutzerdaten sind sehr wertvoll, wenn du eine App entwickelst. Hier sind einige Analytics Provider die wir empfehlen.

### Plausible

Du benötigst Analytics? Plausible ist einer der schnellsten Wege. Super minimal und es gibt sogar ein [einfaches Plugin für Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Plausible Homepage](https://plausible.io/)

### Umami

Umami ist eine selbsthostbare, einfache, schnelle und datenschutzfreundliche Alternative zu Google Analytics. Du kannst es sehr einfach auf Vercel, Railway, etc. mit PlanetScale als Datenbank hosten.

- [Umami Homepage](https://umami.is/)
- [Umami GitHub](https://github.com/umami-software/umami)

## Other

### Next Bundle Analyzer

Manchmal ist es schwierig herauszufinden welcher Code in dem Build Output deiner App enthalten ist. Next Bundle Analyzer ist eine einfache Möglichkeit die JavaScript Bundles zu visualisieren und zu analysieren.

- [@next/bundle-analyzer on npm](https://www.npmjs.com/package/@next/bundle-analyzer)
