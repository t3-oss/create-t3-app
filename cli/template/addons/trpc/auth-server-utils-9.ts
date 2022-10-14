import { router as _router, TRPCError } from "@trpc/server";
import type { Context } from "./context";

export const router = () => _router<Context>();

export function protectedRouter() {
  return router().middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        // infers that `session` is non-nullable to downstream resolvers
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
}
