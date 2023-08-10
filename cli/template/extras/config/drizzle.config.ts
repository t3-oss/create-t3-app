import * as dotenv from "dotenv";
import { type Config } from "drizzle-kit";

import { env } from "~/env.mjs";

dotenv.config();

export default {
  schema: "./schema",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
