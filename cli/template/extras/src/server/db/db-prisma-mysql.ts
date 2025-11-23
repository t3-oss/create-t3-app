import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import { env } from "~/env";
import { PrismaClient } from "../../generated/prisma/client";

/**
 * Parse MySQL connection URL to extract connection parameters
 * Format: mysql://username:password@host:port/database
 */
function parseMySQLUrl(url: string) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    user: parsed.username,
    password: parsed.password,
    database: parsed.pathname.slice(1), // Remove leading slash
    port: parsed.port ? parseInt(parsed.port, 10) : 3306,
  };
}

const createPrismaClient = () => {
  const connectionParams = parseMySQLUrl(env.DATABASE_URL);
  const adapter = new PrismaMariaDb({
    ...connectionParams,
    connectionLimit: 5,
  });
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
