---
title: Einleitung
description: Einführung in den T3 Stack
layout: ../../layouts/docs.astro
lang: de
---

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/PbjHxIuHduU" title="Der beste Stack für dein nächstes Projekt" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Der T3 Stack

Der _"T3 Stack"_ ist ein Webentwicklungsstack von [Theo](https://twitter.com/t3dotgg), der sich auf Einfachheit, Modularität und vollständige Typensicherheit konzentriert.

Im Kern besteht er aus [**Next.js**](https://nextjs.org/) und [**TypeScript**](https://typescriptlang.org/). [**Tailwind CSS**](https://tailwindcss.com/) wird auch fast immer verwendet. Sobald Backend-Funktionalitäten benötigt werden, sind [**tRPC**](https://trpc.io/), [**Prisma**](https://prisma.io/) und [**NextAuth.js**](https://next-auth.js.org/) ebenfalls gute Ergänzungen.

Du hast vielleicht bemerkt, dass der T3-Stack viele Bestandteile hat. Das ist so gewollt. Tausche die Teile aus, wenn du sie brauchst - der Stack ist im Kern modular :)

## Also... was ist create-t3-app? Ein Template?

Irgendwie? `create-t3-app` ist eine CLI, die von erfahrenen T3-Stack-Entwicklern entwickelt wurde, um die Einrichtung einer modularen T3-Stack-App zu vereinfachen. Das bedeutet, dass jeder Bestandteil optional ist und das "Template" auf der Grundlage deiner spezifischen Anforderungen erstellt wird.

Nach unzähligen Projekten und vielen Jahren auf diesem Gebiet haben wir viele Meinungen und Erkenntnisse. Wir haben unser Bestes getan, um sie in dieser CLI zu verwirklichen.

Das hier ist **KEINE** allumfassende Vorlage. Wir **erwarten**, dass du deine eigenen Bibliotheken einbringst, die die Anforderungen **DEINER** Anwendung erfüllen. Wir wollen zwar keine Lösungen für spezifischere Probleme wie Zustandsverwaltung und Deployment vorschreiben, aber wir [haben hier einige Empfehlungen aufgelistet](/de/other-recs).

## T3 Grundsätze

Das Projekt wurde nach _unseren Vorstellungen_ gestaltet. Wir teilen eine Reihe an Überzeugungen für das Erstellen von Web-Applikationen und nutzen diese als Basis für unsere Entscheidungen.

### Probleme lösen

Es ist leicht, in die Falle zu tappen, "alles hinzuzufügen" - das wollen wir ausdrücklich nicht tun. Alles, was zu `create-t3-app` hinzugefügt wird, sollte ein spezifisches Problem lösen, das innerhalb der enthaltenen Kerntechnologien existiert. Das bedeutet, dass wir keine Technologien wie Zustandsbibliotheken (`zustand`, `redux`) hinzufügen werden. Wir werden jedoch Dinge wie NextAuth.js, Prisma und tRPC integrieren.

### Modern und verantwortungsbewusst

Wir lieben moderne Technologien. Die Arbeitsgeschwindigkeit und der Spaß aus der Arbeit mit ihnen, ist wirklich cool. Wir denken aber, dass es wichtig ist, verantwortungsvoll zu sein und riskantere Technologien in den weniger riskanten Teilen des Stacks zu verwenden. Das bedeutet, dass wir nicht ⛔️ auf riskante neue Datenbanktechnologien setzen (SQL ist toll!). Aber wir setzen gerne ✅ auf tRPC, da es sich nur auf Funktionen bezieht, die trivial zu verlagern sind.

### Typsicherheit ist nicht optional

Das erklärte Ziel von `create-t3-app` ist es, den schnellsten Weg zu einer neuen, **typsicheren** Full-Stack Webanwendung zu bieten. Wir nehmen die Typsicherheit ernst, da sie unsere Produktivität verbessert und uns hilft, weniger Fehler auszuliefern. Jede Entscheidung, die die Typsicherheit von `create-t3-app` gefährdet, sollte in einem anderen Projekt getroffen werden.
