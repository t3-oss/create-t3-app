import * as schema from "./schema";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { env } from "~/env.mjs";

// create the connection
const connection = connect({
  url: env.DATABASE_URL,
});

export const db = drizzle(connection, { schema });
