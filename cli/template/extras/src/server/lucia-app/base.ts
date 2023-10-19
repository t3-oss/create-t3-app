import { discord } from "@lucia-auth/oauth/providers";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import * as context from "next/headers";
import { cache } from "react";

import { env } from "~/env.mjs";

/** @see https://lucia-auth.com/basics/configuration/ */
export const auth = lucia({
  // Lucia needs a database adapter. Please set up one for your database: https://lucia-auth.com/getting-started/#setup-your-database
  // adapter: yourDBAdapter(),
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

/** Get auth session from a server component. */
export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

export type Auth = typeof auth;
