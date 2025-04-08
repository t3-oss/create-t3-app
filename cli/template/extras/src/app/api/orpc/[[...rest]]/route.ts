import { serve } from "@orpc/server/next";

import { handler } from "~/server/api";

const server = serve(handler, {
  prefix: "/api/orpc",
});

export const GET = server.GET.bind(server);
export const POST = server.POST.bind(server);
export const PUT = server.PUT.bind(server);
export const PATCH = server.PATCH.bind(server);
export const DELETE = server.DELETE.bind(server);
