---
title: Next.js
description: Uso do Next.js
layout: ../../../layouts/docs.astro
lang: pt
---

Next.js é um framework back-end para suas aplicações React.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js is a backend framework" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Veja a [Fala do Theo na Next.js Conf](https://www.youtube.com/watch?v=W4UhNo3HAMw) para entender melhor o que é Next.js e como ele funciona.</p>

## Por que devo usá-lo?

Nós amamos React. Ele tornou o desenvolvimento de UI acessível de maneiras que nunca imaginamos antes. Também pode levar os desenvolvedores a alguns caminhos difíceis. O Next.js oferece uma abordagem altamente otimizada e levemente opinada para a criação de aplicações usando o React. Do roteamento às definições de API e à renderização de imagens, confiamos no Next.js para conduzir os desenvolvedores a boas decisões.

Juntando o Next.js com a [Vercel](https://vercel.com/) torna o desenvolvimento e o deploy de aplicações web mais fáceis do que nunca. Sua interface gratuita extremamente generosa e super intuitiva fornece uma solução de apontar e clicar para implantar seu site (Nós ❤️ a Vercel)

## Get Static/Server Props

Um recurso chave do Next.js são seus recursos de busca de dados. É altamente recomendável ler a [documentação oficial](https://nextjs.org/docs/basic-features/data-fetching) para entender como usar cada método e como eles diferem. `getServerSideProps` geralmente é desencorajado, a menos que haja uma boa razão para isso, devido ao fato de que é uma chamada de bloqueio e deixará seu site lento. [Regeneração estática incremental (ISR)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) é uma ótima alternativa para `getServerSideProps` quando os dados são dinâmicos e podem ser buscados de forma incremental.

## Recursos Úteis

| Recurso                            | Link                               |
| ---------------------------------- | ---------------------------------- |
| Documetação do Next.js             | https://nextjs.org/docs            |
| GitHub do Next.js                  | https://github.com/vercel/next.js  |
| Blog do Next.js                    | https://nextjs.org/blog            |
| Discord do Next.js                 | https://nextjs.org/discord         |
| Twitter do Next.js                 | https://twitter.com/nextjs         |
| Canal do Youtube da Vercel/Next.js | https://www.youtube.com/c/VercelHQ |
