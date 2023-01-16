---
title: FAQ
description: Часто задаваемые вопросы про Create T3 App
layout: ../../layouts/docs.astro
lang: ru
---

Это некоторые часто задаваемые вопросы о `create-t3-app`.

## Что дальше? Как я могу создать приложение?

Мы стараемся сделать этот проект как можно проще, поэтому вы можете начать с того, что мы настроили для вас, а затем добавлять дополнительные вещи позже, когда они станут необходимыми.

Если вы не знакомы с различными технологиями, используемыми в этом проекте, обратитесь к соответствующей документации. Если что то все еще не понятно, присоединяйтесь к нашему [Discord](https://t3.gg/discord) и попросите помощи.

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Какие учебные ресурсы сейчас доступны?

Не смотря на то, что перечисленные ниже ресурсы являются одиними из лучших для T3 Stack, сообщество (и [Theo](https://youtu.be/rzwaaWH0ksk?t=1436)) рекомендует просто начать использовать стек и учиться в процессе разработки с его помощью.

Если вы рассматриваете `create-t3-app`, скорее всего, вы уже использовали некоторые части стека. Так почему бы не погрузиться в проект с головой и узнать остальные технологии в процессе разработки?

Мы понимаем, что этот путь не подходит для каждого. Поэтому, если вы чувствуете, что рекомендации не достаточно, и вам все еще нужны ресурсы, или вы просто не уверены в своих силах и/или чувствуете себя перегруженным этим стеком, ознакомьтесь с этими потрясающими учебными материалами по `create-t3-app`:

### Статьи

- [Build a full stack app with Create T3 App](https://www.nexxel.dev/blog/ct3a-guestbook)
- [A first look at Create T3 App](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrating your T3 App into a Turborepo](https://www.jumr.dev/blog/t3-turbo)
- [Integrating Stripe into your T3 App](https://blog.nickramkissoon.com/posts/integrate-stripe-t3)

### Видео

- [Build a Twitter Clone with the T3 Stack - tRPC, Next.js, Prisma, Tailwind & Zod](https://www.youtube.com/watch?v=nzJsYJPCc80)
- [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [The T3 Stack - How We Built It](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [An overview of the Create T3 App (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)

## Почему в проекте есть файлы `.js`?

Согласно [T3-Аксиоме #3](/ru/introduction#typesafety-isnt-optional), мы считаем типобезопасность объектом первого класса. К сожалению, не все фреймворки и плагины поддерживают TypeScript, поэтому некоторые файлы конфигурации должны быть файлами `.js`.

Мы пытаемся подчеркнуть, что эти файлы являются файлами JavaScript не без причины, явно объявляя тип каждого файла (`cjs` или `mjs`), в зависимости от того, что поддерживается библиотекой, которой он используется. Кроме того, все файлы `js` в этом проекте все еще проверяются на типы с помощью комментария `@ts-check` вверху.

## У меня не получается добавить i18n в мое приложение. Есть ли какие-либо рекомендации?

Мы решили не включать i18n по умолчанию в `create-t3-app`, потому что это очень субъективная тема, и есть много способов ее реализации.

В тоже время, если вы столкнулись с проблемами при реализации и хотите увидеть проект-образец, у нас есть [ссылка на репозиторий](https://github.com/juliusmarminge/t3-i18n) который показывает как вы можете добавить i18n в T3 App с помощью [next-i18next](https://github.com/i18next/next-i18next).

## Почему мы используем `/pages` а не `/app` из Next.js 13?

Согласно [T3-Аксиоме #2](/ru/introduction#bleed-responsibly), мы любим новинки, но ценим стабильность, вам будет сложно перенести весь маршрутизатор, [не лучшеее место для экспериментов](https://youtu.be/mnwUbtieOuI?t=1662). Хотя `/app` [представляет собой взгляд в будущее](https://youtu.be/rnsC-12PVlM?t=818), он еще не готов к использованию в продакшене; API находится в бета-версии и ожидается, что он будет иметь обратно несовместимые изменения.

Список поддерживаемых, запланированных и находящихся в разработке функций в каталоге `/app` можно найти в [бета-документации Next.js](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features).
