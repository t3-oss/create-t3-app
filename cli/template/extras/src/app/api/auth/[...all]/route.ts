import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "~/server/auth/better-auth";

export const { GET, POST } = toNextJsHandler(auth.handler);
