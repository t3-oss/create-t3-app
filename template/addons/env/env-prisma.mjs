// @ts-check
import { z } from "zod";

export const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

export const clientEnvSchema = z.object({
  // Specify your client-side environment variables schema here
  // Be sure to name your environment variables with the prefix "NEXT_PUBLIC_"
});

/**
 * Next.js client-side environment variables are evaluated at build time,
 * so only environment variables actually used will be included.
 *
 * Define your client-side environment variables in this object to
 * be able to use autocompletion and destructuring in your code.
 */
export const clientEnv = {
  // NEXT_PUBLIC_FOO: process.env.NEXT_PUBLIC_FOO,
};
