import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
