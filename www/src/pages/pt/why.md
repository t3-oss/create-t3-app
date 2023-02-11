---
title: Por que CT3A?
description: Porque você deve escolher o Create T3 App para o seu próximo projeto
layout: ../../layouts/docs.astro
lang: pt
---

Nós começamos o create-t3-app porque o [Theo](https://twitter.com/t3dotgg) se recusou a criar um template com suas tecnologias favoritas. Inspirado pelo create-next-app, [a CLI do Astro](https://astro.build) e um amor geral pela segurança de tipos, o time do create-t3-app trabalhou duro para construir o melhor ponto de início possível para novos projetos com a T3 Stack.

Se você está interessado em usar o Next.js de uma maneira typesafe, este é o lugar para começar. Se você está curioso sobre alguma das escolhas de tecnologias que fizemos, siga com a leitura :)

## Por que TypeScript?

Javascript é difícil. Pra quê mais regras?

Nos firmemente acreditamos que a experiência que o Typescript proporciona irá te ajudar a ser um desenvolvedor melhor. Ele proporciona feedback instantâneo conforme você escreve seu código definindo os tipos esperados de data, e ou te fornece um autocomplete muito útil no seu editor ou grita por meio de linhas onduladas vermelhas se você está tentando acessar uma propriedade que não existe ou tentando passar um valor do tipo errado, o qual por outro lado você deveria debugar mais adiante. Se você é novo no desenvolvimento web ou um profissional experiente, o "rigor" do TypeScript vai te providenciar uma experiência menos frustrante, e mais consistente que o Javascript padrão.

Segurança de tipo te faz mais rápido. Se você ainda não está convencido, você [deve estar usando o TypeScript errado...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)

## Por que Next.js?

Nós amamos React. Ele tornou o desenvolvimento de interfaces mais acessível de maneira que nunca imaginávamos antes. Ele também pode levar os desenvolvedores para caminhos difíceis.

o Next.js oferece uma abordagem levemente opinada e altamente otimizada de criar aplicações usando React. Desde roteamento até definições de API até renderizações de imagens, nós confiamos que o Next.js levará os desenvolvedores tomarem boas decisões.

## Por que tRPC/Prisma/Tailwind/etc?

Enquanto nós acreditamos em manter as coisas o mais simples o possível, nós frequentemente encontramos essas tecnologias sendo usadas em qualquer "projetinho" que criamos. O `create-t3-app` faz um bom serviço deixando você adotar apenas as peças que precisa.

### tRPC

O tRPC cumpre a promessa do GraphQL de desenvolvimento de cliente contínuo em um servidor typesafe sem todo o boilerplate. É um abuso inteligente do TypeScript que fornece uma experiência de desenvolvimento incrível.

### Prisma

Prisma é para o SQL o que o Typescript é para o JS. Ele criou uma experiência de desenvolvimento que nunca existiu antes. Ao gerar tipos a partir de um esquema definido pelo usuário compatível com [vários bancos de dados](https://www.prisma.io/docs/concepts/database-connectors), o Prisma garante segurança de tipo de ponta-a-ponta do seu banco de dados até o seu aplicativo.

O Prisma oferece todo um [conjunto de ferramentas](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows) fazendo interações diárias com o seu banco de dados mais fácil. Notavelmente, o Prisma Client é responsável por fazer queryes e tornar SQL tão fácil que você mal vai notar que está usando, e o Prisma Studio é uma GUI (Interface Gráfica do Usuário) conveniente para seu banco de dados que te deixa ler e manipular seus dados rapidamente sem ter que escrever código.

### Tailwind CSS

Tailwind é como o "CSS no modo zen".

Ao fornecer blocos de construção na forma de boas cores padrão, espaçamento e outros elementos primitivos, o Tailwind facilita a criação de um aplicativo de boa aparência. E, ao contrário das bibliotecas de componentes, isso não o impede quando você deseja levar seu aplicativo para o próximo nível e criar algo bonito e único.

Além disso, com sua abordagem inline, o Tailwind incentiva você a estilizar sem se preocupar em nomear classes, organizar arquivos ou qualquer outro problema não diretamente relacionado ao problema que você está tentando resolver.

### NextAuth.js

Quando você deseja um sistema de autenticação em seu aplicativo NextJS, o NextAuth.js é uma excelente solução para trazer a complexidade da segurança sem o incômodo de ter que construí-lo sozinho. Ele vem com uma extensa lista de provedores para adicionar rapidamente a autenticação OAuth e fornece adaptadores para muitos bancos de dados e ORMs.
