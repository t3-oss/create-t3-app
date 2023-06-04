import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/server/db/schema.ts",
  connectionString: process.env.DATABASE_URL,
} satisfies Config;
