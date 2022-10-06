// src/server/trpc/router/index.ts
import { createRouter } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";

export const appRouter = createRouter({
  example: exampleRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
