---
title: Docker
description: Deploy com Docker
layout: ../../../layouts/docs.astro
lang: pt
---

Você pode colocar essa stack em contêineres e fazer deploy dela como um único contêiner usando o Docker ou como parte de um grupo de contêineres usando o docker-compose. Veja [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker) para um repositório de exemplo baseado neste documento.

## Configuração do Projeto Docker

Por favor, note que o Next.js requer um processo diferente para variáveis de ambiente em _build time_ (disponível no frontend, prefixado por `NEXT_PUBLIC`) e _runtime_, somente do lado do servidor. Nesta demonstração estamos usando duas variáveis. Preste atenção em suas posições no `Dockerfile`, argumentos de linha de comando e `docker-compose.yml`:

- `DATABASE_URL` (usado pelo servidor)
- `NEXT_PUBLIC_CLIENTVAR` (usado pelo cliente)

### 1. Configuração do Next

Em seu arquivo [`next.config.mjs`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.mjs), configure a opção `output` como `standalone` para [reduzir o tamanho de imagens](https://nextjs.org/docs/advanced-features/output-file-tracing):

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. Criar arquivo dockerignore

<details>
    <summary>
      Clique aqui e inclua esse conteúdo no arquivo <code>.dockerignore</code>:
    </summary>
<div class="content">

```
.env
Dockerfile
.dockerignore
node_modules
npm-debug.log
README.md
.next
.git
```

</div>

</details>

### 3. Criação do arquivo Dockerfile

> Como não estamos puxando as variáveis de ambiente do servidor para nosso contêiner, a [validação do esquema do ambiente](/en/usage/env-variables) falhará. Para evitar isso, temos que adicionar a flag `SKIP_ENV_VALIDATION=1` ao comando de compilação para que os schemas env não sejam validados no momento da compilação.

<details>
    <summary>
      Clique aqui e inclua esse conteúdos no <code>.dockerignore</code>:
    </summary>
<div class="content">

```docker
##### DEPENDÊNCIAS

FROM --platform=linux/amd64 node:16-apline3.17 AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat
WORKDIR /app

# Instalação do Prisma Client - remova se não estiver usando o Prisma

COPY prisma ./

# Instalação de dependências com base no package manager padrão

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

RUN \
 if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
 elif [ -f package-lock.json ]; then npm ci; \
 elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
 else echo "Lockfile não encontrado." && exit 1; \
 fi

##### BUILDER

FROM --platform=linux/amd64 node:16-apline3.17 AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
 if [ -f yarn.lock ]; then SKIP_ENV_VALIDATION=1 yarn build; \
 elif [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
 elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && SKIP_ENV_VALIDATION=1 pnpm run build; \
 else echo "Lockfile not found." && exit 1; \
 fi

##### RUNNER

FROM --platform=linux/amd64 node:16-apline3.17 AS runner
WORKDIR /app

ENV NODE_ENV production

# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]

```

> **_Observações_**
>
> - _A emulação de `--platform=linux/amd64` pode não ser necessária após a mudança para o Node 18._
> - _Consulte [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) para entender por que `libc6-compat` pode ser necessário._
> - _Usando imagens baseadas em Alpine 3.17 [pode causar problemas no Prisma](https://github.com/t3-oss/create-t3-app/issues/975). Realizando a configuração: `engineType = "binary"` corrige esse problema no Alpine 3.17, [mas apresenta um custo de performance adicional](https://www.prisma.io/docs/concepts/components/prisma-engines/query-engine#the-query-engine-at-runtime)._
> - _Next.js coleta [dados anônimos de telemetria sobre uso geral](https://nextjs.org/telemetry). Remova o primeiro comentário de `ENV NEXT_TELEMETRY_DISABLED 1` para desabilitar a telemetria durante o build. Remova o segundo comentário para desabilitar a telemetria durante o tempo de execução._

</div>
</details>

## Execute build e run da imagem localmente

Execute `build` e `run` desta imagem localmente com os seguintes comandos:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

Abra [localhost:3000](http://localhost:3000/) para ver sua aplicação rodando.

## Docker Compose

Você também pode usar o Docker Compose para criar a imagem e executar o contêiner.

<details>
    <summary>
      Siga as etapas 1 a 4 acima, clique aqui e inclua o conteúdo no arquivo <code>docker-compose.yml</code>:
    </summary>
<div class="content">

```yaml
version: "3.9"
services:
  app:
    platform: "linux/amd64"
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_CLIENTVAR: "clientvar"
    working_dir: /app
    ports:
      - "3000:3000"
    image: t3-app
    environment:
      - DATABASE_URL=database_url_goes_here
```

Execute isso usando o comando `docker compose up`:

```bash
docker compose up
```

Abra [localhost:3000](http://localhost:3000/) para ver sua aplicação rodando.

</div>
</details>

## Deploy na Railway

Você pode usar [deploys automáticos de Dockerfile](https://docs.railway.app/deploy/dockerfiles) em uma PaaS como a [Railway](https://railway.app) para fazer deploy das suas aplicações. Se você tiver o [CLI da Railway instalado](https://docs.railway.app/develop/cli#install), poderá fazer deploy da sua aplicação com os seguintes comandos:

```bash
railway login
railway init
railway link
railway up
railway open
```

Vá para "Variables" e inclua seu `DATABASE_URL`. Em seguida, vá para "Settings" e selecione "Generate Domain". Para ver um exemplo em execução no Railway, visite [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

## Recursos Úteis

| Recurso                                         | Link                                                                 |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| Referência do Dockerfile                        | https://docs.docker.com/engine/reference/builder/                    |
| Referência da versão 3 do arquivo Compose       | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Referência da CLI do Docker                     | https://docs.docker.com/engine/reference/commandline/docker/         |
| Referência da CLI do Docker Compose             | https://docs.docker.com/compose/reference/                           |
| Deploy do Next.js com imagem do Docker          | https://nextjs.org/docs/deployment#docker-image                      |
| Next.js no Docker                               | https://benmarte.com/blog/nextjs-in-docker/                          |
| Exemplo de Next.js com Docker                   | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| Criar imagem do Docker de um aplicativo Next.js | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |
