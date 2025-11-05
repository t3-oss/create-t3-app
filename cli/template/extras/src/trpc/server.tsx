import "server-only";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createTRPCOptionsProxy,
  type ResolverDef,
  type TRPCInfiniteQueryOptions,
  type TRPCQueryOptions,
} from "@trpc/tanstack-react-query";
import { headers } from "next/headers";
import { cache } from "react";

import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);

const prefetchApi = createTRPCOptionsProxy({
  ctx: createContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export const api = appRouter.createCaller(createContext);

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

export function prefetch<
  R extends ResolverDef,
  T extends
    | ReturnType<TRPCQueryOptions<R>>
    | ReturnType<TRPCInfiniteQueryOptions<R>>,
>(queryOptionsCb: (api: typeof prefetchApi) => T) {
  const queryClient = getQueryClient();
  const queryOptions = queryOptionsCb(prefetchApi);

  if (queryOptions.queryKey[1]?.type === "infinite") {
    void queryClient.prefetchInfiniteQuery(
      queryOptions as ReturnType<TRPCInfiniteQueryOptions<R>>
    );
    return;
  }

  void queryClient.prefetchQuery(
    queryOptions as ReturnType<TRPCQueryOptions<R>>
  );
}
