---
title: TypeScript
description: Usage of TypeScript
layout: ../../../layouts/blog.astro
---

# What is TypeScript?

Whether you're a new or seasoned developer, we think that TypeScript is a must have. It can look intimidating at first, but much like a lot of tools, is something that many never look back from after starting to use it.

It provides live feedback as you write your code by defining expected data types, and either provides helpful autocomplete in your code editor, or yells at you with red squiggly lines if you're trying to access a property that doesn't exist, or you're trying to pass a value of the wrong type.

<blockquote>
"Build safety nets, not guard rails."
</blockquote>

# Type Inference

Despite most guides go into depth on _writing_ TypeScript, for the most part, developers benefit the most from the type inference it provides. There is a ton of work that library maintainers do when providing types for their library, but means we as developers can benefit from the type inference - and almost provide a documentation platform within your code editor.

<a href="https://www.youtube.com/watch?v=RmGHnYUqQ4k" className="mx-auto" target="_blank">
  <p align="center">
    <img src="/images/ts_thumbnail.jpeg" alt="You might be using TypeScript wrong..." width="320" />
  </p>
</a>

<a href="https://www.youtube.com/watch?v=RmGHnYUqQ4k" className="mx-auto" target="_blank">
  <p align="center">Watch Theo's overview on Youtube here</p>
</a>

## Powerful uses of type inference

### Zod

[Zod](https://github.com/colinhacks/zod) is a schema validation library that is built on top of TypeScript. Write a source of truth for your data, and Zod will ensure that your data is valid throughout your application.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) gives you declarative, always-up-to-date auto-managed queries and mutations that directly improve both your developer and user experiences.

# Useful Resources

| Resource                                                  | Link                                                              |
| --------------------------------------------------------- | ----------------------------------------------------------------- |
| TypeScript Documentation                                  | https://www.typescriptlang.org/                                   |
| Beginners TypeScript Tutorial                             | https://github.com/total-typescript/beginners-typescript-tutorial |
| Type Challenges                                           | https://github.com/type-challenges/type-challenges                |
| Rodney Mullen of TypeScript (Matt Pocock) Youtube Channel | https://www.youtube.com/c/MattPocockUk/videos                     |
