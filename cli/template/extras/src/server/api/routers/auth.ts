import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { auth } from "~/server/auth";

export const authRouter = createTRPCRouter({
  getCurrentUser: publicProcedure.query(({ ctx }) => ctx.session?.user ?? null),

  logOut: protectedProcedure.mutation(async ({ ctx }) => {
    await auth.invalidateSession(ctx.session?.sessionId);
    ctx.authRequest.setSession(null);
  }),
});
