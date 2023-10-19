import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { env } from "~/env.mjs";
import * as schema from "./schema";

export const dbConnection = new Client({
  url: env.DATABASE_URL,
}).connection();

export const db = drizzle(dbConnection, { schema });
