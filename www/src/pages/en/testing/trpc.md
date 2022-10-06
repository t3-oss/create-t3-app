---
title: Integration testing your tRPC router
description: Integration testing your tRPC router
layout: ../../../layouts/docs.astro
---

Testing is an important aspect of every production software although you probably shouldn't unit test your application for the sole purpose of reaching `x%` coverage. `create-t3-app` doesn't provide any testing frameworks out of the box due to the fact that every app is different and therefore should be tested in respect to what it is and what requirements you have. This documentation is more of a guide of where to start, and the rest you're gonna have to figure out for yourself.

## Integration Testing

We recommend using [Vitest](), it inherits much of Jest's well known API but is much faster to execute and is well maintained.

```ts
import { createContextInner } from "~/server/router/context";
import { AppRouter, appRouter } from "~/server/router";
import type { inferProcedureInput } from "@trpc/server";

test("example router", async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter["example"]["hello"]> = {
    text: "hello test",
  };

  const post = await caller.example.hello(input);

  expect(byId).toMatchObject(input);
});
```
