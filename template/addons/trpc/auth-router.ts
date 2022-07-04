import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";

export const authRouter = createRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("getSecretMessage", {
    async resolve({ ctx }) {
      return "You are logged in and can see this secret message!";
    },
  });
