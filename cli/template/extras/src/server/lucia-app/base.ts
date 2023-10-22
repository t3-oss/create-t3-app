import fs from "node:fs";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import { discord } from "@lucia-auth/oauth/providers";
import sqlite from "better-sqlite3";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import * as context from "next/headers";
import { cache } from "react";

import { env } from "~/env.mjs";

// For demo purposes, we use an in-memory SQLite database here.
// You should probably change this. Check the link below for the list of supported databases.
// https://lucia-auth.com/basics/database/#database-adapters
const db = sqlite(":memory:");
db.exec(fs.readFileSync("schema.sql", "utf8"));

/** @see https://lucia-auth.com/basics/configuration/ */
export const auth = lucia({
  adapter: betterSqlite3(db, {
    // Database table names
    user: "user",
    session: "session",
    key: "key",
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

/** Get auth session from a server component. */
export const getServerAuthSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

export type Auth = typeof auth;
