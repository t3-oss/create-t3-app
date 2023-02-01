---
title: FAQ
description: Häufig gestellte Fragen zu Create T3 App
layout: ../../layouts/docs.astro
lang: de
---

Hier sind einige häufig gestellte Fragen zu `create-t3-app`.

## Was kommt als nächstes? Wie erstelle ich eine App mit diesem Tool?

Wir versuchen, dieses Projekt so einfach wie möglich zu halten damit du einfach mit dem Grundgerüst starten kannst, welches wir für dich erstellt haben. Weitere Dinge kannst du später hinzufügen, sobald diese notwendig werden.

Wenn du mit den verschiedenen Technologien, die in diesem Projekt verwendet werden, nicht vertraut bist, dann schau dir bitte die entsprechenden Dokumentationen an. Wenn du weitere Fragen hast, dann trete unserem [Discord](https://t3.gg/discord) bei und frag nach Hilfe.

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Welches Lernmaterial ist aktuell verfügbar?

Auch wenn die unten aufgeführten Ressourcen zu den besten gehören, die für die T3-Stack existieren, empfiehlt die Community (und [Theo](https://youtu.be/rzwaaWH0ksk?t=1436)) dir, dass du einfach mit dem Stack anfängst und etwas damit erstellst, während du lernst.

Wenn du `create-t3-app` in Betracht ziehst, dann hast du wahrscheinlich schon einige Teile des Stacks verwendet. Warum springst du also nicht einfach ins kalte Wasser und lernst die anderen Teile, während du etwas erstellst?

Wir wissen, dass dieser Weg nicht für jeden funktioniert. Wenn du dir also sicher bist, dass du die Empfehlung ausprobiert hast und trotzdem noch einige Ressourcen haben möchtest, oder du einfach nicht selbstbewusst genug bist, um es alleine zu tun und/oder von dem Stack überwältigt bist, dann schau dir diese tollen Tutorials zu `create-t3-app` an:

### Artikel

- [Build a full stack app with create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)
- [A first look at create-t3-app](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrating your T3 App into a Turborepo](https://www.jumr.dev/blog/t3-turbo)

### Videos

- [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [The T3 Stack - How We Built It](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [An overview of the create T3 App (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)

## Warum befinden sich `.js` Dateien im Projekt?

Wie in [T3-Axiom #3](/de/introduction#typesafety-isnt-optional) beschrieben, nehmen wir Typsicherheit sehr ernst. Leider unterstützen nicht alle Frameworks und Plugins TypeScript, was bedeutet, dass einige Konfigurationsdateien `.js`-Dateien sein müssen.

Wir versuchen hervorzuheben, dass diese Dateien aus einem bestimmten Grund in JavaScript geschrieben sind, indem wir den Typ (`cjs` oder `mjs`) jeder Datei explizit deklarieren (abhängig davon, was von der zugehörigen Bibliothek unterstützt wird). Außerdem werden alle `js`-Dateien in diesem Projekt weiterhin mit einem `@ts-check`-Kommentar am Anfang auf korrekte Typen geprüft.

## Ich habe Schwierigkeiten, i18n zu meiner App hinzuzufügen. Gibt es eine Referenz, die ich verwenden kann?

Wir haben uns dazu entschieden, i18n nicht standardmäßig in `create-t3-app` einzubinden, da es ein sehr kontroverses Thema ist und es viele Möglichkeiten gibt, dies zu implementieren.

Wenn du jedoch Schwierigkeiten hast, dies zu implementieren und eine Referenzprojekt sehen möchtest, haben wir ein [Referenzrepo](https://github.com/juliusmarminge/t3-i18n), das zeigt, wie du i18n zu einer T3-App mit [next-i18next](https://github.com/i18next/next-i18next) hinzufügen kannst.

## Warum verwenden wir `/pages` und nicht `/app` von Next.js 13?

Wie in [T3-Axiom #2](/de/introduction#bleed-responsibly) beschrieben lieben wir neue Technologien, jedoch legen wir großen Wert auf Stabilität. Deinen gesamten Router umzuziehen ist schwierig und es ist keine gute Idee an einer so elementaren Stelle diese Risiken einzugehen (siehe [bleed responsibly](<(https://youtu.be/mnwUbtieOuI?t=1662)>)). Auch wenn `/app` ein [Vorgeschmack auf die Zukunft](https://youtu.be/rnsC-12PVlM?t=818) ist, ist es noch nicht für bereit im Produktivbetrieb eingesetzt zu werden. Die API befindet sich noch in der Beta und wird wahrscheinlich noch Breaking Changes haben.

Schau dir die [Beta Next.js Dokumentation](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features) an um eine Liste der unterstützten, geplanten und in Arbeit befindlichen Funktionen im `/app`-Verzeichnis zu sehen.
