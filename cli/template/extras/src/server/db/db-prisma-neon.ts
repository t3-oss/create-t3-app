import { neon } from "@neondatabase/serverless";
import { PrismaNeonHTTP } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

import { env } from "~/env";

// Initialize Neon client using the DATABASE_URL from the environment variables
const sql = neon(env.DATABASE_URL);

// Set up the Prisma adapter for Neon
const adapter = new PrismaNeonHTTP(sql);

// Create a new Prisma client instance with the Neon adapter
const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    adapter,
  });

// Global variable to store the Prisma client instance across module reloads
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

// Export the Prisma client instance, reusing it if it already exists
export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
