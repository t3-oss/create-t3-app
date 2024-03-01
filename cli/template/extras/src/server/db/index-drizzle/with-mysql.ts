import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import { env } from "~/env";
import * as schema from "./schema";

const globalForDrizzle = globalThis as unknown as {
  dbConnection: mysql.PoolConnection | undefined;
};

const dbConnection =
  globalForDrizzle.dbConnection ??
  mysql.createPool({
    uri: env.DATABASE_URL,
  });

if (env.NODE_ENV !== "production") globalForDrizzle.dbConnection = dbConnection;

export const db = drizzle(dbConnection, { schema, mode: "default" });
