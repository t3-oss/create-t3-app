// src/server/db/client.ts
import { PrismaClient } from "@prisma/client";
import { env } from "../../env/server.mjs";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  /**
   * Uncomment this prisma middleware to show database queries elapsed time
   */
  // prisma.$use(async (params, next) => {
  //   const before = Date.now()
  //   await next(params)
  //   const after = Date.now()
  //   console.log(
  //     `Query ${params.model}.${params.action} took ${after - before}ms`
  //   )
  // })

  global.prisma = prisma;
}
