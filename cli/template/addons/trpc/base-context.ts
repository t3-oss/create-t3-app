// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export const createContext = (opts?: trpcNext.CreateNextContextOptions) => {
  const req = opts?.req;
  const res = opts?.res;

  return {
    req,
    res,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
