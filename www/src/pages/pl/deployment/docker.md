---
title: Docker
description: Deployment with Docker
layout: ../../../layouts/docs.astro
lang: pl
---

Stack ten możesz skonteneryzować i zdeploy'ować jako pojedynczy kontener korzystając z Dockera, czy też jako część grupy kontenerów korzystając z docker-compose. Po przykładowe repozytorium bazowane na tym dokumencie, zobacz [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker).

## Konfiguracja Projektu z Dockerem

Należy pamiętać, że Next.js wymaga innego procesu na czas budowania (dostępnego na frontendzie, z prefiksem `NEXT_PUBLIC`) a innego dla środowiska na czas działania, tylko po stronie serwera, oraz zmiennych. W poniższym demo korzystamy z dwóch zmiennych, zwróć uwagę na ich umiejscowienie w pliku `Dockerfile`, argumenty w konsoli i plik `docker-compose.yml`:

- `DATABASE_URL` (używany przez serwer)
- `NEXT_PUBLIC_CLIENTVAR` (używany przez klienta)

### 1. Konfiguracja Next.js

W swoim pliku [`next.config.mjs`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.mjs), dodaj opcję konfiguracji outputu `standalone` aby [zredukować rozmiar zdjęć poprzez automatyczne wykorzystanie danych wyjściowych](https://nextjs.org/docs/advanced-features/output-file-tracing):

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. Stwórz plik dockerignore

<details>
    <summary>
      Kliknij tutaj i dodaj poniższą zawartość do pliku <code>.dockerignore</code>:
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

### 3. Stwórz plik Dockerfile

> Jako iż nie pobieramy serwerowych zmiennych środowiskowych do naszego kontenera, [walidacja zmiennych środowiskowych](/pl/usage/env-variables) wyrzuci błąd. Aby mu zapobiec, musimy dodać flagę `SKUP_ENV_VALIDATION=1` do komendy budowania projektu - schemat zmiennych środ. nie zostanie wtedy sprawdzony podczas budowania.

<details>
    <summary>
      Kliknij tutaj i dodaj poniższą zawartość do pliku <code>Dockerfile</code>:
    </summary>
<div class="content">

```docker
##### DEPENDENCIES

FROM --platform=linux/amd64 node:16-alpine AS deps
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

> **_Uwagi_**
>
> - _Emulacja platformy z flagą `--platform=linux/amd64` może nie być potrzebna podczas korzystania z Node'a w wersji 18._
> - _Aby zrozumieć, dlaczego `libc6-compat` może być potrzebny, zobacz [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine)._
> - _Next.js zbiera [anonimowe dane telemetryczne o ogólnym użyciu](https://nextjs.org/telemetry). Odkomentuj pierwsze wystąpienie `ENV NEXT_TELEMETRY_DISABLED 1` aby wyłączyć telemetrię podczas budowania. Odkomentuj drugie wystąpienie, aby wyłączyć telemetrię w produkcie końcowym._

</div>
</details>

## Zbuduj oraz Uruchom Obraz Lokalnie

Zbuduj i uruchom ten obraz lokalnie korzystając z następujących komend:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

Otwórz [localhost:3000](http://localhost:3000/) aby zobaczyć uruchomioną aplikację.

## Docker Compose

Możesz także skorzystać z narzędzia Docker Compose, aby zbudować obraz i uruchomić kontener.

<details>
    <summary>
      Podążaj za krokami 1-4 powyżej, kliknij tutaj i dodaj poniższą zawartość do pliku <code>docker-compose.yml</code>:
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

Uruchom aplikację za pomocą komendy `docker compose up`:

```bash
docker compose up
```

Otwórz [localhost:3000](http://localhost:3000/) aby zobaczyć uruchomioną aplikację.

</div>
</details>

## Deployment na Railway'a

Możesz użyć usługi PaaS ("platforma jako usługa"), takiej jak [zautomatyzowany deployment Dockerfile'a](https://docs.railway.app/deploy/dockerfiles) od [Railway'a](https://railway.app), aby zdeploy'ować swoją aplikację. Jeżeli zainstalowałeś [CLI Railway'a](https://docs.railway.app/develop/cli#install), możesz zdeploy'ować aplikację korzystając z poniższych komend.

```bash
railway login
railway init
railway link
railway up
railway open
```

Przejdź do zakładki "Zmienne" ("Variables") i dodaj tam swój `DATABASE_URL`. Następnie przejdź do ustawień ("Settings") i wybierz opcję "Wygeneruj Domenę." ("Generate Domain."). Aby zobaczyć działający przykład na Railway, odwiedź stronę [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

## Przydatne Zasoby

| Nazwa odnośnika                               | Link                                                                 |
| --------------------------------------------- | -------------------------------------------------------------------- |
| Odnośnik do pików Dockerfile                  | https://docs.docker.com/engine/reference/builder/                    |
| Odnośnik do plików "Compose file" w wersji 3  | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Odnośnik do Docker CLI                        | https://docs.docker.com/engine/reference/commandline/docker/         |
| Odnośnik do Docker Compose CLI                | https://docs.docker.com/compose/reference/                           |
| Wdrażanie aplikacji Next.js z obrazem Dockera | https://nextjs.org/docs/deployment#docker-image                      |
| Next.js z Dockerem                            | https://benmarte.com/blog/nextjs-in-docker/                          |
| Przykład Next.jsa z Dockerem                  | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| Stwórz obraz Dockera aplikacji Next.js        | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |
