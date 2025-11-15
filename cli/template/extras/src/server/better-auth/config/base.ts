import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
