import { createRouter, baseProcedure, authedProcedure } from "../trpc";

export const authRouter = createRouter({
  getSession: baseProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: authedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
});
