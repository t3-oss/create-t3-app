import { toNodeHandler } from "better-auth/node";

import { auth } from "~/server/better-auth";

// Disallow body parsing, we will parse it manually
export const config = { api: { bodyParser: false } };

export default toNodeHandler(auth.handler);
