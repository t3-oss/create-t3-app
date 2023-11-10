"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { use, useState } from "react";

import { type AppRouter } from "~/server/api/root";
import { getUrl, transformer } from "./shared";

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: {
  children: React.ReactNode;
  cookiePromise: Promise<string>;
}) {
  const cookie = use(props.cookiePromise);
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
          headers() {
            return {
              cookie,
              "x-trpc-source": "react",
            };
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
