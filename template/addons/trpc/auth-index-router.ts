// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedQuestionRouter } from "./protected-question-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("question.", protectedQuestionRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
