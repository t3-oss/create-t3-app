import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import * as schema from "./schema";

const globalForDrizzle = globalThis as unknown as {
  dbConnection: postgres.Sql | undefined;
};

const dbConnection =
  globalForDrizzle.dbConnection ?? postgres(env.DATABASE_URL);

if (env.NODE_ENV !== "production") globalForDrizzle.dbConnection = dbConnection;

export const db = drizzle(dbConnection, { schema });
