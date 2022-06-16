import * as trpcNext from "@trpc/server/adapters/next";
import superjson from "superjson";
import { z } from "zod";
import { createContext } from "../../../server/context";
import { createRouter } from "../../../server/create-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("example", {
    async resolve({ ctx: { prisma } }) {
      return await prisma.example.findMany();
    },
  })
  .mutation("create-example", {
    async resolve({ ctx: { prisma } }) {
      return await prisma.example.create({ data: {} });
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
