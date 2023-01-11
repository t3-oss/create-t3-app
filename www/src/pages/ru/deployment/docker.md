---
title: Docker
description: Развертывание в Docker
layout: ../../../layouts/docs.astro
lang: ru
---

Вы можете контейнеризировать этот стек и развернуть его как один контейнер с помощью Docker или как часть группы контейнеров с помощью docker-compose. Смотрите [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker) для примера репозитория на основе этой документации.

## Конфигурация проекта Docker

Пожалуйста обратите внимание, что Next.js нуждается в разных процессах для сборки (доступны во фронтенде, с префиксом `NEXT_PUBLIC`) и переменных окружения, доступных только на сервере. В этом примере мы используем две переменные, обратите внимание на их позиции в `Dockerfile`, аргументы командной строки и `docker-compose.yml`:

- `DATABASE_URL` (используется сервером)
- `NEXT_PUBLIC_CLIENTVAR` (используется клиентом)

### 1. Конфигурация Next

В вашем [`next.config.mjs`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.mjs), добавьте конфигурацию `output` со значением `standalone` для [уменьшения размера образа с помощью автоматического использования трассировок вывода](https://nextjs.org/docs/advanced-features/output-file-tracing):

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. Создайте dockerignore file

<details>
    <summary>
      Нажмите здесь и вставьте содержимое в <code>.dockerignore</code>:
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

### 3. Создайте Dockerfile

> Из-за того, что мы не извлекаем переменные окружения сервера в наш контейнер, [проверка схемы окружения](/ru/usage/env-variables) не пройдет. Чтобы этого избежать, мы должны добавить флаг `SKIP_ENV_VALIDATION=1` к команде сборки, чтобы схемы окружения не проверялись во время сборки.

<details>
    <summary>
      Нажмите здесь и вставьте содержимое в <code>Dockerfile</code>:
    </summary>
<div class="content">

```docker
##### DEPENDENCIES

FROM --platform=linux/amd64 node:16-alpine3.16 AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat
WORKDIR /app

# Install Prisma Client - remove if not using Prisma

COPY prisma ./

# Install dependencies based on the preferred package manager

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

RUN \
 if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
 elif [ -f package-lock.json ]; then npm ci; \
 elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
 else echo "Lockfile not found." && exit 1; \
 fi

##### BUILDER

FROM --platform=linux/amd64 node:16-alpine3.16 AS builder
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

FROM --platform=linux/amd64 node:16-alpine3.16 AS runner
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

> **_Заметки_**
>
> - _Эмуляция `--platform=linux/amd64` может не быть необходимой после перехода на Node 18._
> - _Посмотрите [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) чтобы понять, почему `libc6-compat` может быть необходим._ -_Использование пакетов базирующихся на Alpine 3.17 [может привести к ошибке](https://github.com/t3-oss/create-t3-app/issues/975). Установка `engineType = "binary"` решает проблему с Alpine 3.17, [но имеет связанные с этим затраты производительности](https://www.prisma.io/docs/concepts/components/prisma-engines/query-engine#the-query-engine-at-runtime)._
> - _Next.js собирает [анонимные данные о телеметрии общего использования](https://nextjs.org/telemetry). Раскомментируйте первый экземпляр `ENV NEXT_TELEMETRY_DISABLED 1`, чтобы отключить телеметрию во время сборки. Раскомментируйте второй экземпляр, чтобы отключить телеметрию во время выполнения._

</div>
</details>

## Соберите и запустите образ локально

Соберите и запустите этот образ локально с помощью следующих команд:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

Откройте [localhost:3000](http://localhost:3000/) чтобы увидеть запущенное приложение.

## Docker Compose

Вы также можете использовать Docker Compose для сборки образа и запуска контейнера.

<details>
    <summary>
      Проследуйте шагам 1-4 выше, нажмите здесь и добавьте содержимое в <code>docker-compose.yml</code>:
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

Запустите с помощью команды `docker compose up`:

```bash
docker compose up
```

Откройте [localhost:3000](http://localhost:3000/) чтобы увидеть запущенное приложение.

</div>
</details>

## Развертывание на Railway

Вы можете использовать такой PaaS как автоматическое [развертывание Dockerfile](https://docs.railway.app/deploy/dockerfiles) от [Railway's](https://railway.app) для развертывания вашего приложения. Если у вас [установлен Railway CLI](https://docs.railway.app/develop/cli#install), вы можете развернуть свое приложение с помощью следующих команд:

```bash
railway login
railway init
railway link
railway up
railway open
```

Перейдите к "Variables" и включите ваш `DATABASE_URL`. Затем перейдите к "Settings" и выберите "Generate Domain." Чтобы увидеть работающий пример на Railway, перейдите к [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

## Полезные ресурсы

| Ресурс                                    | Ссылка                                                               |
| ----------------------------------------- | -------------------------------------------------------------------- |
| Пример для Dockerfile                     | https://docs.docker.com/engine/reference/builder/                    |
| Пример для файла Compose 3 версии         | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Пример Docker CLI                         | https://docs.docker.com/engine/reference/commandline/docker/         |
| Пример Docker Compose CLI                 | https://docs.docker.com/compose/reference/                           |
| Развертывание Next.js с Docker Image      | https://nextjs.org/docs/deployment#docker-image                      |
| Next.js в Docker'е                        | https://benmarte.com/blog/nextjs-in-docker/                          |
| Пример Next.js с Docker                   | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| Создание Docker образа Next.js приложения | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |
