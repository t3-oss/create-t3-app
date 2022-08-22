import { t, authedProcedure } from "../trpc";

export const authRouter = t.router({
  getSession: t.procedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: authedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
});
