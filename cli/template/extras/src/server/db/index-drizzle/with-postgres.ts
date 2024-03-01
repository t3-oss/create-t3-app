import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDrizzle = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDrizzle.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDrizzle.conn = conn;

export const db = drizzle(conn, { schema });
