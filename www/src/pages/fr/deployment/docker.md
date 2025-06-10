---
title: Docker
description: Déploiement avec Docker
layout: ../../../layouts/docs.astro
lang: fr
---

Vous pouvez containeriser cette stack et la déployer en tant que conteneur unique à l'aide de Docker, ou en tant que partie d'un ensemble de conteneurs en utilisant docker-compose. Voir [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker) pour un exemple basé sur cette documentation.

## Configuration du projet sous Docker

Veuillez noter que Next.js nécessite des variables d’environnements qui sont différentes entre le processus de génération (celles-ci vont être disponible seulement côté navigateur, et sont préfixées par `NEXT_PUBLIC`) et dans l’environnement d’exécution, qui est côté serveur seulement. Dans cette démo nous utilisons deux variables. Prêtez attention à leurs positions dans les fichiers `Dockerfile`, `docker-compose.yml` et dans la ligne de commande.

- `DATABASE_URL` (utiliser par le serveur)
- `NEXT_PUBLIC_CLIENTVAR` (utiliser par le client)

### 1. Configuration de Next

Dans votre fichier [`next.config.js`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.js), ajouter l'entrée `output` avec comme valeur `standalone` [réduit la taille de l'image Docker en se basant sur la sortie du processus de génération](https://nextjs.org/docs/advanced-features/output-file-tracing):

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. Créer un fichier dockerignore

<details>
    <summary>
      Cliquez ici et incluez le contenue dans votre <code>.dockerignore</code>:
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

### 3. Créer un fichier Dockerfile

> Étant donné que nous ne récupérons pas les variables d'environnement du serveur dans notre conteneur, la [validation du schéma d'environnement](/fr/usage/env-variables) échouera. Pour éviter cela, nous devons ajouter l'argument `SKIP_ENV_VALIDATION=1` à la commande de génération afin que les schémas d'environnement ne soient pas validé à ce moment là.

<details>
    <summary>
      Cliquez ici et incluez le contenue dans votre <code>Dockerfile</code>:
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

> **_Notes_**
>
> - _L'émulation de `--platform=linux/amd64` n'est pas nécessaire à partir de Node 18._
> - _Voir [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) pour comprendre pourquoi `libc6-compat` pourrait être nécessaire._
> - _L'utilisation d'images basées sur Alpine 3.17 [peut causer des problèmes avec Prisma](https://github.com/t3-oss/create-t3-app/issues/975). Définir `engineType = "binary"` résout le problème dans Alpine 3.17, [mais a un coût de performance associé](https://www.prisma.io/docs/concepts/components/prisma-engines/query-engine#the-query-engine-at-runtime)._
> - _Next.js collecte des [données de télémétrie anonymes sur l'utilisation générale](https://nextjs.org/telemetry). Décommentez la première occurrence de `ENV NEXT_TELEMETRY_DISABLED 1` pour désactiver la télémétrie pendant la construction. Décommentez la deuxième occurrence pour désactiver la télémétrie pendant l'exécution._

</div>
</details>

## Génération et exécution de l'image localement

Générer et exécuter l'image localement avec les commandes suivantes:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

Ouvrez [localhost:3000](http://localhost:3000/) pour voir votre application s'exécuter.

## Docker Compose

Vous pouvez également utiliser Docker Compose pour générer l'image et exécuter le conteneur.

<details>
    <summary>
      Suivez les étapes 1 à 3 ci-dessus, cliquez ici et incluez le contenue dans votre <code>docker-compose.yml</code>:
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

Exécutez ceci à l'aide de la commande `docker compose up` :

```bash
docker compose up
```

Ouvrez [localhost:3000](http://localhost:3000/) pour voir votre application en cours d'exécution.

</div>
</details>

## Déployer sur Railway

Vous pouvez utiliser un service de type PaaS comme [Railway's](https://railway.app) pour automatiser le déploiement de votre application [Voir Dockerfile sur railway](https://docs.railway.app/deploy/dockerfiles). Si vous avez [Railway CLI d'installer](https://docs.railway.app/develop/cli#install) vous pouvez déployer votre application en suivant les commandes suivantes:

```bash
railway login
railway init
railway link
railway up
railway open
```

Allez dans "Variables" et rajoutez votre `DATABASE_URL`. Ensuite, allez dans "Settings" et sélectionnez "Generate Domain.". Pour voir un exemple qui fonctionne sur Railway, visitez [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

## Ressources utiles

| Ressources                                       | Liens                                                                |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| Dockerfile référence                             | https://docs.docker.com/engine/reference/builder/                    |
| Compose file version 3 référence                 | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Docker CLI référence                             | https://docs.docker.com/engine/reference/commandline/docker/         |
| Docker Compose CLI référence                     | https://docs.docker.com/compose/reference/                           |
| Next.js déploiement avec une image Docker        | https://nextjs.org/docs/deployment#docker-image                      |
| Next.js dans Docker                              | https://benmarte.com/blog/nextjs-in-docker/                          |
| Next.js exemple avec Docker                      | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| Créer une image Docker d'une application Next.js | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |
