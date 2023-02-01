---
title: Next.js
description: Verwendung von Next.js
layout: ../../../layouts/docs.astro
lang: de
---

Next.js ist ein Backend-Framework für deine React-Anwendungen.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js is a backend framework" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Schau dir [Theo's Next.js Conf talk](https://www.youtube.com/watch?v=W4UhNo3HAMw) um ein besseres Verständnis dafür zu bekommen, was Next.js ist und wie es funktioniert.

## Warum sollte ich es benutzen?

Wir lieben React. Es hat die Entwicklung von UIs zugänglich gemacht, auf eine Art und Weise, die wir uns vorher niemals hätten vorstellen können. Es kann Entwickler jedoch auch
auf einige holprige Pfade führen. Next.js bietet einen leicht von Meinung geprägten, jedoch stark optimierten Ansatz, um Anwendungen mit React zu erstellen. Von Routing über API-Definitionen bis hin zum Rendern von Bildern vertrauen wir darauf, dass Next.js Entwickler zu guten Entscheidungen führt.

Next.js in Kombination mit [Vercel](https://vercel.com/) macht das Entwickeln und Bereitstellen von Webanwendungen einfacher als je zuvor. Deren extrem großzügiges Free-Tier und die extrem intuitive Benutzeroberfläche ermöglicht es dir, deine Seite innerhalb weniger Klicks zu veröffentlichen. (Wir ❤️ Vercel)

## Get Static/Server Props

Ein Hauptmerkmal von Next.js sind die Fähigkeiten zur Datenabfrage. Wir empfehlen dringend, die [offizielle Dokumentation](https://nextjs.org/docs/basic-features/data-fetching) zu lesen, um zu verstehen, wie die Funktionen funktionieren und wie sie sich unterscheiden. `getServerSideProps` wird in der Regel nur dann empfohlen, wenn es einen guten Grund dafür gibt, da es sich um einen blockierenden Aufruf handelt und die Seite verlangsamt. [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) ist eine gute Alternative zu `getServerSideProps`, wenn die Daten dynamisch sind und inkrementell abgerufen werden können.

## Nützliche Ressourcen

| Resource                       | Link                               |
| ------------------------------ | ---------------------------------- |
| Next.js Dokumentation          | https://nextjs.org/docs            |
| Next.js GitHub                 | https://github.com/vercel/next.js  |
| Next.js Blog                   | https://nextjs.org/blog            |
| Next.js Discord                | https://nextjs.org/discord         |
| Next.js Twitter                | https://twitter.com/nextjs         |
| Vercel/Next.js YouTube Channel | https://www.youtube.com/c/VercelHQ |
