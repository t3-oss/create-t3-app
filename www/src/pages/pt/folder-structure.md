---
title: Estrutura de Pastas
description: Estrutura de pastas de um novo T3 App inicializado
layout: ../../layouts/docs.astro
lang: pt
---

A seguir, temos a estrutura de pastas de um novo T3 app inicializado, com todas as opções selecionadas. A descrição de cada pasta indica seu propósito e se é apenas incluída com determinada biblioteca selecionada.

```
.
├─ prisma
│  └─ schema.prisma
├─ public
│  └─ favicon.ico
├─ src
│  ├─ env
│  │  ├─ client.mjs
│  │  ├─ schema.mjs
│  │  └─ server.mjs
│  ├─ pages
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  └─ [...nextauth].ts
│  │  │  ├─ trpc
│  │  │  │  └─ [trpc].ts
│  │  │  ├─ examples.ts
│  │  │  └─ restricted.ts
│  │  ├─ _app.tsx
│  │  └─ index.tsx
│  ├─ styles
│  │  └─ globals.css
│  ├─ types
│  │  └─ next-auth.d.ts
│  ├─ utils
│  │  └─ trpc.ts
│  ├─ server
│  │  ├─ common
│  │  │  └─ get-server-auth-session.ts
│  │  ├─ db
│  │  │  └─ client.ts
│  │  └─ trpc
│  │     ├─ router
│  │     │  ├─ _app.ts
│  │     │  ├─ auth.ts
│  │     │  └─ example.ts
│  │     ├─ context.ts
│  │     └─ trpc.ts
├─ .env
├─ .env.example
├─ .eslintrc.json
├─ next-env.d.ts
├─ next.config.mjs
├─ postcss.config.cjs
├─ prettier.config.cjs
├─ tailwind.config.cjs
└─ tsconfig.json
```

### `prisma`

A pasta `prisma` contém o arquivo `schema.prisma` que é usado para configurar a conexão com o banco de dados e o schema do banco de dados. Ela também é onde são salvos os arquivos de migração e/ou scripts de seed, se usados. Veja [Uso do Prisma](/en/usage/prisma) para mais informações.

<sub>(Com Prisma)</sub>

### `public`

A pasta `public` contém recursos estáticos que são servidos pelo servidor web. O `favicon.ico` é um exemplo de um recurso estático.

### `src/env`

Usado para a validação de variáveis ambiente e definição de tipos - veja [Variáveis Ambiente](usage/env-variables).

### `src/pages`

A pasta `pages` contém todas as páginas da aplicação Next.js. O arquivo `index.tsx` na raiz da pasta `/pages` é a página inicial da aplicação. O arquivo `_app.tsx` é usado para envolver a aplicação com providers. Veja a [Documentação do Next.js](https://nextjs.org/docs/basic-features/pages) para mais informações.

#### `src/pages/api`

A pasta `api` contém todas as rotas API da aplicação Next.js. O arquivo `examples.ts` (com o Prisma) contém um exemplo de rota que usa o recurso de [Rotas API do Next.js](https://nextjs.org/docs/api-routes/introduction) junto com o prisma. O arquivo `restricted.ts` (com Next-Auth) contém um exemplo de rota que usa o recurso de [Rotas API do Next.js](https://nextjs.org/docs/api-routes/introduction) e é protegido pelo [NextAuth.js](https://next-auth.js.org/).

<sub>(com NextAuth.js, tRPC or tRPC + Prisma)</sub>

#### `src/pages/api/auth/[...nextauth].ts`

O arquivo `[...nextauth].ts` é a rota de autenticação com slug do NextAuth.js. Ele é usado para lidar com as requisições de autenticação. Veja [Uso do NextAuth.js](usage/next-auth) para mais informações sobre o NextAuth.js, e a [Documentação de Rotas Dinâmicas do Next.js](https://nextjs.org/docs/routing/dynamic-routes) para informações sobre rotas com parâmetros/slugs.

<sub>(com NextAuth.js)</sub>

#### `src/pages/api/trpc/[trpc].ts`

O arquivo `[trpc].ts` é o ponto de entrada do tRPC. Ele é usado para lidar com as requisições do tRPC. Veja [Uso do tRPC](usage/trpc#-pagesapitrpctrpcts) para mais informações sobre esse arquivo, e [Documentação de Rotas Dinâmicas do Next.js](https://nextjs.org/docs/routing/dynamic-routes) para informações sobre rotas com parâmetros/slugs.

<sub>(com tRPC)</sub>

### `src/server`

A pasta `server` é usada para de maneira clara separar código do servidor e código do cliente.

<sub>(com tRPC e/ou Prisma)</sub>

### `src/server/common`

A pasta `common` contém código comum e reutilizável do servidor.

<sub>(com NextAuth.js + tRPC)</sub>

#### `src/server/common/get-server-auth-session.ts`

O arquivo `get-server-auth-session.ts` é usado para obter a sessão do NextAuth.js no lado do servidor. Veja [Uso do NextAuth.js](usage/next-auth#uso-com-trpc) para mais informações.

<sub>(com NextAuth.js + tRPC)</sub>

#### `src/server/db/client.ts`

O arquivo `client.ts` é usado para instanciar o cliente do Prisma em escopo globa. Veja [Uso do Prisma](usage/prisma#prisma-client) para mais informações.

<sub>(com Prisma)</sub>

### `src/server/trpc`

A pasta `trpc` contém o código do tRPC do lado do servidor.

<sub>(com tRPC)</sub>

#### `src/server/trpc/context.ts`

O arquivo `context.ts` é usado para criar um contexto usado nas requisições do tRPC. Veja [Uso do tRPC](usage/trpc#-servertrpccontextts) para mais informações.

<sub>(com tRPC)</sub>

#### `src/server/trpc/trpc.ts`

O arquivo `trpc.ts` é usado para exportar ajudantes de procedimento (procedure helpers). Veja [Uso do tRPC](usage/trpc#-servertrpctrpcts) para mais informações.

<sub>(com tRPC)</sub>

### `src/server/trpc/router`

A pasta `router` contém as rotas do tRPC.

<sub>(com tRPC)</sub>

#### `src/server/trpc/router/_app.ts`

O arquivo `_app.ts` é usado para "fundir" os roteadores e exportar eles como um único, além das suas definições de tipos. Veja [Uso do tRPC](usage/trpc#-servertrpcrouterts) para mais informações.

<sub>(com tRPC)</sub>

#### `src/server/trpc/router/auth.ts`

O arquivo `auth.ts` é um exemplo de roteador tRPC utilizando o ajudante (helper) `protectedProcedure` para demonstrar como proteger uma rota do tRPC com o NextAuth.js.

<sub>(com NextAuth.js + tRPC)</sub>

#### `src/server/trpc/router/example.ts`

O arquivo `example.ts` é um exemplo de roteador tRPC utilizando o ajudante (helper) `publicProcedure` para demonstrar como criar uma rota do tRPC pública.

<sub>(com tRPC)</sub>

### `src/styles`

A pasta `styles` contém os estilos globais da aplicação.

<sub>(com Tailwind CSS)</sub>

### `src/types`

A pasta `types` é usada para guardar tipos ou definições de tipos reutilizáveis.

<sub>(com NextAuth.js)</sub>

#### `src/types/next-auth.d.ts`

O arquivo `next-auth.d.ts` é usado para estender o tipo padrão de sessão do NextAuth para incluir o ID de usuário. Veja [Uso do NextAuth.js](usage/next-auth#inclusão-do-userid-na-sessão) para mais informações.

<sub>(com NextAuth.js)</sub>

### `src/utils`

A pasta `utils` é usada para guardar funções utilitárias comuns reutilizáveis.

<sub>(com tRPC)</sub>

#### `src/utils/trpc.ts`

O arquivo `trpc.ts` é o ponto de entrada front-end do tRPC. Veja [Uso do tRPC](usage/trpc#-utilstrpcts) para mais informações.

<sub>(com tRPC)</sub>

### `.env`

O arquivo `.env` é usado para armazenas as variáveis ambiente. Veja [Variáveis Ambiente](usage/env-variables) para mais informações. Esse arquivo **não** deve ser commitado para o histórico do git.

### `.env.example`

O arquivo `.env.example` mostra um exemplo de de variáveis ambiente baseado nas bibliotecas escolhidas. Esse arquivo deve ser commitado para o histórico do git.

### `.eslintrc.json`

O arquivo `.eslintrc.json` é usado para configurar o ESLint. Veja [Documentação do ESLint](https://eslint.org/docs/latest/user-guide/configuring/configuration-files) para mais informações.

### `next-env.d.ts`

O arquivo `next-env.d.ts` garante que os tipos do Next.js sejam lidos pelo compilador do TypeScript. **Você não deve remover ou editar, uma vez que pode mudar a qualquer momento.** Veja [Documentação do Next.js ](https://nextjs.org/docs/basic-features/typescript#existing-projects) para mais informações.

### `next.config.mjs`

O arquivo `next.config.mjs` é usado para configura o Next.js. Veja [Documentação do Next.js](https://nextjs.org/docs/api-reference/next.config.js/introduction) para mais informações. Nota: a extensão .mjs é usada para permitir importações de módulos ESM.

### `postcss.config.cjs`

O arquivo `postcss.config.cjs` é usado para o uso do Tailwind PostCSS. Veja [Documentação do Tailwind PostCSS](https://tailwindcss.com/docs/installation/using-postcss) para mais informações.

<sub>(com Tailwind CSS)</sub>

### `prettier.config.cjs`

O arquivo `prettier.config.cjs` é usado para configura o Prettier e incluir o prettier-plugin-tailwindcss para a formatação das classes CSS. Veja o post no [Blog do Tailwind CSS](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) para mais informações.

<sub>(com Tailwind CSS)</sub>

### `tsconfig.json`

O arquivo `tsconfig.json` é usado para configurar o TypeScript. Algumas configurações diferentes do padrão, como `strict mode`, foram habilitadas para garantir o melhor uso do TypeScript no create-t3-app e suas bibliotecas. Veja [Documentação do Typescript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) ou [Uso do TypeScript](usage/typescript) para mais informações.
