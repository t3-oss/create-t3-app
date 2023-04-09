---
title: NextAuth.js
description: Uso de NextAuth.js
layout: ../../../layouts/docs.astro
lang: es
---

Cuando desees utilizar un sistema de autenticación en tu aplicación Next.js, NextAuth.js es una excelente solución para incorporar la complejidad de la seguridad sin la molestia de tener que crearla por tu cuenta. Viene con una extensa lista de proveedores para agregar rápidamente la autenticación OAuth y proporciona adaptadores para muchas bases de datos y ORMs.

## Proveedor de contexto

En el punto de entrada de tu aplicación, verás que tu aplicación está envuelta en un [SessionProvider](https://next-auth.js.org/getting-started/client#sessionprovider):

```tsx:pages/_app.tsx
<SessionProvider session={session}>
  <Component {...pageProps} />
</SessionProvider>
```

Este proveedor de contexto permite que tu aplicación acceda a los datos de la sesión desde cualquier lugar de tu aplicación, sin tener que pasarlos como propiedades:

```tsx:pages/users/[id].tsx
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  if (!session) {
    // Manejar el estado no autenticado, ejemplo: renderizar un componente SignIn
    return <SignIn />;
  }

  return <p>Bienvenido {session.user.name}!</p>;
};
```

## Incluir `user.id` en la Sesión

`create-t3-app` está configurado para utilizar el [callback de sesión](https://next-auth.js.org/configuration/callbacks#session-callback) en la configuración de NextAuth.js para incluir el ID del usuario dentro del objeto `session`.

```ts:pages/api/auth/[...nextauth].ts
callbacks: {
  session({ session, user }) {
    if (session.user) {
      session.user.id = user.id;
    }
    return session;
  },
},
```

Esto se combina con un archivo de declaración de tipos para asegurarse de que se pueda escribir `user.id` cuando se acceda al objeto `session`. Obtén más información sobre [`Module Augmentation`](https://next-auth.js.org/getting-started/typescript#module-augmentation) en la documentación de NextAuth.js.

```ts:types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
```

El mismo patrón se puede usar para agregar cualquier otro dato al objeto `session`, como un campo `role`, pero **no se debe usar incorrectamente para almacenar datos confidenciales** en el cliente.

## Uso con tRPC

Cuando utilices NextAuth.js con tRPC, puedes crear procedimientos protegidos reutilizables usando [middleware](https://trpc.io/docs/v10/middlewares). Esto te permite crear procedimientos a los que solo los usuarios autenticados pueden acceder. `create-t3-app` establece todo esto para ti, lo que te permite acceder fácilmente al objeto de sesión dentro de los procedimientos autenticados.

Esto se hace en un proceso de dos pasos:

1. Toma la sesión de las cabeceras de la solicitud utilizando la función [`unstable_getServerSession`](https://next-auth.js.org/configuration/nextjs#unstable_getserversession). No te preocupes, esta función es segura: el nombre incluye `unstable` (_inestable_) solo porque la implementación de la API podría cambiar en el futuro. La ventaja de usar `unstable_getServerSession` en lugar de la función `getSession` regular es que es una función solo del lado del servidor y no activa llamadas innecesarias. `create-t3-app` crea una función de ayuda que abstrae a esta API peculiar.

```ts:server/common/get-server-auth-session.ts
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await unstable_getServerSession(ctx.req, ctx.res, nextAuthOptions);
};
```

Usando esta función auxiliar, podemos obtener la sesión y pasarla al contexto de tRPC:

```ts:server/trpc/context.ts
import { getServerAuthSession } from "../common/get-server-auth-session";

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });
  return await createContextInner({
    session,
  });
};
```

2. Crea un middleware tRPC que verifique si el usuario está autenticado. Luego usamos el middleware en una `protectedProcedure`. Cualquier persona que llama a estos procedimientos debe de estar autenticada, o de lo contrario se lanzará un error que el cliente puede manejar adecuadamente.

```ts:server/trpc/trpc.ts
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
```

El objeto de sesión es una representación ligera y mínima del usuario y solo contiene algunos campos. Cuando uses `protectedProcedures`, tienes acceso al ID del usuario que puede usarse para obtener más datos de la base de datos.

```ts:server/trpc/router/user.ts
const userRouter = router({
  me: protectedProcedure.query(({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),
});
```

## Uso con Prisma

Hacer que NextAuth.js funcione con Prisma requiere una gran cantidad de [configuración inicial](https://authjs.dev/reference/adapter/prisma/). `create-t3-app` maneja todo esto para ti, y si seleccionas Prisma y NextAuth.js, obtendrás un sistema de autenticación completamente funcional con todos los modelos requeridos preconfigurados. Creamos tu aplicación con un proveedor de Discord Oauth preconfigurado, que elegimos porque es uno de los más fáciles de comenzar, solo proporciona tus tokens en el `.env` y listo. Sin embargo, puedes agregar fácilmente más proveedores siguiendo la documentación de [NextAuth.JS](https://next-auth.js.org/providers/). Ten en cuenta que ciertos proveedores requieren que se agregen campos adicionales a ciertos modelos. Te recomendamos que leas la documentación del proveedor que deseas utilizar para asegurarte de tener todos los campos requeridos.

### Agregar nuevos campos a tus modelos

Al agregar nuevos campos a cualquiera de los modelos `User`, `Account`, `Session` o `VerificationToken` (lo más probable es que solo necesites modificar el modelo `User`), debes tener en cuenta que el [Adaptador de Prisma](https://next-auth.js.org/adapters/prisma) crea automáticamente campos en estos modelos cuando los nuevos usuarios se registran e inician sesión. Por lo tanto, al agregar nuevos campos a estos modelos, debes proporcionar un valor predeterminado por defecto para ellos, ya que el adaptador no es consciente de estos campos.

Si, por ejemplo, deseas agregar un campo `role` al modelo `User`, necesitarías proporcionar un valor predeterminado al campo `role`. Esto se hace agregando un valor `@default` al campo `role` en el modelo `User`:

```diff:prisma/schema.prisma
+ enum Role {
+   USER
+   ADMIN
+ }

  model User {
    ...
+   role Role @default(USER)
  }
```

## Uso con el middleware Next.js

El uso de NextAuth.js con el middleware Next.js [requiere el uso de la estrategia de sesión JWT](https://next-auth.js.org/configuration/nextjs#caveats) para la autenticación. Esto se debe a que el middleware solo puede acceder a la cookie de sesión si es un JWT. De forma predeterminada, `create-t3-app` está configurado para usar la estrategia de base de datos **predeterminada**, en combinación con Prisma como adaptador de base de datos.

## Configuración del DiscordProvider predeterminado

1. Dirígete a [la sección de aplicaciones en el portal del desarrollador de Discord](https://discord.com/developers/applications) y haz clic en "New Application"
2. En el menú de configuración, dirígite a "OAuth2 => General"

- Copia el Client ID y pégalo en `DISCORD_CLIENT_ID` en `.env`.
- En Client Secret, haz clic en "Reset Secret" y copia ese string en `DISCORD_CLIENT_SECRET` en `.env`. Ten cuidado ya que no podrás volver a ver este valor secreto, y restablecerlo hará que el existente expire.
- Haz clic en "Add Redirect" y pega en `<app url>/api/auth/callback/discord` (Ejemplo para desarrollo local: <code class="break-all">http://localhost:3000/api/auth/callback/discord</code>)
- Guarda tus cambios
- Es posible, pero no recomendado, usar la misma aplicación de Discord tanto para desarrollo como para producción. También puedes considerar hacer un [mock del proveedor](https://github.com/trpc/trpc/blob/main/examples/next-prisma-websockets-starter/src/pages/api/auth/%5B...nextauth%5D.ts) durante el desarrollo.

## Recursos útiles

| Recurso                           | Enlace                                  |
| --------------------------------- | --------------------------------------- |
| Documentación de NextAuth.js      | https://next-auth.js.org/               |
| GitHub de NextAuth.js             | https://github.com/nextauthjs/next-auth |
| tRPC Kitchen Sink - with NextAuth | https://kitchen-sink.trpc.io/next-auth  |
