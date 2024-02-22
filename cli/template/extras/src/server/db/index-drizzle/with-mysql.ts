import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import { env } from "~/env";
import * as schema from "./schema";

const globalForDrizzle = globalThis as unknown as {
  db: MySql2Database<typeof schema> | undefined;
};

export const db =
  globalForDrizzle.db ??
  drizzle(
    mysql.createPool({
      uri: env.DATABASE_URL,
    }),
    { schema, mode: "default" }
  );

if (env.NODE_ENV !== "production") globalForDrizzle.db = db;
