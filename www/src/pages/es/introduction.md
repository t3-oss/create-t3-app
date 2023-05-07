---
title: Introducción
description: Introducción al T3 Stack
layout: ../../layouts/docs.astro
lang: es
---

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/YkOSUVzOAA4" title="El mejor stack para su próximo proyecto" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## El T3 Stack

El _"T3 Stack"_ es un stack de desarrollo web creado por [Theo](https://twitter.com/t3dotgg) que está enfocado en simplicidad, modularidad, y seguridad (full-stack) de tipos.

Las piezas centrales son [**Next.js**](https://nextjs.org/) y [**TypeScript**](https://typescriptlang.org/). [**Tailwind CSS**](https://tailwindcss.com/) está casi siempre incluído.
Si estás haciendo algo parecido a un backend, [**tRPC**](https://trpc.io/), [**Prisma**](https://prisma.io/), y [**NextAuth.js**](https://next-auth.js.org/) son muy buenas adiciones también.

Es posible que hayas notado que hay muchas... piezas, esto es por diseño. Intercambia piezas dentro y fuera según lo necesites. Este stack es modular desde la base :)

## Entonces... ¿Qué es create-t3-app? ¿Una plantilla?

¿Más o menos? `create-t3-app` es una CLI creada por desarrolladores experimentados del T3 Stack para agilizar la configuración de una aplicación modular T3 Stack. Esto significa que cada pieza es opcional, y la "plantilla" es generada en función de tus necesidades específicas.

Después de innumerables proyectos y muchos años en esta tecnología, tenemos muchas opiniones e ideas. Hemos hecho todo lo posible para codificarlos en esta CLI.

Esta **NO** es una plantilla con todo incluido. **Esperamos** que traigas tus propias librerías que resuelvan las necesidades de **TU** aplicación. Si bien no queremos prescribir soluciones a problemas más específicos, como la administración de estado o la implementación de la aplicación como tal, [tenemos algunas recomendaciones enumeradas aquí](/es/other-recs).

## Axiomas T3

Seremos francos: este es un _proyecto dogmático_. Compartimos muchas creencias fundamentales sobre la construcción y las tratamos como la base de nuestras decisiones.

### Resolver Problemas

Es fácil caer en la trampa de "agregar todo"; explícitamente no queremos hacer eso. Todo lo agregado a `create-t3-app` debería resolver un problema específico que existe dentro de las tecnologías principales incluidas. Esto significa que no agregaremos cosas como librerías de manejo de estado (`zustand`, `redux`), pero agregaremos cosas como NextAuth.js e integraremos Prisma y tRPC para ti.

### Responsablemente Vanguardista

Nos encanta nuestra tecnología de vanguardia. La velocidad y, sinceramente, la diversión que se obtiene de las nuevas tecnologías es realmente genial. Creemos que es importante ser vanguardista de manera responsable, usando tecnología más riesgosa en las partes con menos riesgo. Esto significa que no apostaríamos ⛔️ por una nueva tecnología de base de datos arriesgada (¡SQL es genial!). Pero felizmente ✅ apostamos por tRPC ya que son sólo funciones que son triviales de remover.

### La Seguridad de Tipos no es Opcional

El objetivo declarado de `create-t3-app` es proporcionar la forma más rápida de iniciar una nueva aplicación web full-stack **segura en tipos**. Nos tomamos muy en serio la seguridad de tipos en todas las partes, ya que mejora nuestra productividad y nos ayuda a enviar menos errores a producción. Cualquier decisión que comprometa la seguridad de tipos de `create-t3-app` es una decisión que debe tomarse en un proyecto diferente.
