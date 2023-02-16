---
title: TypeScript
description: Uso de TypeScript
layout: ../../../layouts/docs.astro
lang: es
---

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>Build safety nets, not guard rails<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @t3dotgg"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="/images/theo_300x300.webp"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Theo - creador del T3 Stack</span>
      <a
        href="https://twitter.com/t3dotgg"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        @t3dotgg
      </a>
    </div>
  </cite>
</blockquote>

Ya sea que seas un desarrollador nuevo o experimentado, creemos que TypeScript es imprescindible. Al principio puede parecer intimidante, pero al igual que muchas herramientas, es algo de lo que muchos nunca miran hacia atrás después de comenzar a usarlo.

Proporciona comentarios en vivo a medida que escribes tu código definiendo los tipos de datos esperados, y proporciona un servicio automático útil en tu editor de código, o te dice con líneas rojas curveadas si estás intentando acceder a una propiedad que no existe o intentas pasar un valor del tipo incorrecto, que de otro modo tendrías que depurar más adelante.

Es, tal vez, la herramienta que proporciona la mayor productividad a los desarrolladores; Proporciona documentación del código que estás escribiendo o consumiendo directamente en tu editor, y tener comentarios instantáneos a medida que inevitablemente cometes errores no tiene precio.

## Inferencia de Tipos

Si bien muchos desarrolladores de TypeScript nuevos se preocupan por _escribir_ TypeScript, muchos de sus beneficios en realidad no requieren que cambies tu código en absoluto, en particular la inferencia. La inferencia significa que si se escribe algo, ese tipo seguirá siendo el mismo durante todo el flujo de la aplicación sin tener que volver a declararlo en otros lugares.Esto significa que, por ejemplo, una vez que hayas definido los tipos de los argumentos que toma una función, el resto de la función generalmente será segura en tipos sin requerir ningún código más específico de TypeScript. Los desarrolladores de librerías pusieron un montón de trabajo en el mantenimiento de los tipos de sus librerías, lo que significa que nosotros, como desarrolladores de aplicaciones, podemos beneficiarnos tanto de la inferencia como de la documentación incorporada en tu editor de código que proporcionan estos tipos.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Echa un vistazo al video de Theo sobre cómo [podrías estar usando TypeScript de manera incorrecta](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## Usos poderosos de inferencia de tipos

### Zod

[Zod](https://github.com/colinhacks/zod) es una librería de validación de esquema que se basa en TypeScript. Escribe un esquema que represente una sola fuente de verdad para tus datos, y Zod se asegurará de que tus datos sean válidos en toda tu aplicación, incluso a través de los límites de la red y las APIs externas.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) te ofrece consultas y mutaciones auto-gestionadas, siempre actualizadas, que mejoran directamente tu experiencia de desarrollo y usuario.

## Recursos útiles

| Recurso                                                       | Enlace                                                            |
| ------------------------------------------------------------- | ----------------------------------------------------------------- |
| Manual de TypeScript                                          | https://www.typescriptlang.org/docs/handbook/                     |
| Tutorial de TypeScript para principiantes                     | https://github.com/total-typescript/beginners-typescript-tutorial |
| Type Challenges                                               | https://github.com/type-challenges/type-challenges                |
| Canal de Youtube de Rodney Mullen de TypeScript (Matt Pocock) | https://www.youtube.com/c/MattPocockUk/videos                     |
