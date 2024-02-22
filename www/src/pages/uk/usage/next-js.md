---
title: Next.js
description: Використання Next.js
layout: ../../../layouts/docs.astro
lang: uk
---

Next.js це бекенд фреймворк для ваших React додатків.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js is a backend framework" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Подивіться [виступ Theo на Next.js Conf](https://www.youtube.com/watch?v=W4UhNo3HAMw) щоб отримати більш детальне розуміння того, що таке Next.js і як він працює.

## Чому я повинен це використовувати?

Ми любимо React. Він зробив розробку UI доступною у тому вигляді, в якому ми ніколи не могли собі уявити. Він також може вести розробників тернистими шляхами. Next.js пропонує злегка суб'єктивний, більш оптимізований підхід до створення додатків з використанням React. Від маршрутизації до визначення API до візуалізації зображень ми довіряємо Next.js, щоб вести розробників до правильних рішень.

Поєднуючи Next.js з [Vercel](https://vercel.com/), ви можете розробляти та деплоїти веб-програми легше, ніж будь-коли. Їх надзвичайно щедрий безкоштовний тариф та супер інтуїтивний інтерфейс надають рішення в один клік для деплойменту вашого сайту (Ми ❤️ Vercel)

## Get Static/Server Props

Ключові особливості Next.js – це можливості отримання даних. Ми наполегливо рекомендуємо прочитати [офіційну документацію](https://nextjs.org/docs/basic-features/data-fetching), щоб зрозуміти, як використовувати кожен метод і чим вони відрізняються. `getServerSideProps` зазвичай не рекомендується, якщо немає вагомої причини, тому що це блокуючий виклик і він уповільнить ваш сайт. [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) - це відмінна альтернатива `getServerSideProps`, коли дані динамічні та можуть бути отримані поступово.

Якщо ви все одно хочете використовувати цю функцію, перегляньте ці посилання: [Advanced tRPC - Callers, functions, and gSSP](https://www.youtube.com/watch?v=G2ZzmgShHgQ) та [SSG-Helpers](https://trpc.io/docs/v9/ssg-helpers)

## Корисні ресурси

| Ресурс                    | Посилання                          |
| ------------------------- | ---------------------------------- |
| Next.js Документація      | https://nextjs.org/docs            |
| Next.js GitHub            | https://github.com/vercel/next.js  |
| Next.js Блог              | https://nextjs.org/blog            |
| Next.js Discord           | https://nextjs.org/discord         |
| Next.js Twitter           | https://twitter.com/nextjs         |
| Vercel/Next.js на YouTube | https://www.youtube.com/c/VercelHQ |
