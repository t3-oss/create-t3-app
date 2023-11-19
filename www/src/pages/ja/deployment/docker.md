---
title: Docker
description: Dockerへのデプロイ
layout: ../../../layouts/docs.astro
lang: ja
---

このスタックをコンテナ化し、Docker を使用して単一のコンテナとしてデプロイすることができます。または、 docker-compose を使用して複数のコンテナのグループの一部としてデプロイすることもできます。このドキュメントに基づいたサンプルリポジトリは [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker) をご覧ください。

## Docker プロジェクトの設定

Next.js では、ビルド時の変数（フロントエンドで利用可能、接頭辞は`NEXT_PUBLIC`）と実行環境の変数（サーバサイドのみ）が異なる処理を必要とすることに注意してください。このデモでは 2 つの変数を使用しています。`Dockerfile`、コマンドライン引数、`docker-compose.yml`の中での位置に注意してください：

- `DATABASE_URL` (サーバーが使用する)
- `NEXT_PUBLIC_CLIENTVAR`（クライアントが使用する）

### 1. Next の設定

[`next.config.js`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.js) に、[出力ファイルのトレースを自動的に活用してイメージサイズを小さくする](https://nextjs.org/docs/advanced-features/output-file-tracing)ための`standalone`出力オプション設定を追加してください：

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. .dockerignore ファイルの作成

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

### 3. Dockerfile の作成

サーバ環境変数をコンテナに取り込んでいないため、[環境スキーマの検証](/en/usage/env-variables)が失敗します。これを防ぐために、ビルド時に環境スキーマが検証されないように、ビルドコマンドに `SKIP_ENV_VALIDATION=1` フラグを追加する必要があります。

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

> **_備考_**
>
> - _Node 18 への移行後は、`--platform=linux/amd64`のエミュレーションが不要になる場合があります。_
> - _なぜ `libc6-compat` が必要なのかについては [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) を参照してください。._
> - _[Alpine 3.17 ベースのイメージを使用すると、Prisma で問題が発生することがあります](https://github.com/t3-oss/create-t3-app/issues/975)。`engineType="binary"`を設定すると、Alpine 3.17 の問題は解決されますが、[ただし、関連するパフォーマンスコストが発生します](https://www.prisma.io/docs/concepts/components/prisma-engines/query-engine#the-query-engine-at-runtime)._
> - _Next.js は[一般的な使用方法に関する匿名のテレメトリーデータ](https://nextjs.org/telemetry)を収集します。ビルド時にテレメトリを無効にするには、`ENV NEXT_TELEMETRY_DISABLED 1` の最初のインスタンスのコメントを外してください。実行時にテレメトリを無効にするには、2 番目のインスタンスのコメントを外してください。_

</div>
</details>

## ローカルでイメージをビルドし、実行する

以下のコマンドでこのイメージをローカルでビルドして実行します：

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

[localhost:3000](http://localhost:3000/)を開き、実行中のアプリケーションを確認します。

## Docker Compose

また、Docker Compose でイメージを構築し、コンテナを実行することもできます。

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

これを `docker compose up` コマンドで実行します：

```bash
docker compose up
```

[localhost:3000](http://localhost:3000/)を開き、実行中のアプリケーションを確認します。

</div>
</details>

## Railway へのデプロイ

アプリケーションのデプロイには、[Railway](https://railway.app)のような自動化された[Dockerfile deployments](https://docs.railway.app/deploy/dockerfiles) などの PaaS を使用することができます。[Railway CLI をインストールしている場合](https://docs.railway.app/develop/cli#install)は、以下のコマンドでアプリケーションをデプロイすることができます：

```bash
railway login
railway init
railway link
railway up
railway open
```

"Variables"に行ってあなたの`DATABASE_URL`を指定します。その後、"Settings" に行き、"Generate Domain" を選択します。Railway 上での実行例を見るには[ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/)にアクセスしてください。

## お役立ち情報

| リソース                               | リンク                                                               |
| -------------------------------------- | -------------------------------------------------------------------- |
| Dockerfile のリファレンス              | https://docs.docker.com/engine/reference/builder/                    |
| Compose file バージョン 3 リファレンス | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Docker CLI リファレンス                | https://docs.docker.com/engine/reference/commandline/docker/         |
| Docker Compose CLI リファレンス        | https://docs.docker.com/compose/reference/                           |
| Next.js の Docker イメージでのデプロイ | https://nextjs.org/docs/deployment#docker-image                      |
| Next.js in Docker                      | https://benmarte.com/blog/nextjs-in-docker/                          |
| Docker での Next.js の例               | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| Next.js アプリの Docker イメージの作成 | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |
