import { protectedRouter } from "../trpc";

export const authRouter = protectedRouter().query("getSecretMessage", {
  resolve: () => {
    return "You are logged in and can see this secret message!";
  },
});
