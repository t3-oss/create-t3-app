---
title: Variables de Entorno
description: Empezando con create-t3-app
layout: ../../../layouts/docs.astro
lang: es
---

Create-T3-App usa [Zod](https://github.com/colinhacks/zod) para validar tus variables de entorno en tiempo de ejecución _y_ tiempo de compilación proporcionando algunos archivos adicionales en el directorio `env`:

📁 src/env

┣ 📄 client.mjs

┣ 📄 schema.mjs

┣ 📄 server.mjs

El contenido de estos archivos puede parecer aterrador a primera vista, pero no te preocupes, no es tan complicado como parece. Echemos un vistazo a ellos uno por uno y recorramos el proceso de agregar variables de entorno adicionales.

_En pocas palabras; Si deseas agregar una nueva variable de entorno, debes agregarla tanto a tu `.env` como definir el validador en `env/schema.mjs`._

## schema.mjs

Este es el archivo que realmente modificarás. Contiene dos esquemas, uno para las variables de entorno del lado del servidor y otro para el lado del cliente, así como un objeto `clientEnv`.

```ts:env/schema.mjs
export const serverSchema = z.object({
  // DATABASE_URL: z.url(),
});

export const clientSchema = z.object({
  // NEXT_PUBLIC_WS_KEY: z.string(),
});

export const clientEnv = {
  // NEXT_PUBLIC_WS_KEY: process.env.NEXT_PUBLIC_WS_KEY,
};
```

### Esquema del Servidor

Define tu esquema de variables de entorno del lado del servidor aquí.

Asegúrate de no anteponer el nombre de las variables de entorno aquí con `NEXT_PUBLIC`. La validación fallará si lo haces para ayudarte a detectar una configuración no válida.

### Esquema del Cliente

Define tu esquema de variables de entorno del lado del cliente aquí.

Para exponerlos al cliente, debes anteponerlos con `NEXT_PUBLIC`. La validación fallará si no lo haces para ayudarte a detectar una configuración no válida.

### Objeto clientEnv

Destructuramos el `process.env` aquí.

Necesitamos un objeto de JavaScript con el que podamos analizar nuestros esquemas de Zod y, debido a la forma en que Next.js maneja las variables de entorno, no puede destructurar `process.env` como un objeto normal, por lo que debemos hacerlo manualmente.

TypeScript te ayudará a asegurarte de haber ingresado las claves tanto en `clientEnv` como en `clientSchema`.

```ts
// ❌ Esto no funciona, necesitamos destructurarlo manualmente
const schema = z.object({
  NEXT_PUBLIC_WS_KEY: z.string(),
});

const validated = schema.parse(process.env);
```

## server.mjs & client.mjs

Aquí es donde ocurre la validación y se exporta los objetos validados. No deberías necesitar modificar estos archivos.

## Utilizando las Variables de Entorno

Cuando quieras utilizar tus variables de entorno, puedes importarlas desde `env/client.mjs` o `env/server.mjs` dependiendo de dónde quieras utilizarlas:

```ts:pages/api/hello.ts
import { env } from "../../env/server.mjs";

// `env` es completamente seguro en tipos y provee autocompletado
const dbUrl = env.DATABASE_URL;
```

## .env.example

Dado que el archivo `.env` predeterminado no está guardado en el control de versiones, también hemos incluido un archivo `.env.example`, en el que, de forma opcional, puedes guardar una copia de tu archivo `.env` con los valores secretos eliminados. Esto no es obligatorio, pero recomendamos mantener el ejemplo actualizado para que a los colaboradores les resulte lo más fácil posible comenzar con tu entorno.

## Agregando Variables de Entorno

Para asegurarse de que tu compilación nunca se complete sin las variables de entorno que necesita el proyecto, deberás agregar nuevas variables de entorno en **dos** ubicaciones:

📄 `.env`: Introduce tu variable de entorno como lo harías normalmente en un archivo `.env`, es decir, `LLAVE=VALOR`

📄 `schema.mjs`: agrega la lógica de validación adecuada para la variable de entorno definiendo un esquema Zod, p. `CLAVE: z.string()`

Opcionalmente, también puedes mantener `.env.example` actualizado:

📄 `.env.example`: ingresa tu variable de entorno, pero asegúrate de no incluir el valor si es secreto, es decir, `KEY=VALUE` o `KEY=`

### Ejemplo

_Quiero agregar mi API token de Twitter como una variable de entorno del lado del servidor_

1. Agrega la variable de entorno a `.env`:

```
TWITTER_API_TOKEN=1234567890
```

2. Agrega la variable de entorno a `schema.mjs`:

```ts
export const serverSchema = z.object({
  // ...
  TWITTER_API_TOKEN: z.string(),
});
```

3. Opcional: agrega la variable de entorno a `.env.example`, pero no incluyas el token

```
TWITTER_API_TOKEN=
```
