---
title: Otras Recomendaciones
description: Librerías y Servicios que nosotros recomendamos para todos los proyectos
layout: ../../layouts/docs.astro
lang: es
---

Reconocemos que las librerías incluidas en `create-t3-app` no resuelven todos los problemas. Si bien te alentamos a comenzar tu proyecto con las cosas que proporcionamos, llegará un momento en que necesitarás traer otros paquetes. Solo tu puedes saber qué necesita tu proyecto, pero aquí hay algunas cosas que recomendamos con frecuencia.

Estas son recomendaciones de colaboradores individuales de create-t3-app y no deben verse como respaldos "oficiales" por parte del equipo de create-t3-app o T3-OSS. _**Haz tu propia investigación, especialmente antes de comprometerte con servicios pagados**_.

## Administración de Estado

_**Nota del editor**_: Las librerías de administración de estado pueden ser excelentes, pero a menudo no son necesarias. Los hooks React Query de tRPC deberían poder encargarse del estado de tu servidor. Para el estado del cliente, comienza con `useState` de React y busca una de estas opciones cuando necesites más.

### Zustand

**Para no volver a usar Redux nunca más**

El "Redux moderno y simple" que no sabías que necesitabas. Siempre se puede confiar en [Poimandres](https://github.com/pmndrs). Puede crear todo, desde aplicaciones de videollamadas hasta juegos y servidores con esta pequeña librería.

- [Página de inicio de Zustand](https://zustand-demo.pmnd.rs/)
- [GitHub de Zustand](https://github.com/pmndrs/zustand)

### Jotai

**Para nunca volver a usar Context**

Para un enfoque más atómico, Jotai es difícil de superar. También por [Poimandres](https://github.com/pmndrs), Jotai te permite definir singletons que se sienten como estado de uso global. Una excelente opción para comportamientos con estado que todavía no necesiten una máquina de estado.

- [Página de inicio de Jotai](https://jotai.org/)
- [GitHub de Jotai](https://github.com/pmndrs/jotai)

## Librerías de Componentes

La mayoría de las aplicaciones necesitan la misma cantidad de componentes: botones de alternancia, menús desplegables, diálogos, etc. Estas librerías proporcionan componentes excelentes y accesibles que puedes usar y personalizar a tu gusto.

### Librerías de componentes sin estilo

También conocidas como librerías headless, proporcionan excelentes componentes sin estilo y accesibles que puedes personalizar a tu gusto. Aquí hay algunas recomendaciones.

- [Radix UI](https://www.radix-ui.com/) te brinda un poderoso conjunto de primitivas convenientes y accesibles que puedes diseñar con Vanilla o Tailwind CSS.

- [Headless UI](https://headlessui.com/) creado por el equipo de Tailwind CSS también proporciona componentes accesibles y sin estilo que se integran a la perfección con Tailwind CSS.

- [React Aria](https://react-spectrum.adobe.com/react-aria/) proporciona primitivas de interfaz de usuario accesibles para tu sistema de diseño. Su componente Selector de Fecha es de primer nivel.

### Librerías de componentes con estilo

**Para cuando solo quieres que tu aplicación se vea bien**

A veces, estás creando un proyecto en el que solo deseas que la interfaz de usuario se vea decente desde el primer momento. Para paneles de administración y otros proyectos similares, cualquiera de estas librerías de componentes hará el trabajo.

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)

### Class Variance Authority

**Para crear librerías de interfaz de usuario**

Crea declarativamente una librería de interfaz de usuario con diferentes variaciones de color, tamaño, etc. Cuando tu proyecto alcanza un punto en el que deseas tener un conjunto estandarizado de componentes de interfaz de usuario con múltiples variaciones usando Tailwind CSS, CVA es una gran herramienta.

- [Class Variance Authority GitHub](https://github.com/joe-bell/cva)

## Animaciones

Para cuando necesites animaciones en tu aplicación, aquí están nuestras recomendaciones.

### AutoAnimate

**Para animaciones con una sola línea de código**

La mayoría de las librerías de animación intentan satisfacer todos los casos de uso posibles y, como resultado, se vuelven torpes. AutoAnimate es una herramienta de cero configuración que te brindará una mejora significativa en UX sin esfuerzo adicional del desarrollador.

- [Página de inicio de AutoAnimate](https://auto-animate.formkit.com/)
- [GitHub de AutoAnimate](https://github.com/formkit/auto-animate)
- [Ejemplo de un Componente con AutoAnimate](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Framer Motion

**Para animaciones complejas con código declarativo**

Framer Motion proporciona una sintaxis declarativa simple y te permite escribir menos código para crear todo, desde animaciones complejas hasta incluso gestos.

- [Página de inicio de Framer Motion](https://framer.com/motion)
- [Documentación de Framer Motion](https://www.framer.com/docs/)

## Despliegues, Infraestructura, Bases de Datos y CI

### Vercel

**Para alojar tu aplicación**

Vercel tomó el infierno de los despliegues web y lo convirtió en una integración de GitHub de configurar y olvidar. Hemos escalado a cientos de miles de usuarios sin problemas. Impulsado por AWS, simplemente una interfaz mucho mejor :)

- [Página de inicio de Vercel](https://vercel.com/)
- [Guía Create T3 App para desplegar en Vercel](/es/deployment/vercel)

### PlanetScale

**Para bases de datos sin preocupaciones**

PlanetScale es la mejor "plataforma de base de datos sin servidor" que hemos usado hasta ahora. Escala increíblemente, excelente experiencia de desarrollador y precios fantásticos. Si estás utilizando SQL (y con suerte Prisma), esto es difícil de superar.

- [Página de inicio de PlanetScale](https://planetscale.com/)

### Railway

**Para alojar tu infraestructura**

"Heroku moderno". La forma más fácil de poner en marcha un servidor real. Si Vercel y PlanetScale no son suficientes, probablemente Railway lo sea. Apúntalo a un repositorio de GitHub y listo.

- [Página de inicio de Railway](https://railway.app/)

### Upstash

**Para Redis sin servidor**

Nos encantan Prisma y PlanetScale, pero algunos proyectos requieren una solución de mayor rendimiento. Upstash te permite obtener el rendimiento en memoria de Redis en tu proyecto sin servidor, sin tener que administrar la infraestructura y escalar por tu cuenta.

- [Página de inicio de Upstash](https://upstash.com/)

### Pusher

**Para WebSockets sin servidor**

Si los WebSockets son el enfoque principal de tu proyecto, es posible que desees considerar un backend más tradicional como [Fastify](https://www.fastify.io/) (que [¡también funciona con tRPC!](https://trpc.io/docs/v10/fastify)). Pero para agregar rápidamente WebSockets a una aplicación T3, Pusher es una excelente opción.

- [Página de inicio de Pusher](https://pusher.com/)

### Soketi

Soketi es una alternativa autohospedable, simple y rápida a Pusher. Es totalmente compatible con Pusher SDK que puedes usar para conectarte al servidor. Soketi serverless también está en versión beta.

- [Página de inicio de Soketi](https://soketi.app)
- [Soketi GitHub](https://github.com/soketi/soketi)

## Análisis de Datos

Los datos de los usuarios son muy valiosos cuando creas una aplicación. Aquí hay algunos proveedores de análisis que recomendamos.

### Plausible

¿Necesitas análisis? Plausible es una de las formas más rápidas de obtenerlos. Súper minimalista. Incluso tiene un [complemento simple para Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Página de inicio de Plausible](https://plausible.io/)

### Umami

Umami es una alternativa a Google Analytics de código abierto, autohospedable, simple, rápida y centrada en la privacidad. Puedes desplegarlo muy fácilmente en Vercel, Railway, etc. con PlanetScale como tu base de datos.

- [Página de inicio de Umami](https://umami.is/)
- [Umami GitHub](https://github.com/umami-software/umami)

## Otros

### Next Bundle Analyzer

A veces puede ser difícil determinar qué se incluirá en el resultado de compilación de tu aplicación. Next Bundle Analyzer es una manera fácil de visualizar y analizar los paquetes de JavaScript que se generan.

- [@next/bundle-analyzer en npm](https://www.npmjs.com/package/@next/bundle-analyzer)
