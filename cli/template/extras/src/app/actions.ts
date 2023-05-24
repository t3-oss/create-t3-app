"use server";

import * as z from "zod";
import * as procs from "~/server/api/routers/post";
import { createAction, publicProcedure } from "~/server/api/trpc";

/** You can import procedures from your api router. */
export const createPost = createAction(procs.createPost);

/** You can also create procedures inline using the reusable procedure builders. */
export const editPost = createAction(
  publicProcedure
    .input(
      z.object({
        id: z.string(),
        text: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          text: input.text,
        },
      });
    }),
);
