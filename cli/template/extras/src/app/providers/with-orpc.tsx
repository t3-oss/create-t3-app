"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

import { createORPC } from "~/orpc/client";
import { ORPCContext } from "~/orpc/context";
import { getQueryClient } from "~/orpc/query-client";

export default function Providers({
  children,
  cookie,
}: {
  children: React.ReactNode;
  cookie?: string;
}) {
  const queryClient = getQueryClient();
  const orpc = createORPC(cookie);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <ORPCContext.Provider value={orpc}>{children}</ORPCContext.Provider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
