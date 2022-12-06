import { type GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../../pages/api/auth/[...nextauth]";

/**
 * Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs
 * See example usage in trpc createContext or the restricted API route
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  // next-auth 4.18.0 introduced a breaking change to unstable_getServerSession
  // FIXME: find a better solution than spreading authOptions into a new object
  return await unstable_getServerSession(ctx.req, ctx.res, { ...authOptions });
};
