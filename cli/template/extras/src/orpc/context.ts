import { type RouterUtils } from "@orpc/react-query";
import { type RouterClient } from "@orpc/server";
import { createContext, useContext } from "react";

import { type ORPCRouter } from "~/server/api";

type ORPCReactUtils = RouterUtils<RouterClient<ORPCRouter>>;

export const ORPCContext = createContext<ORPCReactUtils | undefined>(undefined);

export function useORPC(): ORPCReactUtils {
  const orpc = useContext(ORPCContext);
  if (!orpc) {
    throw new Error("ORPCContext is not set up properly");
  }
  return orpc;
}
