import { OAuthRequestError } from "@lucia-auth/oauth";
import { cookies, headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { auth, discordAuth } from "~/server/auth";

export const GET = async (request: NextRequest) => {
  const authRequest = auth.handleRequest(request.method, {
    headers,
    cookies,
  });
  const session = await authRequest.validate();
  if (session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const cookieStore = cookies();
  const storedState = cookieStore.get("discord_oauth_state")?.value;
  const state = request.nextUrl.searchParams.get("state");
  const code = request.nextUrl.searchParams.get("code");
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const { getExistingUser, discordUser, createUser } =
      await discordAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          name: discordUser.username,
          discord_id: discordUser.id,
        },
      });
      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    authRequest.setSession(session);
    return NextResponse.redirect(new URL("/", request.url));
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    console.error(e);
    return new Response(null, {
      status: 500,
    });
  }
};
