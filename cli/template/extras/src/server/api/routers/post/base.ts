import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const createPost = publicProcedure
  .input(z.object({ title: z.string() }))
  .mutation(async ({ input }) => {
    // simulate slow db
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      id: 1,
      title: input.title,
    };
  });

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: createPost,
});
