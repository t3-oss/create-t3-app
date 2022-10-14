import { router } from "../trpc";
import { z } from "zod";

export const exampleRouter = router()
  .query("hello", {
    input: z.object({ text: z.string().nullish() }).nullish(),
    resolve: ({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    resolve: ({ ctx }) => {
      return ctx.prisma.example.findMany();
    },
  });
