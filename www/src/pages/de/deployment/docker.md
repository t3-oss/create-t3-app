---
title: Docker
description: Deployment mit Docker
layout: ../../../layouts/docs.astro
lang: de
---

Man kann den Stack mit Docker deployen. Dies ist sowohl als einzelner Container oder als Cluster mit `docker compose` möglich. Ein Beispiel dafür findet man in dem Repository [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker), welches auf dieser Dokumentation basiert.

## Docker Projektkonfiguration

Next.js benötigt unterschiedliche Vorgehensweisen für Variablen, die zur "Build time" gesetzt werden (verfügbar im Frontend, gepräfixt durch `NEXT_PUBLIC`) und Variablen, die nur serverseitig zur Laufzeit verfügbar sein sollen. Bitte beachte also die Anordnung der Variablen in der Befehlszeile, der `Dockerfile` und der `docker-compose.yml` Datei.

- `DATABASE_URL` (wird vom Server verwendet)
- `NEXT_PUBLIC_CLIENTVAR` (wird vom Client verwendet)

### 1. Next.js Konfiguration

In der [`next.config.mjs`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.mjs), muss die output-Option auf `standalone` gesetzt werden, um die Größe vom Docker-Image zu reduzieren und Gebrauch von ["Output File Tracing"](https://nextjs.org/docs/advanced-features/output-file-tracing) zu machen:

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. Erstelle eine dockerignore Datei

<details>
    <summary>
    Klick hier und kopiere den Inhalt in <code>.dockerignore</code>:
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

### 3. Dockerfile erstellen

> Da wir die Umgebungsvariablen des Servers nicht in den Container ziehen, wird die [Validierung der Umgebungsvariablen](/de/usage/env-variables) fehlschlagen. Um dies zu verhindern, müssen wir dem Build-Befehl `SKIP_ENV_VALIDATION=1` hinzufügen, damit die Umgebungsvariablen-Schemas nicht zur "Build time" validiert werden.

<details>
    <summary>
    Klick hier und kopiere den Inhalt in dein<code>Dockerfile</code>:
    </summary>
<div class="content">

```docker
##### Abhängigkeiten

FROM --platform=linux/amd64 node:16-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Installiere Prisma Client - Entferne diese Zeile wenn du Prisma nicht verwendest

COPY prisma ./

# Installiere die Abhängigkeiten basierend auf dem bevorzugten Paketmanager

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

> **_Notizen_**
>
> - _Emulation von `--platform=linux/amd64` ist gegebenfalls mit Node 18 nicht mehr notwendig._
> - _Siehe [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) um zu verstehen warum `libc6-compat` eventuell benötigt wird._
> - _Next.js erfasst [anonyme Daten zur Nutzung](https://nextjs.org/telemetry). In der obenstehenden `Dockerfile` befinden sich bereits zwei auskommentierte Zeilen mit dem Befehl `ENV NEXT_TELEMETRY_DISABLED 1`. Entferne die Kommentare der ersten Zeile um die Datenerfassung während des Builds zu deaktivieren. Die zweite Zeile deaktiviert die Datenerfassung zur Laufzeit._

</div>
</details>

## Erstellung und lokale Ausführung des Images

Erstelle und starte das Image lokal mit folgenden Befehlen:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="hier_datenbank_url_einfügen" ct3a-docker
```

Öffne [localhost:3000](http://localhost:3000/) um die laufende Anwendung zu sehen.

## Docker Compose

Du kannst auch Docker Compose verwenden, um deine Anwendung zu starten.

<details>
    <summary>
      Verfolge die obenstehenden Schritte 1-4, klicke hier und füge den Inhalt in <code>docker-compose.yml</code> ein:
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
      - DATABASE_URL=hier_datenbank_url_einfügen
```

Führe den Befehl `docker compose up` aus:

```bash
docker compose up
```

Öffne [localhost:3000](http://localhost:3000/) um die laufende Anwendung zu sehen.

</div>
</details>

## Auf Railway deployen

Du kannst einen PaaS wie [Railway's](https://railway.app) automatisierte [Dockerfile deployments](https://docs.railway.app/deploy/dockerfiles) verwenden um deine Anwendung zu deployen. Wenn du die [Railway CLI installiert hast](https://docs.railway.app/develop/cli#install), kannst du deine Anwendung mit folgenden Befehlen deployen:

```bash
railway login
railway init
railway link
railway up
railway open
```

Gehe zu "Variables" und füge deine `DATABASE_URL` ein. Anschließend gehe zu "Settings" und wähle "Generate Domain". Um ein laufendes Beispiel auf Railway zu sehen, besuche [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

## Nützliche Ressourcen

| Resource                                        | Link                                                                 |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| Dockerfile Referenz                             | https://docs.docker.com/engine/reference/builder/                    |
| Compose file version 3 Referenz                 | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Docker CLI Referenz                             | https://docs.docker.com/engine/reference/commandline/docker/         |
| Docker Compose CLI Referenz                     | https://docs.docker.com/compose/reference/                           |
| Next.js Deployment mit Docker Image             | https://nextjs.org/docs/deployment#docker-image                      |
| Next.js in Docker                               | https://benmarte.com/blog/nextjs-in-docker/                          |
| Next.js mit Docker Beispiel                     | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| Erstelle ein Docker Image von einer Next.js app | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |
