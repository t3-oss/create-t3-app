import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env.js";
import * as schema from "./schema";

export const db = drizzle(postgres(env.DATABASE_URL), { schema });
