import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDrizzle = globalThis as unknown as {
  conn: Database | undefined;
};

export const conn =
  globalForDrizzle.conn ??
  new Database(env.DATABASE_URL, { fileMustExist: false });

if (env.NODE_ENV !== "production") globalForDrizzle.conn = conn;

export const db = drizzle(conn, { schema });
