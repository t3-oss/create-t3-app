---
title: Docker
description: Utrulling med Docker
layout: ../../../layouts/docs.astro
lang: no
---

Stakken kan rulles ut med Docker. Enten som en enkel kontainer eller som en gruppe kontainere ved hjelp av `docker-compose`. Se [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker) for et eksempel-_repo_ som er basert på denne dokumentasjonen.

## Docker-prosjektkonfigurasjon

Vær klar over at Next.js krever forskjellig håndtering av variabler som er satt til "build time" (tilgjengelig i frontend, prefikset av `NEXT_PUBLIC`) og variabler som bare skal være tilgjengelige på serversiden under kjøring. I denne demonstrasjonen bruker vi to variabler. Så vær oppmerksom på rekkefølgen på kommandolinjeargumentene i `Dockerfile` og i `docker-compose.yml`-filen.

- `DATABASE_URL` (brukes av serveren)
- `NEXT_PUBLIC_CLIENTVAR` (brukes av klienten)

### 1. Next.js-konfigurasjon

I [`next.config.mjs`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.mjs), legg til _output_-alternativet `standalone` for å redusere størrelsen på Docker-_imaget_ ved å benytte ["Output File Tracing"](https://nextjs.org/docs/advanced-features/output-file-tracing):

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. Lag en dockerignore-fil

<details>
     <summary>
     Klikk her og kopier innholdet til <code>.dockerignore</code>:
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

### 3. Lag Dockerfile

> Siden vi ikke drar serverens miljøvariabler inn i kontaineren, vil [skjema for validering av miljøvariabler](/no/usage/env-variables) feile. For å forhindre dette må vi legge til `SKIP_ENV_VALIDATION=1` i byggkommandoen slik at miljøvariabelskjemaene ikke valideres ved "build time".

<details>
     <summary>
     Klikk her og kopier innholdet til <code>Dockerfile</code>:
     </summary>
<div class="content">

```docker
##### AVHENGIGHETER

FROM --platform=linux/amd64 node:16-apline3.17 AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Installer Prisma-klienten - Fjern denne linjen hvis du ikke bruker Prisma

COPY prisma ./

# Installer avhengigheter basert på foretrukket pakkebehandler

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

> **_Notater_**
>
> - _Emulering av `--platform=linux/amd64` er kanskje ikke lenger nødvendig dersom man bruker Node 18._
> - \_Se [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) for å forstå hvorfor `libc6-compat` kan være nødvendig.
> - _Next.js samler inn [anonym bruksdata](https://nextjs.org/telemetry). I `Dockerfile` ovenfor er det allerede to kommenterte linjer med kommandoen `ENV NEXT_TELEMETRY_DISABLED 1`. Fjern kommentarer på den første linjen for å deaktivere datainnsamling under bygging. Den andre linjen deaktiverer datainnsamling under kjøring._

</div>
</details>

## Bygg og Kjør Bildet Lokalt

Bygg og start opp bildet lokalt med følgende kommandoer:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_her" ct3a-docker
```

Åpne [localhost:3000](http://localhost:3000/) for å se programmet som kjøres.

## Docker Compose

Du kan også bruke Docker Compose for å bygge bildet og kjøre det i kontaineren.

<details>
    <summary>
       Følg trinn 1-4 ovenfor, klikk her og lim inn innholdet i <code>docker-compose.yml</code>:
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
      - DATABASE_URL=database_url_her
```

Kjør kommandoen `docker compose up`:

```bash
docker compose up
```

Åpne [localhost:3000](http://localhost:3000/) for å se programmet som kjører.

</div>
</details>

## Rull ut til Railway

Du kan bruke en PaaS slik som [Railways](https://railway.app) automatiserte [Dockerfile-utrullinger](https://docs.railway.app/deploy/dockerfiles) for å rulle ut applikasjonen din. Hvis du har installert [Railway CLI](https://docs.railway.app/develop/cli#install), kan du rulle ut applikasjonen din med følgende kommandoer:

```bash
railway login
railway init
railway link
railway up
railway open
```

Gå til "Variables" og lim inn `DATABASE_URL`. Gå deretter til "Settings" og velg "Generate Domain". For å se et kjørende eksempel på Railway, besøk [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

## Nyttige Ressurser

| Ressurser                              | Link                                                                 |
| -------------------------------------- | -------------------------------------------------------------------- |
| Dockerfile-referanse                   | https://docs.docker.com/engine/reference/builder/                    |
| Compose file versjon 3-Referanse       | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Docker CLI-referanse                   | https://docs.docker.com/engine/reference/commandline/docker/         |
| Docker Compose CLI-referanse           | https://docs.docker.com/compose/reference/                           |
| Rulle ut Next.js med Docker Image      | https://nextjs.org/docs/deployment#docker-image                      |
| Next.js i Docker                       | https://benmarte.com/blog/nextjs-in-docker/                          |
| Next.js med Docker-Eksempel            | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| Lag et Docker-bilde fra en Next.js-app | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |
