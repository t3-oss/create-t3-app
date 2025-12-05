import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import { env } from "~/env";
import { PrismaClient } from "../../generated/prisma/client";

const createPrismaClient = () => {
  const connectionString = `${env.DATABASE_URL}`;
  const adapter = new PrismaBetterSqlite3({ url: connectionString });
  return new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
