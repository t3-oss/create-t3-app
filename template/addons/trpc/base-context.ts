// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export const createContext = (opts: trpcNext.CreateNextContextOptions) => {
  return {};
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
