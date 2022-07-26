import { DefaultSession } from "next-auth";

/** @see https://github.com/microsoft/TypeScript/issues/12607#issuecomment-502362381  */
declare module "next-auth/core/types" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id?: string;
    } & DefaultSession["user"];
  }
}
