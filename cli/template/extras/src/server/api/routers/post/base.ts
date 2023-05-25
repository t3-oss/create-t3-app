import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

let post = {
  id: 1,
  title: "Hello World",
};

export const createPost = publicProcedure
  .input(z.object({ text: z.string().min(1) }))
  .mutation(async ({ ctx, input }) => {
    // simulate a slow db call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    post = { id: post.id + 1, title: input.text };
    return post;
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

  getLatest: publicProcedure.query(() => {
    return post;
  }),
});
