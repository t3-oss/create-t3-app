import { prisma } from "@lucia-auth/adapter-prisma";
import { discord } from "@lucia-auth/oauth/providers";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";

import { env } from "~/env.mjs";
import { db } from "./db";

/** @see https://lucia-auth.com/basics/configuration/ */
export const auth = lucia({
  adapter: prisma(db, {
    // SQL Table Names
    user: "user", // model User {}
    key: "key", // model Key {}
    session: "session", // model Session {}
  }),
  env: env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (databaseUser) => ({
    username: databaseUser.username,
    discordId: databaseUser.discord_id,
  }),
});

export const discordAuth = discord(auth, {
  clientId: env.DISCORD_CLIENT_ID,
  clientSecret: env.DISCORD_CLIENT_SECRET,
  redirectUri: env.AUTH_URL + "/api/auth/discord/callback",
});

export type Auth = typeof auth;
