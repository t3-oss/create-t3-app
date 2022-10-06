import { createRouter, baseProcedure } from "../trpc";
import { z } from "zod";

export const exampleRouter = createRouter({
  hello: baseProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
});
