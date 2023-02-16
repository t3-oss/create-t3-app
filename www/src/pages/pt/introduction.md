---
title: Introdução
description: Introdução à T3 Stack
layout: ../../layouts/docs.astro
lang: pt
---

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/PbjHxIuHduU" title="The best stack for your next project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## A T3 Stack

A _"T3 Stack"_ é uma stack de desenvolvimento web feita por [Theo](https://twitter.com/t3dotgg) focada na simplicidade, modularidade e ser full-stack mantendo a segurança de tipos (typesafe).

As peças principais são o [**Next.js**](https://nextjs.org/) e [**TypeScript**](https://typescriptlang.org/). [**Tailwind CSS**](https://tailwindcss.com/) é quase sempre incluso. Se você está fazendo algo que inclua back-end, [**tRPC**](https://trpc.io/), [**Prisma**](https://prisma.io/), e [**NextAuth.js**](https://next-auth.js.org/) são ótimas adições também.

Talvez você tenha percebido que tem... várias peças. Mas isso é por design. Adicione, retire e troque as peças conforme necessário - essa stack é modular desde o núcleo :)

## Então... o que é o create-t3-app? Um modelo?

Basicamente. O `create-t3-app` é uma CLI (Command Line Interface) construída pelos experientes desenvolvedores da T3 Stack para agilizar a configuração inicial de um aplicativo T3 modular. Isso significa que cada uma das peças é opcional, e o "modelo" é gerado baseado nas suas necessidades específicas.

Depois de incontáveis projetos e muitos anos com essas tecnologias, nós tempos muitas opiniões e percepções. Nós fizemos o nosso melhor para introduzi-las nessa CLI.

Isto **NÃO** é um modelo completo. Nós **esperamos** que você traga suas próprias bibliotecas que resolvam as necessidades da **SUA** aplicação. Enquanto nós não queremos prescrever soluções para problemas específicos como gerenciamento de estado e deploy, nós [possuímos algumas recomendações listadas aqui](/pt/other-recs).

## Axiomas T3

Sejamos francos - este é um _projeto opinado_. Nós compartilhamos um punhado de crenças fundamentais a respeito de desenvolvimento e as tratamos como base para nossas decisões.

### Resolver Problemas

É fácil cair nessa armadilhas de "adicionar tudo" - e nós explicitamente não queremos fazer isso. Tudo adicionado ao `create-t3-app` deve resolver um problema específico que existe dentro das principais tecnologias inclusas. Isso significa que nós não iremos adicionar coisas como bibliotecas de gerenciamento de estado (`zustand`, `redux`) mas iremos adicionar coisas como NextAuth.js e integrar o Prisma e tRPC para você.

### Agir com Responsabilidade

Nós amamos tecnologia de ponta. A quantidade de velocidade e honestamente, diversão que vem com essas coisas novas é realmente muito legal. Nós pensamos que é importante agir com responsabilidade, usando tecnologias mais arriscadas nas partes menos arriscadas. Isso significa que não iríamos ⛔️ apostar em uma nova tecnologia de banco de dados arriscada (SQL é bom!). Porém felizmente ✅ apostar no tRPC uma vez que são só funções triviais de se mover.

## Tipos seguros e bem definidos não são opcionais

O objetivo declarado do `create-t3-app` é providenciar a maneira mais rápida de se começar uma aplicação web full-stack e **typesafe**. Nós levamos segurança de tipo muito a sério nessas partes, já que melhora nossa produtividade e nos ajuda a entregar menos bugs. Qualquer decisão que comprometa a natureza de segurança de tipo do `create-t3-app` é uma decisão que deve ser feita em um projeto diferente.
