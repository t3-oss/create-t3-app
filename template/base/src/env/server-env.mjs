// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverEnvSchema } from "./env-schema.mjs";
import { env as clientEnv, formatErrors } from "./client-env.mjs";

const _serverEnv = serverEnvSchema.safeParse(process.env);
 
if (!_serverEnv.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(_serverEnv.error.format()),
  );
  throw new Error("Invalid environment variables");
}

export const env = {..._serverEnv.data, ...clientEnv};