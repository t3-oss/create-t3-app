---
title: TypeScript
description: Uso do TypeScript
layout: ../../../layouts/docs.astro
lang: pt
---

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>"Construa redes de segurança, não grades de proteção"<span aria-hidden="true">&quot;</span>
      <small>(traduzido)</small>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @t3dotgg"
      className="w-12 mr-4 rounded-full bg-neutral-500"
      src="/images/theo_300x300.webp"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Theo - Criador da T3 Stack</span>
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

Seja você um desenvolvedor novo ou experiente, achamos que o TypeScript é obrigatório. Pode parecer intimidador no começo, mas, assim como muitas ferramentas, é algo que muitos nunca voltam atrás depois de começar a usá-lo.

Ele fornece feedback instantâneo enquanto você escreve seu código definindo os tipos de dados esperados e fornece autocomplete em seu editor de código ou grita com você com linhas onduladas vermelhas se você estiver tentando acessar uma propriedade que não existe ou tentando passe um valor do tipo errado, que de outra forma você teria que depurar mais adiante.

É, talvez, a ferramenta que mais produtividade oferece aos desenvolvedores; fornecer documentação do código que você está escrevendo ou consumindo diretamente em seu editor e ter feedback instantâneo quando você inevitavelmente cometer erros é absolutamente inestimável.

## Inferência de Tipos

Embora muitos novos desenvolvedores TypeScript se preocupem em _escrever_ TypeScript, muitos de seus benefícios na verdade não exigem que você altere seu código, em particular a inferência. Inferência significa que se algo for digitado, esse tipo o seguirá ao longo do fluxo do aplicativo sem precisar ser declarado novamente em outros lugares. Isso significa que, por exemplo, uma vez que você tenha definido os tipos de argumentos que uma função usa, o restante da função geralmente será typesafe sem exigir nenhum código adicional específico do TypeScript. Os desenvolvedores de bibliotecas trabalham muito para manter os tipos de suas bibliotecas, o que significa que nós, como desenvolvedores de aplicativos, podemos nos beneficiar da inferência e da documentação integrada em seu editor de código fornecida por esses tipos.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Confira o vídeo de Theo sobre como [você pode estar usando o TypeScript errado](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## Usos poderosos da inferência de tipos

### Zod

O [Zod](https://github.com/colinhacks/zod) é uma biblioteca de validação de esquema construída sobre TypeScript. Escreva um esquema que represente uma fonte única de verdade para seus dados, e o Zod garantirá que seus dados sejam válidos em todo o aplicativo, mesmo nos limites da rede e APIs externas.

### Tanstack Query

O [Tanstack Query](https://tanstack.com/query/v4/) fornece consultas (queries) e mutações (mutations) declarativas, sempre atualizadas e autogerenciadas que melhoram diretamente as experiências do desenvolvedor e do usuário.

## Recursos Úteis

| Recurso                                                    | Link                                                              |
| ---------------------------------------------------------- | ----------------------------------------------------------------- |
| Manual do TypeScript                                       | https://www.typescriptlang.org/docs/handbook/                     |
| Tutorial de TypeScript para iniciantes                     | https://github.com/total-typescript/beginners-typescript-tutorial |
| Desafios de Tipos                                          | https://github.com/type-challenges/type-challenges                |
| Rodney Mullen do canal do YouTube TypeScript (Matt Pocock) | https://www.youtube.com/c/MattPocockUk/videos                     |
