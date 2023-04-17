---
title: Docker
description: Dockerへのデプロイ
layout: ../../../layouts/docs.astro
lang: ja
---

You can containerize this stack and deploy it as a single container using Docker, or as a part of a group of containers using docker-compose. See [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker) for an example repo based on this doc.

このスタックをコンテナ化し、Docker を使用して単一のコンテナとして、または docker-compose を使用してコンテナのグループの一部としてデプロイすることができます。このドキュメントに基づいたサンプルレポは [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker) をご覧ください。

## Docker Project Configuration

Please note that Next.js requires a different process for build time (available in the frontend, prefixed by `NEXT_PUBLIC`) and runtime environment, server-side only, variables. In this demo we are using two variables, pay attention to their positions in the `Dockerfile`, command-line arguments, and `docker-compose.yml`:

- `DATABASE_URL` (used by the server)
- `NEXT_PUBLIC_CLIENTVAR` (used by the client)

## Docker プロジェクトの構成

Next.js では、ビルド時（フロントエンドで利用可能、接頭辞は`NEXT_PUBLIC`）と実行環境（サーバサイドのみ）の変数が異なる処理を必要とすることに注意してください。このデモでは 2 つの変数を使用しています。`Dockerfile`、コマンドライン引数、`docker-compose.yml`の中での位置に注意してください：

- `DATABASE_URL` (サーバーが使用する)
- `NEXT_PUBLIC_CLIENTVAR`（クライアントが使用する）

### 1. Next Configuration

In your [`next.config.mjs`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.mjs), add the `standalone` output-option configuration to [reduce image size by automatically leveraging output traces](https://nextjs.org/docs/advanced-features/output-file-tracing):

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 1. Next の設定

[`next.config.mjs`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.mjs) に、`standalone` output-option configuration を追加して、[output traces を自動的に活用して画像サイズを小さくする](https://nextjs.org/docs/advanced-features/output-file-tracing) ：

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. Create dockerignore file

### 2. .dockerignore ファイルを作成する

<details>
    <summary>
      Click here and include contents in <code>.dockerignore</code>:
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

### 3. Create Dockerfile

> Since we're not pulling the server environment variables into our container, the [environment schema validation](/en/usage/env-variables) will fail. To prevent this, we have to add a `SKIP_ENV_VALIDATION=1` flag to the build command so that the env-schemas aren't validated at build time.

### 3. Dockerfile の作成

> サーバ環境変数をコンテナに取り込んでいないので、[環境スキーマの検証](/en/usage/env-variables)は失敗します。これを防ぐには、ビルドコマンドに `SKIP_ENV_VALIDATION=1` フラグを追加して、ビルド時に環境スキーマが検証されないようにする必要があります。

<details>
    <summary>
      Click here and include contents in <code>Dockerfile</code>:
    </summary>
<div class="content">

```docker
##### DEPENDENCIES

FROM --platform=linux/amd64 node:16-alpine3.17 AS deps
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

FROM --platform=linux/amd64 node:16-alpine3.17 AS builder
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

FROM --platform=linux/amd64 node:16-alpine3.17 AS runner
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

> **_Notes_**
>
> - _Emulation of `--platform=linux/amd64` may not be necessary after moving to Node 18._
> - _See [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) to understand why `libc6-compat` might be needed._
> - _Using Alpine 3.17 based images [can cause issues with Prisma](https://github.com/t3-oss/create-t3-app/issues/975). Setting `engineType = "binary"` solves the issue in Alpine 3.17, [but has an associated performance cost](https://www.prisma.io/docs/concepts/components/prisma-engines/query-engine#the-query-engine-at-runtime)._
> - _Next.js collects [anonymous telemetry data about general usage](https://nextjs.org/telemetry). Uncomment the first instance of `ENV NEXT_TELEMETRY_DISABLED 1` to disable telemetry during the build. Uncomment the second instance to disable telemetry during runtime._

> **_備考_**
>
> - _Node 18 への移行後は、`--platform=linux/amd64`のエミュレーションが不要になる場合があります。_
> - _なぜ `libc6-compat` が必要なのかについては [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) を参照してください。._
> - _[Alpine 3.17 ベースのイメージを使用すると、Prisma で問題が発生することがあります](https://github.com/t3-oss/create-t3-app/issues/975)。`engineType="binary"`を設定すると、Alpine 3.17 の問題は解決されますが、[ただし、関連するパフォーマンスコストが発生します](https://www.prisma.io/docs/concepts/components/prisma-engines/query-engine#the-query-engine-at-runtime)._
> - _Next.js は[一般的な使用方法に関する匿名のテレメトリーデータ](https://nextjs.org/telemetry)を収集します。ビルド時にテレメトリを無効にするには、`ENV NEXT_TELEMETRY_DISABLED 1` の最初のインスタンスをアンコメントします。実行時にテレメトリを無効にするには、2 番目のインスタンスをアンコメントしてください。_

</div>
</details>

## Build and Run Image Locally

Build and run this image locally with the following commands:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

Open [localhost:3000](http://localhost:3000/) to see your running application.

## ローカルでイメージをビルドし、実行する

このイメージを以下のコマンドでローカルにビルドして実行します：

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

[localhost:3000](http://localhost:3000/)を開き、実行中のアプリケーションを確認します。

## Docker Compose

You can also use Docker Compose to build the image and run the container.

また、Docker Compose を使用してイメージを構築し、コンテナを実行することも可能です。

<details>
    <summary>
      Follow steps 1-4 above, click here, and include contents in <code>docker-compose.yml</code>:
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

Run this using the `docker compose up` command:

これを `docker compose up` コマンドで実行します：

```bash
docker compose up
```

Open [localhost:3000](http://localhost:3000/) to see your running application.

[localhost:3000](http://localhost:3000/)を開き、実行中のアプリケーションを確認します。

</div>
</details>

## Deploy to Railway

You can use a PaaS such as [Railway's](https://railway.app) automated [Dockerfile deployments](https://docs.railway.app/deploy/dockerfiles) to deploy your app. If you have the [Railway CLI installed](https://docs.railway.app/develop/cli#install) you can deploy your app with the following commands:

## Railway へのデプロイ

アプリのデプロイには、[Railway](https://railway.app)のような自動化された[Dockerfile deployments](https://docs.railway.app/deploy/dockerfiles) などの PaaS を使用することができます。[ailway CLI をインストールしている場合](https://docs.railway.app/develop/cli#install)は、以下のコマンドでアプリをデプロイすることができます：

```bash
railway login
railway init
railway link
railway up
railway open
```

Go to "Variables" and include your `DATABASE_URL`. Then go to "Settings" and select "Generate Domain." To view a running example on Railway, visit [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

変数」にて、`DATABASE_URL`を指定します。その後、"Settings" に行き、"Generate Domain" を選択します。Railway 上での実行例を見るには、[ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/)にアクセスしてください。

## Useful Resources

| Resource                             | Link                                                                 |
| ------------------------------------ | -------------------------------------------------------------------- |
| Dockerfile reference                 | https://docs.docker.com/engine/reference/builder/                    |
| Compose file version 3 reference     | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Docker CLI reference                 | https://docs.docker.com/engine/reference/commandline/docker/         |
| Docker Compose CLI reference         | https://docs.docker.com/compose/reference/                           |
| Next.js Deployment with Docker Image | https://nextjs.org/docs/deployment#docker-image                      |
| Next.js in Docker                    | https://benmarte.com/blog/nextjs-in-docker/                          |
| Next.js with Docker Example          | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| Create Docker Image of a Next.js app | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |

## お役立ち情報

| リソース                               | リンク                                                               |
| -------------------------------------- | -------------------------------------------------------------------- |
| Dockerfile のリファレンス              | https://docs.docker.com/engine/reference/builder/                    |
| Compose file バージョン 3 リファレンス | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Docker CLI リファレンス                | https://docs.docker.com/engine/reference/commandline/docker/         |
| Docker Compose CLI リファレンス        | https://docs.docker.com/compose/reference/                           |
| Next.js の Docker Image でのデプロイ   | https://nextjs.org/docs/deployment#docker-image                      |
| Next.js in Docker                      | https://benmarte.com/blog/nextjs-in-docker/                          |
| Docker での Next.js の例               | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| Next.js アプリの Docker イメージの作成 | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |
