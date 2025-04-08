import { z } from "zod";

import { publicProcedure } from "~/server/api/procedures";
import { posts } from "~/server/db/schema";

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
    return await context.db.insert(posts).values({
      name: input.name,
      createdById: context.session.user.id,
    });
  });

const getLatest = publicProcedure.handler(async ({ context }) => {
  const post = await context.db.query.posts.findFirst({
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  });
  return post ?? null;
});

export const postRouter = {
  hello,
  create,
  getLatest,
};
