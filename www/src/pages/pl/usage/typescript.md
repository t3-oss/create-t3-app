---
title: TypeScript
description: Korzystanie z TypeScripta
layout: ../../../layouts/docs.astro
lang: pl
---

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>Buduj siatki bezpieczeństwa, nie barierki<span aria-hidden="true">&quot;</span>
      <br />
      <span className="text-xs opacity-70"><span aria-hidden="true">&quot;</span>Oryginał: Build safety nets, not guard rails<span aria-hidden="true">&quot;</span></span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @alexdotjs"
      className="w-12 mr-4 rounded-full bg-neutral-500"
      src="/images/theo_300x300.webp"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Theo - twórca stacka T3</span>
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

Bez względu na to, czy jesteś nowym deweloperem, czy doświadczonym programistą, uważamy, iż TypeScript jest w tych czasach obowiązkiem. Początkowo może wyglądać strasznie, ale tak jak z większością narzędzi, z czasem nie będziesz chciał już z niego z rezygnować.

Zaopatruje Cię on w feedback na żywo definiując oczekiwane typy danych. Dostarcza także pomocnego autouzupełniania w edytorze lub krzyczy na ciebie czerwonymi podkreśleniami, jeżeli próbujesz uzyskać dostęp do właściwości, która nie istnieje, lub jesli próbujesz przesłać wartość złego typu - co skutkowałoby dłuższym debugowaniem w razie błędu.

Jest to prawdopodobnie narzędzie, które pozwala na największy wzrost produktywności dewelopera; dostarczanie dokumentacji kodu który piszesz, czy też z którego bezpośrednio korzystasz, a także posiadanie nagłego feedbacku w razie nieuniknionych błędów jest bezcenne.

## Type Inference

Podczas gdy wielu nowych deweloperów korzystających z TypeScripta martwi się o mus jego _pisania_, wiele benefitów wynikających z korzystania z tego języka, nie wymaga od ciebie praktycznie żadnej zmiany w kodzie - jednym z tych benefitów jest tzw. "inference". Oznacza to, iż jeśli coś posiada własny typ, typ ten przechodzić będzie przez całe flow aplikacji bez potrzeby jego ponownego definiowania w innych jej miejscach. Jeżeli na przykład zdefiniujesz w jednym miejscu typy argumentów przyjmowanych przez daną funkcję, reszta funkcji będzie typesafe bez potrzeby pisania kodu specyficznego dla TypeScripta. Deweloperzy tworzący biblioteki wkładają dużo wysiłku w utrzymywanie typów dla swoich projektów, co skutkuje tym, iż twórcy aplikacji mogą benefitować zarówno z type inference, jak i z wbudowanej dokumentacji w edytorze kodu, którą typy te dostarczają.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Sprawdź film od Theo - [korzystasz z TypeScripta źle...](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## Wykorzystanie mocnych stron type inference w projektach

### Zod

[Zod](https://github.com/colinhacks/zod) to biblioteka walidacji bazująca na schematach, zbudowana z pomocą TypeScripta. Napisz schemat reprezentujący pojedyncze źródło prawdy, a Zod zapewni poprawność danych w całej aplikacji - nawet wśród zapytań do zewnętrznych API.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) dostarcza deklaratywne, zawsze aktualne automatycznie zarządzane zapytania i mutacje, które bezpośrednio wspomagają zarówno Ciebie jako dewelopera i UX.

## Przydatne Zasoby

| Zasób                                                     | Link                                                              |
| --------------------------------------------------------- | ----------------------------------------------------------------- |
| TypeScript Handbook                                       | https://www.typescriptlang.org/docs/handbook/                     |
| Poradnik TypeScripta dla Początkujących                   | https://github.com/total-typescript/beginners-typescript-tutorial |
| Type Challenges                                           | https://github.com/type-challenges/type-challenges                |
| Kanał YouTube - Rodney Mullen of TypeScript (Matt Pocock) | https://www.youtube.com/c/MattPocockUk/videos                     |
