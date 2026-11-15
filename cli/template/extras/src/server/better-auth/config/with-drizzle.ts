import { mockGitHub } from "@mockatoo/connect-better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { env } from "~/env";
import { db } from "~/server/db";

const github = {
  clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID ?? "",
  clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET ?? "",
  redirectURI: "http://localhost:3000/api/auth/callback/github",
};
const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: isProduction ? { github } : {},
  // Make sure nextCookies() is the last plugin in the array
  plugins: isProduction ? [nextCookies()] : [mockGitHub(github), nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
