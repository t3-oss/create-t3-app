const { z } = require("zod");

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
});

module.exports.envSchema = envSchema;
