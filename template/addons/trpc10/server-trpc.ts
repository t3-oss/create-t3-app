import { initTRPC } from "@trpc/server";
import type { Context } from "./router/context";
import superjson from "superjson";

export const t = initTRPC<{ ctx: Context }>()({
  transformer: superjson,
});
