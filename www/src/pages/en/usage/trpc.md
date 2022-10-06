---
title: tRPC
description: Usage of tRPC
layout: ../../../layouts/docs.astro
---

tRPC allows us to write end to end, typesafe APIs without any code generation or runtime bloat. It uses Typescript's great inference to infer your API router's type definitions and lets you safely call your API procedures from your frontend with full typesafety and autocompletion. When using tRPC, your front- and backend feel closer together than ever before, allowing for an outstanding developer experience.

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

With tRPC, you write TypeScript functions on your backend, and then call them from your frontend. A simple tRPC procedure could look like this:

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

What does this snippet do? It's a tRPC procedure (the equivalent of a route handler in a traditional backend) that first validates the input using Zod (the same validation library that we use for [environment variables](./env-variables)), in this case making sure that the input is a string and sending an informative error if this is not the case, then calls our database using [Prisma](./prisma) and returns the user whose `id` matches the one we passed in.

You define your procedures in `routers` which represent a collection of related procedures with a shared namespace. You may have one router for `users`, one for `posts` and another one for `messages`. These routers can then be merged into a single, centralized `appRouter`:

```ts
// server/routers/index.ts
const appRouter = t.router({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

Notice that we only need to export our router's type definitions, which means we are never importing any server code on our client.

Now let's call the procedure on our frontend. tRPC provides a wrapper for `@tanstack/react-query` which lets you utilize the full power of the hooks they provide, but with the added benefit of having your API calls typed and inferred. We can call our procedures on our frontend like this:

```tsx
// pages/users/[id].tsx
const UserPage = () => {
  const userQuery = trpc.user.getById.useQuery("abc123");

  return (
    <div>
      <h1>{userQuery.data?.name}</h1>
    </div>
  );
};
```

You'll immediately notice how good the autocompletion and typesafety is. As soon as you write `trpc.` your routers will show up in autocomplete, when you select a router, its procedures will show up as well. You'll also get a TypeScript error if your input doesn't match the validator that you defined on the backend.

## Comparison to a Next.js API endpoint

Let's compare a Next.js API endpoint to a tRPC procedure. Let's say we want to fetch a user object from our database and return it to the frontend. We could write a Next.js API endpoint like this:

```ts
// pages/api/user/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

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

Compare this to the tRPC example above and you can see some of the advantages of tRPC:

- Instead of specifying a url for each route, which can become annoying to debug if you move something, your entire router is an object with autocomplete.
- You don’t need to validate which HTTP method was used.
- You don’t need to validate that the request query or body contains the correct data in the procedure, because Zod takes care of this.
- Instead of creating a response, you can throw errors and return a value or object as you would in any other TypeScript function.

## Useful Resources

| Resource         | Link                                                    |
| ---------------- | ------------------------------------------------------- |
| tRPC Docs        | https://www.trpc.io                                     |
| React Query Docs | https://tanstack.com/query/v4/docs/adapters/react-query |
