import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";

export const authRouter = createRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("getSecretMessage", {
    async resolve({ ctx }) {
      return "You are logged in and can see this secret message!";
    },
  });
