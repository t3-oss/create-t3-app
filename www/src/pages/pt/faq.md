---
title: FAQ
description: Perguntas frequentes sobre o Create T3 App
layout: ../../layouts/docs.astro
lang: pt
---

Aqui estão algumas perguntas frequentes sobre o `create-t3-app`.

## O que vem a seguir? Como eu faço uma aplicação com isso?

Nós tentamos manter esse projeto o mais simples o possível, assim você pode começar só com o básico que configuramos pra você, e adicionar mais tarde o que se tornar necessário.

Caso você não esteja familiarizado com as diferentes tecnologias usadas neste projeto, por favor se dirija à documentação respectiva. Se você ainda estiver perdido, sinta-se convidade a entrar na nossa comunidade no [Discord](https://t3.gg/discord) e pedir ajuda.

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Onde aprender sobre a stack?

Por mais que os recursos listados abaixo são alguns dos melhores que existem para a T3 Stack, a comunidade (e o [Theo](https://youtu.be/rzwaaWH0ksk?t=1436)) recomendam que você comece apenas usando a stack e aprendendo enquanto desenvolve e constrói com ela.

Se você está cogitando usar o `create-t3-app`, há altas chances que você já esteja usando algumas partes da stack. Então por que não se jogar de cabeça e aprender outras partes enquanto constrói algo?

Agora, nós percebemos que essa parte não funciona para todos. Então, se você sente que testou as recomendações e ainda assim gostaria de alguns recursos extras, ou só não está confiante em fazer por conta própria e/ou se sente sobrecarregado com a stack, confira esses incríveis tutoriais (infelizmente, só em inglês até o momento) sobre o `create-t3-app`:

### Artigos

- [Build a full stack app with create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)
- [A first look at create-t3-app](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrating your T3 App into a Turborepo](https://www.jumr.dev/blog/t3-turbo)
- [Integrating Stripe into your T3 App](https://blog.nickramkissoon.com/posts/integrate-stripe-t3)

### Vídeos

- [Build a Twitter Clone with the T3 Stack - tRPC, Next.js, Prisma, Tailwind & Zod](https://www.youtube.com/watch?v=nzJsYJPCc80)
- [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [The T3 Stack - How We Built It](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [An overview of the create T3 App (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)

## Por que tem arquivos `.js` no projeto?

Conforme o axioma [Axioma T3 #3](/pt/introduction#segurança-de-tipo-não-é-opcional) nós consideramos _typesafety_ como um cidadão de primeira classe. Infelizmente, nem todos os frameworks e plugins suportam TypeScript, o que significa que alguns arquivos tiveram que ser arquivos `.js`.

Nós buscamos enfatizar que esses arquivos são JavaScript por uma razão, explicitamente declarando cada tipo de arquivo (`cjs` ou `mjs`) dependendo do que é suportado pela biblioteca que o usa. Também, todos os arquivos `js` nesse projeto ainda assim são checados em relação à tipo, usando o comentário `@ts-check` no topo.

## Estou tendo dificuldades em adicionar o i18n ao meu projeto. Existe alguma referência que eu possa usar?

Nós decidimos não incluir o i18n por padrão no `create-t3-app` por conta de ser um tópico muito opinado e haverem muitas maneiras de implementá-lo.

De qualquer forma, se você tiver dificuldades de implementá-lo e quiser ver um projeto de referência, nós temos um [repositório exemplo](https://github.com/juliusmarminge/t3-i18n) que mostra como você pode adicionar o i18n a um T3 app usando [next-i18next](https://github.com/i18next/next-i18next).

## Por que nós estamos usando `/pages` e não `/app` do Next.js 13?

Conforme o [Axioma T3 #2](/pt/introduction#agir-com-responsabilidade), nós amamos _tecnologia de ponta_, porém valorizamos a estabilidade, nosso roteador inteiro é díficil de mover, [não é um bom lugar para utilizar _bleeding edges_](https://youtu.be/mnwUbtieOuI?t=1662). Enquanto `/app` é [instável e experimental](https://youtu.be/rnsC-12PVlM?t=818), não está pronto para produção; a API está em beta e é esperado que possua _breaking changes_.

Para obter uma lista de recursos suportados, planejados e trabalhados no diretório `/app`, visite a [Documentação beta do Next.js](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features).
