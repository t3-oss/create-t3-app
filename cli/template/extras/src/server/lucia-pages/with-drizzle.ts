import { planetscale } from "@lucia-auth/adapter-mysql";
import { discord } from "@lucia-auth/oauth/providers";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";

import { env } from "~/env.mjs";
import { dbConnection } from "./db";

/** @see https://lucia-auth.com/basics/configuration/ */
export const auth = lucia({
  adapter: planetscale(dbConnection, {
    // MySQL table names
    user: "project1_user",
    key: "project1_key",
    session: "project1_session",
  }),
  env: env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (databaseUser) => ({
    name: databaseUser.name,
    discordId: databaseUser.discord_id,
  }),
});

export const discordAuth = discord(auth, {
  clientId: env.DISCORD_CLIENT_ID,
  clientSecret: env.DISCORD_CLIENT_SECRET,
  redirectUri: env.AUTH_URL + "/api/auth/discord/callback",
});

export type Auth = typeof auth;
