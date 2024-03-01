import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { env } from "~/env";
import * as schema from "./schema";

const globalForDrizzle = globalThis as unknown as {
  dbConnection: Database | undefined;
};

export const dbConnection =
  globalForDrizzle.dbConnection ??
  new Database(env.DATABASE_URL, {
    fileMustExist: false,
  });

if (env.NODE_ENV !== "production") globalForDrizzle.dbConnection = dbConnection;

export const db = drizzle(dbConnection, { schema });
