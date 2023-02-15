---
title: Docker
description: Desplegando con Docker
layout: ../../../layouts/docs.astro
lang: es
---

Puedes contenerizar este stack y desplegarlo como un solo contenedor mediante Docker, o como parte de un grupo de contenedores mediante docker-compose. Consulta [`ajcwebdev/ct3a-docker`](https://github.com/ajcwebdev/ct3a-docker) para ver un repositorio de ejemplo basado en este documento.

## Configuración del proyecto Docker

Ten en cuenta que Next.js requiere un proceso diferente para compilar (disponible en el frontend, con el prefijo `NEXT_PUBLIC`) y las variables de entorno en tiempo de ejecución, solo del lado del servidor. En esta demostración estamos usando dos variables, presta atención a sus posiciones en `Dockerfile`, argumentos de la línea de comandos y `docker-compose.yml`:

- `DATABASE_URL` (utilizado por el servidor)
- `NEXT_PUBLIC_CLIENTVAR` (utilizado por el cliente)

### 1. Configuración de Next.js

En tu [`next.config.mjs`](https://github.com/t3-oss/create-t3-app/blob/main/cli/template/base/next.config.mjs), agrega la configuración de output `standalone` para [reducir el tamaño de la imagen aprovechando automáticamente el output tracing](https://nextjs.org/docs/advanced-features/output-file-tracing):

```diff
export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
+ output: "standalone",
});
```

### 2. Crear archivo dockerignore

<details>
    <summary>
      Haz clic aquí e incluye el contenido en <code>.dockerignore</code>:
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

### 3. Crear archivo Docker

> Como no estamos introduciendo las variables de entorno del servidor en nuestro contenedor, la [validación del esquema de entorno](/en/usage/env-variables) fallará. Para evitar esto, debemos agregar un indicador `SKIP_ENV_VALIDATION=1` al comando de compilación para que las variables de entorno no se validen en el momento de la compilación.

<details>
    <summary>
      Haz clic aquí e incluye el contenido en <code>Dockerfile</code>:
    </summary>
<div class="content">

```docker
##### DEPENDENCIAS

FROM --platform=linux/amd64 node:16-alpine AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat
WORKDIR /app

# Instala el Prisma Client - quitar si no estás usando Prisma

COPY prisma ./

# Instala dependencias basadas en tu administrador de paquetes preferido

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

RUN \
 if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
 elif [ -f package-lock.json ]; then npm ci; \
 elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
 else echo "Lockfile not found." && exit 1; \
 fi

##### CONSTRUCTOR

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

##### LANZADOR

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

> **_Notas_**
>
> - _La emulación de `--platform=linux/amd64` puede no ser necesaria tras moverse a Node 18._
> - _Puedes ver [`node:alpine`](https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine) para entender porqué `libc6-compat` puede ser necesario._
> - _Next.js recolecta [datos anónimos de uso general para telemetría](https://nextjs.org/telemetry). Descomenta la primera instancia de `ENV NEXT_TELEMETRY_DISABLED 1` para deshabilitar la telemetría durante el tiempo de compilación. Descomenta la segunda instancia para deshabilitar la telemetría durante tiempo de ejecución._

</div>
</details>

## Crea y ejecuta la imagen localmente

Crea y ejecuta esta imagen localmente con los siguientes comandos:

```bash
docker build -t ct3a-docker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" ct3a-docker
```

Abre [localhost:3000](http://localhost:3000/) para ver tu aplicación en ejecución.

## Docker Compose

También puedes usar Docker Compose para crear la imagen y ejecutar el contenedor.

<details>
    <summary>
      Sigue los pasos 1-4 anteriores, haz clic aquí e incluye el contenido en <code>docker-compose.yml</code>:
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

Ejecuta esto usando el comando `docker compose up`:

```bash
docker compose up
```

Abre [localhost:3000](http://localhost:3000/) para ver tu aplicación en ejecución.

</div>
</details>

## Desplegar en Railway

Puedes usar una PaaS como los [despligues de Dockerfile](https://docs.railway.app/deploy/dockerfiles) automatizados de [Railway](https://railway.app) para desplegar tu aplicación. Si tienes instalada la [CLI de Railway](https://docs.railway.app/develop/cli#install), puedes desplegar tu aplicación con los siguientes comandos:

```bash
railway login
railway init
railway link
railway up
railway open
```

Dirígite a "Variables" e incluye tu `DATABASE_URL`. Luego dirígite a "Configuración" y selecciona "Generar dominio". Para ver un ejemplo en ejecución en Railway, visita [ct3a-docker.up.railway.app](https://ct3a-docker.up.railway.app/).

## Otros recursos útiles

| Recurso                                           | Link                                                                 |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| Referencia Docker                                 | https://docs.docker.com/engine/reference/builder/                    |
| Referencia archivo Compose version 3              | https://docs.docker.com/compose/compose-file/compose-file-v3/        |
| Referencia Docker CLI                             | https://docs.docker.com/engine/reference/commandline/docker/         |
| Referencia Docker Compose CLI                     | https://docs.docker.com/compose/reference/                           |
| Despligue Next.js utilizando una imagen de Docker | https://nextjs.org/docs/deployment#docker-image                      |
| Next.js en Docker                                 | https://benmarte.com/blog/nextjs-in-docker/                          |
| Ejemplo Next.js con Docker                        | https://github.com/vercel/next.js/tree/canary/examples/with-docker   |
| Crear una imagen Docker de una aplicación Next.js | https://blog.tericcabrel.com/create-docker-image-nextjs-application/ |
