"use server";

import { httpBatchLink, loggerLink } from "@trpc/client";
import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server";
import { headers } from "next/headers";
import type { AppRouter } from "~/server/api/root";
import { getUrl, transformer } from "./shared";

export const api = experimental_createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchLink({
          url: getUrl(),
          headers() {
            // Forward headers from the browser to the API
            return {
              ...Object.fromEntries(headers()),
              "x-trpc-source": "rsc",
            };
          },
        }),
      ],
    };
  },
});

// export const createAction =
