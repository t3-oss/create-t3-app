import { z } from "zod";

import { protectedProcedure, publicProcedure } from "~/server/api/procedures";
import { posts } from "~/server/db/schema";

const hello = publicProcedure
  .input(z.object({ text: z.string() }))
  .handler(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  });

const create = protectedProcedure
  .input(z.object({ name: z.string().min(1) }))
  .handler(async ({ context, input }) => {
    return await context.db.insert(posts).values({
      name: input.name,
      createdById: context.session.user.id,
    });
  });

const getLatest = protectedProcedure.handler(async ({ context }) => {
  const post = await context.db.query.posts.findFirst({
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    where: (posts, { eq }) => eq(posts.createdById, context.session.user.id),
  });
  return post ?? null;
});

const getSecretMessage = protectedProcedure.handler(() => {
  return "you can now see this secret message!";
});

export const postRouter = {
  hello,
  create,
  getLatest,
  getSecretMessage,
};
