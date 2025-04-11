import { z } from "zod";

import { publicProcedure } from "~/server/api/procedures";

const hello = publicProcedure
  .input(z.object({ text: z.string() }))
  .handler(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  });

const create = publicProcedure
  .input(z.object({ name: z.string().min(1) }))
  .handler(async ({ context, input }) => {
    return await context.db.post.create({
      data: {
        name: input.name,
      },
    });
  });

const getLatest = publicProcedure.handler(async ({ context }) => {
  const post = await context.db.post.findFirst({
    orderBy: { createdAt: "desc" },
  });
  return post ?? null;
});

export const postRouter = {
  hello,
  create,
  getLatest,
};
