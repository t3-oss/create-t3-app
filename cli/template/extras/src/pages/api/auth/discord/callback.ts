import { OAuthRequestError } from "@lucia-auth/oauth";
import { parseCookie } from "lucia/utils";
import { type NextApiRequest, type NextApiResponse } from "next";

import { auth, discordAuth } from "~/server/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405);
  const authRequest = auth.handleRequest({ req, res });
  const session = await authRequest.validate();
  if (session) {
    return res.status(302).setHeader("Location", "/").end();
  }
  const cookies = parseCookie(req.headers.cookie ?? "");
  const storedState = cookies.discord_oauth_state;
  const state = req.query.state;
  const code = req.query.code;
  // validate state
  if (
    !storedState ||
    !state ||
    storedState !== state ||
    typeof code !== "string"
  ) {
    return res.status(400).end();
  }
  try {
    const { getExistingUser, discordUser, createUser } =
      await discordAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          discord_id: discordUser.id,
          username: discordUser.username,
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
    return res.status(302).setHeader("Location", "/").end();
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return res.status(400).end();
    }
    console.error(e);
    return res.status(500).end();
  }
};

export default handler;
