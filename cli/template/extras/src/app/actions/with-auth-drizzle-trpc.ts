"use server";

import { eq } from "drizzle-orm";
import * as z from "zod";

import * as procs from "~/server/api/routers/post";
import { createAction, protectedProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";

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
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(posts)
        .set({
          text: input.text,
        })
        .where(eq(posts.id, input.id));
    })
);
