---
title: Vercel
description: Desplegando en Vercel
layout: ../../../layouts/docs.astro
lang: es
---

Recomendamos desplegar tu aplicación en [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). Vercel hace que sea muy fácil desplegar aplicaciones Next.js.

## Configuración del proyecto

Es probable que Vercel configure el comando de compilación y publique el directorio automáticamente. Sin embargo, también puedes especificar esta información junto con otra configuración creando un archivo llamado [`vercel.json`](https://vercel.com/docs/project-configuration) e incluyendo los siguientes comandos:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Uso del panel de control de Vercel

1. Después de enviar tu código a un repositorio de GitHub, registrate en [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) con GitHub y haz clic en **Agregar nuevo proyecto**.

![Nuevo proyecto en Vercel](/images/vercel-new-project.webp)

2. Importa el repositorio de GitHub con tu proyecto.

![Importar repositorio](/images/vercel-import-project.webp)

3. Agrega tus variables de entorno.

![Agregando variables de entorno](/images/vercel-env-vars.webp)

4. Haz clic en **Desplegar**. Ahora, cada vez que envíes un cambio a tu repositorio, ¡Vercel volverá a desplegar automáticamente tu aplicación!

## Uso de la CLI de Vercel

Para desplegar desde la línea de comandos, primero debes [instalar la CLI de Vercel globalmente](https://vercel.com/docs/cli#installing-vercel-cli).

```bash
npm i -g vercel
```

Ejecuta el comando [`vercel`](https://vercel.com/docs/cli/deploying-from-cli) para desplegar tu proyecto.

```bash
vercel
```

Incluye `--env DATABASE_URL=SU_URL_DE_BASE_DE_DATOS_AQUI` para variables de entorno, como el string de conexión de la base de datos. Utiliza `--yes` si deseas omitir las preguntas de despliegue y dar la respuesta predeterminada para cada una.

```bash
vercel --env DATABASE_URL=SU_URL_DE_BASE_DE_DATOS_AQUI --yes
```

Después del primer despliegue, este comando desplegará en una rama de vista previa. Deberás incluir `--prod` para enviar los cambios directamente a producción en despliegues futuros.

```bash
vercel --prod
```
