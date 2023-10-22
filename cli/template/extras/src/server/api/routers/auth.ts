import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  getCurrentUser: publicProcedure.query(({ ctx }) => ctx.session?.user ?? null),
});
