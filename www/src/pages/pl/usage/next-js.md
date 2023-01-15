---
title: Next.js
description: Korzystanie z Next.js
layout: ../../../layouts/docs.astro
lang: pl
---

Next.js to backend framework dla aplikacji React.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js is a backend framework" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Zapoznaj się z [rozmową Theo na konferencji Next.js](https://www.youtube.com/watch?v=W4UhNo3HAMw) aby lepiej zrozumieć, czym jest i jak działa Next.js.</p>

## Dlaczego powinienem go używać?

Kochamy Reacta. Zmienił on sposób tworzenia interfejsów na niewyobrażalnie bardziej przystępny. Może on także prowadzić dewelopera za rękę w miejscach, mogących sprawiać problemy. Next.js oferuje lekko kontrowersyjne, bardzo zoptymalizowane podejście do tworzenia aplikacji z pomocą Reacta. Od routingu, przez API, do renderowania zdjęć, ufamy Next.js i wierzymy, że prowadzi nas do dobrych decyzji.

Połączenie Next.jsa z [Vercelem](https://vercel.com/) sprawia, iż pisanie i deploy applikacji staje się łatwieszy niż kiedykolwiek. Ich bardzo hojny darmowy tier i bardzo intuicyjny interfejs zaopatruje Cię w rozwiązanie "point and click", dzięki któremu z łatwością opublikujesz swoją stronę (Kochamy ❤️ Vercela).

## Get Static/Server Props

Kluczową funkcją Next.jsa są jego możliwości fetchowania danych. Bardzo polecamy przejrzenie jego [oficjalnej dokumentacji](https://nextjs.org/docs/basic-features/data-fetching), aby zrozumieć jak korzystać z każdej z tych metod i poznać ich różnice. `getServerSideProps` jest ogólnie odradzane (chyba, że jest dla metody tej BARDZO dobry argument za), z powodu blokowania renderu strony - i przez to jej spowalniania. [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) to dobra anternatywa dla `getServerSideProps`, jeżeli dane są dynamiczne i mogą być pobierane "przyrostowo".

## Przydatne Zasoby

| Zasób                         | Link                               |
| ----------------------------- | ---------------------------------- |
| Dokumentacja Next.js          | https://nextjs.org/docs            |
| GitHub Next.js                | https://github.com/vercel/next.js  |
| Blog Next.js                  | https://nextjs.org/blog            |
| Discord Next.js               | https://nextjs.org/discord         |
| Twitter Next.js               | https://twitter.com/nextjs         |
| Kanał YouTube Vercela/Next.js | https://www.youtube.com/c/VercelHQ |
