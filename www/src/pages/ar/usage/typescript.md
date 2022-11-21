---
title: TypeScript
description: Usage of TypeScript
layout: ../../../layouts/docs.astro
lang: ar
layout: rtl
---

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>Build safety nets, not guard rails<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @alexdotjs"
      className="w-12 mr-4 rounded-full bg-neutral-500"
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

سواء كنت مطورًا جديدًا أو متمرسًا ، نعتقد أن TypeScript أمر لا بد منه. قد يبدو الأمر مخيفًا في البداية ، ولكنه يشبه الكثير من الأدوات الاخري، وهو شيء لا ينظر فية الكثيرون أبدًا بعد البدء في استخدامها.

يوفر ملاحظات مباشرة أثناء كتابة الكود الخاصة بك عن طريق تحديد أنواع البيانات المتوقعة ، وأيضا يوفر الإكمال التلقائي المفيد في الـ Editor الخاص بك ، أو يصرخ عليك بخطوط متعرجة حمراء إذا كنت تحاول الوصول إلى خاصية غير موجودة او إذا قمت بتمرير قيمة من النوع الخطأ ، والتي قد تضطر إلى تصحيحها.


## الـ Type Inference


While many new TypeScript developers are concerned with _writing_ TypeScript, many of its benefits don't actually require you to change your code at all, in particular inference. Inference means that if something is typed, that type will follow it throughout the flow of the application without having to be re-declared in other places. This means that for example once you have defined the types of the arguments that a function takes, the remainder of the function will usually be typesafe without requiring any further TypeScript-specific code. Library developers put a ton of work into maintaining the types for their libraries, which means that we as application developers can benefit from both the inference and the built-in documentation in your code editor that these types provide.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Check out Theo's video on how [you might be using TypeScript wrong](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## Powerful uses of type inference

### Zod

[Zod](https://github.com/colinhacks/zod) is a schema validation library that is built on top of TypeScript. Write a schema that represents a single source of truth for your data, and Zod will ensure that your data is valid throughout your application, even across network boundaries and external APIs.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) gives you declarative, always-up-to-date auto-managed queries and mutations that directly improve both your developer and user experiences.

## Useful Resources

| Resource                                                  | Link                                                              |
| --------------------------------------------------------- | ----------------------------------------------------------------- |
| TypeScript Handbook                                       | https://www.typescriptlang.org/docs/handbook/                     |
| Beginners TypeScript Tutorial                             | https://github.com/total-typescript/beginners-typescript-tutorial |
| Type Challenges                                           | https://github.com/type-challenges/type-challenges                |
| Rodney Mullen of TypeScript (Matt Pocock) Youtube Channel | https://www.youtube.com/c/MattPocockUk/videos                     |
