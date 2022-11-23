---
title: Docker
description: Distribuire con Docker
layout: ../../../layouts/docs.astro
---

Puoi fare un container con questa "stack" e distribuirla come un "container" singolo usando Docker, o in un gruppo di "contanier" usando "docker-compose". GUarda [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker) per un esempio basato su questa documentazione (in inglese).

## Docker Project Configuration

Nota che Next.js richiede un processo differente per "build time" (disponibile nel frontend, 
prefisso da `NEXT_PUBLIC`) e un ambiente di esecuzione, solo server-side, e variabili. In questa demo useremo due variabili, fai attenzione alle loro posizione nel `Dockerfile`, argomenti della linea di comand, e `docker-compose.yml`:

- `DATABASE_URL` (usato dal server)
- `NEXT_PUBLIC_CLIENTVAR` (usato dal client)

### 1. Configurazione di Next

Nel tuo [`next.config.mjs`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.mjs), aggiugni la opzione output `standalone` per [ridurre la grandezza delle immagini automaticamente usando tracce di uscita](https://nextjs.org/docs/advanced-features/output-file-tracing) (<- in inglese):

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. Crea un file "dockerignore" 

<details>
    <summary>
      Clicca qua e includi i contenuti nel <code>.dockerignore</code>:
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

### 3. Crea un "Dockerfile"

> Visto che non stiamo prendendo le variabili ambientali del server nel container, il "[environment schema validation](/en/usage/env-variables)" fallira. Per prevenirlo, dovremmo aggiungere l'opzione `SKIP_ENV_VALIDATION=1` al comando di "build" per evitare che lo schema env non sono validate a "build time".

<details>
    <summary>
      Clicca qua e includi i contenuti nel <code>Dockerfile</code>:
    </summary>
<div class="content">

```docker
##### DEPENDENCIES

FROM --platform=linux/amd64 node:16-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
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

> **_Note_**
>
> - _L'emulazione della piattaforma `--platform=linux/amd64` potrebbe non essere neccesaria dopo Node 18._
> - _Guarda [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) (<- in inglese) per capire perche `libc6-compat` dovrebbe servire._
> - _Next.js prende [dati di uso generale telemtrici anonimi](https://nextjs.org/telemetry). Togli il commento la prima volta che vedi `ENV NEXT_TELEMETRY_DISABLED 1` per disabilitare la temetria durante la costruzion. Togli il commento la seconda volta per disabilitarla durante il tempo di esecuzione._

</div>
</details>

## Costruisci ed esegui l'immagine localmente

Costruisci ed esegui l'immagine localmente con i comandi seguenti:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

Apri [localhost:3000](http://localhost:3000/) per vedere la tua applicazione girare.

## Docker Compose

Puoi anche usare Docker Compose per costruire ed eseguire l'immagine.

<details>
    <summary>
      Segui gli step 1-4, clicca qua, e includi i contenuti nel <code>docker-compose.yml</code>:
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

Gira con il comando `docker compose up`:

```bash
docker compose up
```

Apri [localhost:3000](http://localhost:3000/) per vedere la tua applicazione girare.

</div>
</details>

## Distribuisi su Railway

Puoi usare un servizio di PaaS come il deployment automatico [di Dockerfile](https://docs.railway.app/deploy/dockerfiles) di [Railway](https://railway.app) per distribire la tua app. Se hai la [Cli di Railway installata](https://docs.railway.app/develop/cli#install) puoi distribuire la tua app con i seguenti comandi:

```bash
railway login
railway init
railway link
railway up
railway open
```

Vai a "Variabili" e includi il tuo `DATABASE_URL`. Quindi vai su "Impostazioni" e seleziona "Genera dominio". Per visualizzare un esempio in esecuzione su Railway, visita [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

## Risorse utili

| Risorsa | Collegamento |
| ------------------------------------ | -------------------------------------------------- ------------------ |
| Riferimento Dockerfile | https://docs.docker.com/engine/reference/builder/ |
| Componi file versione 3 riferimento | https://docs.docker.com/compose/compose-file/compose-file-v3/ |
| Riferimento CLI Docker | https://docs.docker.com/engine/reference/commandline/docker/ |
| Riferimento CLI di Docker Compose | https://docs.docker.com/compose/reference/ |
| Next.js Deployment con Docker Image | https://nextjs.org/docs/deployment#docker-image |
| Next.js in Docker | https://benmarte.com/blog/nextjs-in-docker/ |
| Next.js con Docker Esempio | https://github.com/vercel/next.js/tree/canary/examples/with-docker |
| Crea un'immagine Docker di un'app Next.js | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |