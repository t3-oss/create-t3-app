"use server";

import * as z from "zod";

import * as procs from "~/server/api/routers/post";
import { createAction, protectedProcedure } from "~/server/api/trpc";

/** You can import procedures from your api router. */
export const createPost = createAction(procs.createPost);

/** You can also create procedures inline using the reusable procedure builders. */
export const editPost = createAction(
  protectedProcedure
    .input(
      z.object({
        id: z.number(),
        text: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          text: input.text,
        },
      });
    })
);
