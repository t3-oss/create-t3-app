// src/server/router/index.ts
import { t } from "../trpc";

import { exampleRouter } from "./example";

export const appRouter = t.router({
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
