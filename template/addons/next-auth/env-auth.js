// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */
const { z } = require("zod");

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
});

const env = envSchema.safeParse(process.env);

const formatErrors = (
  /** @type {import('zod').ZodFormattedError<Map<string,string>>} */ error,
) =>
  Object.entries(error)
    .map(([name, value]) => {
      if ("_errors" in value) return `${name}: ${value._errors.join(", ")}\n`;
    })
    .filter(Boolean);

if (!env.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(env.error.format()),
  );
  process.exit(1);
}
module.exports.env = env.data;
