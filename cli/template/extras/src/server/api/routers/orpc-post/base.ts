import { z } from "zod";

import { publicProcedure } from "~/server/api/procedures";

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

const create = publicProcedure
  .input(z.object({ name: z.string().min(1) }))
  .handler(async ({ input }) => {
    const post: Post = {
      id: posts.length + 1,
      name: input.name,
    };
    posts.push(post);
    return post;
  });

const getLatest = publicProcedure.handler(() => {
  return posts.at(-1) ?? null;
});

export const postRouter = {
  hello,
  create,
  getLatest,
};
