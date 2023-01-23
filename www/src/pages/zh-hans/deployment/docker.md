---
title: Docker
description: 使用 Docker 部署
layout: ../../../layouts/docs.astro
lang: zh-hans
---

你可以将这个 stack 容器化，将它作为一个单独容器使用 Docker 来部署，或者作为一系列容器的部分，使用 docker-compose 来部署。参看基于本文档的示例仓库 [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker)。

## Docker 项目配置

请注意 Next.js 会针对编译时客户端的环境变量（在客户端，名称前缀含有 `NEXT_PUBLIC`） 和运行时环境的服务器端变量有不同的处理过程。在本次演示中我们将使用两个环境变量，请注意它们在 `Dockerfile` 文件中的位置、命令行参数以及文件 `docker-compose.yml`：

- `DATABASE_URL` （被用于服务器端）
- `NEXT_PUBLIC_CLIENTVAR` （被用于客户端）

### 1. Next 的配置

在你的 [`next.config.mjs`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.mjs) 文件里，添加构建输出选项 `standalone`，以[自动借助追踪输出文件来降低镜像文件的大小](https://nextjs.org/docs/advanced-features/output-file-tracing)：

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. 创建 dockerignore 文件

<details>
    <summary>
      点击这里并将下方内容添加到 <code>.dockerignore</code> 里：
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

### 3. 创建 Dockerfile

> 因为我们并没有将服务端环境变量导入到我们的容器里，因此 [环境变量的 schema 验证](/zh-hans/usage/env-variables) 肯定不会通过。为了防止这种情况发生，我们必须在构建命令中添加 `SKIP_ENV_VALIDATION=1` 标识，以便 env-schema 不会在编译时被验证。

<details>
    <summary>
      点击这里并将下方内容添加到 <code>Dockerfile</code> 里：
    </summary>
<div class="content">

```docker
##### DEPENDENCIES

FROM --platform=linux/amd64 node:16-apline3.17 AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# 安装 Prisma 客户端 - 如果不需要 Prisma，移除下一行

COPY prisma ./

# 使用 PNPM 包管理工具安装依赖包

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

> **_注意_**
>
> - _在迁移到 Node 18 后，可能就没有必要再使用 `--platform=linux/amd64` 了。_
> - _参看 [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) 来了解为什么使用 `libc6-compat`_
> - _Next.js 会收集 [关于使用情况的匿名观测数据](https://nextjs.org/telemetry)。取消注释第一个 `ENV NEXT_TELEMETRY_DISABLED 1`，以在构建过程中关闭该观测功能。取消注释第二个 `ENV NEXT_TELEMETRY_DISABLED 1` 以关闭在运行时的观测功能。_

</div>
</details>

## 在本地构建和运行镜像

通过下方命令在本地构建和运行该镜像：

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

在浏览器中访问 [localhost:3000](http://localhost:3000/) 来查看运行的应用。

## Docker Compose

你也可以使用 Docker Compose 来创建镜像以运行容器。

<details>
    <summary>
      遵循以上 1 - 4 的步骤，点击这里，将下方内容添加到 <code>docker-compose.yml</code> 里：
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

命令行运行 `docker compose up`：

```bash
docker compose up
```

在浏览器中访问 [localhost:3000](http://localhost:3000/) 来查看运行的应用。

</div>
</details>

## 部署到 Railway

你可以使用 PaaS（平台即服务）工具，例如 [Railway's](https://railway.app)，自动完成 [Dockerfile 部署](https://docs.railway.app/deploy/dockerfiles) 来部署你的应用。如果你已经 [安装了 Railway CLI 命令行工具](https://docs.railway.app/develop/cli#install)，你可以使用下方命令来部署你的应用：

```bash
railway login
railway init
railway link
railway up
railway open
```

前往 "Variables"，填入你的 `DATABASE_URL`。然后前往 "Settings" 里，选择 "Generate Domain"。访问 [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/) 来查看托管在 Railway 上的项目。

## 有用的资源

| 资源                                  | 链接                                                                 |
| ------------------------------------- | -------------------------------------------------------------------- |
| Dockerfile 参考手册                   | https://docs.docker.com/engine/reference/builder/                    |
| Compose file 第三版参考手册           | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Docker CLI 命令行工具参考手册         | https://docs.docker.com/engine/reference/commandline/docker/         |
| Docker Compose CLI 命令行工具参考手册 | https://docs.docker.com/compose/reference/                           |
| 使用 Docker 镜像 部署 Next.js         | https://nextjs.org/docs/deployment#docker-image                      |
| Docker 中的 Next.js                   | https://benmarte.com/blog/nextjs-in-docker/                          |
| Next.js 搭配 Docker 示例              | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| 创建一个 Next.js 应用的 Docker 镜像   | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |
