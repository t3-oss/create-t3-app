---
title: Prisma
description: Uso de Prisma
layout: ../../../layouts/docs.astro
lang: es
---

Prisma es un ORM para TypeScript, que te permite definir el esquema de tu base de datos y los modelos en un archivo `schema.prisma`, y luego generar un cliente seguro en tipos que se puede usar para interactuar con tu base de datos desde tu backend.

## Prisma Client

Ubicado en `/server/db/client.ts`, el Prisma Client se instancia como una variable global (como se recomienda como [mejor práctica](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem) por el equipo de Prisma) y exportado para ser utilizado en tus rutas API. Incluimos el Prisma Client en el [contexto](/es/usage/trpc#-serverapitrpcts) de tRPC de forma predeterminada y recomendamos usar esto en lugar de importarlo por separado en cada archivo.

## Esquema

Encontrarás el archivo de esquema de Prisma en `/prisma/schema.prisma`. Este archivo es donde defines el esquema y los modelos de tu base de datos, y se usa al generar el cliente Prisma.

### Con NextAuth.js

Cuando seleccionas NextAuth.js en combinación con Prisma, el archivo de esquema se genera y se configura para ti con los valores recomendados para los modelos `User`, `Session`, `Account` y `VerificationToken`, según la [documentación de NextAuth.js](https://next-auth.js.org/adapters/prisma).

## Base de datos predeterminada

La base de datos predeterminada es una base de datos SQLite, que es excelente para el desarrollo y para crear rápidamente una prueba de concepto, pero no se recomienda para producción. Puede cambiar la base de datos a utilizar cambiando el `provider` en el bloque `datasource` a `postgresql` o` mysql`, y luego actualizando el string de conexión dentro de las variables de entorno para apuntar a tu base de datos.

## Llenando (seeding) tu base de datos

[Llenar (_seeding_) tu base de datos](https://www.prisma.io/docs/guides/database/seed-database) es una excelente manera de llenar (_seed_) rápidamente tu base de datos con datos de prueba para ayudarte a comenzar. Para configurar el llenado, deberás crear un archivo `seed.ts` en el directorio `/prisma`, y luego agregar un script `seed` a tu archivo `package.json`. También necesitarás algún corredor de TypeScript que pueda ejecutar el script de llenado. Recomendamos [tsx](https://github.com/esbuild-kit/tsx), que es un corredor de TypeScript muy optimizado que usa esbuild y que no requiere ninguna configuración de ESM, pero `ts-node` u otros corredores pueden funcionar también.

```jsonc:package.json
{
  "scripts": {
    "db-seed": "NODE_ENV=development prisma db seed"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

```ts:prisma/seed.ts
import { db } from "../src/server/db/client";

async function main() {
  const id = "cl9ebqhxk00003b600tymydho";
  await db.example.upsert({
    where: {
      id,
    },
    create: {
      id,
    },
    update: {},
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
```

Luego, simplemente ejecuta `pnpm db-seed` (o `npm`/`yarn`) para llenar (_seed_) tu base de datos.

## Recursos útiles

| Recurso                           | Enlace                                                                                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Documentación de Prisma           | https://www.prisma.io/docs/                                                                                                                       |
| GitHub de Prisma                  | https://github.com/prisma/prisma                                                                                                                  |
| Adaptador Prisma para NextAuth.JS | https://next-auth.js.org/adapters/prisma                                                                                                          |
| Guía de conexión de PlanetScale   | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
