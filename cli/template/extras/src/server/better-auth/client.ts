import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient();

export type Session = typeof authClient.$Infer.Session;
