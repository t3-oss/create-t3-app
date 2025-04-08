import { createRouterClient } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";

import { postRouter } from "./routers/post";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
const router = {
  post: postRouter,
};

// export type definition of router
export type ORPCRouter = typeof router;

/**
 * Export handler for next app router
 */
export const handler = new RPCHandler(router);

/**
 * Export a server-side caller for the oRPC API.
 * @example
 * const res = await api.post.all();
 *       ^? Post[]
 */
export const api = createRouterClient(router);
