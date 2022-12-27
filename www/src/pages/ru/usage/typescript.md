---
title: TypeScript
description: Использование TypeScript
layout: ../../../layouts/docs.astro
lang: ru
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
      <span className=" text-sm font-semibold">Theo - creator of the T3 Stack</span>
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

Несмотря на то новичок вы или же опытный разработчик, мы считаем, что TypeScript - это маст-хэв. Поначалу он может выглядеть угнетающе, но, как и многие другие инструменты, многие разработчики не возвращаются назад после того как начали его использовать.

Он предоставляет обратную связь в режиме реального времени при написании кода, определяя ожидаемые типы данных, и предоставляет полезные подсказки в редакторе кода либо кричит красными волнистыми линиями, если вы пытаетесь получить доступ к свойству, которого не существует, или пытаетесь передать значение неправильного типа, которое в противном случае пришлось бы отлаживать дальше по линии.

Это инструмент, который, возможно, обеспечивает наибольшую производительность разработчикам; он предоставляет документацию для кода, который вы пишете или используете непосредственно в вашем редакторе и имеет мгновенную обратную связь, когда вы неизбежно делаете ошибки, что абсолютно бесценно.

## Выведение типов (Type Inference)

Пока многие новые разработчики на TypeScript обеспокоены _написанием_ TypeScript, многие из его преимуществ на самом деле не требуют от вас изменения вашего кода вообще, в частности вывод типов. Вывод типов означает, что если что-то типизировано, этот тип будет следовать за ним в течение потока приложения без необходимости повторного объявления в других местах. Это означает, что, например, после того, как вы определили типы аргументов, которые принимает функция, остальная часть функции обычно будет безопасной в отношении типов без необходимости ввода какого-либо дополнительного кода, специфичного для TypeScript. Разработчики библиотек тратят огромное количество времени на поддержание типов для своих библиотек, что означает, что мы, как разработчики приложений, можем получить выгоду от вывода типов и встроенной документации в вашем редакторе кода, которые эти типы предоставляют.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Посмотрите видео Theo о том, что [вы, возможно, используете TypeScript неправильно](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## Мощные применения вывода типов

### Zod

[Zod](https://github.com/colinhacks/zod) - это библиотека проверки схем, построенная поверх TypeScript. Напишите схему, которая представляет собой единственный источник истины для ваших данных, и Zod гарантирует, что ваши данные будут действительными во всем приложении, даже вне границ сети и внешних API.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) предоставляет вам декларативные, всегда актуальные автоматически управляемые запросы и мутации, которые напрямую улучшают как Developer, так и User Experience.

## Полезные ресурсы

| Ресурс                                                          | Ссылка                                                            |
| --------------------------------------------------------------- | ----------------------------------------------------------------- |
| Руководство по TypeScript                                       | https://www.typescriptlang.org/docs/handbook/                     |
| Гайд по TypeScript для новичков                                 | https://github.com/total-typescript/beginners-typescript-tutorial |
| Type Challenges                                                 | https://github.com/type-challenges/type-challenges                |
| Канал Родни Маллена из мира TypeScript (Matt Pocock) на YouTube | https://www.youtube.com/c/MattPocockUk/videos                     |
