import * as dotenv from "dotenv";
import { type Config } from "drizzle-kit";

import { env } from "~/env.mjs";

dotenv.config();

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
