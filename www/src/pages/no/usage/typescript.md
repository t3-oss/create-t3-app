---
title: TypeScript
description: Bruk av TypeScript
layout: ../../../layouts/docs.astro
lang: no
---

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>Bygg sikkerhetsnett, ikke rekkverk<span aria-hidden="true">&quot;</span>
    </p>
  </div>
<cite className="flex items-center justify-end pr-4 pb-2">
  <img
      alt="Avatar av @t3dotgg"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="/images/theo_300x300.webp"
    />
    <div className="flex flex-col items-start not-italic">
      <span className="text-sm font-semibold">Theo – skaperen av T3-stakken</span>
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

Enten du er en ny eller erfaren utvikler, synes vi at TypeScript er et must. Det kan virke skremmende i begynnelsen, men som mange verktøy, når du først begynner å bruke det, er det noe du ikke vil være foruten.

Det tilbyr live tilbakemeldinger mens du skriver koden din. De forventede datatypene er definert, og vi får nyttig autofullføring i koderedigeringsprogrammet vårt. Dersom det er et problem får man rød understrek, for eksempel når vi prøver å få tilgang til en attributt som ikke eksisterer eller når vi prøver å angi en verdi av feil type. Dette lar oss identifisere og fikse feil tidlig uten å måtte feilsøke etterpå.

Det er uten tvil verktøyet i stakken som mest øker utvikleres produktivitet; man får dokumentasjon på at koden man skriver er riktig direkte i editoren og man får umiddelbar tilbakemelding når man uunngåelig gjør noen feil. Dette er helt uvurderlig.

## Typeinferens

Mange nye TypeScript-utviklere blir veldig opptatt av å _skrive_ TypeScript, men mange av fordelene med TypeScript kommer av at man ikke trenger å endre koden sin i det hele tatt. Spesielt vha. typeinferens. Typeinferens betyr at når noe er definert med type, så vil den typen følge med gjennom hele applikasjonen uten å måtte redeklareres andre steder. Dette betyr at, for eksempel, når du har definert typene av en funksjons argumenter, er resten av funksjonen typesikker, uten ekstra TypeScript-spesifikk kode. Bibliotekutviklere legger mye arbeid i å vedlikeholde typene eksponert i bibliotekene deres, noe som betyr at vi som brukere kan dra nytte av inferens og den innebygde dokumentasjonen i koderedigeringsprogrammet som tilbys av disse typene.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Se videoen av Theo, hvorfor [det kan hende at du bruker TypeScript feil](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## Gode bruksområder for typeinferens

### Zod

[Zod](https://github.com/colinhacks/zod) er et skjemavalideringsbibliotek bygd på TypeScript. Skriv et skjema som representerer den eneste kilden til sannhet ("single source of truth") for din data, og Zod vil sørge for at din data er gyldig gjennom hele applikasjonenen. Selv på tvers av nettverksgrenser og eksterne API.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) gir deg deklarative, alltid oppdaterte, automatisk administrerte `queries` og `mutations` som direkte forbedrer utvikler- og brukeropplevelsen.

## Nyttige Ressurser

| Ressurser                                                | Link                                                              |
| -------------------------------------------------------- | ----------------------------------------------------------------- |
| TypeScript håndbok                                       | https://www.typescriptlang.org/docs/handbook/                     |
| TypeScript opplæring for nybegynnere                     | https://github.com/total-typescript/beginners-typescript-tutorial |
| Type-utfordringer                                        | https://github.com/type-challenges/type-challenges                |
| Rodney Mullen fra TypeScript (Matt Pocock) Youtube-kanal | https://www.youtube.com/c/MattPocockUk/videos                     |
