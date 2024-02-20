import { Client } from "@planetscale/database";
import {
  drizzle,
  type PlanetScaleDatabase,
} from "drizzle-orm/planetscale-serverless";

import { env } from "~/env";
import * as schema from "./schema";

const globalForDrizzle = globalThis as unknown as {
  db: PlanetScaleDatabase<typeof schema> | undefined;
};

export const db =
  globalForDrizzle.db ??
  drizzle(
    new Client({
      url: env.DATABASE_URL,
    }).connection(),
    { schema }
  );

if (env.NODE_ENV !== "production") globalForDrizzle.db = db;
