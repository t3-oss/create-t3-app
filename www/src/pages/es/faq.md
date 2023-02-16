---
title: Preguntas Frecuentes
description: Preguntas frecuentes acerca de create T3 app
layout: ../../layouts/docs.astro
lang: es
---

Aquí hay algunas preguntas frecuentes sobre `create-t3-app`.

## ¿Qué sigue? ¿Cómo hago una aplicación con esto?

Tratamos de mantener este proyecto lo más simple posible, para que puedas comenzar solo con el esqueleto que configuramos para ti y agregar cosas adicionales más adelante cuando sea necesario.

Si no estás familiarizado con las diferentes tecnologías utilizadas en este proyecto, consulta la documentación respectiva. Si todavía no estás seguro, únete a nuestro [Discord](https://t3.gg/discord) y solicita ayuda.

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## ¿Qué recursos de aprendizaje están disponibles actualmente?

Aunque los recursos que se enumeran a continuación son algunos de los mejores que existen para T3 Stack, la comunidad (y [Theo](https://youtu.be/rzwaaWH0ksk?t=1436)) recomiendan que comiences a usar el stack y aprendas en el camino construyendo con él.

Si estás considerando `create-t3-app`, es probable que ya hayas usado algunas de las partes del stack. Entonces, ¿por qué no simplemente sumergirse en el y aprender las otras partes mientras construyes algo?

Ahora, sabemos que este camino no funciona para todos. Por lo tanto, si crees que has probado las recomendaciones y todavía te gustarían algunos recursos, o simplemente no estás seguro de hacerlo solo y/o te sientes abrumado por el stack, consulta estos increíbles tutoriales de `create-t3-app `:

### Artículos

- [Build a full stack app with create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)
- [A first look at create-t3-app](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrating your T3 App into a Turborepo](https://www.jumr.dev/blog/t3-turbo)

### Vídeos

- [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [The T3 Stack - How We Built It](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [An overview of the create T3 App (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)

## ¿Por qué hay archivos `.js` en el proyecto?

De acuerdo con [Axioma-T3 #3](/es/introduction#la-seguridad-de-tipos-no-es-opcional), tomamos la seguridad de tipos como un ciudadano de primera clase. Desafortunadamente, no todos los frameworks y complementos admiten TypeScript, lo que significa que algunos de los archivos de configuración deben ser archivos `.js`.

Intentamos enfatizar que estos archivos son javascript por una razón, declarando explícitamente el tipo de cada archivo (`cjs` o `mjs`) dependiendo de lo que admita la librería que lo utiliza. Además, todos los archivos `js` en este proyecto aún tienen verificación de tipos usando un comentario `@ts-check` en la parte superior.

## Tengo problemas para agregar i18n a mi aplicación. ¿Hay alguna referencia que pueda usar?

Hemos decidido no incluir i18n por defecto en `create-t3-app` porque es un tema muy criticado y hay muchas formas de implementarlo.

Sin embargo, si tienes dificultades para implementarlo y quieres ver un proyecto de referencia, tenemos un [repositorio de referencia](https://github.com/juliusmarminge/t3-i18n) que muestra cómo puedes agregar i18n a una aplicación T3 usando [next-i18next](https://github.com/i18next/next-i18next).

## ¿Por qué usamos `/pages` y no `/app` de Next.js 13?

Según [Axioma-T3 #2](/es/introduction#responsablemente-vanguardista), nos encantan las cosas innovadoras, pero valoramos la estabilidad, todo tu enrutador es difícil de portar, [no es un buen lugar para ser vanguardista](https://youtu.be/mnwUbtieOuI?t=1662). Si bien `/app` es [un vistazo al futuro](https://youtu.be/rnsC-12PVlM?t=818), no está lista para producción; La API está en versión beta y se espera que tenga cambios significativos.

Para obtener una lista de funciones compatibles, planificadas y en las que se ha trabajado en el directorio `/app`, visita [la documentación beta de Next.js](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features).
