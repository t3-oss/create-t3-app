---
title: Tailwind CSS
description: Uso de Tailwind CSS
layout: ../../../layouts/docs.astro
lang: es
---

## ¿Qué es Tailwind CSS?

Tailwind CSS es un pequeño framework, con [utilidad de primero](https://tailwindcss.com/docs/utility-first), de CSS para construir diseños personalizados, sin el cambio de contexto que requiere el CSS normal. Es puramente un framework de CSS y no proporciona componentes o lógica preconstruida, y proporciona [un conjunto muy diferente de beneficios](https://www.youtube.com/watch?v=CQuTF-bkOgc) en comparación con una librería de componentes como Material UI.

Hace que CSS sea increíblemente fácil y rápido de escribir, como se muestra en el siguiente ejemplo:

Viejo CSS:

1. Escribir CSS, generalmente en un archivo separado

```css
.mi-clase {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  padding: 1rem;
}
```

2. Importar el CSS en tu componente

```jsx
import "./mi-clase.css";
```

3. Agrega la clase a tu HTML

```html
<div class="mi-clase">...</div>
```

Equivalente en Tailwind:

1. Simplemente escribe clases en tu HTML

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

Cuando se usa junto con los componentes de React, es extremadamente potente para construir UIs (_interfaces de usuario_) rápidamente.

Tailwind CSS tiene un hermoso sistema de diseño incorporado, que sale de la caja con una paleta de colores cuidadosamente elegida, patrones de dimensionamiento para estilos como width/height y padding/margin para un diseño uniforme, así como puntos de quiebre para crear diseños responsive. Este sistema de diseño se puede personalizar y extender para crear la caja de herramientas exacta de los estilos que necesita tu proyecto.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="Tru Narla: Building a design system in Next.js with Tailwind" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla mejor conocida como [mewtru](https://twitter.com/trunarla) dio una charla increíble de [cómo construir un sistema de diseño utilizando Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## Uso

Asegúrate de tener complementos de editor para Tailwind CSS instalados para mejorar tu experiencia escribiendo Tailwind.

### Extensiones y complementos

- [Extensión VSCode](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Integración de JetBrains](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Formateo

Las clases CSS de Tailwind pueden ser fácilmente desordenadas, por lo que es imprescindible un formateo para las clases. [El complemento de Prettier de Tailwind CSS](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) clasifica las clases en el [orden recomendado](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted) para que las clases coincidan con el paquete (_bundle_) CSS generado. Al seleccionar Tailwind CSS en la CLI, instalaremos y configuraremos esto para ti.

### Aplicando clases condicionalmente

Agregar condicionalmente clases con operadores terciarios puede ser muy desordenado y difícil de leer. Estos paquetes ayudan a organizar tus clases cuando se usa lógica condicional.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Recursos útiles

| Recurso                          | Enlace                                                   |
| -------------------------------- | -------------------------------------------------------- |
| Documentación de Tailwind        | https://tailwindcss.com/docs/editor-setup/               |
| Tailwind Cheat Sheet             | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss              | https://github.com/aniftyco/awesome-tailwindcss/         |
| Comunidad de Tailwind            | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Servidor Discord de Tailwind     | https://tailwindcss.com/discord/                         |
| Canal de Youtube de TailwindLabs | https://www.youtube.com/tailwindlabs/                    |
| Tailwind Playground              | https://play.tailwindcss.com/                            |
