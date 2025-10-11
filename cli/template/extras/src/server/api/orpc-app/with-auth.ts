import { ORPCError, os } from "@orpc/server";

import { env } from "~/env";
import { auth } from "~/server/auth";

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = os.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (env.NODE_ENV === "development") {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[ORPC] ${path.join(".")} took ${end - start}ms to execute`);

  return result;
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = os
  .use(timingMiddleware)
  .use(async ({ next }) => {
    const session = await auth();

    const result = await next({
      context: {
        session,
      },
    });

    return result;
  });

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `context.session` is not null.
 */
export const protectedProcedure = publicProcedure.use(
  async ({ context, next }) => {
    const session = context.session;
    if (!session) {
      throw new ORPCError("UNAUTHORIZED", {
        message: "You must be logged in to access this resource.",
      });
    }

    const result = await next({
      context: {
        ...context,
        session: session,
      },
    });
    return result;
  }
);
