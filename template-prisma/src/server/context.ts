import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "../server/db";

export const createContext = (opts?: CreateNextContextOptions) => {
  return {
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
