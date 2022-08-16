// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
