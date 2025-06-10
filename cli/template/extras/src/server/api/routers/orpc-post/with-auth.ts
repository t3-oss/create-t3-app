import { z } from "zod";

import { protectedProcedure, publicProcedure } from "~/server/api/procedures";

// Mocked DB
interface Post {
  id: number;
  name: string;
}
const posts: Post[] = [
  {
    id: 1,
    name: "Hello World",
  },
];

const hello = publicProcedure
  .input(z.object({ text: z.string() }))
  .handler(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  });

const create = protectedProcedure
  .input(z.object({ name: z.string().min(1) }))
  .handler(async ({ input }) => {
    const post: Post = {
      id: posts.length + 1,
      name: input.name,
    };
    posts.push(post);
    return post;
  });

const getLatest = protectedProcedure.handler(() => {
  return posts.at(-1) ?? null;
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
