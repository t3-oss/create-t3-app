---
title: Warum CT3A?
description: Warum du Create T3 App für dein nächstes Projekt wählen solltest
layout: ../../layouts/docs.astro
lang: de
---

Wir haben mit der Entwicklung create-t3-app begonnen, weil [Theo](https://twitter.com/t3dotgg) keine Vorlage seiner Lieblingstechnologien erstellen wollte. Inspiriert von create-next-app, [Astro's CLI](https://astro.build) und einer allgemeinen Liebe zur Typsicherheit hat das create-t3-app-Team hart gearbeitet, um den bestmöglichen Ausgangspunkt für neue T3 Stack-Projekte zu schaffen.

Wenn du daran interessiert bist Next.js auf eine typsichere Weise zu verwenden, ist dies der richtige Ort um zu beginnen. Wenn du dich dafür interessierst, warum wir welche spezifischen Technologie-Entscheidungen getroffen haben, lies weiter :)

## Warum TypeScript?

JavaScript ist schwer. Warum sollte man noch mehr Regeln hinzufügen?

Wir glauben fest daran, dass das Erlebnis, das TypeScript bietet, dir dabei helfen wird ein besserer Entwickler zu werden.
Es bietet Live-Feedback während du deinen Code schreibst. Die erwarteten Datentypen werden definiert und entweder erhalten wir hilfreiche Autovervollständigung in unserem Code-Editor oder es wird uns mit roten Unterstrichen auf ein Problem aufmerksam gemacht z.B. wenn wir versuchen auf eine Eigenschaft zuzugreifen, die nicht existiert oder wenn wir versuchen einen Wert eines falschen Typs zu übergeben. Dadurch können wir Fehler frühzeitig erkennen und beheben ohne erst im Nachhinein debuggen zu müssen. Egal ob du komplett neu in der Webentwicklung bist oder ein erfahrener Profi, die "Strenge" von TypeScript wird dir ein weniger frustrierendes, konsistenteres Erlebnis bieten als Vanilla JS.

Typsicherheit macht dich schneller. Wenn du nicht überzeugt bist, [verwendest du TypeScript eventuell falsch...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)

## Warum Next.js?

Wir lieben React. Es hat die Entwicklung von UIs zugänglich gemacht, auf eine Art und Weise, die wir uns vorher niemals hätten vorstellen können. Es kann Entwickler jedoch auch auf einige holprige Pfade führen.

Next.js bietet einen leicht von Meinung geprägten, jedoch stark optimierten Ansatz, um Anwendungen mit React zu erstellen. Von Routing über API-Definitionen bis hin zum Rendern von Bildern vertrauen wir darauf, dass Next.js Entwickler zu guten Entscheidungen führt.

## Warum tRPC/Prisma/Tailwind/etc?

Auch wenn Befürworter davon sind, Dinge so einfach wie möglich zu halten, finden wir, dass diese Teile in jeder Anwendung verwendet werden, die wir erstellen. `create-t3-app` macht es einfach für dich die Teile hinzuzufügen, die du benötigst.

### tRPC

tRPC baut auf dem Versprechen von GraphQL auf, eine nahtlose Client-Entwicklung gegen einen typsicheren Server zu ermöglichen, ohne dabei viel Boilerplate zu erzeugen. Es ist ein Missbrauch von TypeScript, der ein unglaubliches Entwicklererlebnis bietet.

### Prisma

Prisma ist zu SQL das Gleiche was TypeScript zu JS ist. Es hat ein Entwicklererlebnis geschaffen, dass es vorher nicht gab.
Prisma garantiert eine End-to-End Typsicherheit von deiner Datenbank bis zu deiner Anwendung, indem es Typen aus einem vom benutzerdefinierten Schema generiert, dass mit [verschiedenen Datenbanken](https://www.prisma.io/docs/concepts/database-connectors) kompatibel ist.

Prisma bietet eine ganze [Reihe von Tools](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows), die das tägliche Arbeiten mit deiner Datenbank einfacher machen. Besonders hervorzuheben ist der Prisma Client, der für das Abfragen verantwortlich und SQL so einfach macht, dass du es kaum bemerkst, dass du es benutzt. Prisma Studio ist eine hilfreiche GUI für deine Datenbank, die es dir erlaubt, deine Daten schnell zu lesen and zu manipulieren, ohne Code schreiben zu müssen.

### Tailwind CSS

Tailwind fühlt sich wie "Zen-Modus CSS" an.

Tailwind ermöglicht es dir eine anschauliche Anwendung zu erstellen, indem es dir die Grundbausteine in Form von guten Standardfarben, Abständen und anderen Primitiven zur Verfügung stellt. Im Gegensatz zu Komponentenbibliotheken wirst du nicht dabei zurück gehalten, wenn deine Anwendung auf das nächste Level bringen möchtest und etwas außergewöhnliches und einzigartiges erstellen möchtest.

Zusätzlich sorgt die "inline" Herangehensweise von Tailwind dafür, dass du dich nicht um Klassennamen, Ordnerstruktur oder andere Probleme sorgen musst, die nicht direkt mit dem Problem zu tun haben, dass du lösen möchtest.

### NextAuth.js

Wenn du ein Authentifizierungssystem in deiner Next.js-Anwendung haben möchtest, ist NextAuth.js eine ausgezeichnete Lösung, um die Komplexität zu vermeiden, es selbst zu bauen. Es kommt mit einer umfangreichen Liste von Providern, um OAuth-Authentifizierung schnell hinzuzufügen und bietet Adapter für viele Datenbanken und ORMs.
