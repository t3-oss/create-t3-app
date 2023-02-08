---
title: Outras Recomendações
description: Bibliotecas e Serviços que nós recomendamos para vários projetos.
layout: ../../layouts/docs.astro
lang: pt
---

Nós reconhecemos que as bibliotecas inclusas no `create-t3-app` não resolvem todos os problemas. Enquanto nós te encorajamos a começar o seu projeto com as coisas que providenciamos, em algum momento você terá que adicionar novos pacotes. Apenas você pode saber o que o seu projeto precisa, mas aqui estão algumas coisas que nos encontramos recomendando com frequência.

Estas são recomendações de contribuidores individuais do create-t3-app e não devem ser vistas como propriedades "oficiais" pela equipe create-t3-app ou T3-OSS. _**Faça sua própria pesquisa, especialmente antes de se comprometer com serviços pagos**_.

## Gerenciamento de Estado

_**Nota do editor**_: Bibliotecas de gerenciamento de estado podem ser boas, mas normalmente não são necessárias. Os hooks do React Query + tRPC devem ser capazes de tomar conta do seu estado do lado do servidor. Para o lado do cliente, comece com o `useState` do React, e procure por alguma dessas opções quando precisar de mais.

### Zustand

**Para nunca mais usar Redux**

O "moderno e simples Redux", que você não sabia que precisava. Sempre podemos confiar em [Poimandres](https://github.com/pmndrs). Você pode construir tudo, desde aplicativos de videochamada até jogos e servidores com essa pequena biblioteca.

- [Página inicial do Zustand](https://zustand-demo.pmnd.rs/)
- [GitHub do Zustand](https://github.com/pmndrs/zustand)

### Jotai

**Para nunca mais usar Context**

Para uma abordagem mais atômica, o Jotai é difícil de vencer. Também da [Poimandres](https://github.com/pmndrs), Jotai te permite definir singletons que parecem um useState global. Uma boa opção para manipulações de estado que não necessariamente precisam de uma máquina de estado.

- [Página inicial do Jotai](https://jotai.org/)
- [GitHub do Jotai](https://github.com/pmndrs/jotai)

## Biblioteca de Componentes

A maior parte das aplicações necessitam de vários componentes - botões de toggle, menus dropdown, modais, e assim por diante. Essas bibliotecas providenciam components bons, acessíveis e que você pode customizar como achar melhor.

### Bibliotecas de Componentes não estilizados

Também conhecidas como bibliotecas headless, elas providenciam componentes não estilizados, acessíveis e bons que você pode customizar como achar melhor. Aqui estão algumas recomendações

- [Radix UI](https://www.radix-ui.com/) oferece um conjunto poderoso de primitivos convenientes e acessíveis que você pode estilizar com CSS puro ou Tailwind CSS.

- [Headless UI](https://headlessui.com/) feito pela equipe do Tailwind CSS também fornece componentes acessíveis e sem estilo que se integram perfeitamente ao Tailwind CSS.

- [React Aria](https://react-spectrum.adobe.com/react-aria/) fornece primitivos de UI acessíveis para seu design system. Seu componente Date Picker é animal.

### Bibliotecas de Componentes estilizados

**Para quando você quer apenas que seu aplicativo seja OK**

Às vezes, você está construindo um projeto em que deseja apenas que a interface do usuário pareça decente fora da caixa. Para painéis de administração e outros projetos semelhantes, qualquer uma dessas bibliotecas de componentes fará o trabalho.

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)

### Class Variance Authority

**Para criar bibliotecas de UI**

Crie declarativamente uma biblioteca de UI com diferentes variantes de cor, tamanho etc. Quando seu projeto atinge uma escala em que você deseja um conjunto padronizado de componentes de interface do usuário com várias variantes usando Tailwind CSS, o CVA é uma ótima ferramenta.

- [GitHub do Class Variance Authority](https://github.com/joe-bell/cva)

## Animações

Para quando você precisar de animações em seu aplicativo, aqui estão nossas recomendações.

### AutoAnimate

**Para animações com uma única linha de código**

A maioria das bibliotecas de animação tenta satisfazer todos os casos de uso possíveis e, como resultado, torna-se desajeitada. O AutoAnimate é uma ferramenta de configuração zero que oferece uma melhoria significativa no UX sem nenhum esforço adicional do desenvolvedor.

- [Página inicial do AutoAnimate](https://auto-animate.formkit.com/)
- [GitHub do AutoAnimate](https://github.com/formkit/auto-animate)
- [Snippet de um componente com AutoAnimate](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Framer Motion

**Para animações complexas com código declarativo**

O Framer Motion fornece uma sintaxe simples e declarativa e permite que você escreva menos código para criar tudo, desde animações complexas até gestos.

- [Página inicial do Framer Motion](https://framer.com/motion)
- [Documentation do Framer Motion](https://www.framer.com/docs/)

## Deploy, Infraestrutura, Bancos de Dados e CI

### Vercel

**Para hospedar a sua aplicação**

A Vercel tomou conta das implantações da web e transformou-as em uma integração do GitHub definida uma vez e esquecida. Nós escalamos para centenas de milhares de usuários sem problemas. Com tecnologia AWS, apenas uma interface muito melhor :)

- [Página inicial da Vercel](https://vercel.com/)
- [Guia de Deploy Create T3 App na Vercel](/pt/deployment/vercel)

### PlanetScale

**Para bancos de dados sem preocupações**

PlanetScale é a melhor "plataforma de banco de dados serverless" que nós já usamos até então. Insana escalabilidade, boa experiência de desenvolvimento, e preço incomparável. Se você está usando SQL (e esperançosamente Prisma), isso é difícil de bater.

- [Página inicial do PlanetScale](https://planetscale.com/)

### Railway

**Para hospedar sua infra**

É a "Heroku moderna". A maneira mais fácil de colocar um servidor real em funcionamento. Se Vercel e PlanetScale não são suficientes, Railway provavelmente é. Aponte para um repositório do GitHub e pronto.

- [Página inicial da Railway](https://railway.app/)

### Upstash

**Para Redis serverless**

Nós amamos Prisma e PlanetScale, mas alguns projetos precisam de uma solução mais performática. O Upstash permite que você obtenha o desempenho de memória do Redis em seu projeto sem servidor, sem precisar gerenciar a infraestrutura e escalar você mesmo.

- [Página inicial do Upstash](https://upstash.com/)

### Pusher

**Para WebSockets serverless**

Se WebSockets for o foco principal do seu projeto, considere um back-end mais tradicional, como [Fastify](https://www.fastify.io/) (que [também funciona com tRPC!](https://trpc.io/docs/v10/fastify)). Mas para adicionar rapidamente WebSockets a um aplicativo T3, o Pusher é uma excelente escolha.

- [Página inicial do Pusher](https://pusher.com/)

### Soketi

O Soketi é uma alternativa auto-hospedável, simples e rápida ao Pusher. É totalmente compatível com o Pusher SDK, que você pode usar para se conectar ao servidor. Soketi serverless também está em beta.

- [Página inicial do Soketi](https://soketi.app)
- [GitHub do Soketi](https://github.com/soketi/soketi)

## Analytics

Os dados do usuário são muito valiosos quando você está criando um aplicativo. Aqui estão alguns provedores de análise que recomendamos.

### Plausible

Precisa de análise? Plausível é uma das maneiras mais rápidas de obtê-los. Super mínimo. Ele ainda tem um [plugin simples para Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Página inicial do Plausible](https://plausible.io/)

### Umami

Umami é uma alternativa auto-hospedável, simples, rápida e focada em privacidade para o Google Analytics. Você pode implantá-lo facilmente em Vercel, Railway, etc. com PlanetScale como seu banco de dados.

- [Página inicial do Umami](https://umami.is/)
- [GitHub do Umami](https://github.com/umami-software/umami)

## Outros

### Next Bundle Analyzer

Às vezes, pode ser difícil determinar o que será incluído na saída de compilação do seu aplicativo. O Next Bundle Analyzer é uma maneira fácil de visualizar e analisar os pacotes JavaScript gerados.

- [@next/bundle-analyzer no npm](https://www.npmjs.com/package/@next/bundle-analyzer)
