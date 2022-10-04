---
title: TRPC
description: Usage of TRPC
layout: ../../../layouts/docs.astro
---

tRPC allows us to write end to end, typesafe APIs without any code generation or runtime bloat. It uses Typescript's great inference to infer your API router's type definitions and then you can safely call your API procedures from your frontend with full typesafety and autocompletion. When using tRPC, your front- and backend has never felt closer together which allows for a great developer experience for creating fullstack applications.

<blockquote className="w-full relative italic border-l-4 bg-t3-purple-100 dark:text-t3-purple-50 text-slate-900 dark:bg-slate-700 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg md:text-xl">
      <span aria-hidden="true">&quot;</span>I built tRPC to allow people to move faster by removing the need of a traditional API-layer, while still having confidence that our apps won't break as we rapidly iterate.<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end">
    <img
      alt="Avatar of @t3dotgg"
      className="w-12 mr-4 rounded-full bg-neutral-500"
      src="https://avatars.githubusercontent.com/u/459267?v=4"
    />
    <div className="flex flex-col items-start">
      <span className="mb-1 text-sm italic font-bold">Alex - creator of tRPC</span>
      <a
        href="https://twitter.com/alexdotjs"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        @alexdotjs
      </a>
    </div>
  </cite>
</blockquote>

## How do I use tRPC?

With tRPC, you write Typescript functions on your backend, and then call them on your frontend. A simple tRPC procedure could look like this:

```ts
// server/routers/user.ts
const userRouter = t.router({
  getById: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
```

What does this snippet do you might ask? Well, it's a tRPC procedure that takes a string as input that gets validated using Zod (which is the same validation library that we used for our [environment variables](./env-variables)), calls our database using [Prisma](./prisma) and returns the user whose `id` matches the one we passed in. You define your procedures in `routers` which is a collection of procedures which by convention should be related. You may have one router for `users`, one for `posts` and another one for `messages`. These routers can then be merged into a single, centralized `appRouter`:

```ts
// server/routers/index.ts
const appRouter = t.router({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

Notice that we only need to export our router's type definitions which means we are never importing any server code on our client.

Now let's call the procedure on our frontend. tRPC provides a wrapper for `@tanstack/react-query` which let's you utilize the full power of the hooks they provide, but with the added benefit of having your API calls typed and inferred. We can call our procedures on our frontend like this:

```tsx
// pages/users/[id].tsx
const UserPage = () => {
  const userQuery = trpc.user.getById.useQuery("abc123");

  return (
    <div>
      <h1>{user.data?.name}</h1>
    </div>
  );
};
```

You'll immediately notice how good the autocompletion and typesafety is. Immediately when you have written `trpc.` your routers will show up, and eventually so will your procedures. You'll also get some red squiggly lines if your input doesn't match your validator that you defined on the backend.

## Comparison to a Next.js API endpoint

Let's compare a Next.js API endpoint to a tRPC procedure. Let's say we want to fetch a user from our database and return it to the frontend. We could write a Next.js API endpoint like this:

```ts
// pages/api/user/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db/client";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid id" });
  }

  const examples = await prisma.example.findFirst({
    where: {
      id,
    },
  });

  res.status(200).json(examples);
};

export default userByIdHandler;
```

## Useful Resources

| Resource         | Link                                                    |
| ---------------- | ------------------------------------------------------- |
| tRPC Docs        | https://www.trpc.io                                     |
| React Query Docs | https://tanstack.com/query/v4/docs/adapters/react-query |
