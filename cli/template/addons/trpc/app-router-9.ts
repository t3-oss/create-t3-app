// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import superjson from "superjson";

export const appRouter = router()
  .transformer(superjson)
  .merge("example.", exampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
