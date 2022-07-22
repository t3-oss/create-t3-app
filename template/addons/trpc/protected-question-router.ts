import { createProtectedRouter } from "./protected-router";

export const protectedQuestionRouter = createProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("getSecretMessage", {
    async resolve({ ctx }) {
      // Fetch protected data from your Database here and return

      return "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.";
    },
  });
