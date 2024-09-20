---
title: Prisma
description: Uso do Prisma
layout: ../../../layouts/docs.astro
lang: pt
---

Prisma é um ORM para TypeScript, que permite que você defina seu schema e modelos de banco de dados em um arquivo `schema.prisma` e, em seguida, gere um cliente type-safe que pode ser usado para interagir com seu banco de dados a partir de seu back-end.

## Prisma Client

Localizado em `/server/db/client.ts`, o Prisma Client é instanciado como uma variável global (conforme recomendado como [melhor prática](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem) pela equipe da Prisma) e exportado para ser usado em suas rotas de API. Incluímos o Prisma Client em [Context](/en/usage/trpc#-serverapitrpcts) por padrão e recomendamos usá-lo em vez de importá-lo separadamente em cada arquivo.

## Schema

Você encontrará o arquivo de esquema do Prisma em `/prisma/schema.prisma`. Este arquivo é onde você define seu esquema e modelos de banco de dados e é usado ao gerar o Prisma Client.

### Com NextAuth.js

Quando você seleciona NextAuth.js em combinação com Prisma, o arquivo de esquema é gerado e configurado para você com os valores recomendados para os modelos `User`, `Session`, `Account` e `VerificationToken`, de acordo com os modelos na [documentação do NextAuth.js](https://next-auth.js.org/adapters/prisma).

## Banco de dados padrão

O banco de dados padrão é um banco de dados SQLite, que é ótimo para desenvolvimento e criação rápida de uma prova de conceito, mas não é recomendado para produção. Você pode alterar o banco de dados a ser usado alterando o `provider` no bloco `datasource` para `postgresql` ou `mysql` e, em seguida, atualizando a string de conexão nas variáveis de ambiente para apontar para seu banco de dados.

## Propagar seu banco de dados

[Propagar seu banco de dados](https://www.prisma.io/docs/guides/database/seed-database) é uma ótima maneira de preencher rapidamente seu banco de dados com dados de teste para ajudá-lo a começar. Para configurar a propagação, você precisará criar um arquivo `seed.ts` no diretório `/prisma` e, em seguida, adicionar um script `seed` ao seu arquivo `package.json`. Você também precisará de algum compilador de TypeScript que possa executar o script de seed. Recomendamos [tsx](https://github.com/esbuild-kit/tsx), que é um compilador TypeScript de alto desempenho que usa esbuild e não requer nenhuma configuração ESM, mas `ts-node` ou outros compiladores funcionam também.

```jsonc:package.json
{
  "scripts": {
    "db-seed": "NODE_ENV=development prisma db seed"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

```ts:prisma/seed.ts
import { db } from "../src/server/db/client";

async function main() {
  const id = "cl9ebqhxk00003b600tymydho";
  await db.example.upsert({
    where: {
      id,
    },
    create: {
      id,
    },
    update: {},
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
```

Em seguida, basta executar `bun db-seed` (ou `npm`/`yarn`) para propagar seu banco de dados.

## Recursos Úteis

| Recurso                              | Link                                                                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Documentação do Prisma               | https://www.prisma.io/docs/                                                                                                                       |
| GitHub do Prisma                     | https://github.com/prisma/prisma                                                                                                                  |
| Adaptador de Prisma para NextAuth.js | https://next-auth.js.org/adapters/prisma                                                                                                          |
| Guia de Conexão com PlanetScale      | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
