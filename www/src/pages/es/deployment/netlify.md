---
title: Netlify
description: Desplegando en Netlify
layout: ../../../layouts/docs.astro
lang: es
---

Netlify es una alternativa al proveedor de despliegue en un sentido similar a Vercel. Ver [`ajcwebdev/ct3a-netlify`](https://github.com/ajcwebdev/ct3a-netlify) para ver un ejemplo de un repositorio basado en este documento.

## ¿Por qué desplegar en Netlify?

La sabiduría convencional dice que Vercel tiene un mejor soporte para Next.js, porque Vercel desarrolla Next.js. Tienen un interés en asegurar que la plataforma esté optimizada para un rendimiento y una experiencia de desarrollo óptimos con Next.js. Para la mayoría de los casos de uso, esto será cierto y no tendrá sentido desviarse del camino estándar.

También hay un sentimiento común de que muchas características de Next.js solo son compatibles con Vercel. Si bien es cierto que las nuevas características de Next.js se probarán y admitirán en Vercel en el momento del lanzamiento de forma predeterminada, también es cierto que otros proveedores como Netlify [implementarán y lanzarán rápidamente el soporte](https://www.netlify.com/blog/deploy-nextjs-13/) para [características de Next.js estables](https://docs.netlify.com/integrations/frameworks/next-js/overview/).

Hay pros y contras relativos para todos los proveedores de despliegue, ya que ningún host puede tener el mejor soporte para todos los casos de uso. Por ejemplo, Netlify construyó su propio [tiempo de ejecución personalizado de Next.js](https://github.com/netlify/next-runtime) para las funciones de _edge_ de Netlify (que se ejecutan en Deno Deploy) y [mantienen un middleware único para acceder y modificar las respuestas HTTP](https://github.com/netlify/next-runtime#nextjs-middleware-on-netlify).

> _NOTA: Para rastrear el estado de las funciones no estables de Next 13, consulta [Using the Next 13 `app` directory on Netlify](https://github.com/netlify/next-runtime/discussions/1724)._

## Configuración del proyecto

Hay numerosas formas de configurar tus instrucciones de compilación, incluido el uso directo de la CLI de Netlify o el panel de control de Netlify. Si bien no es obligatorio, es recomendable crear e incluir un archivo [`netlify.toml`](https://docs.netlify.com/configure-builds/file-based-configuration/). Esto garantiza que las versiones bifurcadas y clonadas del proyecto sean más fáciles de desplegar de forma reproducible.

```toml
[build]
  command = "next build"
  publish = ".next"
```

## Usando el panel de control de Netlify

1. Empuja tu código a un repositorio de GitHub y regístrate en [Netlify](https://app.netlify.com/signup). Después de crear una cuenta, haz clic en **Add new site** y luego en **Import an existing project**.

![Nuevo proyecto en Netlify](/images/netlify-01-new-project.webp)

2. Conecta tu proveedor de Git.

![Importar repositorio](/images/netlify-02-connect-to-git-provider.webp)

3. Selecciona el repositorio de tu proyecto.

![Selecciona el repositorio de tu proyecto](/images/netlify-03-pick-a-repository-from-github.webp)

4. Netlify detectará si tienes un archivo `netlify.toml` y configurará automáticamente tu comando de compilación y tu directorio de publicación.

5. Haz clic en **Show advanced** y luego en **New variable** para agregar tus variables de entorno.

![Agregar variables de entorno](/images/netlify-05-env-vars.webp)

6. Haz clic en **Deploy site** y espera a que se complete la compilación para ver tu nuevo sitio.

## Usando la CLI de Netlify

Para desplegar desde la línea de comandos, primero debes empujar tu proyecto a un repositorio de GitHub y [instalar la CLI de Netlify](https://docs.netlify.com/cli/get-started/). Puedes instalar `netlify-cli` como una dependencia de proyecto o instalarlo globalmente en tu máquina con el siguiente comando:

```bash
npm i -g netlify-cli
```

Para probar tu proyecto localmente, ejecuta el comando [`ntl dev`](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment) y abre [`localhost:8888`](http://localhost:8888/) para ver tu aplicación Netlify en ejecución localmente:

```bash
ntl dev
```

Corre el comando [`ntl init`](https://docs.netlify.com/cli/get-started/#continuous-deployment) para configurar tu proyecto:

```bash
ntl init
```

Importa las variables de entorno de tu proyecto desde tu archivo `.env` con [`ntl env:import`](https://cli.netlify.com/commands/env#envimport):

```bash
ntl env:import .env
```

Despliega tu proyecto con [`ntl deploy`](https://docs.netlify.com/cli/get-started/#manual-deploys). Necesitarás pasar la bandera `--build` para ejecutar el comando de compilación antes del despliegue y la bandera `--prod` para desplegar en la URL principal de tu sitio:

```bash
ntl deploy --prod --build
```

Para ver un ejemplo en ejecución en Netlify, visita [ct3a.netlify.app](https://ct3a.netlify.app/).
