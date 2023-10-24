import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import { env } from "~/env.mjs";
import * as schema from "./schema";

export const db = drizzle(
  new Client({
    connectionString: env.DATABASE_URL,
  }),
  { schema }
);
