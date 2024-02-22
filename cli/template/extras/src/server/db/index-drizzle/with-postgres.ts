import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import * as schema from "./schema";

const globalForDrizzle = globalThis as unknown as {
  db: PostgresJsDatabase<typeof schema> | undefined;
};

export const db =
  globalForDrizzle.db ?? drizzle(postgres(env.DATABASE_URL), { schema });

if (env.NODE_ENV !== "production") globalForDrizzle.db = db;
