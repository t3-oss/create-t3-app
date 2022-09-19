---
title: TypeScript
description: Usage of TypeScript
layout: ../../../layouts/docs.astro
---

<blockquote className="w-full max-w-sm relative italic border-l-4 bg-t3-purple-100 dark:text-t3-purple-50 text-slate-900 dark:bg-slate-700 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <span
      className="mr-2 hidden sm:block absolute -top-1 left-0 leading-none"
      aria-hidden="true"
    >
      &ldquo;
    </span>
    <span
      className="mr-2 hidden sm:block absolute -right-1 top-7 leading-none"
      aria-hidden="true"
    >
      &ldquo;
    </span>
    <p className="mb-4">Build safety nets, not guard rails</p>
  </div>
  <cite className="flex items-center justify-end">
    <img
      alt="Avatar of @t3dotgg"
      className="w-12 mr-4 rounded-full bg-neutral-500"
      src="https://pbs.twimg.com/profile_images/1475643465069301763/FUR05HHs_400x400.jpg"
    />
    <div className="flex flex-col items-start">
      <span className="mb-1 text-sm italic font-bold">Theo</span>
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

Whether you're a new or seasoned developer, we think that TypeScript is a must have. It can look intimidating at first, but much like a lot of tools, is something that many never look back from after starting to use it.

It provides live feedback as you write your code by defining expected data types, and either provides helpful autocomplete in your code editor, or yells at you with red squiggly lines if you're trying to access a property that doesn't exist, or you're trying to pass a value of the wrong type.

It is, perhaps, the tool that provides the most productivity to developers; providing documentation of the code you're writing or consuming directly in your editor, and having instant feedback as you inevitably make mistakes is absolutely priceless.

## Type Inference

Despite most guides go into depth on _writing_ TypeScript, for the most part, developers benefit the most from the type inference it provides. There is a ton of work that library maintainers do when providing types for their library, but means we as developers can benefit from the type inference - and almost provide a documentation platform within your code editor.

<a
href="https://www.youtube.com/watch?v=RmGHnYUqQ4k"
className="mx-auto"
target="_blank">

  <p align="center">
    <img
      src="/images/ts_thumbnail.jpeg"
      alt="You might be using TypeScript wrong..."
      width="320"
    />
  </p>
</a>

<a
href="https://www.youtube.com/watch?v=RmGHnYUqQ4k"
className="mx-auto"
target="_blank">

  <p align="center">Watch Theo's overview on Youtube here</p>
</a>

## Powerful uses of type inference

### Zod

[Zod](https://github.com/colinhacks/zod) is a schema validation library that is built on top of TypeScript. Write a source of truth for your data, and Zod will ensure that your data is valid throughout your application.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) gives you declarative, always-up-to-date auto-managed queries and mutations that directly improve both your developer and user experiences.

## Useful Resources

| Resource                                                  | Link                                                              |
| --------------------------------------------------------- | ----------------------------------------------------------------- |
| TypeScript Handbook                                       | https://www.typescriptlang.org/docs/handbook/                     |
| Beginners TypeScript Tutorial                             | https://github.com/total-typescript/beginners-typescript-tutorial |
| Type Challenges                                           | https://github.com/type-challenges/type-challenges                |
| Rodney Mullen of TypeScript (Matt Pocock) Youtube Channel | https://www.youtube.com/c/MattPocockUk/videos                     |
