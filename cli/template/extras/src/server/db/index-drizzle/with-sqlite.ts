import Database from "better-sqlite3";
import {
  drizzle,
  type BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";

import { env } from "~/env.js";
import * as schema from "./schema";

const globalForDrizzle = globalThis as unknown as {
  db: BetterSQLite3Database<typeof schema> | undefined;
};

export const db =
  globalForDrizzle.db ??
  drizzle(
    new Database(env.DATABASE_URL, {
      fileMustExist: false,
    }),
    { schema }
  );

if (env.NODE_ENV !== "production") globalForDrizzle.db = db;
