---
title: ¿Por qué CT3A?
description: ¿Por qué deberías elegir Create T3 App para tu siguiente proyecto?
layout: ../../layouts/docs.astro
lang: es
---

Empezamos create-t3-app porque [Theo](https://twitter.com/t3dotgg) se negó a hacer una plantilla de sus tecnologías favoritas. Inspirándose en create-next-app, [CLI de Astro](https://astro.build) y un amor general por la seguridad de tipos, el equipo de create-t3-app trabajó arduamente para crear el mejor punto de partida posible para los nuevos proyectos de T3 Stack.

Si estás interesado en usar Next.js de forma segura, este es el lugar para comenzar. Si tienes curiosidad acerca de alguna de las opciones tecnológicas específicas que tomamos, sigue leyendo :)

## ¿Por qué TypeScript?

JavaScript es difícil. ¿Por qué agregar más reglas?

Creemos firmemente que la experiencia que brinda TypeScript te ayudará a ser un mejor desarrollador. Proporciona retroalimentación en vivo a medida que escribes tu código definiendo los tipos de datos esperados, y proporciona un autocompletado útil en tu editor o te grita con líneas onduladas rojas si estás tratando de acceder a una propiedad que no existe o tratando de pasar un valor del tipo incorrecto, que de otro modo tendrías que depurar más adelante. Ya sea que seas nuevo en el desarrollo web o un profesional experimentado, el "rigor" de TypeScript te brindará una experiencia menos frustrante y más consistente que JS estándar.

La seguridad de tipos te hace más rápido. Si no estás convencido, [podrías estar usando TypeScript de forma incorrecta...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)

## ¿Por qué Next.js?

Nos encanta React. Ha hecho que el desarrollo de la interfaz de usuario sea accesible de maneras que nunca antes habíamos imaginado. También puede llevar a los desarrolladores por caminos difíciles.

Next.js ofrece un enfoque ligeramente obstinado y muy optimizado para crear aplicaciones usando React. Desde el enrutamiento hasta las definiciones de API y la representación de imágenes, confiamos en Next.js para guiar a los desarrolladores hacia buenas decisiones.

## ¿Por qué tRPC/Prisma/Tailwind/etc?

Si bien creemos en mantener las cosas lo más simples posible, encontramos que estas piezas se utilizan en cada proyecto similar a una "aplicación" que construimos. `create-t3-app` hace un gran trabajo al permitirte adoptar las piezas que necesitas.

### tRPC

tRPC cumple con la promesa de GraphQL de un desarrollo de cliente sin interrupciones contra un servidor seguro en tipos sin todo lo repetitivo. Es un abuso inteligente de TypeScript que proporciona una experiencia de desarrollo increíble.

### Prisma

Prisma es para SQL lo que TypeScript es para JS. Creó una experiencia de desarrollo que no existía antes. Al generar tipos a partir de un esquema definido por el usuario compatible con [varias bases de datos](https://www.prisma.io/docs/concepts/database-connectors), Prisma garantiza la seguridad de tipos de extremo a extremo desde su base de datos hasta su aplicación.

Prisma proporciona un [conjunto de herramientas](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows) completo, facilitando las interacciones diarias con tu base de datos. En particular, Prisma Client es responsable de consultar y hacer que SQL sea tan fácil que apenas notarás que lo estás usando, y Prisma Studio es una GUI conveniente para tu base de datos que te permite leer y manipular sus datos rápidamente sin tener que escribir código.

### Tailwind CSS

Tailwind se siente como "CSS en modo zen".

Al proporcionar bloques de construcción en forma de buenos colores predeterminados, espaciado y otras primitivas, Tailwind facilita la creación de una aplicación atractiva. Y a diferencia de las librerías de componentes, no te detiene cuando deseas llevar tu aplicación al siguiente nivel y crear algo hermoso y único.

Además, con su enfoque en línea, Tailwind te alienta a diseñar sin preocuparte por nombrar clases, organizar archivos o cualquier otro problema que no esté directamente relacionado con el problema que estás tratando de resolver.

### NextAuth.js

Cuando desees un sistema de autenticación en tu aplicación NextJS, NextAuth.js es una excelente solución para incorporar la complejidad de la seguridad sin la molestia de tener que construirlo por tu cuenta. Viene con una extensa lista de proveedores para agregar rápidamente la autenticación OAuth y proporciona adaptadores para muchas bases de datos y ORM.
