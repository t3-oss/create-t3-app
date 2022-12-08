---
title: Tailwind CSS
description: Uso do Tailwind CSS
layout: ../../../layouts/docs.astro
lang: pt
---

## O que é Tailwind CSS?

Tailwind CSS é um pequeno framework CSS focando em [classes utilitárias](https://tailwindcss.com/docs/utility-first) para criar designs personalizados, sem a troca de contexto que o CSS normal exige. É puramente uma estrutura CSS e não fornece nenhum componente ou lógica pré-criada, e fornece [um conjunto muito diferente de benefícios](https://www.youtube.com/watch?v=CQuTF-bkOgc) em comparação com um biblioteca de componentes como Material UI.

Isso torna o CSS incrivelmente fácil e rápido de escrever, conforme mostrado no exemplo a seguir:

CSS Antigo:

1. Escreva CSS, geralmente em um arquivo separado

```css
.minha-classe {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  padding: 1rem;
}
```

2. Importe o CSS no seu componente

```jsx
import "./minha-classe.css";
```

3. Adicione a classe no seu HTML

```html
<div class="minha-classe">...</div>
```

Equivalente com Tailwind:

1. Basta escrever classes em seu HTML

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

Quando usado em conjunto com Componentes React, é extremamente poderoso para construir UIs rapidamente.

O Tailwind CSS possui um belo design system integrado, que vem pronto para uso com uma paleta de cores cuidadosamente escolhida, padrões de dimensionamento para estilos como largura/altura e preenchimento/margem para um design uniforme, bem como breakpoints para criar layouts responsivos. Este design system pode ser personalizado e estendido para criar a caixa de ferramentas exata de estilos que seu projeto precisa.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla mais conhecido como [mewtru](https://twitter.com/trunarla) deu uma palestra incrível sobre [construindo um design system usando Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## Uso

Certifique-se de ter plug-ins de editor para Tailwind instalados para melhorar sua experiência de escrita Tailwind.

### Extensões e Plugins

- [Extensão para o VSCode](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Integration com JetBrains](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Formatação

As classes Tailwind CSS podem facilmente ficar um pouco confusas, então um formatador para as classes é obrigatório. [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) classifica as classes na [ordem recomendada](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted) para que as classes correspondam ao pacote css gerado. Ao selecionar o Tailwind na CLI, instalaremos e configuraremos isso para você.

### Aplicação de classe condicional

Adicionar classes condicionalmente usando ternários pode ficar muito confuso e difícil de ler. Esses pacotes ajudam a organizar suas classes ao usar alguma lógica condicional.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Recursos Úteis

| Recurso                       | Link                                                     |
| ----------------------------- | -------------------------------------------------------- |
| Documentação Tailwind         | https://tailwindcss.com/docs/editor-setup/               |
| Tailwind Cheat Sheet          | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss           | https://github.com/aniftyco/awesome-tailwindcss/         |
| Comunidade do Tailwind        | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Servidor Discord do Tailwind  | https://tailwindcss.com/discord/                         |
| Canal do Youtube TailwindLabs | https://www.youtube.com/tailwindlabs/                    |
| Playground do Tailwind        | https://play.tailwindcss.com/                            |
