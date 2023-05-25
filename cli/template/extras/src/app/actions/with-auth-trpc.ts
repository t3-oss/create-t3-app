"use server";

import * as z from "zod";
import { createAction, protetedProcedure } from "~/server/api/trpc";

/** You can also create procedures inline using the reusable procedure builders. */
export const createPost = createAction(
  protetedProcedure
    .input(
      z.object({
        id: z.string(),
        text: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      // simulate a slow mutation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        id: input.id,
        text: input.text,
      };
    }),
);
