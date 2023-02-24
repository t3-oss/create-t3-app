---
title: tRPC
description: Uso de tRPC
layout: ../../../layouts/docs.astro
lang: es
---

tRPC nos permite escribir APIs con seguridad de tipos de extremo a extremo sin ninguna generación de código o con un incremento en el tiempo de ejecución. Utiliza la increíble inferencia de TypeScript para inferir las definiciones de tipos de tu enrutador API y te permite llamar a tus procedimientos de API desde tu frontend con seguridad de tipos y con autocompletado. Al usar TRPC, tu backend y frontend se sienten más juntos que nunca, lo que permite una experiencia de desarrollo excepcional.

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
   <span aria-hidden="true">&quot;</span>I built tRPC to allow people to move faster by removing the need of a traditional API-layer, while still having confidence that our apps won't break as we rapidly iterate.<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @alexdotjs"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="https://avatars.githubusercontent.com/u/459267?v=4"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Alex - creador de tRPC</span>
      <a
        href="https://twitter.com/alexdotjs"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        @alexdotjs
      </a>
    </div>
  </cite>
</blockquote>

## Archivos

tRPC requiere una gran cantidad de archivos que `create-t3-app` genera para ti. Revisemos los archivos que se generan:

### 📄 `pages/api/trpc/[trpc].ts`

Este es el punto de entrada para tu API y expone el enrutador tRPC. Normalmente, no tocarás mucho este archivo, pero si necesitas, por ejemplo, habilitar el middleware CORS o similar, es útil saber que el `createNextApiHandler` exportado es un [manejador API de Next.js](https://nextjs.org/docs/api-routes/introduction) que tiene un objeto de [solicitud](https://developer.mozilla.org/en-us/docs/web/api/request) y [respuesta](https://developer.mozilla.org/en-US/docs/Web/API/Response?retiredLocale=sv-SE). Esto significa que puedes envolver el `createNextApiHandler` en cualquier middleware que desees. Consulta a continuación un [fragmento de ejemplo](#habilitando-cors) de agregar CORS.

### 📄 `server/trpc/context.ts`

Este archivo es donde defines el contexto que se pasa a tus procedimientos tRPC. El contexto son datos a los que todos tus procedimientos tRPC tendrán acceso, y es un excelente lugar para poner cosas como conexiones de bases de datos, información de autenticación, etc. En create-t3-app, usamos dos funciones, para habilitar el uso de un subconjunto del contexto cuando no tenemos acceso al objeto de la solicitud.

- `createContextInner`: aquí es donde defines el contexto que no depende de la solicitud, ejemplo: tu conexión de base de datos. Puedes usar esta función para [Pruebas de integración](#muestra-integración-test) o [ssg-helpers](https://trpc.io/docs/v10/ssg-helpers) donde no tienes un objeto de solicitud.

- `createContext`: Aquí es donde defines el contexto que depende de la solicitud, ejemplo: la sesión del usuario. Solicita la sesión usando el objeto `opts.req` y luego pasa la sesión a la función `createContextInner` para crear el contexto final.

### 📄 `server/trpc/trpc.ts`

Aquí es donde inicializas tRPC y defines [procedimientos](https://trpc.io/docs/v10/procedures) reutilizables y [middlewares](https://trpc.io/docs/v10/middlewares). Por convención, no debes exportar todo el objeto `t`, sino crear procedimientos y middlewares reutilizables y exportarlos.

Notarás que usamos `superjson` como [transformador de datos](https://trpc.io/docs/v10/data-transformers). Esto hace que tus tipos de datos se conserven cuando llegan al cliente, por lo que si por ejemplo envías un objeto `Date`, el cliente devolverá un `Date` y no una string, que es el caso para la mayoría de las APIs.

### 📄 `server/trpc/router/*.ts`

Aquí es donde defines las rutas y procedimientos de tu API. Por convención, tu deberías [crear enrutadores separados](https://trpc.io/docs/v10/router) para procedimientos relacionados, luego [fusionar](https://trpc.io/docs/v10/merging-routers) todos ellos en un solo enrutador en `servidor/trpc/router/_app.ts`.

### 📄 `utils/trpc.ts`

Este es el punto de entrada frontend para tRPC. Aquí es donde importarás la definición de tipo **del enrutador** y crearás tu cliente tRPC junto con los hooks react-query. Dado que habilitamos `superjson` como nuestro transformador de datos en el backend, también debemos habilitarlo en el frontend. Esto se debe a que los datos serializados del backend están deserializados en la parte del frontend.

Definirás tus [enlaces](https://trpc.io/docs/v10/links) tRPC aquí, que determinan el flujo de la solicitud del cliente al servidor. Utilizamos el "predeterminado" [`httpBatchLink`](https://trpc.io/docs/v10/links/httpbatchlink) que habilita [solicitudes en conjunto](https://cloud.google.com/compute/docs/api/how-tos/batch), así como un [`loggerLink`](https://trpc.io/docs/v10/links/loggerlink) que genera registros de solicitudes útiles durante el desarrollo.

Por último, exportamos un [tipo de ayuda](https://trpc.io/docs/v10/infer-types#additional-dx-helper-type) que puedes usar para inferir tus tipos en el frontend.

## ¿Cómo uso tRPC?

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2LYM8gf184U" title="Making typesafe APIs easy with tRPC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

El contribuidor de tRPC [trashh_dev](https://twitter.com/trashh_dev) dió [una charla en la Next.js conf](https://www.youtube.com/embed/2LYM8gf184U) sobre tRPC. Te recomendamos que lo veas si aún no lo has hecho.

Con tRPC, escribes funciones TypeScript en tu backend y luego las llamas desde tu frontend. Un simple procedimiento de tRPC podría verse así:

```ts:server/trpc/router/user.ts
const userRouter = t.router({
  getById: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
```

Este es un procedimiento TRPC (equivalente a un manejador de ruta en un backend tradicional) que primero valida la entrada usando Zod (que es la misma librería de validación que utilizamos para las [variables de entorno](./env-variables)) - en este caso, se asegura de que la entrada sea un string. Si la entrada no es un string, enviará un error informativo en su lugar.

Después de la entrada, encadenamos una función de resolución que puede ser una [consulta](https://trpc.io/docs/v10/react-queries), [mutación](https://trpc.io/docs/v10/react-mutations), o una [suscripción](https://trpc.io/docs/v10/subscriptions). En nuestro ejemplo, la función de resolución llama a nuestra base de datos utilizando nuestro cliente [prisma](./prisma) y devuelve al usuario cuyo `id` coincide con el que pasamos.

Tu defines tus procedimientos en `routers` que representan una colección de procedimientos relacionados con un nombre compartido. Es posible que tengas un enrutador para `users`, uno para `posts` y otro para `messages`. Estos enrutadores se pueden fusionar en un único `appRouter` centralizado:

```ts:server/trpc/router/_app.ts
const appRouter = t.router({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

Ten en cuenta que solo necesitamos exportar las definiciones de tipo de nuestro enrutador, lo que significa que nunca estamos importando ningún código de servidor en nuestro cliente.

Ahora llamemos al procedimiento en nuestro frontend. tRPC proporciona un wrapper para `@tanstack/react-query` que te permite utilizar la potencia completa de los hooks que proporcionan, pero con el beneficio adicional de tener tus llamadas API seguras en tipos e inferidas. Podemos llamar a nuestros procedimientos desde nuestro frontend de la misma manera:

```tsx:pages/users/[id].tsx
import { useRouter } from "next/router";

const UserPage = () => {
  const { query } = useRouter();
  const userQuery = trpc.users.getById.useQuery(query.id);

  return (
    <div>
      <h1>{userQuery.data?.name}</h1>
    </div>
  );
};
```

Inmediatamente notarás lo bueno que es el autocompletado y la seguridad tipos. Tan pronto como escribas `trpc.`, tus enrutadores aparecerán como sugerencias de autocompletado, y cuando selecciones un enrutador, tus procedimientos también aparecerán. También recibirás un error de TypeScript si tu entrada no coincide con el validador que se definió en el backend.

## ¿Cómo llamo a mi API externamente?

Con APIs regulares, puedes llamar a tus endpoints utilizando cualquier cliente HTTP como `curl`, `Postman`, `fetch` o directamente desde tu navegador. Con tRPC, es un poco diferente. Si deseas llamar a tus procedimientos sin el cliente tRPC, hay dos formas recomendadas de hacerlo:

### Exponer un solo procedimiento externamente

Si deseas exponer un solo procedimiento externamente, estás buscando [llamadas del lado del servidor](https://trpc.io/docs/v10/server-side-calls). Eso te permitirá crear un endpoint API normal Next.js, pero reutilizará la parte de la resolución de tu procedimiento tRPC.

```ts:pages/api/users/[id].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "../../../server/trpc/router/_app";
import { createContext } from "../../../server/trpc/context";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create context and caller
  const ctx = await createContext({ req, res });
  const caller = appRouter.createCaller(ctx);
  try {
    const { id } = req.query;
    const user = await caller.user.getById(id);
    res.status(200).json(user);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // Un error de tRPC ocurrió
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    // otro error ocurrió
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default userByIdHandler;
```

### Exponer cada procedimiento como endpoints REST

Si deseas exponer cada procedimiento externamente, consulta el complemento construido por la comunidad [trpc-openapi](https://github.com/jlalmes/trpc-openapi/tree/master). Al proporcionar algunos metadatos adicionales a tus procedimientos, puedes generar una API REST compatible con OpenAPI desde tu enrutador tRPC.

### Son solo solicitudes HTTP

tRPC se comunica a través de HTTP, por lo que también es posible llamar a tus procedimientos tRPC utilizando solicitudes HTTP "regulares". Sin embargo, la sintaxis puede ser engorrosa debido al [protocolo RPC](https://trpc.io/docs/v10/RPC) que tRPC usa. Si tienes curiosidad, puedes verificar cómo se ven las solicitudes y respuestas de tRPC en la pestaña de red de tu navegador, pero sugerimos hacerlo solo como un ejercicio educativo y apegarse a una de las soluciones descritas anteriormente.

## Comparación con un API endpoint de Next.js

Comparemos un API endpoint de Next.js con un procedimiento tRPC. Supongamos que queremos obtener un objeto de usuario de nuestra base de datos y devolverlo al frontend. Podríamos escribir un API endpoint Next.js como este:

```ts:pages/api/users/[id].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid id" });
  }

  const examples = await prisma.example.findFirst({
    where: {
      id,
    },
  });

  res.status(200).json(examples);
};

export default userByIdHandler;
```

```ts:pages/users/[id].tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`/api/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);
};
```

Compara esto con el ejemplo de tRPC anterior, para poder ver algunas de las ventajas de tRPC:

- En lugar de especificar una URL para cada ruta, que puede volverse molesto para depurar si mueves algo, todo tu enrutador es un objeto con autocompletado.
- No necesitas validar qué método HTTP se utilizó.
- No necesitas validar que la consulta de solicitud o el cuerpo contenga los datos correctos en el procedimiento, porque Zod se encarga de esto.
- En lugar de crear una respuesta, puedes lanzar errores y devolver un valor u objeto como lo harías en cualquier otra función de TypeScript.
- Llamar al procedimiento en el frontend proporciona autocompletado y seguridad de tipos.

## Fragmentos útiles

Aquí hay algunos fragmentos que pueden ser útiles.

### Habilitando CORS

Si necesitas consumir tu API desde un dominio diferente, por ejemplo, en un monorepo que incluye una aplicación React Native, es posible que debas habilitar CORS:

```ts:pages/api/trpc/[trpc].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "~/server/trpc/router/_app";
import { createContext } from "~/server/trpc/context";
import cors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Habilita cors
  await cors(req, res);

  // Crea y llama al manejador tRPC
  return createNextApiHandler({
    router: appRouter,
    createContext,
  })(req, res);
};

export default handler;
```

### Actualizaciones optimistas

Las actualizaciones optimistas son cuando actualizamos la interfaz de usuario antes de que la llamada API haya terminado. Esto le da al usuario una mejor experiencia porque no tiene que esperar a que la llamada API termine antes de que la interfaz de usuario refleje el resultado de tu acción. Sin embargo, las aplicaciones que valoran el estado correcto de los datos deben evitar actualizaciones optimistas, ya que no son una representación "verdadera" del estado del backend. Puede leer más en la documentación de [React Query](https://tanstack.com/query/v4/docs/guides/optimistic-updates).

```tsx
const MyComponent = () => {
  const listPostQuery = trpc.post.list.useQuery();

  const utils = trpc.useContext();
  const postCreate = trpc.post.create.useMutation({
    async onMutate(newPost) {
      // Cancela las solicitudes de salida (para que no  sobrescriban nuestras actualizaciones optimistas)
      await utils.post.list.cancel();

      // Obtener los datos del queryCache
      const prevData = utils.post.list.getData();

      // Optimisticamente actualizamos los datos con nuestro nuevo post
      utils.post.list.setData(undefined, (old) => [...old, newPost]);

      // Retornamos los datos previos para que podamos revertirlo si algo sale mal
      return { prevData };
    },
    onError(err, newPost, ctx) {
      // Si la mutación falla, utilizar el valor del contexto de onMutate
      utils.post.list.setData(undefined, ctx.prevData);
    },
    onSettled() {
      // Sincronizamos el servidor una vez la mutación se haya completado
      utils.post.list.invalidate();
    },
  });
};
```

### Prueba de integración de muestra

Aquí hay una prueba de integración de muestra que utiliza [Vitest](https://vitest.dev) para verificar que tu enrutador tRPC funcione como se esperaba, el analizador de entrada infiere el tipo correcto y que los datos devueltos coincidan con la salida esperada.

```ts
import { type inferProcedureInput } from "@trpc/server";
import { createContextInner } from "~/server/router/context";
import { appRouter, type AppRouter } from "~/server/router/_app";
import { expect, test } from "vitest";

test("example router", async () => {
  const ctx = await createContextInner({ session: null });
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["example"]["hello"]>;
  const input: Input = {
    text: "test",
  };

  const example = await caller.example.hello(input);

  expect(example).toMatchObject({ greeting: "Hello test" });
});
```

## Recursos útiles

| Recurso                       | Enlace                                                  |
| ----------------------------- | ------------------------------------------------------- |
| Documentación de tRPC         | https://www.trpc.io                                     |
| Un montón de ejemplos de tRPC | https://github.com/trpc/trpc/tree/next/examples         |
| Documentación de React Query  | https://tanstack.com/query/v4/docs/adapters/react-query |
