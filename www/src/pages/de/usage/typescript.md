---
title: TypeScript
description: Verwendung von TypeScript
layout: ../../../layouts/docs.astro
lang: de
---

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>Build safety nets, not guard rails<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @t3dotgg"
      className="w-12 mr-4 rounded-full bg-neutral-500"
      src="/images/theo_300x300.webp"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Theo - creator of the T3 Stack</span>
      <a
        href="https://twitter.com/t3dotgg"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        @t3dotgg
      </a>
    </div>
  </cite>
</blockquote>

Unabhängig davon, ob du ein neuer oder erfahrener Entwickler bist, denken wir, dass TypeScript ein Muss ist. Es kann auf den ersten Blick einschüchternd wirken, aber wie bei vielen Tools ist es etwas, das man nicht missen möchte, nachdem man angefangen hat, es zu benutzen.

Es bietet Live-Feedback während du deinen Code schreibst. Die erwarteten Datentypen werden definiert und entweder erhalten wir hilfreiche Autovervollständigung in unserem Code-Editor oder es wird uns mit roten Unterstrichen auf ein Problem aufmerksam gemacht z.B. wenn wir versuchen auf eine Eigenschaft zuzugreifen, die nicht existiert oder wenn wir versuchen einen Wert eines falschen Typs zu übergeben. Dadurch können wir Fehler frühzeitig erkennen und beheben ohne erst im Nachhinein debuggen zu müssen.

Es ist wohlmöglich das Werkzeug, das Entwicklern die größte Produktivität bietet; es bietet Dokumentation des geschriebenen Codes direkt in deinem Editor und gibt dir sofortiges Feedback, wenn du unweigerlich Fehler machst. Das ist absolut unbezahlbar.

## Type Inference

Während viele neue TypeScript Entwickler sich mit dem _Schreiben_ von TypeScript beschäftigt, bieten viele der Vorteile von TypeScript gar nicht die Notwendigkeit, deinen Code zu ändern. Insbesondere die Typinferenz. Typinferenz bedeutet, dass wenn etwas typisiert ist, sich dieser Typ durch die gesamte Anwendung bewegt, ohne dass dieser in anderen Teilen der Anwendung erneut deklariert werden muss. Das bedeutet, dass z.B. wenn du die Typen der Argumente einer Funktion definiert hast, der Rest der Funktion in der Regel typesafe ist, ohne dass zusätzlicher TypeScript-spezifischer Code erforderlich ist. Entwickler von Bibliotheken investieren viel Arbeit in die Wartung der Typen ihrer Bibliotheken, was bedeutet, dass wir als Anwender von der Inferenz und der integrierten Dokumentation in deinem Code-Editor profitieren können, die durch diese Typen bereitgestellt werden.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Schau dir das Video von Theo an, warum [du TypeScript wohlmöglich falsch benutzt](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## Mächtige Verwendung von Typinferenz

### Zod

[Zod](https://github.com/colinhacks/zod) ist eine Schema-Validierungs-Bibliothek, die auf TypeScript aufbaut. Schreibe ein Schema, das die einzige Quelle der Wahrheit ("single source of truth") für deine Daten darstellt, und Zod wird sicherstellen, dass deine Daten überall in deiner Anwendung gültig sind. Sogar über Netzwerkgrenzen und externe APIs hinweg.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) bietet dir deklarative, immer aktuelle, automatisch verwaltete "Queries" und "Mutations", die direkt die Entwickler- und Benutzerzufriedenheit verbessern.

## Nützliche Ressourcen

| Resource                                                  | Link                                                              |
| --------------------------------------------------------- | ----------------------------------------------------------------- |
| TypeScript Handbook                                       | https://www.typescriptlang.org/docs/handbook/                     |
| Beginners TypeScript Tutorial                             | https://github.com/total-typescript/beginners-typescript-tutorial |
| Type Challenges                                           | https://github.com/type-challenges/type-challenges                |
| Rodney Mullen of TypeScript (Matt Pocock) Youtube Channel | https://www.youtube.com/c/MattPocockUk/videos                     |
