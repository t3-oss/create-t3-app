import * as context from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { env } from "~/env.mjs";
import { auth, discordAuth } from "~/server/auth";

// Redirect users to this page to sign in with Discord
export const GET = async (request: NextRequest) => {
  const authRequest = auth.handleRequest(request.method, context);
  const session = await authRequest.validate();
  if (session) {
    // If already signed in, redirect to home page
    return NextResponse.redirect(new URL("/", request.url));
  }
  const [url, state] = await discordAuth.getAuthorizationUrl();
  const cookieStore = context.cookies();
  cookieStore.set("discord_oauth_state", state, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });
  return NextResponse.redirect(url);
};
