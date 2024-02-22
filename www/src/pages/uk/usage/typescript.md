---
title: TypeScript
description: Використання TypeScript
layout: ../../../layouts/docs.astro
lang: uk
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

Незважаючи на те новачок ви або досвідчений розробник, ми вважаємо, що TypeScript - це маст-хев. Спочатку він може виглядати гнітюче, але, як і багато інших інструментів, багато розробників не повертаються назад після того, як почали його використовувати.

Він надає зворотний зв'язок в режимі реального часу при написанні коду, визначаючи очікувані типи даних, і надає корисні підказки в редакторі коду або кричить червоними хвилястими лініями, якщо ви намагаєтеся отримати доступ до властивості, якої не існує, або намагаєтеся передати значення неправильного типу, яке в іншому випадку довелося б налагоджувати далі по лінії.

Це інструмент, який, мабуть, забезпечує найбільшу продуктивність розробникам; він надає документацію для коду, який ви пишете або використовуєте безпосередньо у вашому редакторі та має миттєвий зворотний зв'язок, коли ви неминуче робите помилки, що абсолютно безцінно.

## Виведення типів (Type Inference)

Поки багато нових розробників на TypeScript стурбовані написанням TypeScript, багато з його переваг насправді не вимагають від вас зміни вашого коду взагалі, зокрема виведення типів. Висновок типів означає, що якщо щось типізовано, цей тип слідуватиме за ним протягом потоку програми без необхідності повторного оголошення в інших місцях. Це означає, що, наприклад, після того, як ви визначили типи аргументів, які приймає функція, решта функції зазвичай буде безпечною щодо типів без необхідності введення будь-якого додаткового коду, специфічного для TypeScript. Розробники бібліотек витрачають величезну кількість часу на підтримку типів для своїх бібліотек, що означає, що ми, як розробники додатків, можемо отримати вигоду від виведення типів та вбудованої документації у вашому редакторі коду, який ці типи надають.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Перегляньте відео Theo про те, що [ви, можливо, використовуєте TypeScript неправильно](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## Потужні застосування виведення типів

### Zod

[Zod](https://github.com/colinhacks/zod) - це бібліотека перевірки схем, побудована поверх TypeScript. Напишіть схему, яка є єдиним джерелом істини для ваших даних, і Zod гарантує, що ваші дані будуть дійсними у всьому додатку, навіть поза межами мережі та зовнішніх API.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) надає вам декларативні, завжди актуальні автоматично керовані запити та мутації, які безпосередньо покращують як Developer, так і User Experience.

## Корисні ресурси

| Ресурс                                                           | Посилання                                                         |
| ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| Посібник з TypeScript                                            | https://www.typescriptlang.org/docs/handbook/                     |
| Гайд по TypeScript для новачків                                  | https://github.com/total-typescript/beginners-typescript-tutorial |
| Type Challenges                                                  | https://github.com/type-challenges/type-challenges                |
| Канал Родні Маллена зі світу TypeScript (Matt Pocock) на YouTube | https://www.youtube.com/c/MattPocockUk/videos                     |
