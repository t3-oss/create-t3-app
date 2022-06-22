// src/pages/api/trpc/[trpc].ts
import { inferProcedureOutput } from "@trpc/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { AppRouter, appRouter } from "../../../server/router";
import { createContext } from "../../../server/router/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
