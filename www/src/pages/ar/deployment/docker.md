---
title: Docker
description: Deployment with Docker
layout: ../../../layouts/docs.astro
lang: ar
dir: rtl
---

يمكنك إستخدام الـ Stack داخل Docker Container أو كجزء من مجموعة containers بإستخدام docker-compose، إقرأ المزيد هنا [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker)

## تهيئة مشروع Docker

يَجد أن تضع في حسبانك أن Next.js يتطلب process مُنفصلة لـ buildtime و runtime.
يمكنك الوصول لـ runtime environment فقط في الـ Server ـ في هذا المثال نستخدم مُتغيرين فقط لذلك عليك أن تٌبقي في بالك موقعها في
الـ `Dockerfile`والـ command-line arguments, والـ `docker-compose.yml`:

- `DATABASE_URL` (تُستخدم في الـ server)
- `NEXT_PUBLIC_CLIENTVAR` (تُستخدم في الـ client)

### 1. إعداد Next

في ملف [`next.config.mjs`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.mjs) قم بإضافة `standalone` حتى [تُقلل حجم الصور تلقائيا](https://nextjs.org/docs/advanced-features/output-file-tracing):

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. إنشاء ملف dockerignore

<details>
    <summary>
      إضغط هنا لتقرأ محتوي الملف  <code>.dockerignore</code>:
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

### 3. إنشاء Dockerfile

> بما أننا لا نقوم بجلب الـ server environment variables إلى داخل الـ container، فإن [environment schema validation](/en/usage/env-variables) سيفشل لتجنب هذا أضف علم `SKIP_ENV_VALIDATION=1` الي الـ command حتى تُوقف عملية الـ validation

<details>
    <summary>
      إضغط هنا لتقرأ محتوي الملف  <code>Dockerfile</code>:
    </summary>
<div class="content">

```docker
##### DEPENDENCIES

FROM --platform=linux/amd64 node:16-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# تثبيت Prisma Client - أزلها إن لم تكن تُستخدم Prisma

COPY prisma ./

# تثبيت المتطلبات وفقا للـ package manager الذي تُفضلة

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

RUN \
 if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
 elif [ -f package-lock.json ]; then npm ci; \
 elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
 else echo "Lockfile not found." && exit 1; \
 fi

##### BUILDER

FROM --platform=linux/amd64 node:16-alpine AS builder
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

FROM --platform=linux/amd64 node:16-alpine AS runner
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
> - _Next.js collects [anonymous telemetry data about general usage](https://nextjs.org/telemetry). Uncomment the first instance of `ENV NEXT_TELEMETRY_DISABLED 1` to disable telemetry during the build. Uncomment the second instance to disable telemetry during runtime._

</div>
</details>

## بناء وتشغيل الـ Image locally

قم ببناء وتشغيل هذه الصورة Locally باستخدام الأوامر التالية:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

Open [localhost:3000](http://localhost:3000/) to see your running application.

## الـ Docker Compose

يُمكنك أيضا إستخدام Docker Compose لبناء وتشغيل الـ Container

<details>
    <summary>
      بعد إتباع الخطوات من 1 إلى 4 في الاعلي إضغط هنا وأضف الملفات الي <code>docker-compose.yml</code>:
      
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

قٌم بتشغيل أمر `docker compose up`

```bash
docker compose up
```

الآن إفتح [localhost:3000](http://localhost:3000/) لترى تطبيقك يُعمل.

</div>
</details>

## الـ Deploy علي Railway

يُمكنك أن تستخدم PaaS كـ [Railway's](https://railway.app) كـ [Dockerfile deployments](https://docs.railway.app/deploy/dockerfiles)  
إذا أردت أن تستخدم [Railway CLI installed](https://docs.railway.app/develop/cli#install) يُمكنك أن تُشغل هذا الأمر:

```bash
railway login
railway init
railway link
railway up
railway open
```

Go to "Variables" and include your `DATABASE_URL`. Then go to "Settings" and select "Generate Domain." To view a running example on Railway, visit [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

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
