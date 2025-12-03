---
title: Docker
description: Triển khai với Docker
layout: ../../../layouts/docs.astro
lang: vi
---

Bạn có thể containerize stack này và triển khai nó như một container duy nhất bằng Docker, hoặc như một phần của một nhóm container bằng docker-compose. Bạn có thể tham khảo [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker) như là một repo ví dụ dựa trên tài liệu này.

## Cấu hình dự án Docker

Đối với Next.js, sẽ có những quy trình khác nhau cho môi trường build time (có sẵn trong frontend, được đặt trước bằng `NEXT_PUBLIC`) và môi trường runtime (server-side only, biến). Trong ví dụ dưới đây, chúng tôi sử dụng hai biến môi trường, và bạn hãy chú ý tớ vị trí của chúng trong `Dockerfile`, đối số dòng lệnh, và file `docker-compose.yml`:

- `DATABASE_URL` (Dùng bên phía server)
- `NEXT_PUBLIC_CLIENTVAR` (Dùng bên phía client)

### 1. Next Configuration

Trong file [`next.config.js`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.js), bạn hãy thêm cấu hình `standalone` để [tối ưu hóa kích thước hình ảnh bằng cách tự động sử dụng trace output](https://nextjs.org/docs/advanced-features/output-file-tracing):

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. Tạo file .dockerignore

<details>
    <summary>
      Click vào đây để xem nội dung của <code>.dockerignore</code>:
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

### 3. Tạo Dockerfile

> Vì chúng tôi không muốn tạo biến môi trường (environment variables) server vào container, vì thế [các bước xác thực biến môi trường](/vi/usage/env-variables) sẽ không thành công. Để ngăn điều này, chúng tôi đã thêm flag `SKIP_ENV_VALIDATION=1` vào lệnh build để không xác thực biến môi trường tại thời điểm build.

<details>
    <summary>
      Click vào đây để xem nội dung của <code>Dockerfile</code>:
    </summary>
<div class="content">

```docker
##### DEPENDENCIES

FROM --platform=linux/amd64 node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install Prisma Client - remove if not using Prisma

COPY prisma ./

# Install dependencies based on the preferred package manager

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi

##### BUILDER

FROM --platform=linux/amd64 node:20-alpine AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
    if [ -f yarn.lock ]; then SKIP_ENV_VALIDATION=1 yarn build; \
    elif [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && SKIP_ENV_VALIDATION=1 pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

##### RUNNER

FROM --platform=linux/amd64 gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app

ENV NODE_ENV production

# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["server.js"]
```

> **_Ghi chú_**
>
> - _Việc giả lập môi trường bằng `--platform=linux/amd64` có thể là không cần thiết sau khi chuyển sang Node 18._
> - _Tham khảo [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) để hiểu tại sao `libc6-compat` có thể cần thiết._
> - _Sử dụng Alpine 3.17 [có thể tạo ra một số vấn đề với Prisma](https://github.com/t3-oss/create-t3-app/issues/975). Vì thế, hãy đặt `engineType = "binary"` giải quyết vấn đề trong Alpine 3.17, tuy nhiên [hiệu suất sẽ bị ảnh hưởng](https://www.prisma.io/docs/concepts/components/prisma-engines/query-engine#the-query-engine-at-runtime)._
> - _Next.js thu thập [dữ liệu sử dụng tổng quan](https://nextjs.org/telemetry). Bỏ comment dòng đầu tiên của `ENV NEXT_TELEMETRY_DISABLED 1` để tắt thu thập dữ liệu (telemetry) trong quá trình build. Bỏ comment dòng thứ hai để tắt thu thập dữ liệu (telemetry) trong quá trình runtime._

</div>
</details>

## Xây dựng và chạy image cục bộ

Xây dựng và chạy image này cục bộ với các lệnh sau:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

Mở [localhost:3000](http://localhost:3000/) để xem ứng dụng của bạn đang chạy.

## Docker Compose

Bạn có thể sử dụng Docker Compose để xây dựng image và chạy container.

<details>
    <summary>
      Theo các bước 1-3 ở trên, click vào đây, và bao gồm nội dung trong <code>docker-compose.yml</code>:
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

Xây dựng và chạy bằng lệnh `docker compose up --build`:

```bash
docker compose up --build
```

Mở [localhost:3000](http://localhost:3000/) để xem ứng dụng của bạn đang chạy.

</div>
</details>

## Triển khai lên Railway

Bạn có thể sử dụng một PaaS như [Railway's](https://railway.app) để tự động triển khai [Dockerfile](https://docs.railway.app/deploy/dockerfiles) của bạn. Nếu bạn đã cài đặt [Railway CLI](https://docs.railway.app/develop/cli#install) bạn có thể triển khai ứng dụng của bạn với các lệnh sau:

```bash
railway login
railway init
railway link
railway up
railway open
```

Đi đến "Variables" và thêm `DATABASE_URL` của bạn. Sau đó đi đến "Settings" và chọn "Generate Domain". Để tham khảo một ví dụ được triển khai trên Railway, truy cập [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

## Tài liệu hữu ích

| Tài liệu                              | Đường dẫn                                                            |
| ------------------------------------- | -------------------------------------------------------------------- |
| Tài liệu Dockerfile                   | https://docs.docker.com/engine/reference/builder/                    |
| Tài liệu Compose file version 3       | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Tài liệu Docker CLI                   | https://docs.docker.com/engine/reference/commandline/docker/         |
| Tài liệu Docker Compose CLI           | https://docs.docker.com/compose/reference/                           |
| Triển khai Next.js với Docker Image   | https://nextjs.org/docs/deployment#docker-image                      |
| Next.js trong Docker                  | https://benmarte.com/blog/nextjs-in-docker/                          |
| Ví dụ Next.js với Docker              | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| Tạo Docker Image của ứng dụng Next.js | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |
