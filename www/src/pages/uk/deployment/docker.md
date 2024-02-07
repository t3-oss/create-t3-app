---
title: Docker
description: Деплоймент в Docker
layout: ../../../layouts/docs.astro
lang: uk
---

Ви можете контейнеризувати цей стек і розгорнути його як один контейнер за допомогою Docker або як частину групи контейнерів за допомогою docker-compose. Дивіться [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker) для прикладу репозиторію на основі цієї документації.

## Конфігурація проекту Docker

Будь ласка, зверніть увагу, що Next.js потребує різних процесів для білда (доступні у фронтенді, з префіксом `NEXT_PUBLIC`) та змінних середовища, доступних тільки на сервері. У цьому прикладі ми використовуємо дві змінні, зверніть увагу на їх позиції в `Dockerfile`, аргументи командного рядка та `docker-compose.yml`:

- `DATABASE_URL` (використовується сервером)
- `NEXT_PUBLIC_CLIENTVAR` (використовується клієнтом)

### 1. Конфігурація Next

У вашому [`next.config.js`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.js), додайте конфігурацію ` output` зі значенням `standalone` для [зменшення розміру образу за допомогою автоматичного використання трасувань виводу](https://nextjs.org/docs/advanced-features/output-file-tracing):

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. Створіть dockerignore file

<details>
    <summary>
      Натисніть тут і вставте вміст у <code>.dockerignore</code>:
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

### 3. Створіть Dockerfile

> Через те, що ми не виймаємо змінні середовища сервера в наш контейнер, [перевірка схеми середовища](/uk/usage/env-variables) не пройде. Щоб цього уникнути, ми повинні додати прапор `SKIP_ENV_VALIDATION=1` до команди білда, щоб схеми оточення не перевірялися під час білда.

<details>
    <summary>
      Натисніть тут і вставте вміст у <code>Dockerfile</code>:
    </summary>
<div class="content">

```docker
##### DEPENDENCIES

FROM --platform=linux/amd64 node:16-apline3.17 AS deps
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

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]

```

> **_Нотатки_**
>
> - _Емуляція `--platform=linux/amd64` може не бути необхідною після переходу на Node 18._
> - _Подивіться [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) щоб зрозуміти, чому `libc6-compat` може бути необхідним._
> - _Використання образів, заснованих на Alpine 3.17 [може призвести до проблем з Prisma](https://github.com/t3-oss/create-t3-app/issues/975). Встановлення `engineType = "binary"` вирішує проблему з Alpine 3.17, [але має пов'язані з цим витрати продуктивності](https://www.prisma.io/docs/concepts/components/prisma-engines/query-engine#the-query-engine-at-runtime)._
> - _Next.js збирає [анонімні дані про телеметрію загального використання](https://nextjs.org/telemetry). Розкоментуйте перший екземпляр `ENV NEXT_TELEMETRY_DISABLED 1`, щоб вимкнути телеметрію під час білда. Розкоментуйте другий екземпляр, щоб вимкнути телеметрію під час виконання._

</div>
</details>

## Зберіть та запустіть образ локально

Зберіть і запустіть цей образ локально за допомогою наступних команд:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

Відкрийте [localhost:3000](http://localhost:3000/) щоб побачити запущений додаток.

## Docker Compose

Ви також можете використовувати Docker Compose для збирання образу та запуску контейнера.

<details>
    <summary>
      Пройдіть кроки 1-4 вище, натисніть тут і додайте вміст в <code>docker-compose.yml</code>:
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

Запустіть за допомогою команди `docker compose up`:

```bash
docker compose up
```

Відкрийте [localhost:3000](http://localhost:3000/) щоб побачити запущений додаток.

</div>
</details>

## Деплоймент на Railway

Ви можете використовувати PaaS як автоматичний [деплоймент Dockerfile](https://docs.railway.app/deploy/dockerfiles) від [Railway's](https://railway.app) для деплою вашої програми. Якщо у вас [встановлений Railway CLI](https://docs.railway.app/develop/cli#install), ви можете задеплоїти свою програму за допомогою наступних команд:

```bash
railway login
railway init
railway link
railway up
railway open
```

Перейдіть до "Variables" і увімкніть ваш `DATABASE_URL`. Потім перейдіть до "Settings" і виберіть "Generate Domain." Щоб побачити працюючий приклад на Railway, перейдіть до [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

## Корисні ресурси

| Ресурс                                   | Посилання                                                            |
| ---------------------------------------- | -------------------------------------------------------------------- |
| Приклад для Dockerfile                   | https://docs.docker.com/engine/reference/builder/                    |
| Приклад для файлу Compose 3 версії       | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Приклад Docker CLI                       | https://docs.docker.com/engine/reference/commandline/docker/         |
| Приклад Docker Compose CLI               | https://docs.docker.com/compose/reference/                           |
| Розгортання Next.js із Docker Image      | https://nextjs.org/docs/deployment#docker-image                      |
| Next.js в Docker'е                       | https://benmarte.com/blog/nextjs-in-docker/                          |
| Приклад Next.js з Docker                 | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| Створення Docker образу Next.js програми | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |
