---
title: Variáveis de Ambiente
description: Getting started with create-t3-app
layout: ../../../layouts/docs.astro
lang: pt
---

O Create-T3-App usa [Zod](https://github.com/colinhacks/zod) para validar suas variáveis de ambiente em runtime _e_ buildtime fornecendo alguns arquivos adicionais no diretório `env`:

📁 src/env

┣ 📄 client.mjs

┣ 📄 schema.mjs

┣ 📄 server.mjs

O conteúdo desses arquivos pode parecer assustador à primeira vista, mas não se preocupe, não é tão complicado quanto parece. Vamos dar uma olhada neles um por um e percorrer o processo de adição de variáveis de ambiente adicionais.

_Muito longo, não li; Se você quiser adicionar uma nova variável de ambiente, você deve adicioná-la tanto ao seu `.env` quanto definir o validador em `env/schema.mjs`._

## schema.mjs

Este é o arquivo que você realmente tocará. Ele contém dois esquemas, um para variáveis de ambiente do lado do servidor e outro para o lado do cliente, bem como um objeto `clientEnv`.

```ts:env/schema.mjs
export const serverSchema = z.object({
  // DATABASE_URL: z.string().url(),
});

export const serverEnv = {
  // DATABASE_URL: process.env.DATABASE_URL,
};

export const clientSchema = z.object({
  // NEXT_PUBLIC_WS_KEY: z.string(),
});

export const clientEnv = {
  // NEXT_PUBLIC_WS_KEY: process.env.NEXT_PUBLIC_WS_KEY,
};
```

### Schema do Servidor

Defina seu esquema de variáveis de ambiente do lado do servidor aqui.

Certifique-se de não prefixar as chaves aqui com `NEXT_PUBLIC`. A validação falhará se você fizer isso para ajudá-lo a detectar uma configuração inválida.

### Schema do Cliente

Defina seu esquema de variáveis de ambiente do lado do cliente aqui.

Para expô-los ao cliente, você precisa prefixá-los com `NEXT_PUBLIC`. A validação falhará se você não o ajudar a detectar uma configuração inválida.

### Objeto clientEnv

Desestruture o `process.env` aqui.

Precisamos de um objeto JavaScript com o qual possamos analisar nossos esquemas Zod e devido à maneira como o Next.js lida com as variáveis de ambiente, você não pode destruir `process.env` como um objeto normal, então precisamos fazer isso manualmente.

O TypeScript ajudará você a garantir que inseriu as chaves em `clientEnv` e também em `clientSchema`.

```ts
// ❌ This doesn't work, we need to destruct it manually
const schema = z.object({
  NEXT_PUBLIC_WS_KEY: z.string(),
});

const validated = schema.parse(process.env);
```

## server.mjs & client.mjs

É aqui que a validação acontece e exporta os objetos validados. Você não precisa modificar esses arquivos.

## Usando Variáveis Ambiente

Quando você quiser usar suas variáveis de ambiente, você pode importá-las de `env/client.mjs` ou `env/server.mjs` dependendo de onde você deseja usá-las:

```ts:pages/api/hello.ts
import { env } from "../../env.mjs";

// `env` is fully typesafe and provides autocompletion
const dbUrl = env.DATABASE_URL;
```

## .env.example

Como o arquivo `.env` padrão não está comprometido com o controle de versão, também incluímos um arquivo `.env.example`, no qual você pode, opcionalmente, manter uma cópia de seu arquivo `.env` com quaisquer segredos removidos. Isso não é necessário, mas recomendamos manter o exemplo atualizado para tornar mais fácil para os contribuidores começarem a usar seu ambiente.

Alguns frameworks e outras ferramentas, como o Next.js, sugerem que você armazene variáveis em um arquivo `.env.local` e faça commit de arquivos `.env` em seu projeto. Isso não é recomendado, pois poderia facilitar o acidente de  incluir variáveis ambiente secretas em seu histórico do git. Em vez disso, recomendamos que você armazene essas variáveis no arquivo `.env`, mantenha o arquivo `.env` em seu `.gitignore` e faça commit somente de arquivos `.env.example` em seu projeto.

## Adicionando Variáveis Ambiente

Para garantir que sua compilação nunca seja concluída sem as variáveis de ambiente de que o projeto precisa, você precisará adicionar novas variáveis de ambiente em **dois** locais:

📄 `.env`: Insira sua variável de ambiente como faria normalmente em um arquivo `.env`, ou seja, `CHAVE=VALOR`

📄 `schema.mjs`: Adicione a lógica de validação apropriada para a variável de ambiente definindo um esquema Zod, por exemplo `TECLA: z.string()`

Opcionalmente, você também pode manter `.env.example` atualizado:

📄 `.env.example`: Insira sua variável de ambiente, mas certifique-se de não incluir o valor se for secreto, ou seja, `CHAVE=VALOR` ou `CHAVE=`

### Exemplo

_Quero adicionar meu token de API do Twitter como uma variável de ambiente do lado do servidor_

1. Adicione a variável de ambiente a `.env`:

```
TWITTER_API_TOKEN=1234567890
```

2. Adicione a variável de ambiente a `schema.mjs`:

```ts
export const serverSchema = z.object({
  // ...
  TWITTER_API_TOKEN: z.string(),
});

export const serverEnv = {
  // ...
  TWITTER_API_TOKEN: process.env.TWITTER_API_TOKEN,
};
```

_**NOTA:** Uma string vazia ainda é uma string, então `z.string()` aceitará uma string vazia como um valor válido. Se você quiser ter certeza de que a variável de ambiente não está vazia, você pode usar `z.string().min(1)`._

3. opcional: adicione a variável de ambiente a `.env.example`, mas não inclua o token

```
TWITTER_API_TOKEN=
```
