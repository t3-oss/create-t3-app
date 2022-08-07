// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getServerAuthSession } from "../common/get-server-auth-session";

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions,
) => {
  const req = opts?.req as trpcNext.CreateNextContextOptions["req"];
  const res = opts?.res as trpcNext.CreateNextContextOptions["res"];

  const session = await getServerAuthSession({ req, res });

  return {
    req,
    res,
    session,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
