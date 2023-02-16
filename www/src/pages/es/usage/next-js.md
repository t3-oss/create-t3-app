---
title: Next.js
description: Uso de Next.js
layout: ../../../layouts/docs.astro
lang: es
---

Next.js es un framework de backend para tus aplicaciones de React.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js es un framework de backend" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Échale un vistazo a la [charla de Theo en la Next.js Conf](https://www.youtube.com/embed/W4UhNo3HAMw) para comprender mejor qué es Next.js y cómo funciona.

## ¿Por qué debería usarlo?

Amamos React. Ha hecho que el desarrollo de interfaces de usuario sea accesible de una manera que nunca antes imaginamos. También puede llevar a los desarrolladores por algunos caminos difíciles. Next.js ofrece un enfoque ligeramente dogmático y muy optimizado para crear aplicaciones utilizando React. Desde el enrutamiento, las definiciones de APIs hasta la representación de imágenes, confiamos que Next.js lleve a los desarrolladores hacia la toma de buenas decisiones.

Utilizar Next.js junto con [Vercel](https://vercel.com/) hace que el desarrollo y despliegue de aplicaciones web sea más fácil que nunca. Su opción gratuita extremadamente generosa y su interfaz super intuitiva proporcionan una solución de un solo clic para desplegar tu sitio (nosotros ❤️ Vercel)

## Get Static/Server Props

Una característica clave de Next.js son sus capacidades de obtención de datos. Recomendamos fuertemente leer la [documentación oficial](https://nextjs.org/docs/basic-features/data-fetching) para comprender cómo usar cada método y cómo difieren. `getServerSideProps` generalmente se desaconseja a menos que haya una buena razón para ello, debido al hecho de que es una llamada bloqueante y reducirá el rendimiento de tu sitio. La [regeneración estática incremental](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) es una gran alternativa a `getServerSideProps` cuando los datos son dinámicos y se pueden obtener incrementalmente.

## Recursos útiles

| Recurso                            | Enlace                             |
| ---------------------------------- | ---------------------------------- |
| Documentación de Next.js           | https://nextjs.org/docs            |
| GitHub de Next.js                  | https://github.com/vercel/next.js  |
| Blog de Next.js                    | https://nextjs.org/blog            |
| Discord de Next.js                 | https://nextjs.org/discord         |
| Twitter de Next.js                 | https://twitter.com/nextjs         |
| Canal de Youtube de Vercel/Next.js | https://www.youtube.com/c/VercelHQ |
