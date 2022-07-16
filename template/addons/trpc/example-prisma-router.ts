import { t } from "../utils";
import { z } from "zod";

export const exampleRouter = t.router({
  hello: t.procedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
