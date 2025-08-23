import { auth } from ".";
import { headers } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() })
);
