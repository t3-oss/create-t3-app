---
title: Docker
description: Deployment dengan Docker
layout: ../../../layouts/docs.astro
lang: id
---

Kamu dapat mengemas stack ini dan melakukan deployment sebagai satu kontainer tunggal menggunakan Docker, atau sebagai bagian dari beberapa kontainer menggunakan docker-compose. Lihat [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker) untuk contoh repo yang didasarkan pada dokumentasi ini.

## Konfigurasi Proyek Docker

Perhatikan bahwa Next.js memerlukan proses yang berbeda antara variabel lingkungan **waktu build** (tersedia di sisi frontend dan diawali dengan `NEXT_PUBLIC`) dan **waktu runtime** (hanya sisi server).  
Dalam contoh ini kita menggunakan dua variabel, perhatikan posisi mereka di `Dockerfile`, argumen command line, dan `docker-compose.yml`:

- `DATABASE_URL` (digunakan oleh server)
- `NEXT_PUBLIC_CLIENTVAR` (digunakan oleh client)

### 1. Konfigurasi Next

Di [`next.config.js`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.js), tambahkan konfigurasi opsi output `standalone` untuk [mengurangi ukuran image dengan secara otomatis memanfaatkan output traces](https://nextjs.org/docs/advanced-features/output-file-tracing):

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. Buat file dockerignore

<details>
    <summary>
      Klik di sini dan tambahkan isi berikut ke <code>.dockerignore</code>:
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

### 3. Buat Dockerfile

> Karena kita tidak menarik variabel lingkungan server ke dalam container, [validasi skema environment](/id/usage/env-variables) akan gagal.
> Untuk mencegah ini, tambahkan flag `SKIP_ENV_VALIDATION=1` ke perintah build agar skema environment tidak divalidasi saat build.

<details>
    <summary>
      Klik di sini dan tambahkan isi berikut ke <code>Dockerfile</code>:
    </summary>
<div class="content">

```docker
##### DEPENDENCIES

FROM --platform=linux/amd64 node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install Prisma Client - hapus jika tidak menggunakan Prisma

COPY prisma ./

# Install dependencies berdasarkan package manager yang digunakan

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm i; \
    else echo "Lockfile tidak ditemukan." && exit 1; \
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
    else echo "Lockfile tidak ditemukan." && exit 1; \
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

> **Catatan**
>
> - _Emulasi `--platform=linux/amd64` mungkin tidak diperlukan setelah berpindah ke Node 18._
> - _Lihat [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) untuk memahami kenapa `libc6-compat` mungkin dibutuhkan._
> - _Menggunakan image berbasis Alpine 3.17 [dapat menyebabkan masalah dengan Prisma](https://github.com/t3-oss/create-t3-app/issues/975). Menyetel `engineType = "binary"` bisa mengatasinya, tetapi [dengan konsekuensi performa](https://www.prisma.io/docs/concepts/components/prisma-engines/query-engine#the-query-engine-at-runtime)._
> - _Next.js mengumpulkan [data telemetri anonim](https://nextjs.org/telemetry). Uncomment baris `ENV NEXT_TELEMETRY_DISABLED 1` untuk menonaktifkan telemetri saat build atau runtime._

</div>
</details>

## Build dan Jalankan Image Secara Lokal

Bangun dan jalankan image ini secara lokal dengan perintah berikut:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

Buka [localhost:3000](http://localhost:3000/) untuk melihat aplikasi kamu berjalan.

## Docker Compose

Kamu juga dapat menggunakan Docker Compose untuk membangun image dan menjalankan container.

<details>
    <summary>
      Ikuti langkah 1–3 di atas, lalu klik di sini dan tambahkan isi berikut ke <code>docker-compose.yml</code>:
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

Bangun dan jalankan dengan perintah berikut:

```bash
docker compose up --build
```

Buka [localhost:3000](http://localhost:3000/) untuk melihat aplikasi kamu berjalan.

</div>
</details>

## Deploy ke Railway

Kamu bisa menggunakan PaaS seperti [Railway](https://railway.app) untuk [deployment otomatis Dockerfile](https://docs.railway.app/deploy/dockerfiles).
Jika kamu sudah menginstal [Railway CLI](https://docs.railway.app/develop/cli#install), jalankan perintah berikut untuk melakukan deployment:

```bash
railway login
railway init
railway link
railway up
railway open
```

Pergi ke tab **Variables** dan tambahkan `DATABASE_URL` kamu.
Lalu buka tab **Settings** dan pilih **Generate Domain**.
Untuk melihat contoh yang sudah berjalan di Railway, kunjungi [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

## Sumber Berguna

| Sumber                                 | Link                                                                                                                                         |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Referensi Dockerfile                   | [https://docs.docker.com/engine/reference/builder/](https://docs.docker.com/engine/reference/builder/)                                       |
| Referensi Compose file versi 3         | [https://docs.docker.com/compose/compose-file/compose-file-v3/](https://docs.docker.com/compose/compose-file/compose-file-v3/)               |
| Referensi CLI Docker                   | [https://docs.docker.com/engine/reference/commandline/docker/](https://docs.docker.com/engine/reference/commandline/docker/)                 |
| Referensi CLI Docker Compose           | [https://docs.docker.com/compose/reference/](https://docs.docker.com/compose/reference/)                                                     |
| Deployment Next.js dengan Docker Image | [https://nextjs.org/docs/deployment#docker-image](https://nextjs.org/docs/deployment#docker-image)                                           |
| Next.js di Docker                      | [https://benmarte.com/blog/nextjs-in-docker/](https://benmarte.com/blog/nextjs-in-docker/)                                                   |
| Contoh Next.js dengan Docker           | [https://github.com/vercel/next.js/tree/canary/examples/with-docker](https://github.com/vercel/next.js/tree/canary/examples/with-docker)     |
| Membuat Docker Image untuk Next.js     | [https://blog.tericcabrel.com/create-docker-image-nextjs-application/](https://blog.tericcabrel.com/create-docker-image-nextjs-application/) |
