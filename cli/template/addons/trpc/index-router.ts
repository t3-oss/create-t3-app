// src/server/router/index.ts
import { createRouter } from "../trpc";

import { exampleRouter } from "./example";

export const appRouter = createRouter({
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
