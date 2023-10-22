import { serializeCookie } from "lucia/utils";
import { type NextApiRequest, type NextApiResponse } from "next";

import { env } from "~/env.mjs";
import { auth, discordAuth } from "~/server/auth";

// Redirect users to this page to sign in with Discord
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405);
  const authRequest = auth.handleRequest({ req, res });
  const session = await authRequest.validate();
  if (session) {
    // If already signed in, redirect to home page
    return res.redirect("/").end();
  }
  const [url, state] = await discordAuth.getAuthorizationUrl();
  const stateCookie = serializeCookie("discord_oauth_state", state, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });
  return res
    .setHeader("Set-Cookie", stateCookie)
    .redirect(302, url.toString())
    .end();
};

export default handler;
