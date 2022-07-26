/** Important note: If you add module path aliasing, move this file somewhere into 'src' directory. */
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id?: string;
    } & DefaultSession["user"];
  }
}
