---
title: Next.js
description: Использование Next.js
layout: ../../../layouts/docs.astro
lang: ru
---

Next.js это бэкенд фреймворк для ваших React приложений.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js is a backend framework" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Посмотрите [выступление Theo на Next.js Conf](https://www.youtube.com/watch?v=W4UhNo3HAMw) чтобы получить более подробное понимание того, что такое Next.js и как он работает.

## Почему я должен это использовать?

Мы любим React. Он сделал разработку UI доступной в том смысле, в котором мы раньше этого не могли себе представить. Он также может провести разработчиков по некоторым тернистым тропам. Next.js предлагает слегка субъективный, но очень оптимизированный подход к созданию приложений с использованием React. От маршрутизации до определений API до рендеринга изображений, мы доверяем Next.js, чтобы вести разработчиков к правильным решениям.

Совмещая Next.js с [Vercel](https://vercel.com/), вы можете разрабатывать и разворачивать веб-приложения легче, чем когда-либо. Их чрезвычайно щедрый бесплатный тариф и супер интуитивный интерфейс предоставляют решение в один клик для развертывания вашего сайта (Мы ❤️ Vercel)

## Get Static/Server Props

Ключевая особенность Next.js - это способы получения данных. Мы настоятельно рекомендуем прочитать [официальную документацию](https://nextjs.org/docs/basic-features/data-fetching), чтобы понять, как использовать каждый метод и чем они отличаются. `getServerSideProps` обычно не рекомендуется к использованию, если нет на то веской причины, из-за того, что это блокирующий вызов и он замедлит ваш сайт. [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) - это отличная альтернатива `getServerSideProps`, когда данные динамичны и могут быть получены постепенно.

Если вам все-таки нужно использовать эту особенность, обратите внимание на: [Advanced tRPC - Callers, functions, and gSSP](https://www.youtube.com/watch?v=G2ZzmgShHgQ) и [SSG-Helpers](https://trpc.io/docs/v9/ssg-helpers)

## Полезные ресурсы

| Ресурс                          | Ссылка                             |
| ------------------------------- | ---------------------------------- |
| Документация Next.js            | https://nextjs.org/docs            |
| Next.js GitHub                  | https://github.com/vercel/next.js  |
| Блог Next.js                    | https://nextjs.org/blog            |
| Next.js Discord                 | https://nextjs.org/discord         |
| Next.js Twitter                 | https://twitter.com/nextjs         |
| Канал Vercel/Next.js на YouTube | https://www.youtube.com/c/VercelHQ |
