---
title: Primeros Pasos
description: Empezando con tu nueva aplicación T3
layout: ../../../layouts/docs.astro
lang: es
---

Acabas de crear una nueva aplicación T3 y estás listo para comenzar. Aquí está lo mínimo para que tu aplicación funcione.

## Base de datos

Si tu aplicación incluye Prisma, asegúrate de ejecutar `npx prisma db push` desde el directorio raíz de tu aplicación. Este comando sincronizará tu esquema de Prisma con tu base de datos y generará los tipos de TypeScript para el Prisma Client en función de tu esquema. Ten en cuenta que debes reiniciar el servidor TypeScript después de hacer esto para que pueda detectar los tipos generados.

## Autenticación

Si tu aplicación incluye NextAuth.js, te ayudaremos a comenzar con `DiscordProvider`. Este es uno de los proveedores más simples que ofrece NextAuth.js, pero aún requiere un poco de configuración inicial de tu parte.

Por supuesto, si prefieres usar un proveedor de autenticación diferente, también puedes usar uno de los [muchos proveedores](https://next-auth.js.org/providers/) que ofrece NextAuth.js.

1. Necesitarás una cuenta de Discord, así que crea una cuenta si aún no lo has hecho.
2. Dirígite a [https://discord.com/developers/applications](https://discord.com/developers/applications) y haz clic en "New Application" en la esquina superior derecha. Asigna un nombre a tu aplicación y acepta los términos de servicio.
3. Una vez creada tu aplicación, dirígite a "Settings → OAuth2 → General".
4. Copia el "Client ID" y agrégalo a tu `.env` como `AUTH_DISCORD_ID`.
5. Haz clic en "Reset Secret", copia el nuevo valor secreto y agrégalo a tu `.env` como `AUTH_DISCORD_SECRET`.
6. Haz clic en "Add Redirect" y escribe `http://localhost:3000/api/auth/callback/discord`.
   - Para la implementación de producción, sigue los pasos anteriores para crear otra aplicación Discord, pero esta vez reemplaza `http://localhost:3000` con la URL de producción en la que está implementando.
7. Guarda los cambios.
8. Configura `AUTH_SECRET` en `.env`. En desarrollo, cualquier cadena funcionará, para producción, consulta la nota de `.env` sobre la generación de un secreto seguro.

Ahora deberías poder iniciar sesión.

## Siguientes pasos

- Si tu aplicación incluye tRPC, consulta `src/pages/index.tsx` y `src/server/trpc/router/post.ts` para ver cómo funcionan las consultas de tRPC.
- Echa un vistazo a la documentación de `create-t3-app`, así como la documentación de los paquetes que incluye tu aplicación.
- ¡Únete a nuestro [Discord](https://t3.gg/discord) y danos una estrella en [GitHub](https://github.com/t3-oss/create-t3-app)! :)
