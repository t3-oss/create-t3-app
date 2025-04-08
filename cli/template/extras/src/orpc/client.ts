import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import { type RouterClient } from "@orpc/server";

import { type ORPCRouter } from "~/server/api";

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function createORPC(cookie?: string) {
  const link = new RPCLink({
    url: getBaseUrl() + "/api/orpc",
    headers: {
      Cookie: cookie,
    },
  });

  const client: RouterClient<ORPCRouter> = createORPCClient(link);

  return createORPCReactQueryUtils(client);
}
