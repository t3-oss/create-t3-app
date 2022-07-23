// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { Session, unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "../../pages/api/auth/[...nextauth]";
import { prisma } from "../db/client";

interface CreateContextOptions {
  session: Session | null
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for:
 * - Integration testing when we don't want to mock Next.js' request/response
 * - `createSSGHelpers` where we don't have a `req` or `res`
 */
export async function createContextInner(opts: CreateContextOptions) {
  return {
    session: opts.session,
    prisma,
  };
}


/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  const session = await getServerSession(opts.req, opts.res, nextAuthOptions);

  return await createContextInner({
    session,
  });
}

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
