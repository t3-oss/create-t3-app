---
title: Docker
description: النشر مع Docker
layout: ../../../layouts/docs.astro
lang: ar
dir: rtl
---

يمكنك إستخدام الـ Stack داخل Docker Container أو كجزء من مجموعة containers عن طريق docker-compose، إقرأ المزيد هنا [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker)

## تهيئة مشروع Docker

يَجب أن تضع في حُسبانك أن Next.js يتطلب process مُنفصلة لـ buildtime و runtime.
يمكنك الوصول لـ runtime environment فقط في الـ Server.

في هذا المثال نستخدم مُتغيرين فقط لذلك عليك أن تٌبقي في بالك موقعها في الـ `Dockerfile` والـ command-line arguments, والـ `docker-compose.yml`:

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

FROM --platform=linux/amd64 node:16-alpine3.16 AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat
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

> **_مُلاحظات_**
>
> - مُحاكاة `--platform=linux/amd64` قد لا تكون ضرورية في Node 18
> - إقرأ [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) لتعلم لماذا قد تحتاج `libc6-compat`.
> - تقوم Next.js بجمع [بيانات خفية عن الاستختدام](https://nextjs.org/telemetry).
> - قٌم بإالغاء تعليق الـ instance الاولي من ENV NEXT_TELEMETRY_DISABLED 1 حتي تُعيق الـ telemetry أثناء الـ build، قٌم بإلغاء تعليق الـ instance الثانية تٌعيق الـ telemetry أثناء الـ runtime

</div>
</details>

## البناء والتشغيل locally

قم ببناء وتشغيل هذه الصورة Locally باستخدام الأوامر التالية:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

إفتح [localhost:3000](http://localhost:3000/) لتري تطبيقك يَعمل

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

إذهب الي "Variables" وأضف `DATABASE_URL` ثُم الي "Settings" واختر "Generate Domain." لتري أمثلة علي Railway زُر [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

## مصدر مُفيدة

| المصدر                               | الرابط                                                               |
| ------------------------------------ | -------------------------------------------------------------------- |
| Dockerfile reference                 | https://docs.docker.com/engine/reference/builder/                    |
| Compose file version 3 reference     | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Docker CLI reference                 | https://docs.docker.com/engine/reference/commandline/docker/         |
| Docker Compose CLI reference         | https://docs.docker.com/compose/reference/                           |
| Next.js Deployment with Docker Image | https://nextjs.org/docs/deployment#docker-image                      |
| Next.js in Docker                    | https://benmarte.com/blog/nextjs-in-docker/                          |
| Next.js with Docker Example          | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| Create Docker Image of a Next.js app | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |
